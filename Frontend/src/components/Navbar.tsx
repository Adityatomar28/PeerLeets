import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Users, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Leaderboard', href: '#leaderboard-showcase' },
    { name: 'Testimonials', href: '#testimonials' },
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-base/80 border-b border-white/5 backdrop-blur-md'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(7, 9, 14, 0.8)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 z-50" onClick={(e) => handleLinkClick(e, '#')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20"
                 style={{
                   background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                   boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)'
                 }}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-white">
              Peer<span className="text-gradient" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Solve</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans font-medium text-sm text-secondary hover:text-white transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button className="font-sans font-semibold text-sm text-secondary hover:text-white transition-colors duration-200"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              Login
            </button>
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2 text-secondary hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-base/98 backdrop-blur-lg flex flex-col justify-center px-8"
            style={{
              backgroundColor: 'rgba(7, 9, 14, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              paddingTop: '80px'
            }}
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display font-semibold text-2xl text-secondary hover:text-white transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/5 my-4" />
              <button className="font-display font-semibold text-xl text-secondary hover:text-white py-2"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                Login
              </button>
              <button className="btn-primary flex items-center justify-center gap-2 py-4">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
