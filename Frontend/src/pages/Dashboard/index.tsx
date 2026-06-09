import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Flame, Snowflake, Users, Plus, UserCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Dialog } from '../../components/ui/Dialog';
import { Skeleton } from '../../components/ui/Skeleton';
import { apiClient } from '../../services/api/api.client';
import { toast } from 'sonner';

interface GroupStats {
  currentStreak: number;
  longestStreak: number;
  totalSolved: number;
  last7DaysSolved: number;
  last30DaysSolved: number;
  freezeCount: number;
  lastSolvedDate: string | null;
}

interface GroupItem {
  id: string;
  name: string;
  inviteCode: string;
  memberCount: number;
  stats: GroupStats;
}

const createGroupSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters'),
});

const joinGroupSchema = z.object({
  inviteCode: z.string().length(6, 'Invite code must be exactly 6 characters'),
});

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  // React Query: Fetch user groups list
  const { data: groups, isLoading, error } = useQuery<GroupItem[]>({
    queryKey: ['userGroups'],
    queryFn: () => apiClient.get<GroupItem[]>('/api/groups'),
  });

  // Create Group Mutation
  const createMutation = useMutation({
    mutationFn: (name: string) => apiClient.post<GroupItem>('/api/groups', { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      setIsCreateOpen(false);
      toast.success('Accountability group created!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to create group');
    },
  });

  // Join Group Mutation
  const joinMutation = useMutation({
    mutationFn: (inviteCode: string) => apiClient.post('/api/groups/join', { inviteCode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      setIsJoinOpen(false);
      toast.success('Successfully joined the group!');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to join group');
    },
  });

  // Forms
  const createForm = useForm<{ name: string }>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: { name: '' },
  });

  const joinForm = useForm<{ inviteCode: string }>({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: { inviteCode: '' },
  });

  const onCreateSubmit = (values: { name: string }) => {
    createMutation.mutate(values.name);
  };

  const onJoinSubmit = (values: { inviteCode: string }) => {
    joinMutation.mutate(values.inviteCode);
  };

  // Stats summaries across all groups
  const totalStreaks = groups?.reduce((acc, g) => acc + g.stats.currentStreak, 0) || 0;
  const totalSolved = groups?.reduce((acc, g) => acc + g.stats.totalSolved, 0) || 0;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle pb-6 text-left">
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">Your Dashboard</h1>
          <p className="font-sans text-xs md:text-sm text-text-secondary mt-1">Consistency dashboard: Track progress across your accountability squads</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2" onClick={() => setIsJoinOpen(true)}>
            <UserCheck className="w-4 h-4" /> Join Group
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4" /> Create Group
          </Button>
        </div>
      </div>

      {/* API / Network Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/25 text-accent-rose text-sm flex gap-3 text-left">
          <Info className="w-5 h-5 shrink-0" />
          <div>
            <h4 className="font-bold">Dashboard Sync Error</h4>
            <p className="text-xs text-rose-300 mt-1">{(error as any).message || 'Failed to synchronize dashboard stats.'}</p>
          </div>
        </div>
      )}

      {/* Quick Stats Summary (Overall across all groups) */}
      {!isLoading && groups && groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-background-surface">
            <CardHeader className="pb-2 text-left flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">Cumulative Streaks</span>
                <CardTitle className="text-2xl mt-1 text-white">{totalStreaks} Days</CardTitle>
              </div>
              <Flame className="w-8 h-8 text-orange-500 fill-current" />
            </CardHeader>
          </Card>

          <Card className="bg-background-surface">
            <CardHeader className="pb-2 text-left flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">Total Solutions Solved</span>
                <CardTitle className="text-2xl mt-1 text-white">{totalSolved} Problems</CardTitle>
              </div>
              <CheckCircle2 className="w-8 h-8 text-accent-emerald" />
            </CardHeader>
          </Card>

          <Card className="bg-background-surface">
            <CardHeader className="pb-2 text-left flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">Total Groups</span>
                <CardTitle className="text-2xl mt-1 text-white">{groups.length} active</CardTitle>
              </div>
              <Users className="w-8 h-8 text-accent-indigo" />
            </CardHeader>
          </Card>
        </div>
      )}

      {/* Skeletons Loading View */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="bg-background-surface h-56 flex flex-col justify-between p-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Groups Grid */}
      {!isLoading && groups && (
        groups.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-12 md:p-20 border border-dashed border-border-subtle rounded-2xl bg-white/[0.005] max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-white mb-2">No Accountability Groups</h3>
            <p className="font-sans text-xs text-text-secondary mb-8 leading-relaxed text-center">
              You haven't joined any accountability groups yet! Join a group using an invite code or create a new one to begin your consistency journey.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsJoinOpen(true)}>
                Join a Group
              </Button>
              <Button size="sm" onClick={() => setIsCreateOpen(true)}>
                Create a Group
              </Button>
            </div>
          </div>
        ) : (
          /* Actual Groups Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="bg-background-surface hover:border-white/10 transition-colors flex flex-col justify-between text-left">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white font-extrabold">{group.name}</CardTitle>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-400">
                      Invite Code: {group.inviteCode}
                    </span>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Users className="w-3.5 h-3.5" /> {group.memberCount} squad {group.memberCount === 1 ? 'member' : 'members'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4 border-b border-border-subtle/50">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-text-muted uppercase">Active Streak</span>
                      <span className="font-mono text-sm font-bold text-orange-400 flex items-center gap-0.5">
                        <Flame className="w-3.5 h-3.5 fill-current" /> {group.stats.currentStreak}d
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-text-muted uppercase">Longest Streak</span>
                      <span className="font-mono text-sm font-bold text-white">
                        {group.stats.longestStreak}d
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-text-muted uppercase">Freezes left</span>
                      <div className="flex items-center gap-1 group/tooltip relative cursor-help mt-1 font-mono text-sm font-bold text-purple-400">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <span key={i} className="text-xs">
                            {i < group.stats.freezeCount ? '❄️' : '⚫'}
                          </span>
                        ))}
                        {/* Custom Tooltip */}
                        <span className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-48 p-2 rounded-lg bg-black border border-border-subtle text-[10px] text-text-secondary font-sans font-normal pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-all z-20 text-center leading-normal shadow-glow">
                          Missing a day consumes one freeze and protects your streak.
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="py-4 justify-between bg-[#121620]/30">
                  <span className="font-mono text-[9px] text-text-muted">Total Solved: {group.stats.totalSolved}</span>
                  <Link to={`/groups/${group.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 pr-1.5 text-xs text-indigo-400 hover:text-white">
                      Enter Room <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )
      )}

      {/* CREATE GROUP DIALOG */}
      <Dialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Accountability Group"
        description="Launch a private squad room and invite friends to stay consistent together."
      >
        <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">Squad/Group Name</label>
            <Input
              type="text"
              placeholder="e.g. DSA Consistency Squad"
              error={!!createForm.formState.errors.name}
              {...createForm.register('name')}
            />
            {createForm.formState.errors.name && (
              <p className="text-[10px] text-accent-rose font-medium mt-1">{createForm.formState.errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={createMutation.isPending}>
              Create Group
            </Button>
          </div>
        </form>
      </Dialog>

      {/* JOIN GROUP DIALOG */}
      <Dialog
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Join Accountability Group"
        description="Enter the 6-character invite code shared by your squad members."
      >
        <form onSubmit={joinForm.handleSubmit(onJoinSubmit)} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">Invite Code</label>
            <Input
              type="text"
              placeholder="e.g. AX94QP"
              className="uppercase font-mono tracking-widest text-center text-sm"
              error={!!joinForm.formState.errors.inviteCode}
              maxLength={6}
              {...joinForm.register('inviteCode')}
            />
            {joinForm.formState.errors.inviteCode && (
              <p className="text-[10px] text-accent-rose font-medium mt-1">{joinForm.formState.errors.inviteCode.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsJoinOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={joinMutation.isPending}>
              Join Group
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
