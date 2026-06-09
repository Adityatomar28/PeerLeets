import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Users, Flame, Award, Calendar, Shield, Mail, CheckCircle2, Trophy, Search, ArrowUpDown } from 'lucide-react';
import { apiClient } from '../../services/api/api.client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Skeleton } from '../../components/ui/Skeleton';

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

type SortField = 'name' | 'joinedAt' | 'streak' | 'solves' | 'points';

export default function GroupMembersPage() {
  const { groupId } = useParams<{ groupId: string }>();

  // Filter & Sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('points');

  // Fetch group details
  const { data: group, isLoading: groupLoading } = useQuery<GroupDetails>({
    queryKey: ['groupDetails', groupId],
    queryFn: () => apiClient.get<GroupDetails>(`/api/groups/${groupId}`),
    enabled: !!groupId,
  });

  // Fetch leaderboard to merge stats
  const { data: leaderboard, isLoading: boardLoading } = useQuery<LeaderboardResponse>({
    queryKey: ['groupLeaderboard', groupId],
    queryFn: () => apiClient.get<LeaderboardResponse>(`/api/groups/${groupId}/leaderboard`),
    enabled: !!groupId,
  });

  const isLoading = groupLoading || boardLoading;

  // Merge group membership and leaderboard statistics
  const membersWithStats = useMemo(() => {
    if (!group) return [];

    const statsMap = new Map<string, LeaderboardUser>();
    leaderboard?.leaderboard.forEach((user) => {
      statsMap.set(user.userId, user);
    });

    return group.members.map((member) => {
      const stats = statsMap.get(member.userId);
      return {
        ...member,
        currentStreak: stats?.currentStreak || 0,
        longestStreak: stats?.longestStreak || 0,
        totalSolved: stats?.totalSolved || 0,
        score: stats?.score || 0,
      };
    });
  }, [group, leaderboard]);

  // Process Search & Sort
  const processedMembers = useMemo(() => {
    // 1. Search filter
    const filtered = membersWithStats.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Sort
    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'joinedAt') {
        return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
      }
      if (sortBy === 'streak') {
        return b.currentStreak - a.currentStreak;
      }
      if (sortBy === 'solves') {
        return b.totalSolved - a.totalSolved;
      }
      if (sortBy === 'points') {
        return b.score - a.score;
      }
      return 0;
    });
  }, [membersWithStats, searchTerm, sortBy]);

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <Skeleton className="w-24 h-8" />
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>
      </div>
    );
  }

  if (!group) {
    return <div className="text-center py-20 text-text-secondary">Group not found.</div>;
  }

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Back to Room */}
      <div>
        <Link to={`/groups/${groupId}`}>
          <Button variant="ghost" size="sm" className="gap-2 text-text-secondary hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Group Room
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">Squad Directory</h1>
          <p className="font-sans text-xs md:text-sm text-text-secondary mt-1">
            Active accountability members and streaks tracking for <strong className="text-white">{group.name}</strong>
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-bold uppercase shrink-0">
          <Users className="w-4 h-4" /> {group.members.length} Members
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            type="text"
            placeholder="Search members by name/email..."
            className="pl-10 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
          <ArrowUpDown className="w-4 h-4 text-text-muted hidden sm:block" />
          <select
            className="h-11 bg-background-surface border border-border-subtle rounded-xl px-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors w-full sm:w-44"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
          >
            <option value="points">Sort by Points</option>
            <option value="name">Sort by Name</option>
            <option value="joinedAt">Sort by Date Joined</option>
            <option value="streak">Sort by Current Streak</option>
            <option value="solves">Sort by Total Solves</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {processedMembers.length === 0 ? (
        <Card className="bg-background-surface border-border-subtle p-16 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-text-muted" />
          </div>
          <h3 className="font-display font-extrabold text-base text-white mb-2">No Members Found</h3>
          <p className="font-sans text-xs text-text-secondary mb-4 leading-relaxed">
            We couldn't find any squad members matching your search filters.
          </p>
        </Card>
      ) : (
        /* Members list grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processedMembers.map((member) => {
            const isCreator = group.createdBy === member.userId;

            return (
              <Card key={member.id} className="bg-background-surface border-border-subtle hover:border-white/10 transition-all text-left flex flex-col justify-between overflow-hidden relative">
                {/* Visual Top Bar Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/50 to-violet-500/50" />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar initials */}
                      <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center font-display font-black text-sm text-indigo-400 uppercase shrink-0 shadow-lg">
                        {member.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-white font-extrabold text-sm flex items-center gap-1.5">
                          {member.name}
                          {isCreator && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-semibold text-accent-amber font-mono">
                              <Shield className="w-2.5 h-2.5" /> Founder
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1.5 mt-0.5 font-mono text-[10px]">
                          <Mail className="w-3.5 h-3.5 text-text-muted" /> {member.email}
                        </CardDescription>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase font-mono ${
                      member.role === 'ADMIN'
                        ? 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
                        : 'bg-white/5 border border-white/10 text-text-secondary'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                </CardHeader>

                {/* Stats */}
                <CardContent className="pb-4 border-b border-border-subtle/50">
                  <div className="grid grid-cols-3 gap-2 text-center sm:text-left">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-text-muted uppercase">Active Streak</span>
                      <span className="font-mono text-sm font-black text-orange-400 flex items-center gap-0.5 justify-center sm:justify-start">
                        <Flame className="w-3.5 h-3.5 fill-current" /> {member.currentStreak}d
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-text-muted uppercase">Max Streak</span>
                      <span className="font-mono text-sm font-black text-accent-amber flex items-center gap-0.5 justify-center sm:justify-start">
                        <Award className="w-3.5 h-3.5 fill-current" /> {member.longestStreak}d
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-text-muted uppercase">Total Solved</span>
                      <span className="font-mono text-sm font-black text-accent-emerald flex items-center gap-0.5 justify-center sm:justify-start">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {member.totalSolved}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Footer */}
                <div className="px-6 py-3.5 bg-[#121620]/30 flex justify-between items-center text-[10px] text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-text-muted" /> Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </span>
                  <span className="font-mono font-bold text-white flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-accent-amber fill-current" /> {member.score} points
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
