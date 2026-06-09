import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Activity, Grid, Flame, CheckCircle, Clock, Calendar, Users, Eye } from 'lucide-react';

export default function LivePreview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'activity' | 'grid'>('overview');

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: <Eye className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Squad Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { id: 'activity', label: 'Live Social Feed', icon: <Activity className="w-4 h-4" /> },
    { id: 'grid', label: 'Participation Grid', icon: <Grid className="w-4 h-4" /> },
  ];

  // Mock Data
  const leaderboard = [
    { rank: 1, name: 'Alice Smith', solved: 42, streak: 12, score: 385, avatar: 'A' },
    { rank: 2, name: 'Bob Johnson', solved: 39, streak: 8, score: 320, avatar: 'B' },
    { rank: 3, name: 'Rahul Sen', solved: 35, streak: 0, score: 280, avatar: 'R' },
    { rank: 4, name: 'Charlie Dave', solved: 30, streak: 5, score: 245, avatar: 'C' },
  ];

  const activities = [
    { id: 1, user: 'Alice Smith', message: "solved today's challenge: 'Two Sum' 🔥", time: '2 mins ago', type: 'solve' },
    { id: 2, user: 'Bob Johnson', message: "activated today's challenge slot 🧠", time: '1 hour ago', type: 'activate' },
    { id: 3, user: 'Rahul Sen', message: "used a streak freeze to protect their 10-day streak ❄️", time: '4 hours ago', type: 'freeze' },
    { id: 4, user: 'Charlie Dave', message: "reached a 5-day consistency streak milestone! 🚀", time: '1 day ago', type: 'streak' },
  ];

  const gridData = {
    solved: [
      { name: 'Alice Smith', time: '10m taken', avatar: 'A' },
      { name: 'Bob Johnson', time: '22m taken', avatar: 'B' }
    ],
    pending: [
      { name: 'Charlie Dave', status: 'In progress', avatar: 'C' }
    ],
    missed: [
      { name: 'Rahul Sen', status: 'Freeze applied', avatar: 'R' }
    ]
  };

  return (
    <section className="py-24 border-t border-white/5 relative" id="live-preview">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Experience the platform.
          </h2>
          <p className="font-sans text-lg text-secondary" style={{ color: 'var(--text-secondary)' }}>
            See exactly how PeerSolve keeps your DSA habit loops alive with our real-time squad view.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="w-full glass-panel-glow overflow-hidden flex flex-col">
          {/* Navigation Tabs Bar */}
          <div className="flex flex-wrap items-center justify-start gap-1 p-2 bg-white/[0.02] border-b border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    : 'text-secondary hover:text-white hover:bg-white/[0.03]'
                }`}
                style={{ border: 'none' }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Screen Display Area */}
          <div className="p-6 md:p-8 min-h-[420px] bg-slate-950/20 text-left relative">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >
                  {/* Left Column: Challenge Card */}
                  <div className="md:col-span-6 flex flex-col gap-6">
                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Today's challenge</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono text-indigo-400">
                          MEDIUM
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-xl text-white mb-2">3. Longest Substring Without Repeating Characters</h3>
                      <p className="font-sans text-xs text-secondary mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Given a string s, find the length of the longest substring without repeating characters.
                      </p>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="font-sans text-xs text-white font-semibold">2 Solved</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span className="font-sans text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>10h remaining</span>
                        </div>
                      </div>

                      <button className="btn-primary w-full justify-center">
                        Solve on LeetCode
                      </button>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                        <Flame className="w-5 h-5 text-orange-500 fill-current mx-auto mb-2" />
                        <span className="block font-display font-black text-lg text-white">12 Days</span>
                        <span className="text-[9px] font-mono text-muted uppercase" style={{ color: 'var(--text-muted)' }}>Streak</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                        <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                        <span className="block font-display font-black text-lg text-white">#1</span>
                        <span className="text-[9px] font-mono text-muted uppercase" style={{ color: 'var(--text-muted)' }}>Squad Rank</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                        <Calendar className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                        <span className="block font-display font-black text-lg text-white">2 Freezes</span>
                        <span className="text-[9px] font-mono text-muted uppercase" style={{ color: 'var(--text-muted)' }}>Remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mini Leaderboard & Activity Preview */}
                  <div className="md:col-span-6 flex flex-col gap-6">
                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                      <h4 className="font-display font-bold text-sm text-white mb-4">Top Squad Members</h4>
                      <div className="flex flex-col gap-3">
                        {leaderboard.slice(0, 3).map((user, idx) => (
                          <div key={user.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs text-muted w-4" style={{ color: 'var(--text-muted)' }}>{idx + 1}</span>
                              <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
                                {user.avatar}
                              </div>
                              <span className="font-sans font-semibold text-xs text-white">{user.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-xs text-orange-400 flex items-center gap-0.5">
                                <Flame className="w-3.5 h-3.5 fill-current" /> {user.streak}d
                              </span>
                              <span className="font-mono text-xs font-bold text-white">{user.score} pts</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'leaderboard' && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-xl bg-white/[0.01] border border-white/5"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[10px] font-mono text-muted uppercase" style={{ color: 'var(--text-muted)' }}>
                          <th className="pb-3 w-16">Rank</th>
                          <th className="pb-3">Member</th>
                          <th className="pb-3 w-28">Current Streak</th>
                          <th className="pb-3 w-28">Total Solved</th>
                          <th className="pb-3 w-28 text-right">Cons. Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((user) => (
                          <tr key={user.name} className="border-b border-white/[0.02] last:border-none hover:bg-white/[0.01]">
                            <td className="py-4 font-mono text-xs text-white font-bold">{user.rank}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
                                  {user.avatar}
                                </div>
                                <span className="font-sans font-bold text-xs text-white">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-4">
                              <span className="font-mono text-xs text-orange-400 flex items-center gap-0.5">
                                <Flame className="w-3.5 h-3.5 fill-current" /> {user.streak}d
                              </span>
                            </td>
                            <td className="py-4 font-mono text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>
                              {user.solved} solved
                            </td>
                            <td className="py-4 font-mono text-xs text-white font-bold text-right">{user.score} pts</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-xl bg-white/[0.01] border border-white/5"
                >
                  <div className="flex flex-col gap-4">
                    {activities.map((act) => (
                      <div key={act.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400">
                            {act.user[0]}
                          </div>
                          <span className="font-sans text-xs text-white">
                            <strong>{act.user}</strong> {act.message}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-muted shrink-0" style={{ color: 'var(--text-muted)' }}>{act.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'grid' && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Solved Card */}
                  <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Solved today</h4>
                    </div>
                    <div className="flex flex-col gap-3">
                      {gridData.solved.map((u) => (
                        <div key={u.name} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-[10px] text-emerald-300">
                              {u.avatar}
                            </div>
                            <span className="font-sans text-xs text-white font-semibold">{u.name}</span>
                          </div>
                          <span className="font-mono text-[9px] text-emerald-400">{u.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Card */}
                  <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/15">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Pending solve</h4>
                    </div>
                    <div className="flex flex-col gap-3">
                      {gridData.pending.map((u) => (
                        <div key={u.name} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-[10px] text-amber-300">
                              {u.avatar}
                            </div>
                            <span className="font-sans text-xs text-white font-semibold">{u.name}</span>
                          </div>
                          <span className="font-mono text-[9px] text-amber-400">{u.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missed Card */}
                  <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/15">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-purple-400" />
                      <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Missed / Freezed</h4>
                    </div>
                    <div className="flex flex-col gap-3">
                      {gridData.missed.map((u) => (
                        <div key={u.name} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-[10px] text-purple-300">
                              {u.avatar}
                            </div>
                            <span className="font-sans text-xs text-white font-semibold">{u.name}</span>
                          </div>
                          <span className="font-mono text-[9px] text-purple-400">{u.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
