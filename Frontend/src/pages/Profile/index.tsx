import { useQuery } from '@tanstack/react-query';
import { motion, type Variants } from 'framer-motion';
import { Flame, Award, Snowflake, CheckCircle2, Mail, Shield, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { apiClient } from '../../services/api/api.client';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';

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

export default function ProfilePage() {
  const { user } = useAuthStore();

  // Query groups & stats
  const { data: groups, isLoading } = useQuery<GroupItem[]>({
    queryKey: ['userGroups'],
    queryFn: () => apiClient.get<GroupItem[]>('/api/groups'),
  });

  // Aggregated Stats
  const totalGroups = groups?.length || 0;
  const maxActiveStreak = groups ? Math.max(...groups.map(g => g.stats.currentStreak), 0) : 0;
  const maxLongestStreak = groups ? Math.max(...groups.map(g => g.stats.longestStreak), 0) : 0;
  const cumulativeSolved = groups ? groups.reduce((acc, g) => acc + g.stats.totalSolved, 0) : 0;
  const totalFreezes = groups ? groups.reduce((acc, g) => acc + g.stats.freezeCount, 0) : 0;
  const last7DaysSolved = groups ? groups.reduce((acc, g) => acc + g.stats.last7DaysSolved, 0) : 0;
  const last30DaysSolved = groups ? groups.reduce((acc, g) => acc + g.stats.last30DaysSolved, 0) : 0;

  if (isLoading) {
    return (
      <div className="space-y-8 text-left">
        <div className="flex items-center gap-6 border-b border-border-subtle pb-8">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="space-y-2.5">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 lg:col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* 1. PROFILE HEADER CARD */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center gap-6 border-b border-border-subtle pb-8"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center font-display font-black text-2xl text-indigo-400 uppercase shadow-lg shadow-indigo-500/5">
            {user?.name ? user.name[0] : 'U'}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background-surface flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2.5">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">{user?.name}</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-accent-emerald">
              <Shield className="w-3 h-3" /> Pro Member
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1.5 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-text-muted" /> {user?.email}
            </span>
            <span className="hidden sm:inline text-text-muted">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-text-muted" /> Active Member • {totalGroups} {totalGroups === 1 ? 'squad' : 'squads'} joined
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2. STATS GRID */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Maximum Active Streak */}
        <motion.div variants={item}>
          <Card className="bg-background-surface border-border-subtle">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Max Active Streak</span>
                <CardTitle className="text-2xl font-black mt-1 text-orange-400 font-mono flex items-baseline gap-1">
                  {maxActiveStreak} <span className="text-xs text-text-secondary font-sans font-normal">days</span>
                </CardTitle>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-orange-500 fill-current" />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Max Longest Streak */}
        <motion.div variants={item}>
          <Card className="bg-background-surface border-border-subtle">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Longest Streak</span>
                <CardTitle className="text-2xl font-black mt-1 text-accent-amber font-mono flex items-baseline gap-1">
                  {maxLongestStreak} <span className="text-xs text-text-secondary font-sans font-normal">days</span>
                </CardTitle>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-accent-amber fill-current" />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Total Solved */}
        <motion.div variants={item}>
          <Card className="bg-background-surface border-border-subtle">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Total Solved</span>
                <CardTitle className="text-2xl font-black mt-1 text-accent-emerald font-mono flex items-baseline gap-1">
                  {cumulativeSolved} <span className="text-xs text-text-secondary font-sans font-normal">problems</span>
                </CardTitle>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Total Freezes */}
        <motion.div variants={item}>
          <Card className="bg-background-surface border-border-subtle">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Total Freezes Left</span>
                <CardTitle className="text-2xl font-black mt-1 text-purple-400 font-mono flex items-baseline gap-1">
                  {totalFreezes} <span className="text-xs text-text-secondary font-sans font-normal">available</span>
                </CardTitle>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center shrink-0">
                <Snowflake className="w-5 h-5 text-purple-400" />
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>

      {/* 3. CHARTS AND DETAILS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Card: Group Breakdown (Horizontal Charts) */}
        <Card className="lg:col-span-2 bg-background-surface border-border-subtle">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent-indigo" />
              <CardTitle className="text-white font-extrabold text-lg">Squad Breakdown</CardTitle>
            </div>
            <CardDescription>Performance breakdown across your active accountability squads</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!groups || groups.length === 0 ? (
              <div className="py-12 text-center text-text-secondary text-xs italic">
                No active accountability squads. Join a group to begin tracking breakdown stats.
              </div>
            ) : (
              <div className="space-y-5">
                {groups.map((group) => {
                  const percentage = cumulativeSolved > 0 
                    ? Math.round((group.stats.totalSolved / cumulativeSolved) * 100) 
                    : 0;

                  return (
                    <div key={group.id} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{group.name}</span>
                          <span className="font-mono text-[9px] text-text-muted">Invite: {group.inviteCode}</span>
                        </div>
                        <span className="font-mono text-text-secondary font-bold">
                          {group.stats.totalSolved} solves ({percentage}%)
                        </span>
                      </div>
                      
                      {/* Bar visual representation */}
                      <div className="w-full h-3 rounded-full bg-white/[0.03] border border-white/5 overflow-hidden flex">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        />
                      </div>

                      {/* Microstats row */}
                      <div className="flex justify-start gap-4 text-[10px] font-mono text-text-muted mt-1">
                        <span className="flex items-center gap-1 text-orange-400">
                          <Flame className="w-3 h-3 fill-current" /> Streak: {group.stats.currentStreak}d
                        </span>
                        <span>•</span>
                        <span>7 Days: {group.stats.last7DaysSolved} solves</span>
                        <span>•</span>
                        <span>30 Days: {group.stats.last30DaysSolved} solves</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Card: Weekly Consistency Target */}
        <Card className="bg-background-surface border-border-subtle">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent-emerald" />
              <CardTitle className="text-white font-extrabold text-lg">Consistency Velocity</CardTitle>
            </div>
            <CardDescription>Weekly and monthly rolling solution targets</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Rolling Metrics */}
            <div className="space-y-4">
              {/* Last 7 Days */}
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary font-medium">Last 7 Days Solves</span>
                  <span className="font-mono font-bold text-accent-indigo">{last7DaysSolved} Solved</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.03] overflow-hidden">
                  <div 
                    className="h-full bg-accent-indigo rounded-full" 
                    style={{ width: `${Math.min((last7DaysSolved / 7) * 100, 100)}%` }} 
                  />
                </div>
                <p className="text-[10px] text-text-muted font-sans mt-1">
                  Target: 7 solves (1 problem per day). Current: {Math.round((last7DaysSolved / 7) * 100)}% velocity.
                </p>
              </div>

              {/* Last 30 Days */}
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary font-medium">Last 30 Days Solves</span>
                  <span className="font-mono font-bold text-accent-emerald">{last30DaysSolved} Solved</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.03] overflow-hidden">
                  <div 
                    className="h-full bg-accent-emerald rounded-full" 
                    style={{ width: `${Math.min((last30DaysSolved / 30) * 100, 100)}%` }} 
                  />
                </div>
                <p className="text-[10px] text-text-muted font-sans mt-1">
                  Target: 30 solves. Current: {Math.round((last30DaysSolved / 30) * 100)}% velocity.
                </p>
              </div>
            </div>

            {/* Inactivity Freeze Rule Box */}
            <div className="p-3.5 rounded-xl bg-[#1C1829]/40 border border-purple-500/10 text-xs text-left">
              <h5 className="font-bold text-purple-300 flex items-center gap-1 mb-1">
                <Snowflake className="w-3.5 h-3.5 text-purple-400" /> Streak Freeze Rules
              </h5>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Streaks are reset at midnight. If you fail to submit a solve, a streak freeze is automatically consumed (max 2 per group). Replenish streak freezes by keeping a 7-day consistency streak!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
