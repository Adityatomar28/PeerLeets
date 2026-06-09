import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Shield, Snowflake, Sparkles } from 'lucide-react';

export default function StreakShowcase() {
  const [activeMilestone, setActiveMilestone] = useState<1 | 7 | 30 | 100>(30);

  const milestones = [
    { day: 1, label: 'Day 1: Getting Started', count: 1, desc: 'Your accountability group is formed. You solve your first problem, lighting the flame.' },
    { day: 7, label: 'Day 7: Consistency Habit', count: 7, desc: 'One solid week. The habit loop starts to lock in. You earn your first Streak Freeze token.' },
    { day: 30, label: 'Day 30: Momentum State', count: 30, desc: 'Streak multiplier unlocked. Consistent problem-solving is now automatic.' },
    { day: 100, label: 'Day 100: Code Mastery', count: 100, desc: 'Elite consistency. You have solved 100 challenges. The ultimate coding discipline.' },
  ];

  const currentMilestone = milestones.find((m) => m.day === activeMilestone) || milestones[2];

  // Helper to generate grid cells
  const renderGridCells = (count: number) => {
    const cells = [];
    const totalCells = Math.max(35, count + 2); // show at least 35 grid squares
    
    // Let's seed a missed day with a freeze block at index 5 in the grid for Day 7/30/100
    const freezeIndex = count > 5 ? 5 : -1;

    for (let i = 0; i < totalCells; i++) {
      const isActive = i < count;
      const isFreeze = i === freezeIndex;

      cells.push(
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: (i % 25) * 0.01 }}
          className={`aspect-ratio rounded-md border text-center flex items-center justify-center ${
            isFreeze
              ? 'bg-purple-500/25 border-purple-500/40 text-purple-300'
              : isActive
              ? 'bg-indigo-500 border-indigo-400/40 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/[0.02] border-white/5'
          }`}
          style={{ width: '100%', aspectRatio: '1' }}
        >
          {isFreeze && <Snowflake className="w-3.5 h-3.5 text-purple-300 pulsing-glow" />}
        </motion.div>
      );
    }
    return cells;
  };

  return (
    <section className="py-24 border-t border-white/5 relative" id="streak-showcase">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Calendar Grid */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500 fill-current" />
                  <span className="font-display font-extrabold text-sm text-white">Streak Engine Simulation</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 font-mono">
                  <Shield className="w-3.5 h-3.5" /> FREEZE SYSTEM ACTIVE
                </div>
              </div>

              {/* Grid Cells container */}
              <div className="grid grid-cols-7 gap-2">
                {renderGridCells(currentMilestone.count)}
              </div>
            </div>
          </div>

          {/* Right Column: Explainer and Interactive selectors */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Streak Protection Safeguard</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-6">
              Streaks build discipline.<br />
              <span className="text-purple-400">Freezes</span> protect your hard work.
            </h2>

            <p className="font-sans text-secondary text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Maintain consistency streaks over months. If you miss a day, our automated **Streak Freeze** consumes itself to keep your streak count intact, avoiding frustration.
            </p>

            {/* Selector Milestones */}
            <div className="flex flex-wrap gap-3 mb-8 w-full">
              {milestones.map((m) => (
                <button
                  key={m.day}
                  onClick={() => setActiveMilestone(m.day as any)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeMilestone === m.day
                      ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20 border border-purple-400'
                      : 'bg-white/5 text-secondary hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                  style={{ borderStyle: 'solid' }}
                >
                  Day {m.day}
                </button>
              ))}
            </div>

            {/* Interactive display card */}
            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/10 w-full min-h-[120px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-display font-extrabold text-sm text-white mb-2">{currentMilestone.label}</h4>
                  <p className="font-sans text-xs text-secondary leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{currentMilestone.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
