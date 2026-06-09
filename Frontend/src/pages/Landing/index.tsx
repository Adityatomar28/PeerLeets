import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Flame, Trophy, ArrowRight, Menu, X, Users, Snowflake } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'activity'>('overview');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const testimonials = [
    {
      quote: "PeerSolve changed my relationship with DSA. I used to solve for two days and stop. Now, with my accountability squad, I haven't missed a single day in two months.",
      author: "Aditya Tomar",
      role: "SWE Intern",
      squad: "ConsistencySquad",
    },
    {
      quote: "The Streak Freeze system is a lifesaver. On exam days, the freeze protects my streak. Knowing my squad will see if I drop the ball keeps me disciplined.",
      author: "Pooja Sharma",
      role: "CS Student",
      squad: "LeetCodeGrinders",
    }
  ];

  return (
    <div className="relative overflow-hidden bg-background-base text-text-primary min-h-screen">
      {/* Decorative Grids */}
      <div className="grid-bg-overlay" />
      <div className="glow-spot-1" />
      <div className="glow-spot-2" />

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-background-surface/80 border-b border-border-subtle backdrop-blur-md' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2" onClick={(e) => handleLinkClick(e, '#')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-extrabold text-lg text-white">Peer<span className="text-accent-indigo">Solve</span></span>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans font-semibold text-xs text-text-secondary hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="font-sans font-semibold text-xs text-text-secondary hover:text-white">
              Login
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          <button className="md:hidden text-text-secondary hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-background-base/95 backdrop-blur-lg flex flex-col justify-center px-8 pt-20"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display font-extrabold text-2xl text-text-secondary hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <Link to="/login" className="font-display font-bold text-xl text-text-secondary hover:text-white">
                Login
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full py-6">Get Started <ArrowRight className="w-5 h-5 ml-1" /></Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-36 pb-20 flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-accent-indigo tracking-wider uppercase mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consistency Beats Motivation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-6 leading-[1.1]"
          >
            Stay Consistent.<br />
            Not Just <span className="bg-gradient-to-r from-accent-indigo via-indigo-400 to-pink-500 bg-clip-text text-transparent">Motivated.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-text-secondary max-w-xl mb-10 leading-relaxed"
          >
            Build coding discipline in private accountability groups. Solve daily challenges, maintain streaks, and rise up the leaderboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/signup">
              <Button className="w-full sm:w-auto px-8 py-6">Start Your First Group</Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-6">
                <Play className="w-4 h-4 fill-current mr-2" /> Watch Demo
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 border-t border-border-subtle bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">Consistency is a Team Sport</h2>
            <p className="font-sans text-text-secondary text-sm sm:text-base">
              PeerSolve replaces solitary coding routines with structured social feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Form a Squad', desc: 'Create a private group and share the invite code with 3-5 classmates or peers.' },
              { num: '02', title: 'Rotate Challengers', desc: 'Every day a member is assigned to pick and activate the problem link.' },
              { num: '03', title: 'Solve the Problem', desc: 'Complete the task on LeetCode and submit to update your status before cutoff.' },
              { num: '04', title: 'Build Momentum', desc: 'Maintain streak multipliers, use streak freezes, and compete on the leaderboard.' },
            ].map((step, idx) => (
              <div key={idx} className="bg-background-surface border border-border-subtle p-6 rounded-xl text-left flex flex-col justify-between h-48 hover:border-white/10 transition-colors">
                <span className="font-mono text-3xl font-black text-white/5">{step.num}</span>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-white mb-2">{step.title}</h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SHOWCASE */}
      <section id="features" className="py-24 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">Core Habit Loop Mechanics</h2>
            <p className="font-sans text-text-secondary">Everything you need to sustain consistency throughout your coding journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Flame className="w-5 h-5 text-orange-500 fill-current" />, title: 'Streak Engine', desc: 'Tracks consecutive daily solves, building point multipliers.' },
              { icon: <Snowflake className="w-5 h-5 text-purple-400" />, title: 'Streak Freeze System', desc: 'Protects streaks automatically on sick days, preventing reset frustration.' },
              { icon: <Trophy className="w-5 h-5 text-amber-500" />, title: 'Dynamic Leaderboards', desc: 'Ranks players based on streak consistency multipliers, not just volume.' },
            ].map((feat, idx) => (
              <div key={idx} className="bg-background-surface border border-border-subtle p-6 rounded-xl text-left hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">{feat.icon}</div>
                <h3 className="font-display font-extrabold text-sm text-white mb-2">{feat.title}</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE PLATFORM PREVIEW */}
      <section id="leaderboard" className="py-24 border-t border-border-subtle bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">Dynamic Realtime Dashboard</h2>
            <p className="font-sans text-text-secondary">Explore the high-fidelity UI that keeps squads synchronized.</p>
          </div>

          <div className="bg-background-surface border border-border-subtle rounded-xl overflow-hidden shadow-glow">
            {/* Tabs */}
            <div className="flex border-b border-border-subtle bg-[#121620] p-1 gap-1">
              {['overview', 'leaderboard', 'activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-indigo-500 text-white shadow-md' : 'text-text-secondary hover:text-white'
                  }`}
                  style={{ border: 'none' }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 min-h-[300px] text-left">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1C212E] p-6 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono text-accent-indigo font-bold tracking-wider uppercase block mb-1">Active Challenge</span>
                    <h3 className="font-display font-extrabold text-lg text-white mb-3">Two Sum (LeetCode #1)</h3>
                    <p className="font-sans text-xs text-text-secondary mb-4">Given an array of integers, return indices of the two numbers such that they add up to a target.</p>
                    <div className="flex gap-4">
                      <span className="text-xs text-accent-emerald font-semibold">2 Solved</span>
                      <span className="text-xs text-text-muted">12 hours left</span>
                    </div>
                  </div>
                  <div className="bg-[#1C212E] p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-accent-indigo font-bold tracking-wider uppercase block mb-3">Your Stats</span>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-display font-extrabold text-white block">12 Days</span>
                        <span className="text-[10px] text-text-secondary uppercase">Current Streak</span>
                      </div>
                      <Flame className="w-8 h-8 text-orange-500 fill-current" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'leaderboard' && (
                <div className="flex flex-col gap-3">
                  {[
                    { rank: 1, name: 'Alice Smith', streak: 12, solved: 32, points: 280 },
                    { rank: 2, name: 'Bob Johnson', streak: 8, solved: 28, points: 210 },
                    { rank: 3, name: 'Charlie Dave', streak: 2, solved: 15, points: 140 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg bg-[#1C212E]/50 border border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-black text-text-muted">#{user.rank}</span>
                        <span className="font-display font-bold text-xs text-white">{user.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-mono text-xs text-orange-400 font-bold flex items-center gap-0.5">
                          <Flame className="w-3.5 h-3.5 fill-current" /> {user.streak}d
                        </span>
                        <span className="font-mono text-xs text-text-secondary">{user.solved} solved</span>
                        <span className="font-mono text-xs font-bold text-white">{user.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="flex flex-col gap-3">
                  {[
                    { msg: 'Alice Smith solved Two Sum 🔥', time: '5m ago' },
                    { msg: 'Bob Johnson activated challenge slot 🧠', time: '1h ago' },
                    { msg: 'Charlie Dave protected streak with a freeze ❄️', time: '3h ago' },
                  ].map((act, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-[#1C212E]/50 border border-white/5">
                      <span className="font-sans text-xs text-white">{act.msg}</span>
                      <span className="font-mono text-[9px] text-text-muted">{act.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="w-12 h-12 text-white/5 mx-auto mb-6" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-6">Loved by coding squads</h2>
          <p className="font-sans text-base sm:text-lg text-text-secondary italic mb-6">
            "{testimonials[testimonialIdx].quote}"
          </p>
          <span className="font-display font-bold text-sm text-white block">{testimonials[testimonialIdx].author}</span>
          <span className="font-sans text-xs text-text-muted block mt-1">{testimonials[testimonialIdx].role} • {testimonials[testimonialIdx].squad}</span>
          
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIdx(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  testimonialIdx === idx ? 'bg-indigo-500 w-6' : 'bg-white/10'
                }`}
                style={{ border: 'none' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-border-subtle bg-white/[0.005]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-center text-white mb-12">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4 text-left">
            {[
              { q: 'How do streaks work?', a: 'A streak counts consecutive days that today\'s group challenge is solved before cutoff.' },
              { q: 'What is a streak freeze?', a: 'Each user starts with 2 streak freezes, protecting the streak multiplier on sick/busy days.' },
              { q: 'Can I create private groups?', a: 'Yes! All accountability groups in PeerSolve are private and require an invite code to join.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-background-surface border border-border-subtle p-6 rounded-xl">
                <h4 className="font-display font-extrabold text-sm text-white mb-2">{faq.q}</h4>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-6 leading-tight">Start Building Consistency Today</h2>
          <p className="font-sans text-text-secondary text-sm sm:text-base max-w-xl mx-auto mb-10">
            Join thousands of developers keeping each other accountable. Create a group, invite friends, and master problem solving together.
          </p>
          <Link to="/signup">
            <Button size="lg">Create Your Group <ArrowRight className="w-5 h-5 ml-2" /></Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border-subtle bg-[#0a0c12]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-xs text-white">PeerSolve</span>
          </div>
          <span className="font-sans text-[10px] text-text-muted">
            © {new Date().getFullYear()} PeerSolve. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

function Quote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21c3 0 7-9 7-14a5 5 0 0 0-5-5H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 1-2 2H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 1-2 2H4a1 1 0 0 0-1 1zm11 0c3 0 7-9 7-14a5 5 0 0 0-5-5h-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 1-2 2h-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 1-2 2h-1a1 1 0 0 0-1 1z" />
    </svg>
  );
}
