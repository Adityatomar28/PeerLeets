import { motion } from 'framer-motion';
import { UserPlus, Calendar, CheckSquare, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <UserPlus className="w-6 h-6 text-indigo-400" />,
      title: 'Assemble Your Squad',
      desc: 'Create a private group or join an existing one using an invite code. Perfect for friends or classmates.'
    },
    {
      num: '02',
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      title: 'Challenge Selection',
      desc: 'Every day, a member is selected to assign the challenge problem link, rotating accountability.'
    },
    {
      num: '03',
      icon: <CheckSquare className="w-6 h-6 text-indigo-400" />,
      title: 'Solve & Submit',
      desc: 'Solve the problem on LeetCode/Hackerrank and mark it complete on PeerSolve before the daily cutoff.'
    },
    {
      num: '04',
      icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
      title: 'Track Streaks & Leaderboards',
      desc: 'Build consistency metrics. Earn streak freezes, track leaderboard ranks, and keep the streak alive.'
    }
  ];

  return (
    <section className="py-24 border-t border-white/5 relative" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Consistency is a team sport.
          </h2>
          <p className="font-sans text-lg text-secondary" style={{ color: 'var(--text-secondary)' }}>
            PeerSolve turns solitary problem-solving into a collaborative habit loops. Here is how it works.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-start text-left relative p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors"
            >
              {/* Connector line (Desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[80%] w-full h-[1px] bg-gradient-to-r from-indigo-500/20 to-transparent z-0" />
              )}

              {/* Step Badge & Icon */}
              <div className="flex items-center justify-between w-full mb-6 z-10">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="font-mono font-black text-3xl text-white/10">{step.num}</span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg text-white mb-3 z-10">{step.title}</h3>
              <p className="font-sans text-sm text-secondary leading-relaxed z-10" style={{ color: 'var(--text-secondary)' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
