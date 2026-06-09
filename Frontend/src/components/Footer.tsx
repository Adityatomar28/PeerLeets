import { Users } from 'lucide-react';

export default function Footer() {
  const productLinks = ['Features', 'How It Works', 'Leaderboard', 'FAQ'];
  const companyLinks = ['About Us', 'Careers', 'Contact', 'Blog'];
  const resourceLinks = ['Documentation', 'Privacy Policy', 'Terms of Service', 'Support'];

  return (
    <footer className="py-16 border-t border-white/5 bg-[#06080c] relative z-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-4 text-left flex flex-col items-start">
            <a href="#" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' }}>
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                Peer<span className="text-gradient" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Solve</span>
              </span>
            </a>
            <p className="font-sans text-xs text-secondary leading-relaxed max-w-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              A production-grade social accountability platform to build discipline, maintain DSA streaks, and solve coding challenges together with friends.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-secondary hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white mb-4">Product</h4>
            <div className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="font-sans text-xs text-secondary hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <a key={link} href="#" className="font-sans text-xs text-secondary hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white mb-4">Resources</h4>
            <div className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <a key={link} href="#" className="font-sans text-xs text-secondary hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white mb-4">Contact</h4>
            <p className="font-sans text-xs text-secondary leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              support@peersolve.dev<br />
              Bengaluru, India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-muted" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} PeerSolve. All rights reserved. Built with React, Framer Motion, and Prisma.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-[11px] text-muted hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
            <a href="#" className="font-sans text-[11px] text-muted hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
