import { motion } from 'framer-motion';
import { Play, Sparkles, CheckCircle2, Flame, Award, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [tickerEvent, setTickerEvent] = useState({ name: 'Alice', type: 'SOLVED', message: 'solved today\'s challenge in 12m' });
  
  const mockEvents = [
    { name: 'Alice', type: 'SOLVED', message: 'solved today\'s challenge in 12m 🔥' },
    { name: 'Bob', type: 'FIRST_SOLVER', message: 'became the first solver today 🏆' },
    { name: 'Charlie', type: 'STREAK_UPDATED', message: 'reached a 15-day streak! 🚀' },
    { name: 'Rahul', type: 'FREEZE_USED', message: 'used a streak freeze to protect streak ❄️' },
    { name: 'Dev', type: 'SOLVED', message: 'solved climbing-stairs in 8m 🔥' },
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % mockEvents.length;
      setTickerEvent(mockEvents[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartGroup = () => {
    const target = document.querySelector('#final-cta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Background spotlights */}
      <div className="glow-spot-1" />
      <div className="glow-spot-2" />
      <div className="grid-bg-overlay" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Hero Text Content */}
        <div className="lg:col-span-6 text-left flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400 mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consistency Beats Motivation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tight text-white mb-6"
          >
            Stay Consistent.<br />
            Not Just <span className="text-gradient" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Motivated.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg md:text-xl text-secondary mb-10 max-w-xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Build coding discipline with accountability groups, daily challenges, streaks, and real-time progress tracking. Stop studying alone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button className="btn-primary flex items-center justify-center gap-2 text-base py-4 px-8" onClick={handleStartGroup}>
              Start Your First Group
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2 text-base py-4 px-8">
              <Play className="w-4 h-4 fill-current text-white" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Hero Interactive Dashboard Mockup */}
        <div className="lg:col-span-6 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[520px] glass-panel-glow p-6 relative overflow-hidden"
          >
            {/* Header / Top-bar of mock dashboard */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-muted ml-2" style={{ color: 'var(--text-muted)' }}>dsa-squad-status.local</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 font-mono">
                LIVE SYNCED
              </div>
            </div>

            {/* Content layout in mockup */}
            <div className="flex flex-col gap-6">
              {/* Daily Challenge Card Mock */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-white">Daily Challenge #127</h4>
                    <p className="font-mono text-[11px] text-emerald-400">Two Sum • Easy</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>Status</span>
                  <p className="font-sans font-semibold text-xs text-white">ACTIVE (2/3 Solved)</p>
                </div>
              </div>

              {/* Dynamic stats row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Solvers */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>Active Streak</span>
                    <Flame className="w-4 h-4 text-orange-500 fill-current" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-display font-extrabold text-white">12</span>
                    <span className="text-[10px] text-muted font-mono" style={{ color: 'var(--text-muted)' }}>days</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '80%' }} 
                      transition={{ duration: 1, delay: 0.5 }} 
                      className="bg-orange-500 h-full" 
                    />
                  </div>
                </div>

                {/* Leaderboard Rank */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-secondary" style={{ color: 'var(--text-secondary)' }}>Squad Rank</span>
                    <Trophy className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-display font-extrabold text-white">#1</span>
                    <span className="text-[10px] text-emerald-400 font-mono">+2 ranks</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '100%' }} 
                      transition={{ duration: 1, delay: 0.5 }} 
                      className="bg-amber-500 h-full" 
                    />
                  </div>
                </div>
              </div>

              {/* Realtime Action Stream Ticker */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
                <span className="text-xs font-mono text-muted text-left" style={{ color: 'var(--text-muted)' }}>$ tail -f activity_feed.log</span>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 pulsing-glow" />
                    <span className="font-mono text-xs text-white">
                      <strong>{tickerEvent.name}</strong> {tickerEvent.message}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-muted" style={{ color: 'var(--text-muted)' }}>Just now</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating badge for social proof */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -right-6 bottom-10 hidden sm:flex items-center gap-3 p-4 rounded-xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-md"
            style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)' }}
          >
            <div className="w-9 h-9 rounded-lg bg-pink-500/15 flex items-center justify-center">
              <Award className="w-5 h-5 text-pink-500" />
            </div>
            <div className="text-left">
              <h5 className="font-sans font-bold text-xs text-white">Daily Consistency Badge</h5>
              <p className="font-sans text-[10px] text-secondary" style={{ color: 'var(--text-secondary)' }}>Earned by Alice for 10 consecutive days</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
