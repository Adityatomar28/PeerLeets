import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "What platforms can I solve on?",
      answer: "Currently, PeerSolve supports pasting problem links and verifying solves from LeetCode, HackerRank, GeeksforGeeks, and Codeforces. You solve the challenge directly on the target platform and enter the completion stats on PeerSolve."
    },
    {
      question: "How do streaks work?",
      answer: "A streak is incremented every day your squad challenge is solved before the 24-hour cutoff time. Consistent solving increases your point multiplier. If you fail to solve and have no freezes left, your streak resets back to 0."
    },
    {
      question: "What is a streak freeze?",
      answer: "Streak freezes are protective tokens that prevent your streak from resetting to 0 when you fail to solve a daily challenge. Each user receives 2 free streak freezes upon joining a group, and can earn more by maintaining milestones (e.g. every 7-day streak milestone rewards +1 freeze)."
    },
    {
      question: "Can I create private groups?",
      answer: "Yes, absolutely! All accountability groups in PeerSolve are private by default. When you create a group, a unique invite code is generated. Only users who enter that code can join your group."
    },
    {
      question: "How does challenge rotation work?",
      answer: "PeerSolve automatically rotates the daily 'Challenger' role among active group members. When it is your turn, you are responsible for picking today's challenge. If you do not assign a link within the first 2 hours of the slot, the system automatically falls back to selecting an unsolved challenge from our curated problem library."
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-24 border-t border-white/5 relative" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400 mb-6 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-lg text-secondary" style={{ color: 'var(--text-secondary)' }}>
            Learn more about streak multipliers, freeze policies, and how to configure your squad.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel overflow-hidden transition-all duration-300 border-white/5 hover:border-white/10"
              >
                {/* Header */}
                <div
                  onClick={() => toggleFAQ(idx)}
                  className="faq-question flex justify-between items-center p-6 cursor-pointer select-none"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white text-left pr-4">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                {/* Answer Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="faq-answer font-sans text-xs sm:text-sm text-secondary leading-relaxed border-t border-white/5 pt-4 text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
