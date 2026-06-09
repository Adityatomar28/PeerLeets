import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Trophy, Clock, Snowflake, RefreshCw } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'solved' | 'first_solver' | 'leaderboard' | 'reminder' | 'freeze';
  icon: React.ReactNode;
  message: string;
  time: string;
  color: string;
}

export default function RealtimeSim() {
  const [items, setItems] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'solved',
      icon: <Flame className="w-4 h-4 text-orange-500 fill-current" />,
      message: "Alice solved today's challenge: 'Climbing Stairs' in 6 minutes!",
      time: 'Just now',
      color: 'rgba(249, 115, 22, 0.1)'
    },
    {
      id: '2',
      type: 'first_solver',
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
      message: "Alice earned the First Solver badge 🏆",
      time: 'Just now',
      color: 'rgba(245, 158, 11, 0.1)'
    }
  ]);

  const streamQueue: Omit<ActivityItem, 'id' | 'time'>[] = [
    {
      type: 'leaderboard',
      icon: <RefreshCw className="w-4 h-4 text-indigo-400 pulsing-glow" />,
      message: 'Leaderboard updated: Alice took Rank #1 🚀',
      color: 'rgba(99, 102, 241, 0.1)'
    },
    {
      type: 'reminder',
      icon: <Clock className="w-4 h-4 text-rose-500" />,
      message: "Solve reminder sent to Charlie Dave (3-day streak at risk) ⚠️",
      color: 'rgba(244, 63, 94, 0.1)'
    },
    {
      type: 'freeze',
      icon: <Snowflake className="w-4 h-4 text-purple-400" />,
      message: 'Rahul Sen used a streak freeze token to protect 8-day streak ❄️',
      color: 'rgba(168, 85, 247, 0.1)'
    },
    {
      type: 'solved',
      icon: <Flame className="w-4 h-4 text-orange-500 fill-current" />,
      message: "Bob Johnson solved today's challenge in 18 minutes! 🔥",
      color: 'rgba(249, 115, 22, 0.1)'
    }
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const newEvent = streamQueue[index];
      const newItem: ActivityItem = {
        ...newEvent,
        id: Math.random().toString(),
        time: 'Just now'
      };

      // Push to the top of the array, keep max 4 items
      setItems((prev) => {
        const updated = [newItem, ...prev];
        if (updated.length > 4) {
          updated.pop();
        }
        return updated;
      });

      index = (index + 1) % streamQueue.length;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 border-t border-white/5 relative" id="realtime-sim">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Ticker list */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  <span className="font-display font-extrabold text-sm text-white">Live Event Stream</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulsing-glow mr-1" /> WS_ACTIVE
                </div>
              </div>

              {/* Event Stack */}
              <div className="flex flex-col gap-4 min-h-[300px] justify-start">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/40"
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.3)' }}
                    >
                      <div className="flex items-center gap-4 text-left">
                        {/* Icon Wrapper */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.icon}
                        </div>
                        <span className="font-sans text-xs text-white leading-relaxed">
                          {item.message}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-muted shrink-0 ml-4" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Text Explainer */}
          <div className="lg:col-span-5 text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400 mb-6 backdrop-blur-md">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Realtime Socket.io Bridge</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-6">
              Keep your team in lockstep sync.
            </h2>

            <p className="font-sans text-secondary text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              No manual page reloading required. The second a team member completes their daily LeetCode challenge, PeerSolve broadcasts updates to all active members in the room instantly.
            </p>

            {/* Checklist */}
            <div className="flex flex-col gap-4 text-left w-full">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <span className="font-sans text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>Live updating participation statuses</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <span className="font-sans text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>Instant feed notifications for streaks & freezes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <span className="font-sans text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>Dynamic rank swaps with zero layout shifts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
