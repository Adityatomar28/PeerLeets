import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Snowflake, Users, Award, ExternalLink, Calendar, CheckSquare, Clock, 
  Copy, LogOut, AlertTriangle, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { Skeleton } from '../../components/ui/Skeleton';
import { apiClient } from '../../services/api/api.client';
import { socketService } from '../../services/socket/socket.service';
import { useAuthStore } from '../../store/auth.store';
import { toast } from 'sonner';

// Type definitions
interface GroupMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
}

interface GroupDetails {
  id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
  members: GroupMember[];
}

interface Challenge {
  id: string;
  status: 'WAITING' | 'ACTIVE' | 'CLOSED';
  createdBy: string | null;
  problemLink: string | null;
  date: string;
  creator?: {
    id: string;
    name: string;
  };
}

interface LeaderboardUser {
  userId: string;
  name: string;
  currentStreak: number;
  longestStreak: number;
  totalSolved: number;
  last7DaysSolved: number;
  score: number;
  avatar?: string;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardUser[];
}

interface ParticipationUser {
  userId: string;
  name: string;
  solvedAt?: string;
  timeTaken?: number;
  freezeApplied?: boolean;
}

interface ParticipationGrid {
  solved: ParticipationUser[];
  pending: { userId: string; name: string }[];
  missed: ParticipationUser[];
  firstSolver: ParticipationUser | null;
}

interface ActivityLog {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  userId: string;
}

interface HistoryItem {
  id: string;
  problemLink: string;
  date: string;
  status: string;
}

const activateSchema = z.object({
  problemLink: z.string().url('Please enter a valid URL link from LeetCode / GeeksforGeeks'),
});

const solveSchema = z.object({
  timeTaken: z.number().min(1, 'Duration must be at least 1 minute'),
});

