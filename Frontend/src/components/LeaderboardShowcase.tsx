import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Play, Info } from 'lucide-react';

interface SquadMember {
  id: string;
  name: string;
  solved: number;
  streak: number;
  score: number;
  avatar: string;
  color: string;
}

export default function LeaderboardShowcase() {
  const [members, setMembers] = useState<SquadMember[]>([
    { id: '1', name: 'Alice (Daily Solver)', solved: 14, streak: 14, score: 280, avatar: 'A', color: '#6366f1' },
    { id: '2', name: 'Bob (Sparsely Solves)', solved: 22, streak: 2, score: 260, avatar: 'B', color: '#a855f7' },
    { id: '3', name: 'Charlie (New Solver)', solved: 10, streak: 5, score: 180, avatar: 'C', color: '#ec4899' },
  ]);

  const [isTransitioned, setIsTransitioned] = useState(false);

  const simulateTransition = () => {
    setIsTransitioned(!isTransitioned);
    if (!isTransitioned) {
      // Alice solves today's challenge, adding streak bonus points and shooting past Bob!
      setMembers([
        { id: '1', name: 'Alice (Daily Solver)', solved: 15, streak: 15, score: 310, avatar: 'A', color: '#6366f1' },
        { id: '2', name: 'Bob (Sparsely Solves)', solved: 22, streak: 2, score: 260, avatar: 'B', color: '#a855f7' },
        { id: '3', name: 'Charlie (New Solver)', solved: 10, streak: 5, score: 180, avatar: 'C', color: '#ec4899' },
      ]);
    } else {
      // Reset state
      setMembers([
        { id: '2', name: 'Bob (Sparsely Solves)', solved: 22, streak: 2, score: 260, avatar: 'B', color: '#a855f7' },
        { id: '1', name: 'Alice (Daily Solver)', solved: 14, streak: 14, score: 250, avatar: 'A', color: '#6366f1' },
        { id: '3', name: 'Charlie (New Solver)', solved: 10, streak: 5, score: 180, avatar: 'C', color: '#ec4899' },
      ]);
    }
  };

  // Run simulation automatically every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      simulateTransition();
    }, 4500);
    return () => clearInterval(timer);
  }, [isTransitioned]);

  return (
    <section className="py-24 border-t border-white/5 relative" id="leaderboard-showcase">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Explainer */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-500 mb-6 backdrop-blur-md">
              <Trophy className="w-3.5 h-3.5" />
              <span>Leaderboard Algorithm</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-6">
              Consistency valued over raw volume.
            </h2>

            <p className="font-sans text-secondary text-base mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              In PeerSolve, solving 10 problems with a 10-day streak scores higher than solving 20 problems on a single day. 
              Our algorithm rewards daily consistency multipliers, maintaining an active learning dynamic.
            </p>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3 mb-8">
              <Info className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="font-sans text-xs text-secondary leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <strong>How it works:</strong> Alice has solved fewer total problems than Bob, but because of her 15-day streak, her multiplier pushes her rank past Bob in real time.
              </p>
            </div>

            <button
              onClick={simulateTransition}
              className="btn-secondary flex items-center gap-2 font-mono text-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current text-white" /> Click to Simulate Rank Swap
            </button>
          </div>

          {/* Right Column: Animated Leaderboard Rows */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="font-mono text-xs text-muted" style={{ color: 'var(--text-muted)' }}>Squad Rankings</span>
                <span className="text-xs font-semibold text-indigo-400 font-mono">Cons. Algorithm v1.2</span>
              </div>

              {/* Rows container with layout animation */}
              <div className="flex flex-col gap-3">
                {members.map((member, idx) => (
                  <motion.div
                    key={member.id}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Indicator */}
                      <span className="font-mono text-sm font-bold text-white w-6">{idx + 1}</span>
                      
                      {/* User Avatar */}
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                        style={{ backgroundColor: `${member.color}15`, border: `1px solid ${member.color}30`, color: member.color }}
                      >
                        {member.avatar}
                      </div>

                      {/* Name & Subtitle */}
                      <div className="text-left">
                        <span className="font-sans font-bold text-sm text-white block">{member.name}</span>
                        <span className="font-sans text-[10px] text-muted" style={{ color: 'var(--text-muted)' }}>
                          {member.solved} problems solved
                        </span>
                      </div>
                    </div>

                    {/* Streak & Points */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500 fill-current" />
                        <span className="font-mono text-xs text-orange-400 font-bold">{member.streak}d</span>
                      </div>
                      <span className="font-mono text-sm font-black text-white w-20 text-right">{member.score} pts</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
