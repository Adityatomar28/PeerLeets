import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden" id="final-cta">
      {/* Background visual helpers */}
      <div className="absolute inset-0 cta-grid-bg opacity-35 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full z-0 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-panel-glow p-12 md:p-20 text-center max-w-4xl mx-auto border-indigo-500/20 relative"
        >
          {/* Flame element */}
          <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <Flame className="w-6 h-6 text-orange-500 fill-current" />
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-6 tracking-tight">
            Start Building Consistency Today.
          </h2>

          <p className="font-sans text-secondary text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Join thousands of developers keeping each other accountable. Create a private group, invite your friends, and master problem-solving together.
          </p>

          <button className="btn-primary text-base py-4 px-10">
            Create Your Group <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
