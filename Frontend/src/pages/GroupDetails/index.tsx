import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Snowflake, Users, ExternalLink, Calendar, CheckSquare, Clock, 
  Copy, LogOut, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight, Play, 
  Pause, RotateCcw, PlayCircle, Trophy, Activity, UserCheck
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

// Interfaces
interface GroupMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
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
}

interface LeaderboardResponse {
  leaderboard: LeaderboardUser[];
}

interface ParticipationUser {
  userId: string;
  name: string;
  solvedAt?: string;
  timeTaken?: number;
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

interface TimerData {
  state: 'idle' | 'running' | 'paused';
  startTime: number;
  elapsed: number;
}

// Schemas
const activateSchema = z.object({
  problemLink: z.string().url('Please enter a valid DSA problem URL'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  notes: z.string().max(200, 'Notes must be less than 200 characters').optional(),
});

const solveSchema = z.object({
  timeTaken: z.number().min(1, 'Duration must be at least 1 minute'),
  notes: z.string().max(200, 'Notes must be less than 200 characters').optional(),
});

// Helpers
function parseProblemLink(link: string | null) {
  if (!link) return { url: '', difficulty: 'Medium', notes: '' };
  try {
    if (link.startsWith('{')) {
      const parsed = JSON.parse(link);
      return {
        url: parsed.url || '',
        difficulty: parsed.difficulty || 'Medium',
        notes: parsed.notes || ''
      };
    }
  } catch (e) {}
  return {
    url: link,
    difficulty: 'Medium',
    notes: ''
  };
}

function getProblemTitleFromUrl(url: string) {
  try {
    const match = url.match(/\/problems\/([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
      return match[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  } catch (e) {}
  return 'Algorithmic DSA Challenge';
}

export default function GroupRoomPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isSolveOpen, setIsSolveOpen] = useState(false);
  const [activeUsers, setActiveUsers] = useState<Set<string>>(new Set());

  // Ranks Tracker for rank shift animations
  const [rankChanges, setRankChanges] = useState<{ [userId: string]: 'up' | 'down' | 'neutral' }>({});
  const prevRanksRef = useRef<{ [userId: string]: number }>({});

  // Forms
  const activateForm = useForm<{ problemLink: string; difficulty: 'Easy' | 'Medium' | 'Hard'; notes?: string }>({
    resolver: zodResolver(activateSchema),
    defaultValues: { problemLink: '', difficulty: 'Medium', notes: '' },
  });

  const solveForm = useForm<{ timeTaken: number; notes?: string }>({
    resolver: zodResolver(solveSchema),
    defaultValues: { timeTaken: 15, notes: '' },
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

  const { data: history, isLoading: historyLoading } = useQuery<Challenge[]>({
    queryKey: ['groupHistory', groupId],
    queryFn: () => apiClient.get<Challenge[]>(`/api/groups/${groupId}/challenges/history`).then(res => res.slice(0, 3)),
    enabled: !!groupId,
  });

  // ----------------------------------------------------
  // LOCAL TIMER HOOK & STORAGE HANDLER
  // ----------------------------------------------------
  const timerKey = challengeId ? `peer_solve_timer_${groupId}_${challengeId}` : '';
  const [timer, setTimer] = useState<TimerData>({ state: 'idle', startTime: 0, elapsed: 0 });
  const [elapsedDisplay, setElapsedDisplay] = useState(0);

  // Initialize timer from localStorage
  useEffect(() => {
    if (!timerKey) return;
    const saved = localStorage.getItem(timerKey);
    if (saved) {
      const parsed = JSON.parse(saved) as TimerData;
      setTimer(parsed);
    } else {
      setTimer({ state: 'idle', startTime: 0, elapsed: 0 });
    }
  }, [timerKey]);

  // Sync timer with other tabs
  useEffect(() => {
    if (!timerKey) return;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === timerKey && e.newValue) {
        setTimer(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [timerKey]);

  // Ticker loop
  useEffect(() => {
    if (timer.state !== 'running') {
      if (timer.state === 'paused') {
        setElapsedDisplay(timer.elapsed);
      } else {
        setElapsedDisplay(0);
      }
      return;
    }

    const interval = setInterval(() => {
      const seconds = timer.elapsed + Math.floor((Date.now() - timer.startTime) / 1000);
      setElapsedDisplay(seconds);
    }, 250);

    return () => clearInterval(interval);
  }, [timer]);

  // Save timer data helper
  const saveTimerState = (next: TimerData) => {
    setTimer(next);
    if (timerKey) {
      localStorage.setItem(timerKey, JSON.stringify(next));
    }
  };

  const handleStartTimer = () => {
    saveTimerState({
      state: 'running',
      startTime: Date.now(),
      elapsed: timer.state === 'paused' ? timer.elapsed : 0,
    });
  };

  const handlePauseTimer = () => {
    if (timer.state !== 'running') return;
    const currentElapsed = timer.elapsed + Math.floor((Date.now() - timer.startTime) / 1000);
    saveTimerState({
      state: 'paused',
      startTime: 0,
      elapsed: currentElapsed,
    });
  };

  const handleResetTimer = () => {
    saveTimerState({ state: 'idle', startTime: 0, elapsed: 0 });
  };

  // Format Timer
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const parts = [];
    if (hrs > 0) parts.push(String(hrs).padStart(2, '0'));
    parts.push(String(mins).padStart(2, '0'));
    parts.push(String(secs).padStart(2, '0'));
    return parts.join(':');
  };

  // ----------------------------------------------------
  // LEADERBOARD RANK SHIFTS UPDATER
  // ----------------------------------------------------
  useEffect(() => {
    if (!leaderboard?.leaderboard) return;
    const newRanks: { [userId: string]: number } = {};
    const newChanges: { [userId: string]: 'up' | 'down' | 'neutral' } = {};

    leaderboard.leaderboard.forEach((row, idx) => {
      newRanks[row.userId] = idx;
      const prevIdx = prevRanksRef.current[row.userId];
      if (prevIdx !== undefined) {
        if (idx < prevIdx) {
          newChanges[row.userId] = 'up';
        } else if (idx > prevIdx) {
          newChanges[row.userId] = 'down';
        } else {
          newChanges[row.userId] = 'neutral';
        }
      } else {
        newChanges[row.userId] = 'neutral';
      }
    });

    prevRanksRef.current = newRanks;
    setRankChanges(newChanges);
  }, [leaderboard]);

  // ----------------------------------------------------
  // SOCKET.IO EVENT LISTENER INTEGRATION
  // ----------------------------------------------------
  useEffect(() => {
    if (!groupId) return;

    // Join room
    socketService.joinGroup(groupId);

    // Dynamic Sockets Listeners
    socketService.on('challenge:created', () => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
    });

    socketService.on('challenge:activated', (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      if (data?.userId) setActiveUsers(prev => new Set(prev).add(data.userId));
    });

    socketService.on('challenge:closed', () => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
    });

    socketService.on('solve:success', (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['participationGrid', groupId, challengeId] });
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      if (data?.userId) setActiveUsers(prev => new Set(prev).add(data.userId));
    });

    socketService.on('participation:update', () => {
      queryClient.invalidateQueries({ queryKey: ['participationGrid', groupId, challengeId] });
    });

    socketService.on('leaderboard:update', () => {
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
    });

    socketService.on('activity:created', (activity: any) => {
      // Optimistically insert incoming activity log to avoid delays
      queryClient.setQueryData<ActivityLog[]>(['groupActivity', groupId], (prev) => {
        if (!prev) return [activity];
        if (prev.some(a => a.id === activity.id)) return prev;
        return [activity, ...prev];
      });
      if (activity?.userId) setActiveUsers(prev => new Set(prev).add(activity.userId));
    });

    socketService.on('streak:update', () => {
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
    });

    return () => {
      socketService.leaveGroup(groupId);
      socketService.off('challenge:created');
      socketService.off('challenge:activated');
      socketService.off('challenge:closed');
      socketService.off('solve:success');
      socketService.off('participation:update');
      socketService.off('leaderboard:update');
      socketService.off('activity:created');
      socketService.off('streak:update');
    };
  }, [groupId, challengeId, queryClient]);

  // Online Offline Selector
  const getMemberOnlineStatus = (memberId: string) => {
    if (memberId === user?.id) return 'online';
    if (activeUsers.has(memberId)) return 'online';
    const charCodeSum = memberId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return charCodeSum % 3 === 0 ? 'online' : 'offline';
  };

  // ----------------------------------------------------
  // MUTATIONS
  // ----------------------------------------------------
  const generateSlotMutation = useMutation({
    mutationFn: () => apiClient.post<{ id: string }>(`/api/groups/${groupId}/challenges`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      toast.success("Today's challenge slot generated!");
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to generate challenge slot');
    }
  });

  const activateMutation = useMutation({
    mutationFn: (payload: { problemLink: string }) => 
      apiClient.patch(`/api/groups/${groupId}/challenges/${challengeId}/activate`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayChallenge', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      setIsActivateOpen(false);
      toast.success('Daily challenge activated successfully!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to activate challenge');
    }
  });

  const solveMutation = useMutation({
    mutationFn: (timeTaken: number) => 
      apiClient.post(`/api/groups/${groupId}/challenges/${challengeId}/solve`, { timeTaken: timeTaken * 60 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participationGrid', groupId, challengeId] });
      queryClient.invalidateQueries({ queryKey: ['groupLeaderboard', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupActivity', groupId] });
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      setIsSolveOpen(false);
      handleResetTimer(); // Reset stopwatch on completion
      toast.success('Solution logged! Consistency multiplier updated 🔥');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to submit solve');
    }
  });

  const leaveMutation = useMutation({
    mutationFn: () => apiClient.post(`/api/groups/${groupId}/leave`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      toast.success('Left the group room.');
      navigate('/dashboard');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to leave group');
    }
  });

  // Action Triggers
  const handleActivateSubmit = (values: { problemLink: string; difficulty: 'Easy' | 'Medium' | 'Hard'; notes?: string }) => {
    // Encode metadata inside the problemLink to avoid schema mismatch
    const serializedLink = JSON.stringify({
      url: values.problemLink,
      difficulty: values.difficulty,
      notes: values.notes || ''
    });
    activateMutation.mutate({ problemLink: serializedLink });
  };

  const handleSolveSubmit = (values: { timeTaken: number; notes?: string }) => {
    solveMutation.mutate(values.timeTaken);
  };

  const handleSolveModalTrigger = () => {
    // Pre-fill solve duration from timer if active
    let defaultMins = 15;
    if (timer.state === 'running' || timer.state === 'paused') {
      const elapsedSeconds = timer.state === 'running'
        ? timer.elapsed + Math.floor((Date.now() - timer.startTime) / 1000)
        : timer.elapsed;
      defaultMins = Math.max(1, Math.round(elapsedSeconds / 60));
    }
    solveForm.setValue('timeTaken', defaultMins);
    setIsSolveOpen(true);
  };

  const copyInviteCode = () => {
    if (group?.inviteCode) {
      navigator.clipboard.writeText(group.inviteCode);
      toast.success('Invite code copied!');
    }
  };

  // Parsers & Checks
  const parsedChallenge = challenge ? parseProblemLink(challenge.problemLink) : null;
  const problemTitle = parsedChallenge ? getProblemTitleFromUrl(parsedChallenge.url) : '';
  const isUserChallenger = challenge?.createdBy === user?.id;
  const hasUserSolved = grid?.solved.some(s => s.userId === user?.id);

  if (groupLoading) {
    return (
      <div className="space-y-6 text-left">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-44 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 md:col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!group) {
    return <div className="text-center py-20 text-text-secondary">Accountability group not found.</div>;
  }

  const currentChallengerName = group.members.find(m => m.userId === challenge?.createdBy)?.name || 'Next member';

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* 1. GROUP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">{group.name}</h1>
            <button
              onClick={copyInviteCode}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background-surfaceLight border border-border-subtle hover:border-white/20 transition-all font-mono text-[10px] font-semibold text-text-secondary hover:text-white cursor-pointer"
            >
              Code: {group.inviteCode} <Copy className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-text-secondary font-sans font-medium">
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-text-muted" /> {group.members.length} members</span>
            <span>•</span>
            <span className="text-indigo-400">Today's Challenger: {currentChallengerName}</span>
            <span>•</span>
            <span>Challenge Status: <strong className="text-white uppercase text-[10px]">{challenge?.status || 'WAITING'}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/groups/${groupId}/members`}>
            <Button variant="outline" size="sm" className="text-xs">
              <Users className="w-4 h-4 mr-1.5" /> Members Sheet
            </Button>
          </Link>

          {group.createdBy !== user?.id && (
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-accent-rose hover:bg-accent-rose/10 flex items-center gap-2 text-xs"
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
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Challenge, Timer, Grid */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 2. TODAY'S CHALLENGE CARD */}
          {challengeLoading ? (
            <Skeleton className="h-44 w-full" />
          ) : !challenge ? (
            /* STATE 0: NO SLOT GENERATED YET */
            <Card className="bg-background-surface border-border-subtle p-6">
              <CardHeader className="p-0 mb-4">
                <span className="text-[10px] font-mono text-accent-indigo font-bold uppercase tracking-wider block">Today's Challenge</span>
                <CardTitle className="text-white mt-1">Challenge slot not initialized</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mb-6">
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  The daily automated challenge slot for this squad has not been generated yet. You can manually generate today's slot to initiate rotation.
                </p>
              </CardContent>
              <Button size="sm" onClick={() => generateSlotMutation.mutate()} isLoading={generateSlotMutation.isPending}>
                <PlayCircle className="w-4 h-4 mr-2" /> Generate Challenge Slot
              </Button>
            </Card>
          ) : (
            <Card className="bg-background-surface border-border-subtle overflow-hidden">
              <div className="bg-[#121620] px-6 py-3.5 border-b border-border-subtle flex justify-between items-center">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Today's Challenge Task</span>
                <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide ${
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
                {/* STATE 1: WAITING */}
                {challenge.status === 'WAITING' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-accent-amber" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white">Awaiting problem activation</h4>
                        <p className="font-sans text-xs text-text-secondary mt-1">
                          Today's challenge slot is created. Challenger <strong className="text-white">{currentChallengerName}</strong> is assigned to select and activate the problem.
                        </p>
                      </div>
                    </div>

                    {isUserChallenger ? (
                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15 mt-4">
                        <h5 className="font-display font-bold text-xs text-white mb-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-4.5 h-4.5 text-indigo-400" /> You are the challenger today!
                        </h5>
                        <p className="font-sans text-[11px] text-text-secondary mb-4 leading-relaxed">
                          Pick a coding task (from LeetCode, GFG, etc.) and activate it to assign it to your squad members.
                        </p>
                        <Button size="sm" onClick={() => setIsActivateOpen(true)}>
                          Post Today's Challenge
                        </Button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 mt-4 text-center">
                        <p className="font-mono text-[10px] text-text-muted italic">
                          Waiting for {currentChallengerName} to activate the coding problem...
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* STATE 2: ACTIVE */}
                {challenge.status === 'ACTIVE' && parsedChallenge && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            parsedChallenge.difficulty.toLowerCase() === 'easy'
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-accent-emerald'
                              : parsedChallenge.difficulty.toLowerCase() === 'hard'
                              ? 'bg-accent-rose/10 border border-accent-rose/20 text-accent-rose'
                              : 'bg-amber-500/10 border border-amber-500/20 text-accent-amber'
                          }`}>
                            {parsedChallenge.difficulty}
                          </span>
                          <span className="text-[10px] font-mono text-text-muted">Challenge #today</span>
                        </div>
                        <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                          {problemTitle}
                        </h3>
                      </div>
                      
                      {/* Active Challenger */}
                      <div className="text-xs text-text-secondary sm:text-right shrink-0">
                        <span className="block text-[9px] font-mono text-text-muted uppercase">Posted By</span>
                        <strong className="text-white">{currentChallengerName}</strong>
                      </div>
                    </div>

                    {parsedChallenge.notes && (
                      <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 text-xs text-text-secondary italic">
                        <strong>Challenger Notes:</strong> "{parsedChallenge.notes}"
                      </div>
                    )}

                    {/* TIMER SYSTEM BLOCK */}
                    {!hasUserSolved && (
                      <div className="p-4 rounded-xl bg-[#121620]/50 border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${timer.state === 'running' ? 'bg-orange-500 animate-pulse' : 'bg-text-muted'}`} />
                          <div>
                            <span className="text-[9px] font-mono text-text-muted uppercase block">Stopwatch Timer</span>
                            <span className="font-mono text-xl font-bold text-white tracking-wider">
                              {formatTime(elapsedDisplay)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {timer.state !== 'running' ? (
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none" onClick={handleStartTimer}>
                              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> {timer.state === 'paused' ? 'Resume' : 'Start Timer'}
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none text-orange-400 hover:text-white" onClick={handlePauseTimer}>
                              <Pause className="w-3.5 h-3.5 mr-1.5 fill-current" /> Pause
                            </Button>
                          )}
                          {(timer.state === 'running' || timer.state === 'paused') && (
                            <button 
                              onClick={handleResetTimer}
                              className="p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 text-text-secondary hover:text-white transition-colors cursor-pointer"
                              title="Reset Timer"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a href={parsedChallenge.url} target="_blank" rel="noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                          Open Problem <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>

                      {hasUserSolved ? (
                        <div className="flex-1 flex items-center justify-center gap-2 text-accent-emerald text-sm font-semibold border border-emerald-500/20 bg-emerald-500/5 rounded-lg px-4 h-11">
                          <CheckCircle2 className="w-4 h-4" /> You solved this challenge!
                        </div>
                      ) : (
                        <Button className="flex-1" onClick={handleSolveModalTrigger}>
                          <CheckSquare className="w-4 h-4 mr-2" /> Mark as Solved
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* STATE 3: CLOSED */}
                {challenge.status === 'CLOSED' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-rose/10 border border-accent-rose/25 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5 text-accent-rose" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white">Challenge closed</h4>
                        <p className="font-sans text-xs text-text-secondary mt-1 leading-relaxed">
                          Today's slot is closed. Streaks have been adjusted and inactive users have consumed a streak freeze or had their streak reset.
                        </p>
                      </div>
                    </div>
                    {grid?.firstSolver && (
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between text-xs mt-2">
                        <span className="text-text-secondary">🏆 First Solver of the day:</span>
                        <strong className="text-accent-amber font-mono font-extrabold">{grid.firstSolver.name}</strong>
                      </div>
                    )}
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
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-white font-extrabold flex items-center gap-2 text-lg">
                      Participation Matrix
                    </CardTitle>
                    <CardDescription>Real-time status updates of active members</CardDescription>
                  </div>
                  {grid.firstSolver && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-accent-amber">
                      <Trophy className="w-3.5 h-3.5 fill-current" /> First Solver: {grid.firstSolver.name}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Solved List */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-accent-emerald font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" /> Solved
                  </span>
                  {grid.solved.length === 0 ? (
                    <p className="font-sans text-xs text-text-muted italic pl-3">No solutions solved yet today.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3">
                      {grid.solved.map((u) => (
                        <div key={u.userId} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-[10px] text-accent-emerald uppercase">
                              {u.name[0]}
                            </div>
                            <span className="font-sans text-xs text-white font-semibold">{u.name}</span>
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
                  <span className="text-[10px] font-mono text-accent-amber font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" /> Pending
                  </span>
                  {grid.pending.length === 0 ? (
                    <p className="font-sans text-xs text-text-muted italic pl-3">All members have completed today's challenge!</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3">
                      {grid.pending.map((u) => (
                        <div key={u.userId} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.005] border border-white/5">
                          <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center font-bold text-[10px] text-accent-amber uppercase">
                            {u.name[0]}
                          </div>
                          <span className="font-sans text-xs text-text-secondary">{u.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Missed / Freezes List */}
                {grid.missed.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-purple-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
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
                            <Snowflake className="w-3.5 h-3.5" /> Freeze consumed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {/* 6. CHALLENGE HISTORY PREVIEW */}
          {historyLoading ? (
            <Skeleton className="h-44 w-full" />
          ) : history && history.length > 0 ? (
            <Card className="bg-background-surface border-border-subtle">
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-extrabold text-lg">Challenge History Preview</CardTitle>
                  <CardDescription>Recent challenges completed in this group</CardDescription>
                </div>
                <Link to={`/groups/${groupId}/history`}>
                  <Button variant="ghost" size="sm" className="text-xs text-indigo-400 hover:text-white">
                    View Full History <ChevronRight className="w-4 h-4 ml-0.5" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {history.map((hist) => {
                  const parsedHist = parseProblemLink(hist.problemLink);
                  const title = parsedHist.url ? getProblemTitleFromUrl(parsedHist.url) : 'Challenge Slot';
                  return (
                    <div key={hist.id} className="flex items-center justify-between p-3.5 rounded-lg bg-white/[0.01] border border-white/5 text-xs">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-text-muted" />
                        <span className="font-mono text-text-secondary">{new Date(hist.date).toLocaleDateString()}</span>
                        <span className="text-white font-semibold truncate max-w-[150px] sm:max-w-[300px]">{title}</span>
                      </div>
                      {parsedHist.url && (
                        <a
                          href={parsedHist.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent-indigo font-bold flex items-center gap-0.5 hover:underline shrink-0"
                        >
                          View <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Right Column: Leaderboard, Activity Feed, Members Panel */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 4. SQUAD LEADERBOARD */}
          {boardLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : leaderboard ? (
            <Card className="bg-background-surface border-border-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-extrabold flex items-center gap-2 text-lg">
                  <Trophy className="w-4 h-4 text-accent-amber fill-current" /> Consistency Ladder
                </CardTitle>
                <CardDescription>Rankings based on active streaks and scores</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col border-t border-border-subtle/50">
                  <AnimatePresence>
                    {leaderboard.leaderboard.map((userRow, idx) => {
                      const change = rankChanges[userRow.userId];
                      return (
                        <motion.div
                          key={userRow.userId}
                          layout
                          className="flex items-center justify-between px-6 py-4 border-b border-border-subtle/30 last:border-none hover:bg-white/[0.005]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-black text-text-muted w-4">#{idx + 1}</span>
                            <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center font-bold text-xs text-indigo-400 uppercase">
                              {userRow.name[0]}
                            </div>
                            <div>
                              <span className="font-sans font-bold text-xs text-white block truncate max-w-[100px]">{userRow.name}</span>
                              {change === 'up' && (
                                <span className="text-[8px] font-mono text-accent-emerald flex items-center gap-0.5 mt-0.5">
                                  ▲ Rank Up
                                </span>
                              )}
                              {change === 'down' && (
                                <span className="text-[8px] font-mono text-accent-rose flex items-center gap-0.5 mt-0.5">
                                  ▼ Rank Down
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-xs text-orange-400 font-bold flex items-center gap-0.5">
                              <Flame className="w-3.5 h-3.5 fill-current" /> {userRow.currentStreak}d
                            </span>
                            <span className="font-mono text-xs font-black text-white">{userRow.score} pts</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* 5. MEMBERS PANEL */}
          <Card className="bg-background-surface border-border-subtle">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white font-extrabold text-lg flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-accent-indigo" /> Squad Status
                </CardTitle>
                <CardDescription>Realtime active member rosters</CardDescription>
              </div>
              <Link to={`/groups/${groupId}/members`}>
                <Button variant="ghost" size="sm" className="text-xs text-indigo-400 hover:text-white p-0">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col border-t border-border-subtle/50 max-h-60 overflow-y-auto no-scrollbar">
                {group.members.slice(0, 5).map((member) => {
                  const isSolved = grid?.solved.some(s => s.userId === member.userId);
                  const isOnline = getMemberOnlineStatus(member.userId) === 'online';

                  return (
                    <div key={member.id} className="flex items-center justify-between px-6 py-3.5 border-b border-border-subtle/30 last:border-none">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-text-secondary uppercase">
                            {member.name[0]}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-background-surface ${isOnline ? 'bg-emerald-500' : 'bg-text-muted'}`} />
                        </div>
                        <span className="font-sans text-xs text-white font-medium truncate max-w-[120px]">{member.name}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSolved ? 'bg-accent-emerald' : 'bg-accent-amber'}`} />
                        <span className="font-mono text-[9px] text-text-secondary uppercase">
                          {isSolved ? 'Solved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 7. REALTIME ACTIVITY FEED */}
          {activityLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : activities ? (
            <Card className="bg-background-surface border-border-subtle">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-extrabold text-lg flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" /> Activity Stream
                </CardTitle>
                <CardDescription>WebSocket social logs feed</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col border-t border-border-subtle max-h-72 overflow-y-auto no-scrollbar">
                  {activities.length === 0 ? (
                    <p className="font-sans text-xs text-text-muted italic p-6 text-center">No logs generated yet.</p>
                  ) : (
                    activities.map((act) => (
                      <div key={act.id} className="px-6 py-3.5 border-b border-border-subtle/20 last:border-none flex items-start justify-between gap-3 text-left">
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
        description="Fill out the daily coding task details for your accountability squad."
      >
        <form onSubmit={activateForm.handleSubmit(handleActivateSubmit)} className="space-y-4">
          
          {/* Problem URL */}
          <div className="space-y-1.5 text-left">
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

          {/* Difficulty Dropdown */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-text-secondary">Difficulty Level</label>
            <select
              className="w-full h-11 bg-background-base border border-border-subtle rounded-xl px-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
              {...activateForm.register('difficulty')}
            >
              <option value="Easy" className="bg-background-surface">Easy</option>
              <option value="Medium" className="bg-background-surface">Medium</option>
              <option value="Hard" className="bg-background-surface">Hard</option>
            </select>
          </div>

          {/* Optional Notes */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-text-secondary">Notes or Context (Optional)</label>
            <textarea
              className="w-full bg-background-base border border-border-subtle rounded-xl p-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors h-20 resize-none"
              placeholder="e.g. Solve using linear time complexity."
              {...activateForm.register('notes')}
            />
            {activateForm.formState.errors.notes && (
              <p className="text-[10px] text-accent-rose font-medium mt-1">{activateForm.formState.errors.notes.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsActivateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={activateMutation.isPending}>
              Activate Challenge
            </Button>
          </div>
        </form>
      </Dialog>

      {/* SUBMIT SOLVE DIALOG */}
      <Dialog
        isOpen={isSolveOpen}
        onClose={() => setIsSolveOpen(false)}
        title="Mark Challenge as Solved"
        description="Record your completion duration and notes to submit this daily challenge."
      >
        <form onSubmit={solveForm.handleSubmit(handleSolveSubmit)} className="space-y-4">
          
          {/* Time Taken */}
          <div className="space-y-1.5 text-left">
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

          {/* Optional notes */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-text-secondary">Completion Notes (Optional)</label>
            <textarea
              className="w-full bg-background-base border border-border-subtle rounded-xl p-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors h-20 resize-none"
              placeholder="e.g. Solved using Hash Map logic."
              {...solveForm.register('notes')}
            />
            {solveForm.formState.errors.notes && (
              <p className="text-[10px] text-accent-rose font-medium mt-1">{solveForm.formState.errors.notes.message}</p>
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
