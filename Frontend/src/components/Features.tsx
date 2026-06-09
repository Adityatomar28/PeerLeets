import { motion } from 'framer-motion';
import { Calendar, Flame, Shield, RefreshCw, Trophy, Activity, GitCommit, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      title: 'Daily Challenges',
      desc: 'Automatic or manually-assigned daily algorithmic tasks tailored to keep your group active.'
    },
    {
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      title: 'Streak Engine',
      desc: 'A gamified consistency engine tracking daily submissions, streak milestones, and rewards.'
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: 'Streak Freeze System',
      desc: 'Automatic protection logic that consumes freezes on sick days to save your hard-earned streaks.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-pink-400" />,
      title: 'Realtime Updates',
      desc: 'Instant Socket.IO sync: see peer activity logs, updates, and solves stream live on your screen.'
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      title: 'Dynamic Leaderboards',
      desc: 'Rankings calculated with consistency scores, solving times, and streaks prioritized over volume.'
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      title: 'Social Activity Feed',
      desc: 'Realtime social feed aggregating solves, streak milestones, freezes, and reminders.'
    },
    {
      icon: <GitCommit className="w-6 h-6 text-cyan-400" />,
      title: 'Challenge Rotation',
      desc: 'Decentralized challenge assignees keep group engagement fresh and foster team responsibility.'
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      title: 'Group Accountability',
      desc: 'Strict peer accountability: missed deadlines flag slackers and trigger team reminders.'
    }
  ];

  return (
    <section className="py-24 border-t border-white/5 relative" id="features">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            A complete accountability toolkit.
          </h2>
          <p className="font-sans text-lg text-secondary" style={{ color: 'var(--text-secondary)' }}>
            PeerSolve integrates daily code execution with active social motivators to make DSA a habit.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel p-6 text-left hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
              style={{ minHeight: '220px' }}
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-11 h-11 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center mb-5">
                  {feat.icon}
                </div>
                <h3 className="font-display font-bold text-base text-white mb-3">{feat.title}</h3>
                <p className="font-sans text-xs text-secondary leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
