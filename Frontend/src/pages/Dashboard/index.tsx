import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Flame, Users, Plus, UserCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';
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

  // React Query: Fetch user active days
  const { data: activityDates, isLoading: activityLoading } = useQuery<string[]>({
    queryKey: ['userActivity'],
    queryFn: () => apiClient.get<string[]>('/api/auth/activity'),
  });

  const [activeTooltip, setActiveTooltip] = useState<{
    dateStr: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Generate calendar weeks and days for the last 365 days
  const weeks = useMemo(() => {
    if (!activityDates) return [];

    const datesMap: { [dateStr: string]: number } = {};
    activityDates.forEach((dateStr) => {
      const key = dateStr.split('T')[0];
      datesMap[key] = (datesMap[key] || 0) + 1;
    });

    const today = new Date();
    const yearAgo = new Date();
    yearAgo.setDate(today.getDate() - 364);

    const startOffset = yearAgo.getDay();
    const startDate = new Date(yearAgo);
    startDate.setDate(startDate.getDate() - startOffset);

    const totalDays = 365 + startOffset;
    const computedWeeks: any[][] = [];
    let currentWeek: any[] = [];

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const count = datesMap[dateStr] || 0;

      currentWeek.push({
        date: d,
        dateStr,
        count,
      });

      if (currentWeek.length === 7) {
        computedWeeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      computedWeeks.push(currentWeek);
    }
    return computedWeeks;
  }, [activityDates]);

  // Compute month labels aligned with grid columns
  const monthLabels = useMemo(() => {
    const labels: { label: string; colIdx: number }[] = [];
    weeks.forEach((week, colIdx) => {
      const firstDay = week[0]?.date;
      if (firstDay) {
        const monthName = firstDay.toLocaleString('default', { month: 'short' });
        if (labels.length === 0 || labels[labels.length - 1].label !== monthName) {
          labels.push({ label: monthName, colIdx });
        }
      }
    });
    return labels;
  }, [weeks]);

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

      {/* 2. CONTRIBUTION CALENDAR CARD */}
      {activityLoading ? (
        <Card className="bg-background-surface border-border-subtle p-6">
          <Skeleton className="h-44 w-full animate-pulse" />
        </Card>
      ) : (
        activityDates && (
          <Card className="bg-background-surface border-border-subtle p-6 relative overflow-hidden text-left">
            <CardHeader className="pb-4 p-0 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-base font-extrabold">Consistency Calendar</CardTitle>
                <CardDescription className="text-[11px] text-text-secondary mt-0.5">
                  Your daily solve activity over the last 365 days
                </CardDescription>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-white/[0.02] border border-white/5" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/15 border border-emerald-500/25" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/35 border border-emerald-500/45" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/60 border border-emerald-500/70" />
                <span>More</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-4 overflow-x-auto min-w-full custom-scrollbar relative">
              <div className="flex gap-3 items-start min-w-[760px] pb-2">
                {/* Weekday Labels Column */}
                <div className="grid grid-rows-7 gap-[3px] text-[9px] font-mono text-text-muted select-none pt-[16px] pr-1.5 w-6 text-right shrink-0 leading-[10px]">
                  <div></div>
                  <div>Mon</div>
                  <div></div>
                  <div>Wed</div>
                  <div></div>
                  <div>Fri</div>
                  <div></div>
                </div>

                {/* Grid Column Container */}
                <div className="flex-1 space-y-1 relative">
                  {/* Month Labels row */}
                  <div className="h-4 relative text-[9px] font-mono text-text-muted select-none w-full">
                    {monthLabels.map((lbl: any, idx: number) => (
                      <span
                        key={idx}
                        className="absolute"
                        style={{ left: `${(lbl.colIdx * 13.5)}px` }}
                      >
                        {lbl.label}
                      </span>
                    ))}
                  </div>

                  {/* Contribution Squares Grid */}
                  <div className="flex gap-[3.5px]">
                    {weeks.map((week: any[], colIdx: number) => (
                      <div key={colIdx} className="grid grid-rows-7 gap-[3px] shrink-0">
                        {week.map((day: any, rowIdx: number) => {
                          const intensityClass =
                            day.count === 0
                              ? 'bg-white/[0.02] border-white/5'
                              : day.count === 1
                              ? 'bg-emerald-500/15 border-emerald-500/25'
                              : day.count === 2
                              ? 'bg-emerald-500/35 border-emerald-500/45'
                              : 'bg-emerald-500/60 border-emerald-500/70';

                          return (
                            <div
                              key={rowIdx}
                              className={`w-[10px] h-[10px] rounded-[2px] border transition-all hover:scale-125 hover:border-indigo-500 cursor-pointer ${intensityClass}`}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const parentRect = e.currentTarget.offsetParent?.getBoundingClientRect();
                                setActiveTooltip({
                                  dateStr: day.dateStr,
                                  count: day.count,
                                  x: rect.left - (parentRect?.left || 0) + rect.width / 2,
                                  y: rect.top - (parentRect?.top || 0) - 34,
                                });
                              }}
                              onMouseLeave={() => setActiveTooltip(null)}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Custom Tooltip */}
              {activeTooltip && (
                <div
                  className="absolute z-30 px-2.5 py-1.5 rounded-lg bg-[#0e121a]/95 border border-border-subtle text-[10px] text-white font-sans font-medium pointer-events-none transition-all shadow-glow -translate-x-1/2"
                  style={{ left: activeTooltip.x, top: activeTooltip.y }}
                >
                  <span className="font-bold text-emerald-400">
                    {activeTooltip.count} {activeTooltip.count === 1 ? 'problem' : 'problems'} solved
                  </span>{' '}
                  on {new Date(activeTooltip.dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </CardContent>
          </Card>
        )
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
