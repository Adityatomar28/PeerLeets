import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Flame, Users, CheckCircle2, Info, CalendarDays, Zap, Swords } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { apiClient } from '../../services/api/api.client';

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

interface ActivityDay {
  date: Date;
  dateStr: string;
  count: number;
}

export default function Dashboard() {
  const { data: groups, isLoading, error } = useQuery<GroupItem[]>({
    queryKey: ['userGroups'],
    queryFn: () => apiClient.get<GroupItem[]>('/api/groups'),
  });

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
    const computedWeeks: ActivityDay[][] = [];
    let currentWeek: ActivityDay[] = [];

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const count = datesMap[dateStr] || 0;

      currentWeek.push({ date: d, dateStr, count });

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

  const totalStreaks = groups?.reduce((acc, g) => acc + g.stats.currentStreak, 0) || 0;
  const totalSolved = groups?.reduce((acc, g) => acc + g.stats.totalSolved, 0) || 0;

  const summaryStats = [
    { label: 'Cumulative Streaks', value: `${totalStreaks} days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/15' },
    { label: 'Total Solved', value: `${totalSolved} problems`, icon: CheckCircle2, color: 'text-accent-emerald', bg: 'bg-emerald-500/10 border-emerald-500/15' },
    { label: 'Active Groups', value: `${groups?.length || 0} squads`, icon: Users, color: 'text-accent-indigo', bg: 'bg-indigo-500/10 border-indigo-500/15' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="profile-hero p-6 md:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="workspace-eyebrow flex items-center gap-1.5 mb-2">
              <Zap className="w-3 h-3 text-indigo-400" /> Consistency Hub
            </p>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl page-title-gradient">
              Your Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-2 max-w-lg leading-relaxed">
              Track progress, maintain streaks, and stay accountable across your squads.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/groups">
              <Button variant="secondary" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Groups
              </Button>
            </Link>
            <Link to="/challenges">
              <Button className="flex items-center gap-2">
                <Swords className="w-4 h-4" /> Challenges
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/25 text-accent-rose text-sm flex gap-3 text-left">
          <Info className="w-5 h-5 shrink-0" />
          <div>
            <h4 className="font-semibold">Dashboard Sync Error</h4>
            <p className="text-xs text-accent-rose/80 mt-1">
              {error instanceof Error
                ? error.message
                : 'Failed to synchronize dashboard stats.'}
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {!isLoading && groups && groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="stat-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="workspace-eyebrow block mb-2">{stat.label}</span>
                  <p className="text-2xl font-display font-extrabold text-text-primary tracking-tight">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color} ${stat.icon === Flame ? 'fill-current' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contribution Calendar */}
      {activityLoading ? (
        <Card className="premium-card p-6">
          <Skeleton className="h-44 w-full rounded-xl" />
        </Card>
      ) : (
        activityDates && (
          <Card className="premium-card p-6 relative overflow-hidden text-left">
            <CardHeader className="pb-4 p-0 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-accent-emerald" />
                </div>
                <div>
                  <CardTitle className="text-text-primary text-lg">Consistency Calendar</CardTitle>
                  <CardDescription className="mt-0.5">Daily solve activity over the last 365 days</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-calendar-empty border border-faint" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/30" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/45 border border-emerald-500/55" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/70 border border-emerald-500/80" />
                <span>More</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-4 overflow-x-auto min-w-full custom-scrollbar relative">
              <div className="flex gap-3 items-start min-w-[760px] pb-2">
                <div className="grid grid-rows-7 gap-[3px] text-[9px] font-mono text-text-muted select-none pt-[16px] pr-1.5 w-6 text-right shrink-0 leading-[10px]">
                  <div></div>
                  <div>Mon</div>
                  <div></div>
                  <div>Wed</div>
                  <div></div>
                  <div>Fri</div>
                  <div></div>
                </div>

                <div className="flex-1 space-y-1 relative">
                  <div className="h-4 relative text-[9px] font-mono text-text-muted select-none w-full">
                    {monthLabels.map((lbl, idx) => (
                      <span
                        key={idx}
                        className="absolute"
                        style={{ left: `${(lbl.colIdx * 13.5)}px` }}
                      >
                        {lbl.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-[3.5px]">
                    {weeks.map((week, colIdx) => (
                      <div key={colIdx} className="grid grid-rows-7 gap-[3px] shrink-0">
                        {week.map((day, rowIdx) => {
                          const intensityClass =
                            day.count === 0
                              ? 'bg-calendar-empty border-faint'
                              : day.count === 1
                              ? 'bg-emerald-500/20 border-emerald-500/30'
                              : day.count === 2
                              ? 'bg-emerald-500/45 border-emerald-500/55'
                              : 'bg-emerald-500/70 border-emerald-500/80';

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

              {activeTooltip && (
                <div
                  className="absolute z-30 px-2.5 py-1.5 rounded-lg bg-tooltip border border-border-subtle text-[10px] text-text-primary font-sans font-medium pointer-events-none transition-all shadow-glow -translate-x-1/2"
                  style={{ left: activeTooltip.x, top: activeTooltip.y }}
                >
                  <span className="font-semibold text-emerald-500">
                    {activeTooltip.count} {activeTooltip.count === 1 ? 'problem' : 'problems'} solved
                  </span>{' '}
                  on {new Date(activeTooltip.dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </CardContent>
          </Card>
        )
      )}

    </div>
  );
}
