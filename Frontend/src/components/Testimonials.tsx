import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  squad: string;
  avatarBg: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "PeerSolve completely changed my relationship with DSA. I used to practice for two days and stop. Now, with my college consistency squad, I haven't missed a single day in over two months.",
      author: "Aditya Tomar",
      role: "Software Engineer Intern",
      squad: "DSAConsistencySquad438",
      avatarBg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
    },
    {
      quote: "The Streak Freeze system is a lifesaver. On days when I have university exams, the freeze protects my streak. Knowing my teammates will see if I drop the ball keeps me extremely disciplined.",
      author: "Pooja Sharma",
      role: "CS Student",
      squad: "LeetCodeGrinders",
      avatarBg: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    },
    {
      quote: "I love the leaderboard consistency multiplier. It reward solving challenges day-by-day rather than cramming 30 problems on Sunday. A fantastic product for long-term skill acquisition.",
      author: "Vikram Sethi",
      role: "Full Stack Developer",
      squad: "FAANGAspirants2026",
      avatarBg: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 border-t border-white/5 relative" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-pink-500 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Loved by coding squads.
          </h2>
          <p className="font-sans text-lg text-secondary" style={{ color: 'var(--text-secondary)' }}>
            See how PeerSolve has helped thousands of developers build long-term problem-solving discipline.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative px-12">
          {/* Main Card viewport */}
          <div className="overflow-hidden min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-8 md:p-12 text-left relative flex flex-col justify-between w-full"
              >
                <Quote className="w-16 h-16 text-white/[0.03] absolute top-6 left-6 pointer-events-none" />
                
                <p className="font-sans text-lg md:text-xl text-white leading-relaxed relative z-10 mb-8 italic">
                  "{current.quote}"
                </p>

                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    {/* Fake Avatar */}
                    <div
                      className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-white text-base shadow-lg"
                      style={{ background: current.avatarBg }}
                    >
                      {current.author[0]}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{current.author}</h4>
                      <p className="font-sans text-[11px] text-muted" style={{ color: 'var(--text-muted)' }}>{current.role}</p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                    Group: {current.squad}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            style={{ borderStyle: 'solid' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            style={{ borderStyle: 'solid' }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'bg-indigo-500 w-6' : 'bg-white/10'
              }`}
              style={{ border: 'none' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