export default function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isSolveOpen, setIsSolveOpen] = useState(false);

  // Forms
  const activateForm = useForm<{ problemLink: string }>({
    resolver: zodResolver(activateSchema),
    defaultValues: { problemLink: '' },
  });

  const solveForm = useForm<{ timeTaken: number }>({
    resolver: zodResolver(solveSchema),
    defaultValues: { timeTaken: 15 },
  });

  // Queries
  const { data: group, isLoading: groupLoading } = useQuery<GroupDetails>({
    queryKey: ['groupDetails', groupId],
    queryFn: () => apiClient.get<GroupDetails>(`/api/groups/${groupId}`),
    enabled: !!groupId,
  });

  const { data: challenge, isLoading: challengeLoading } = useQuery<Challenge | null>({
    queryKey: ['todayChallenge', groupId],
    queryFn: () => apiClient.get<Challenge | null>(`/api/groups/${groupId}/challenges/today`).catch(() => null),
    enabled: !!groupId,
  });

  const challengeId = challenge?.id;

  const { data: grid, isLoading: gridLoading } = useQuery<ParticipationGrid>({
    queryKey: ['participationGrid', groupId, challengeId],
    queryFn: () => apiClient.get<ParticipationGrid>(`/api/groups/${groupId}/challenges/${challengeId}/status`),
    enabled: !!groupId && !!challengeId,
  });

  const { data: leaderboard, isLoading: boardLoading } = useQuery<LeaderboardResponse>({
    queryKey: ['groupLeaderboard', groupId],
    queryFn: () => apiClient.get<LeaderboardResponse>(`/api/groups/${groupId}/leaderboard`),
    enabled: !!groupId,
  });

  const { data: activities, isLoading: activityLoading } = useQuery<ActivityLog[]>({
    queryKey: ['groupActivity', groupId],
    queryFn: () => apiClient.get<ActivityLog[]>(`/api/groups/${groupId}/activity`),
    enabled: !!groupId,
  });

  const { data: history, isLoading: historyLoading } = useQuery<HistoryItem[]>({
    queryKey: ['groupHistory', groupId],
    queryFn: () => apiClient.get<HistoryItem[]>(`/api/groups/${groupId}/challenges/history`),
    enabled: !!groupId,
  });

  // Socket setup and E2E synchronization
  useEffect(() => {
    if (!groupId) return;

    // Join room
    socketService.joinGroup(groupId);

    // Register active listeners
    socketService.on('challenge:activated', () => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
    });

    socketService.on('challenge:closed', () => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
    });

    socketService.on('solve:success', () => {
      queryClient.invalidateQueries({ queryKey: ['participationGrid', groupId, challengeId] });
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      queryClient.invalidateQueries({ queryKey: ['userGroups'] }); // Invalidate dashboard stats
    });

    socketService.on('participation:update', () => {
      queryClient.invalidateQueries({ queryKey: ['participationGrid', groupId, challengeId] });
    });

    socketService.on('leaderboard:update', () => {
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
    });

    socketService.on('activity:created', () => {
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
    });

    return () => {
      socketService.leaveGroup(groupId);
      socketService.off('challenge:activated');
      socketService.off('challenge:closed');
      socketService.off('solve:success');
      socketService.off('participation:update');
      socketService.off('leaderboard:update');
      socketService.off('activity:created');
    };
  }, [groupId, challengeId, queryClient]);

  // Mutations
  const activateMutation = useMutation({
    mutationFn: (problemLink: string) => 
      apiClient.patch(`/api/groups/${groupId}/challenges/${challengeId}/activate`, { problemLink }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      setIsActivateOpen(false);
      toast.success('Daily challenge activated!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to activate challenge');
    }
  });

  const solveMutation = useMutation({
    mutationFn: (timeTaken: number) => 
      apiClient.post(`/api/groups/${groupId}/challenges/${challengeId}/solve`, { timeTaken: timeTaken * 60 }), // minutes to seconds
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participationGrid', groupId, challengeId] });
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      setIsSolveOpen(false);
      toast.success('Solution submitted successfully! 🔥');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to submit solution');
    }
  });

  const leaveMutation = useMutation({
    mutationFn: () => apiClient.post(`/api/groups/${groupId}/leave`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      toast.success('Successfully left the accountability squad.');
      navigate('/dashboard');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to leave group');
    }
  });

  const copyInviteCode = () => {
    if (group?.inviteCode) {
      navigator.clipboard.writeText(group.inviteCode);
      toast.success('Invite code copied to clipboard!');
    }
  };

  const handleActivateSubmit = (values: { problemLink: string }) => {
    activateMutation.mutate(values.problemLink);
  };

  const handleSolveSubmit = (values: { timeTaken: number }) => {
    solveMutation.mutate(values.timeTaken);
  };

  const isUserChallenger = challenge?.createdBy === user?.id;
  const hasUserSolved = grid?.solved.some(s => s.userId === user?.id);

  if (groupLoading) {
    return (
      <div className="space-y-6 text-left">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!group) {
    return <div className="text-center py-20 text-text-secondary">Group not found.</div>;
  }

  return (
    <div className="space-y-8 text-left">
      {/* 1. GROUP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">{group.name}</h1>
            <button
              onClick={copyInviteCode}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background-surfaceLight border border-border-subtle hover:border-white/20 transition-all font-mono text-[10px] font-semibold text-text-secondary hover:text-white cursor-pointer"
            >
              Code: {group.inviteCode} <Copy className="w-3 h-3" />
            </button>
          </div>
          <p className="font-sans text-xs text-text-secondary mt-1">{group.members.length} active squad members</p>
        </div>

        {group.createdBy !== user?.id && (
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-accent-rose hover:bg-accent-rose/10 flex items-center gap-2"
            onClick={() => {
              if (confirm('Are you sure you want to leave this accountability group?')) {
                leaveMutation.mutate();
              }
            }}
            isLoading={leaveMutation.isPending}
          >
            <LogOut className="w-4 h-4" /> Leave Group
          </Button>
        )}
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Challenge & Grid */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 2. TODAY'S CHALLENGE CARD */}
          {challengeLoading ? (
            <Skeleton className="h-44 w-full" />
          ) : !challenge ? (
            /* Scenario when no slot is created yet */
            <Card className="bg-background-surface border-border-subtle p-6">
              <CardHeader className="p-0 mb-4">
                <span className="text-[10px] font-mono text-accent-indigo font-bold uppercase tracking-wider block">Today's Challenge</span>
                <CardTitle className="text-white mt-1">No slot generated yet</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mb-6">
                <p className="font-sans text-xs text-text-secondary">
                  The automated daily cron scheduler or a manual queue trigger is needed to setup today's challenge.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-background-surface border-border-subtle overflow-hidden">
              <div className="bg-[#121620] px-6 py-3 border-b border-border-subtle flex justify-between items-center">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Today's Challenge Status</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                  challenge.status === 'ACTIVE' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-accent-emerald' 
                    : challenge.status === 'CLOSED'
                    ? 'bg-accent-rose/10 border border-accent-rose/20 text-accent-rose'
                    : 'bg-amber-500/10 border border-amber-500/20 text-accent-amber'
                }`}>
                  {challenge.status}
                </span>
              </div>

              <CardContent className="p-6">
                {/* WAITING STATE */}
                {challenge.status === 'WAITING' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-accent-amber" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white">Awaiting problem activation</h4>
                        <p className="font-sans text-xs text-text-secondary mt-1">
                          Today's challenge assignee is <strong className="text-white">{challenge.creator?.name || 'an assigned member'}</strong>.
                        </p>
                      </div>
                    </div>

                    {isUserChallenger ? (
                      <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/15 mt-4">
                        <h5 className="font-display font-bold text-xs text-white mb-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-accent-indigo" /> You are the challenger today!
                        </h5>
                        <p className="font-sans text-[11px] text-text-secondary mb-4">
                          Provide the coding task URL link (from LeetCode or similar) to activate it for your squad.
                        </p>
                        <Button size="sm" onClick={() => setIsActivateOpen(true)}>
                          Activate Challenge
                        </Button>
                      </div>
                    ) : (
                      <p className="font-mono text-[10px] text-text-muted italic pt-2">
                        Waiting for assignee to activate problem...
                      </p>
                    )}
                  </div>
                )}

                {/* ACTIVE STATE */}
                {challenge.status === 'ACTIVE' && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider block mb-1">Target Coding Problem</span>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
                        LeetCode Algorithmic Problem
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-text-secondary pb-2">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-accent-indigo" />
                        <span>Challenger: <strong className="text-white">{challenge.creator?.name || 'Squad'}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-accent-amber" />
                        <span>Deadline: <strong className="text-white">Before daily cutoff</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      {challenge.problemLink && (
                        <a href={challenge.problemLink} target="_blank" rel="noreferrer" className="flex-1">
                          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                            Open Problem <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}

                      {hasUserSolved ? (
                        <div className="flex-1 flex items-center justify-center gap-2 text-accent-emerald text-sm font-semibold border border-emerald-500/20 bg-emerald-500/5 rounded-lg px-4 h-11">
                          <CheckCircle2 className="w-4 h-4" /> You solved this today!
                        </div>
                      ) : (
                        <Button className="flex-1" onClick={() => setIsSolveOpen(true)}>
                          <CheckSquare className="w-4 h-4 mr-2" /> Mark as Solved
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* CLOSED STATE */}
                {challenge.status === 'CLOSED' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-rose/10 border border-accent-rose/25 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5 text-accent-rose" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white font-bold">Challenge closed</h4>
                        <p className="font-sans text-xs text-text-secondary mt-1">
                          Today's slot is closed and streaks have been adjusted (streak freezes consumed or streaks reset).
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 3. REALTIME PARTICIPATION GRID */}
          {gridLoading ? (
            <Skeleton className="h-56 w-full" />
          ) : grid ? (
            <Card className="bg-background-surface border-border-subtle text-left">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-extrabold flex items-center gap-2">
                  Participation Matrix 
                  {grid.firstSolver && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-semibold text-accent-amber">
                      <Award className="w-3.5 h-3.5 fill-current" /> First Solver: {grid.firstSolver.name}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>Real-time completion grid of squad members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Solved List */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-accent-emerald font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" /> Solved
                  </span>
                  {grid.solved.length === 0 ? (
                    <p className="font-sans text-xs text-text-muted italic pl-3">No solutions solved yet today.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3">
                      {grid.solved.map((u) => (
                        <div key={u.userId} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-[10px] text-accent-emerald uppercase">
                              {u.name[0]}
                            </div>
                            <span className="font-sans text-xs text-white font-bold">{u.name}</span>
                          </div>
                          <span className="font-mono text-[10px] text-text-secondary">
                            {u.timeTaken ? `${Math.round(u.timeTaken / 60)}m taken` : 'solved'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pending List */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-accent-amber font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" /> Pending Solve
                  </span>
                  {grid.pending.length === 0 ? (
                    <p className="font-sans text-xs text-text-muted italic pl-3">All members have solved or checked out!</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3">
                      {grid.pending.map((u) => (
                        <div key={u.userId} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.01] border border-white/5">
                          <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center font-bold text-[10px] text-accent-amber uppercase">
                            {u.name[0]}
                          </div>
                          <span className="font-sans text-xs text-text-secondary">{u.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Missed / Freezed List */}
                {grid.missed.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-purple-400 font-bold tracking-wider uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Missed / Freezes Used
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3">
                      {grid.missed.map((u) => (
                        <div key={u.userId} className="flex items-center justify-between p-2.5 rounded-lg bg-[#1F192E]/30 border border-purple-500/10">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-[10px] text-purple-300 uppercase">
                              {u.name[0]}
                            </div>
                            <span className="font-sans text-xs text-text-secondary">{u.name}</span>
                          </div>
                          <span className="font-mono text-[9px] text-purple-300 flex items-center gap-1">
                            <Snowflake className="w-3.5 h-3.5" /> Freeze applied
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {/* 6. CHALLENGE HISTORY */}
          {historyLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : history && history.length > 0 ? (
            <Card className="bg-background-surface border-border-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-extrabold">Challenge Registry History</CardTitle>
                <CardDescription>List of past challenges activated in this group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {history.map((hist) => (
                  <div key={hist.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.01] border border-white/5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-text-muted" />
                      <span className="font-mono text-text-secondary">{new Date(hist.date).toLocaleDateString()}</span>
                    </div>
                    <a
                      href={hist.problemLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent-indigo font-bold flex items-center gap-0.5 hover:underline"
                    >
                      View Problem <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Right Column: Leaderboard & Activity Feed */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 4. SQUAD LEADERBOARD */}
          {boardLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : leaderboard ? (
            <Card className="bg-background-surface border-border-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-extrabold">Consistency Ladder</CardTitle>
                <CardDescription>Ranks weighted by streak multipliers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col border-t border-border-subtle">
                  <AnimatePresence>
                    {leaderboard.leaderboard.map((userRow, idx) => (
                      <motion.div
                        key={userRow.userId}
                        layout
                        className="flex items-center justify-between px-6 py-3.5 border-b border-border-subtle/50 last:border-none hover:bg-white/[0.01]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-text-muted w-4">#{idx + 1}</span>
                          <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center font-bold text-xs text-indigo-400 uppercase">
                            {userRow.name[0]}
                          </div>
                          <span className="font-sans font-bold text-xs text-white">{userRow.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-orange-400 font-bold flex items-center gap-0.5">
                            <Flame className="w-3.5 h-3.5 fill-current" /> {userRow.currentStreak}d
                          </span>
                          <span className="font-mono text-xs font-black text-white">{userRow.score} pts</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* 5. REALTIME ACTIVITY FEED */}
          {activityLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : activities ? (
            <Card className="bg-background-surface border-border-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-extrabold">Activity Feed</CardTitle>
                <CardDescription>Real-time social logging stream</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col border-t border-border-subtle max-h-80 overflow-y-auto no-scrollbar">
                  {activities.length === 0 ? (
                    <p className="font-sans text-xs text-text-muted italic p-6 text-center">No logs generated yet.</p>
                  ) : (
                    activities.map((act) => (
                      <div key={act.id} className="px-6 py-3.5 border-b border-border-subtle/30 last:border-none flex items-start justify-between gap-3 text-left">
                        <span className="font-sans text-xs text-text-primary leading-relaxed">{act.message}</span>
                        <span className="font-mono text-[9px] text-text-muted mt-0.5 shrink-0">
                          {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      {/* ACTIVATE CHALLENGE DIALOG */}
      <Dialog
        isOpen={isActivateOpen}
        onClose={() => setIsActivateOpen(false)}
        title="Activate Today's Challenge"
        description="Paste a URL link from LeetCode or a similar platform to assign the coding task."
      >
        <form onSubmit={activateForm.handleSubmit(handleActivateSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">Problem URL Link</label>
            <Input
              type="text"
              placeholder="e.g. https://leetcode.com/problems/two-sum/"
              error={!!activateForm.formState.errors.problemLink}
              {...activateForm.register('problemLink')}
            />
            {activateForm.formState.errors.problemLink && (
              <p className="text-[10px] text-accent-rose font-medium mt-1">{activateForm.formState.errors.problemLink.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsActivateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={activateMutation.isPending}>
              Activate
            </Button>
          </div>
        </form>
      </Dialog>

      {/* SUBMIT SOLVE DIALOG */}
      <Dialog
        isOpen={isSolveOpen}
        onClose={() => setIsSolveOpen(false)}
        title="Mark Challenge as Solved"
        description="Verify you solved the challenge problem and record your completion time."
      >
        <form onSubmit={solveForm.handleSubmit(handleSolveSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">Time Taken (in minutes)</label>
            <Input
              type="number"
              placeholder="e.g. 15"
              error={!!solveForm.formState.errors.timeTaken}
              {...solveForm.register('timeTaken', { valueAsNumber: true })}
            />
            {solveForm.formState.errors.timeTaken && (
              <p className="text-[10px] text-accent-rose font-medium mt-1">{solveForm.formState.errors.timeTaken.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsSolveOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={solveMutation.isPending}>
              Submit Solve
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
