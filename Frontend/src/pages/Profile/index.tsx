import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, type Variants } from 'framer-motion';
import { 
  Flame, 
  Award, 
  Snowflake, 
  CheckCircle2, 
  Mail, 
  Shield, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  Camera,
  Save,
  Check,
  AlertCircle,
  RefreshCw,
  User,
  Sparkles
} from 'lucide-react';
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
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg("Image size must be less than 2MB");
        return;
      }
      setErrorMsg('');
      setSuccessMsg('');
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (user) {
          localStorage.setItem(`peer_solve_avatar_${user.id}`, base64);
          updateUser({ ...user, avatar: base64 });
          setSuccessMsg("Profile picture uploaded successfully!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);
    try {
      const response = await apiClient.patch<{ id: string; name: string; email: string }>('/api/auth/profile', { name: name.trim() });
      if (user) {
        updateUser({ ...user, name: response.name });
        setSuccessMsg('Display name updated successfully.');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to update name.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { data: groups, isLoading } = useQuery<GroupItem[]>({
    queryKey: ['userGroups'],
    queryFn: () => apiClient.get<GroupItem[]>('/api/groups'),
  });

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
        <Skeleton className="h-36 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const statCards = [
    { label: 'Max Active Streak', value: maxActiveStreak, unit: 'days', color: 'text-orange-400', icon: Flame, iconBg: 'bg-orange-500/10 border-orange-500/15', iconColor: 'text-orange-500 fill-current' },
    { label: 'Longest Streak', value: maxLongestStreak, unit: 'days', color: 'text-accent-amber', icon: Award, iconBg: 'bg-amber-500/10 border-amber-500/15', iconColor: 'text-accent-amber fill-current' },
    { label: 'Total Solved', value: cumulativeSolved, unit: 'problems', color: 'text-accent-emerald', icon: CheckCircle2, iconBg: 'bg-emerald-500/10 border-emerald-500/15', iconColor: 'text-accent-emerald' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Profile Hero */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-hero p-6 md:p-8"
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer shrink-0" onClick={handleAvatarClick}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/10 group-hover:opacity-80 transition-all"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center font-display font-extrabold text-3xl text-indigo-400 uppercase shadow-lg shadow-indigo-500/10 group-hover:opacity-80 transition-all">
                {user?.name ? user.name[0] : 'U'}
              </div>
            )}
            <div className="absolute inset-0 bg-overlay rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background-surface flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div className="text-center sm:text-left space-y-2 flex-1">
            <p className="workspace-eyebrow flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Member Profile
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-text-primary tracking-tight">{user?.name}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-semibold text-accent-emerald">
                <Shield className="w-3 h-3" /> Pro Member
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1.5 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-text-muted" /> {user?.email}
              </span>
              <span className="hidden sm:inline text-text-muted">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-text-muted" /> {totalGroups} {totalGroups === 1 ? 'squad' : 'squads'} joined
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account Customization */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="premium-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-accent-indigo" />
              </div>
              <div>
                <CardTitle className="text-text-primary text-lg">Account Customization</CardTitle>
                <CardDescription className="mt-0.5">Update your display name and upload a custom profile avatar</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-xl object-cover border border-indigo-500/25 shadow-md group-hover:opacity-75 transition-all"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center font-display font-extrabold text-xl text-indigo-400 uppercase group-hover:opacity-75 transition-all">
                      {user?.name ? user.name[0] : 'U'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-overlay rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="px-4 py-2 rounded-lg bg-background-surfaceLight border border-border-subtle text-xs font-semibold text-text-primary hover:border-border-cardHover transition-all cursor-pointer"
                  >
                    Choose Picture
                  </button>
                  <p className="text-[11px] text-text-muted mt-1.5">PNG, JPG, or JPEG up to 2MB</p>
                </div>
              </div>

              <div className="hidden md:block h-14 w-px bg-border-subtle" />

              <form onSubmit={handleSaveName} className="flex-1 w-full flex flex-col gap-2">
                <label className="workspace-eyebrow">Display Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="flex-1 bg-background-surfaceLight border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-indigo/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || name.trim() === user?.name}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl text-xs font-semibold hover:shadow-glow disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    Save
                  </button>
                </div>
              </form>
            </div>

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-accent-emerald text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {statCards.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <div className="stat-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="workspace-eyebrow block mb-2">{stat.label}</span>
                  <p className={`text-3xl font-display font-extrabold tracking-tight ${stat.color}`}>
                    {stat.value}
                    <span className="text-sm text-text-secondary font-sans font-medium ml-1">{stat.unit}</span>
                  </p>
                </div>
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Freezes card */}
        <motion.div variants={item}>
          <div className="stat-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="workspace-eyebrow block mb-2">Total Freezes Left</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 group/tooltip relative cursor-help" title="Missing a day consumes one freeze and protects your streak.">
                    {Array.from({ length: Math.max(2, totalFreezes) }).map((_, i) => (
                      <span key={i} className="text-base">
                        {i < totalFreezes ? '❄️' : '⚫'}
                      </span>
                    ))}
                    <span className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-lg bg-tooltip border border-border-subtle text-[10px] text-text-secondary font-sans pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-all z-20 text-center leading-normal shadow-glow">
                      Missing a day consumes one freeze and protects your streak.
                    </span>
                  </div>
                  <span className="text-sm text-text-secondary font-medium">({totalFreezes} left)</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center shrink-0">
                <Snowflake className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 premium-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-accent-indigo" />
              </div>
              <div>
                <CardTitle className="text-text-primary text-lg">Squad Breakdown</CardTitle>
                <CardDescription className="mt-0.5">Performance across your accountability squads</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!groups || groups.length === 0 ? (
              <div className="py-14 text-center text-text-secondary text-sm">
                No active squads yet. Join a group to begin tracking stats.
              </div>
            ) : (
              <div className="space-y-6">
                {groups.map((group) => {
                  const percentage = cumulativeSolved > 0 
                    ? Math.round((group.stats.totalSolved / cumulativeSolved) * 100) 
                    : 0;

                  return (
                    <div key={group.id} className="space-y-2.5">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2.5">
                          <span className="font-semibold text-text-primary">{group.name}</span>
                          <span className="font-mono text-[10px] text-text-muted px-2 py-0.5 rounded-md bg-surface-muted border border-faint">
                            {group.inviteCode}
                          </span>
                        </div>
                        <span className="font-mono text-text-secondary font-semibold text-xs">
                          {group.stats.totalSolved} solves ({percentage}%)
                        </span>
                      </div>
                      
                      <div className="w-full h-2.5 rounded-full bg-surface-muted border border-faint overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3 text-[11px] font-mono text-text-muted">
                        <span className="flex items-center gap-1 text-orange-400">
                          <Flame className="w-3 h-3 fill-current" /> {group.stats.currentStreak}d streak
                        </span>
                        <span>7d: {group.stats.last7DaysSolved}</span>
                        <span>30d: {group.stats.last30DaysSolved}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent-emerald" />
              </div>
              <div>
                <CardTitle className="text-text-primary text-lg">Consistency Velocity</CardTitle>
                <CardDescription className="mt-0.5">Weekly and monthly solve targets</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="p-4 rounded-xl bg-surface-subtle border border-faint space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary font-medium">Last 7 Days</span>
                <span className="font-mono font-semibold text-accent-indigo">{last7DaysSolved} solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden">
                <div 
                  className="h-full bg-accent-indigo rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((last7DaysSolved / 7) * 100, 100)}%` }} 
                />
              </div>
              <p className="text-[11px] text-text-muted">
                {Math.round((last7DaysSolved / 7) * 100)}% of daily target
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-faint space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary font-medium">Last 30 Days</span>
                <span className="font-mono font-semibold text-accent-emerald">{last30DaysSolved} solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden">
                <div 
                  className="h-full bg-accent-emerald rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((last30DaysSolved / 30) * 100, 100)}%` }} 
                />
              </div>
              <p className="text-[11px] text-text-muted">
                {Math.round((last30DaysSolved / 30) * 100)}% of monthly target
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15 text-xs">
              <h5 className="font-semibold text-purple-400 flex items-center gap-1.5 mb-1.5">
                <Snowflake className="w-3.5 h-3.5" /> Streak Freeze Rules
              </h5>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Streaks reset at midnight. Missing a solve consumes a freeze (max 2 per group). Keep a 7-day streak to replenish!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
