import { motion } from 'framer-motion';
import { XCircle, ShieldAlert, AlertTriangle, UserMinus, CheckCircle, Flame, Users, Sparkles } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: <UserMinus className="w-5 h-5 text-rose-500" />,
      title: "Isolated Studying",
      desc: "Without peers, it's easy to skip a day when you are tired. There is no one to notice or care."
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      title: "Broken Habits",
      desc: "Motivation gets you started, but habit keeps you going. Study streaks fall flat after a week."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      title: "Zero Social Pressure",
      desc: "No public leaderboard or active group means there are no stakes. Slacking has zero consequences."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="problem">
      <div className="glow-spot-3" />
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Why is staying consistent with <span className="text-rose-500">DSA</span> so hard?
          </h2>
          <p className="font-sans text-lg text-secondary" style={{ color: 'var(--text-secondary)' }}>
            Statistically, over 85% of self-paced learners stop solving coding problems after the first 14 days. The problem isn't intelligence—it's isolation.
          </p>
        </div>

        {/* Visual Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: The Self-Study Trap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-panel p-8 border-rose-500/10 relative overflow-hidden"
            style={{ borderColor: 'rgba(244, 63, 94, 0.15)' }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full" />
            <h3 className="font-display font-extrabold text-xl text-rose-400 mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-500" />
              The Self-Study Trap
            </h3>
            
            <div className="flex flex-col gap-6">
              {problems.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                    {p.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-display font-semibold text-sm text-white">{p.title}</h4>
                    <p className="font-sans text-xs text-secondary mt-1" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual representation of broken streak */}
            <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">Streak Status</span>
              <div className="flex items-center gap-2 mt-2">
                <Flame className="w-4 h-4 text-muted" style={{ color: 'var(--text-muted)' }} />
                <span className="font-mono text-sm text-secondary" style={{ color: 'var(--text-secondary)' }}>0-day streak (Reset 2 days ago)</span>
              </div>
              <div className="flex gap-1.5 mt-3">
                {[true, true, false, false, false, false, false].map((active, i) => (
                  <div
                    key={i}
                    className={`h-6 flex-1 rounded ${
                      active ? 'bg-rose-500/20 border border-rose-500/30' : 'bg-white/5 border border-white/5'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center: Vs. */}
          <div className="lg:col-span-2 text-center font-display font-black text-2xl text-muted" style={{ color: 'var(--text-muted)' }}>
            VS.
          </div>

          {/* Right: The PeerSolve Accountability Engine */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-panel-glow p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full" />
            <h3 className="font-display font-extrabold text-xl text-indigo-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-400" />
              The PeerSolve Solution
            </h3>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-sm text-white">Social Accountability Groups</h4>
                  <p className="font-sans text-xs text-secondary mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Study in high-discipline private groups of 3-5 peers. Everyone sees when you solve, and when you slack off.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-sm text-white">Gamified Streak Safeguards</h4>
                  <p className="font-sans text-xs text-secondary mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Maintain streak multipliers. Earn "Streak Freezes" to protect your progress on sick days, but use them wisely.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-sm text-white">Consistently High Stakes</h4>
                  <p className="font-sans text-xs text-secondary mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Active notifications, live activity feeds, and a daily challenge assignee system push you to coding mastery.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual representation of active streak */}
            <div className="mt-8 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-left">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">Streak Status</span>
              <div className="flex items-center gap-2 mt-2">
                <Flame className="w-4 h-4 text-orange-500 fill-current" />
                <span className="font-mono text-sm text-white font-bold">14-day streak 🔥 (Top 5% of Squads)</span>
              </div>
              <div className="flex gap-1.5 mt-3">
                {[true, true, true, true, true, true, true].map((active, i) => (
                  <div
                    key={i}
                    className={`h-6 flex-1 rounded ${
                      active ? 'bg-indigo-500 border border-indigo-400/50 shadow-md shadow-indigo-500/25' : 'bg-white/5'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
