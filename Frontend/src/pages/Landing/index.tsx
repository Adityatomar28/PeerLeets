import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/react';
import { 
  Play, Sparkles, Flame, Trophy, ArrowRight, Menu, X, Users, Snowflake, 
  Code2, CalendarRange, Activity, Terminal, CheckCircle2, 
  ChevronDown, Monitor, RefreshCw, Sun, Moon
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

// Mouse-reactive Interactive Particle Background Canvas
interface Canvas3DProps {
  theme: 'dark' | 'light';
}

function Canvas3D({ theme }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particleCount = 75;
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
    }
    const particles: Point3D[] = [];
    const radius = 280;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.02 + Math.random() * 0.05,
      });
    }

    let angleX = 0.0008;
    let angleY = 0.0012;
    const fov = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const projected: { x: number; y: number; z: number; px: number; py: number }[] = [];
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Rotate and project points
      particles.forEach((p) => {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;

        p.x = x;
        p.y = y;
        p.z = z;

        const distance = 480;
        const scale = fov / (fov + z + distance);
        let px = x * scale + width / 2;
        let py = y * scale + height / 2;

        // Mouse reaction: gentle pull towards mouse cursor
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - px;
          const dy = mouseRef.current.y - py;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 220) {
            const force = (220 - distToMouse) / 220;
            px += dx * force * 0.08;
            py += dy * force * 0.08;
          }
        }

        projected.push({ x, y, z, px, py });
      });

      const lineColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.06)' : 'rgba(79, 70, 229, 0.04)';
      const nodeColor = theme === 'dark' ? 'rgba(236, 72, 153, 0.25)' : 'rgba(217, 119, 6, 0.25)';

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dz = projected[i].z - projected[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 190) {
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw extra connections from mouse
      if (mouseRef.current.active) {
        ctx.strokeStyle = theme === 'dark' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(79, 70, 229, 0.08)';
        projected.forEach((p) => {
          const dx = mouseRef.current.x - p.px;
          const dy = mouseRef.current.y - p.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(p.px, p.py);
            ctx.stroke();
          }
        });
      }

      // Draw nodes
      projected.forEach((p) => {
        const radiusScale = 400 / (400 + p.z + 480);
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1, 3 * radiusScale), 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// Player interface for live sorting leaderboard
interface Player {
  id: string;
  name: string;
  streak: number;
  solved: number;
  points: number;
  avatarBg: string;
  movement?: 'up' | 'down' | 'same';
}

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activePreviewTab, setActivePreviewTab] = useState<'challenge' | 'leaderboard' | 'matrix' | 'feed'>('challenge');

  // Search Invite State
  const [inviteCode, setInviteCode] = useState('');
  const [squadSearchStatus, setSquadSearchStatus] = useState<string | null>(null);
  const [isSearchingSquad, setIsSearchingSquad] = useState(false);

  // FAQ Accordion State
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  // Demo Modal
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Live Socket Feed Simulation State
  const [socketLogs, setSocketLogs] = useState<{ id: string; msg: string; time: string; tag: string; type: string }[]>([
    { id: '1', msg: 'Aditya Tomar solved "Merge Intervals" (LeetCode Medium) 🔥', time: 'Just now', tag: 'Streak: 45 days', type: 'solve' },
    { id: '2', msg: 'Rohan Verma reached "Grandmaster Solver" XP milestone 🏆', time: '2m ago', tag: 'Level Up', type: 'milestone' },
    { id: '3', msg: 'DevLoopers coordinator set today\'s challenge to "Two Sum" 🧠', time: '10m ago', tag: 'Challenge Pick', type: 'system' }
  ]);

  // Live Leaderboard Showcase State (Rank swap animation)
  const [leaderboardPlayers, setLeaderboardPlayers] = useState<Player[]>([
    { id: 'a', name: 'Aditya Tomar', streak: 45, solved: 112, points: 1450, avatarBg: 'from-orange-500 to-red-500', movement: 'same' },
    { id: 'c', name: 'Rohan Verma', streak: 32, solved: 94, points: 1380, avatarBg: 'from-emerald-500 to-teal-500', movement: 'same' },
    { id: 'd', name: 'Kunal Patel', streak: 18, solved: 76, points: 1120, avatarBg: 'from-pink-500 to-rose-500', movement: 'same' },
  ]);

  // Testimonials state
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Sync theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic Leaderboard reordering to simulate rank swaps
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboardPlayers((prev) => {
        const next = [...prev];
        // Pick a random player and increment their details
        const randIdx = Math.floor(Math.random() * next.length);
        const player = { ...next[randIdx] };
        
        const scoreGain = Math.floor(Math.random() * 60) + 40;
        player.points += scoreGain;
        player.solved += 1;
        player.streak += 1;
        next[randIdx] = player;

        // Sort descending by points
        const sorted = next.sort((x, y) => y.points - x.points);
        
        // Update rank movements
        return sorted.map((p, index) => {
          const oldIndex = prev.findIndex((old) => old.id === p.id);
          let movement: 'up' | 'down' | 'same' = 'same';
          if (oldIndex > index) movement = 'up';
          else if (oldIndex < index) movement = 'down';
          return { ...p, movement };
        });
      });
      
      // Push event into socket feed
      const names = ['Aditya Tomar', 'Rohan Verma', 'Kunal Patel'];
      const challenges = ['Merge Intervals', 'Two Sum', 'LRU Cache', 'Valid Parentheses', 'Climbing Stairs'];
      const randName = names[Math.floor(Math.random() * names.length)];
      const randChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      
      setSocketLogs((prev) => [
        {
          id: Date.now().toString(),
          msg: `${randName} solved "${randChallenge}" 🔥`,
          time: 'Just now',
          tag: 'Streak updated',
          type: 'solve'
        },
        ...prev.slice(0, 4)
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Invite code search feedback
  useEffect(() => {
    if (!inviteCode) {
      setSquadSearchStatus(null);
      return;
    }
    setIsSearchingSquad(true);
    const timeout = setTimeout(() => {
      setIsSearchingSquad(false);
      const cleanCode = inviteCode.toUpperCase().trim();
      if (cleanCode.startsWith('ALPHA') || cleanCode === 'ALPHA-404') {
        setSquadSearchStatus("Squad 'AlphaByte' found (3/5 members) • Focus: Arrays & DP • Cutoff: 11:59 PM EST");
      } else if (cleanCode.startsWith('LEET') || cleanCode === 'LEET-202') {
        setSquadSearchStatus("Squad 'LeetForce' found (4/5 members) • Focus: SQL & Graphs • Cutoff: 08:00 PM PST");
      } else if (cleanCode.length >= 3) {
        setSquadSearchStatus("Squad matching invite code found! Connect to join instantly.");
      } else {
        setSquadSearchStatus("Searching squad databases...");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [inviteCode]);

  const navLinks = [
    { name: 'Problem', href: '#problem' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Live Preview', href: '#preview' },
    { name: 'Streak Engine', href: '#streak-engine' },
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

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleMockJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode) {
      toast.error("Please enter an invite code first!");
      return;
    }
    toast.success(`Redirecting to join squad: ${inviteCode.toUpperCase()}`);
  };

  const testimonials = [
    {
      quote: "PeerSolve completely fixed my coding consistency. I used to study for two days and stop for two weeks. With my accountability group, I haven't missed a single day in over 45 days. The social contract works.",
      author: "Aditya Tomar",
      role: "Incoming Software Engineer @ Microsoft",
      squad: "ConsistentDevs",
      avatarBg: "from-orange-500 to-red-500"
    },
    {
      quote: "The Streak Freeze system is a lifesaver. On exam nights, I activate a freeze to protect my progress multiplier. Knowing my peers will see if I drop the ball is what keeps me coding.",
      author: "Pooja Sharma",
      role: "CS Senior @ Georgia Tech",
      squad: "LeetCodeGrinders",
      avatarBg: "from-indigo-500 to-purple-500"
    },
    {
      quote: "Daily challenge rotation makes solving fun. Instead of choosing a random problem, we rotate picks so everyone gets to set the daily coordinator goals. Highly recommend it.",
      author: "Rohan Verma",
      role: "Fullstack Developer @ Stripe",
      squad: "DevLoopers",
      avatarBg: "from-emerald-500 to-teal-500"
    }
  ];

  const faqItems = [
    { q: 'How do streaks work on PeerSolve?', a: 'A streak represents consecutive days your squad solves the daily selected LeetCode challenge. Cutoffs are customized based on group timezone preferences.' },
    { q: 'What is a streak freeze and how is it used?', a: 'Each user is allocated 2 streak freezes. If life gets too busy or you have exams, activating a freeze protects both your personal and group streak multiplier.' },
    { q: 'Are accountability groups public or private?', a: 'All groups are completely private. Members can only join via a secure, unique invite code generated by the group coordinator.' },
    { q: 'What is the optimal size of a squad?', a: 'We restrict squad sizes to 3-5 members. This ensures close accountability, active messaging, and strong peer relationships.' },
    { q: 'Does PeerSolve connect directly to my LeetCode profile?', a: 'Yes! We sync with LeetCode API to auto-verify your solves in near real-time, eliminating manual verification.' },
    { q: 'What happens if a member misses a daily challenge?', a: 'If a member misses a challenge without a streak freeze, the group streak resets to 0. The positive social pressure keeps everyone motivated.' }
  ];

  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden font-sans transition-colors duration-400">
      {/* Noise overlay texture */}
      <div className="noise-overlay" />
      
      {/* Grids and glowing spotlights */}
      <div className="grid-bg-overlay" />
      <div className="glow-spot-1" />
      <div className="glow-spot-2" />
      <div className="glow-spot-3" />

      {/* Mouse reactive particle background */}
      <Canvas3D theme={theme} />

      {/* NAVIGATION BAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3.5 bg-[var(--nav-bg)] border-b border-[var(--border-subtle)] backdrop-blur-md shadow-lg shadow-black/5' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5" onClick={(e) => handleLinkClick(e, '#')}>
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <Users className="w-4.5 h-4.5 text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 opacity-20 blur-sm -z-10 animate-pulse" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-[var(--text-primary)]">
              Peer<span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">Solve</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans font-semibold text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA actions */}
          <div className="hidden md:flex items-center gap-5">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-light)] transition-all active:scale-95 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="font-sans font-semibold text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-1">
                    Start Your First Group <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link to="/dashboard">
                <Button size="sm" variant="secondary">Dashboard</Button>
              </Link>
              <UserButton />
            </Show>
          </div>

          <button className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer mr-1"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
            </button>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[var(--bg-base)] backdrop-blur-xl flex flex-col justify-center px-8 pt-20"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display font-extrabold text-2xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-[var(--border-subtle)] my-4" />
              <Link to="/login" className="font-display font-bold text-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Login
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full py-6 text-base">Get Started <ArrowRight className="w-5 h-5 ml-1" /></Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-screen pt-48 pb-24 flex flex-col justify-center items-center px-6 z-10">
        
        {/* HERO WIDGETS: Floating 3D elements in parallax */}
        {/* Floating Card 1: Active challenge */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="hidden xl:block absolute left-8 top-[32%] w-64 bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] p-4 rounded-2xl backdrop-blur-md shadow-2xl hover:border-indigo-500/20 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Active Challenge</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">Easy</span>
          </div>
          <div className="text-lg font-display font-bold text-[var(--text-primary)] mb-1">Two Sum</div>
          <p className="text-[10px] text-[var(--text-secondary)] mb-4">Find indices of the two numbers that add up to a target.</p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] text-[var(--text-secondary)]">
              <span>Squad Solved:</span>
              <span className="text-[var(--text-primary)] font-semibold">3/5 Solved</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-black/20 dark:bg-white/5 overflow-hidden">
              <div className="w-[60%] h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Floating Card 2: Live Leaderboard */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
          className="hidden xl:block absolute right-8 top-[28%] w-72 bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] p-4.5 rounded-2xl backdrop-blur-md shadow-2xl hover:border-pink-500/20 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider">Squad Leaderboard</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="space-y-2.5">
            {[
              { rank: 1, name: 'Aditya Tomar', streak: 45, pts: 1450 },
              { rank: 2, name: 'Rohan Verma', streak: 32, pts: 1380 }
            ].map((u) => (
              <div key={u.rank} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-[var(--bg-base)]/40 border border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] font-bold">#{u.rank}</span>
                  <span className="font-semibold text-[var(--text-primary)]">{u.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-orange-400 font-bold flex items-center">
                    <Flame className="w-3 h-3 fill-current mr-0.5" /> {u.streak}d
                  </span>
                  <span className="font-bold text-[var(--text-primary)]">{u.pts} pts</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating Card 3: Realtime Feed Alert */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1 }}
          className="hidden xl:block absolute left-14 bottom-[18%] w-64 bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] p-3.5 rounded-2xl backdrop-blur-md shadow-2xl hover:border-emerald-500/20 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Realtime Activity</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulsing-glow" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/25 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-orange-500 fill-current" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-[var(--text-primary)] block">Aditya solved today!</span>
              <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">Maintain streak: 45 days</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Card 4: Streak Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 1.5 }}
          className="hidden xl:block absolute right-14 bottom-[16%] w-56 bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] p-4 rounded-2xl backdrop-blur-md shadow-2xl hover:border-amber-500/20 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-amber-500 font-bold uppercase">Personal Streak</span>
            <Snowflake className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="text-2xl font-display font-extrabold text-[var(--text-primary)] block">12 Days</span>
              <span className="text-[10px] text-[var(--text-secondary)] block uppercase tracking-wider mt-0.5">Active combo</span>
            </div>
            <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle cx="22" cy="22" r="18" fill="transparent" stroke="var(--border-subtle)" strokeWidth="3" />
                <circle cx="22" cy="22" r="18" fill="transparent" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="113" strokeDashoffset="28" />
              </svg>
              <Flame className="w-4 h-4 text-amber-500 fill-current absolute" />
            </div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-[var(--border-subtle)] text-[10px] font-bold text-indigo-400 tracking-wider uppercase mb-8 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Consistency Beats Motivation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[var(--text-primary)] mb-6 leading-[1.05]"
          >
            Stay Consistent.<br />
            Not Just <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Motivated.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mb-12 leading-relaxed"
          >
            Build coding discipline through private accountability groups, daily rotated challenge settings, streaks, and real-time multiplayer competition.
          </motion.p>

          {/* Interactive Invite Search code box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="w-full max-w-2xl bg-[var(--bg-surface-light)]/85 border border-[var(--border-subtle)] p-2.5 rounded-2xl shadow-xl flex flex-col gap-2.5 md:flex-row md:items-center relative"
          >
            <div className="flex-1 flex items-center gap-2 px-3">
              <Terminal className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
              <input 
                type="text" 
                placeholder="Enter Squad Invite Code (e.g. ALPHA-404, LEET-202)"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] w-full"
              />
            </div>
            
            <div className="h-px md:h-6 w-full md:w-px bg-[var(--border-subtle)]" />

            <div className="px-3 text-left">
              <select className="bg-transparent border-none outline-none text-xs text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] font-medium">
                <option value="easy-med">Focus: Leetcode Easy & Med</option>
                <option value="hard">Focus: Leetcode Hard</option>
                <option value="system-design">Focus: System Design</option>
              </select>
            </div>

            <Button onClick={handleMockJoin} className="w-full md:w-auto px-6 py-2.5 text-xs bg-indigo-500 hover:bg-indigo-600 transition-colors">
              Join Squad
            </Button>

            {/* Live Search status notifications */}
            {inviteCode && (
              <div className="absolute top-full left-0 right-0 mt-3 p-3 rounded-xl bg-[var(--bg-surface-light)] border border-indigo-500/20 text-[11px] text-indigo-400 text-left flex items-center gap-2.5 shadow-lg z-25">
                {isSearchingSquad ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Searching squad databases...</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    <span>{squadSearchStatus}</span>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-14 justify-center"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 py-3.5">Start Your First Group</Button>
            </Link>
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface-light)] hover:border-white/20 transition-all font-sans font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM (SPLIT SCREEN COMPARISON: CODING ALONE VS SQUAD ROOM) */}
      <section id="problem" className="py-32 border-t border-[var(--border-subtle)] bg-white/[0.001]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono text-indigo-400 font-bold tracking-widest uppercase bg-indigo-500/5 border border-indigo-500/10 px-3 py-1 rounded-full">
              Stop Relying On Motivation
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] mt-6 mb-6 tracking-tight">
              Accountability Beats Motivation
            </h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Most people fail because they study alone. PeerSolve creates consistency through daily challenges, streaks, leaderboards, and group pressure.
            </p>
          </div>

          {/* Split Screen Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* LEFT SIDE: WITHOUT PEERSOLVE */}
            <div className="premium-card p-8 bg-[#090b10]/40 border-red-500/10 hover:border-red-500/15 flex flex-col justify-between group transition-all duration-300">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <span className="text-xs font-mono font-bold tracking-wider text-red-500 uppercase">Coding Alone</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Stagnant Flow</span>
                </div>

                {/* Calendar Solve History Grid */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider block text-left">Weekly Consistency</span>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { day: 'Mon', solved: true, icon: '✓' },
                      { day: 'Tue', solved: true, icon: '✓' },
                      { day: 'Wed', solved: false, icon: '✗' },
                      { day: 'Thu', solved: false, icon: '✗' },
                      { day: 'Fri', solved: false, icon: '✗' },
                      { day: 'Sat', solved: false, icon: '✗' },
                      { day: 'Sun', solved: false, icon: '✗' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        <span className="text-[9px] font-mono text-[var(--text-muted)]">{item.day}</span>
                        <div className={`w-full aspect-square rounded-lg border flex items-center justify-center text-xs font-bold ${
                          item.solved 
                            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
                            : 'bg-red-500/10 border-red-500/20 text-red-500/80'
                        }`}>
                          {item.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stat list */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                  <div className="p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-left">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase block">Current Streak</span>
                    <span className="text-xl font-display font-black text-[var(--text-muted)]">0 Days</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-left">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase block">Leaderboard</span>
                    <span className="text-xs font-display font-bold text-[var(--text-muted)]">None (No Friends)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-left">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase block">Accountability</span>
                    <span className="text-xs font-display font-bold text-[var(--text-muted)]">None (Easy to quit)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-left">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase block">Group Pressure</span>
                    <span className="text-xs font-display font-bold text-[var(--text-muted)]">None</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-left p-3.5 rounded-xl bg-red-500/5 border border-red-500/10 text-[11px] text-red-400 leading-relaxed flex items-start gap-2">
                <span className="text-sm leading-none mt-0.5">⚠️</span>
                <span>Without commitment nodes, 88% of developers quit coding routines by Day 3. Motivation alone is not enough.</span>
              </div>
            </div>

            {/* RIGHT SIDE: WITH PEERSOLVE */}
            <div className="premium-card p-8 bg-gradient-to-br from-[var(--bg-surface)] via-[#0e1428]/95 to-[var(--bg-surface)] border-indigo-500/20 hover:border-indigo-500/30 flex flex-col justify-between group transition-all duration-300 shadow-[0_0_50px_-12px_rgba(99,102,241,0.12)]">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulsing-glow" />
                    <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">With PeerSolve</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Active Squad Room</span>
                </div>

                {/* Challenge and progress card */}
                <div className="p-4.5 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase block mb-0.5">Today's Challenge</span>
                    <h4 className="font-display font-extrabold text-sm text-[var(--text-primary)]">Merge Sorted Array</h4>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded mt-1 inline-block">Easy</span>
                  </div>
                  
                  <div className="text-left sm:text-right space-y-1">
                    <div className="flex justify-between sm:justify-end gap-3 text-[10px] font-semibold">
                      <span>Group Progress:</span>
                      <span className="text-indigo-400">7/8 Solved</span>
                    </div>
                    <div className="w-full sm:w-32 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="w-[87.5%] h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Leaderboard and Live Feed Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Leaderboard panel */}
                  <div className="p-4 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] space-y-2.5 text-left">
                    <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider block">Squad Ranks</span>
                    <div className="space-y-2">
                      {[
                        { rank: 1, name: 'Aditya', streak: 30, color: 'text-amber-500', av: 'from-orange-500 to-red-500' },
                        { rank: 2, name: 'Rahul', streak: 18, color: 'text-slate-400', av: 'from-indigo-500 to-purple-500' },
                        { rank: 3, name: 'Neha', streak: 12, color: 'text-amber-700', av: 'from-pink-500 to-rose-500' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[10px] py-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-mono font-bold ${item.color}`}>#{item.rank}</span>
                            <div className={`w-4.5 h-4.5 rounded-full bg-gradient-to-br ${item.av} flex items-center justify-center text-[7px] text-white font-bold uppercase`}>
                              {item.name.charAt(0)}
                            </div>
                            <span className="font-semibold">{item.name}</span>
                          </div>
                          <span className="font-mono text-orange-400 font-bold flex items-center gap-0.5">
                            <Flame className="w-3 h-3 fill-current" /> {item.streak}d
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity stream ticker */}
                  <div className="p-4 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] space-y-2.5 text-left">
                    <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider block">Activity Feed</span>
                    <div className="space-y-2 text-[9px] font-mono leading-relaxed text-[var(--text-secondary)]">
                      <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                        <span>Rahul solved today's challenge 🚀</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                        <span>Neha became first solver 🏆</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                        <span>Aditya reached a 30 day streak 🔥</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-left">
                    <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase block">Current Streak</span>
                    <span className="text-xl font-display font-black text-orange-500 flex items-center gap-1">
                      <Flame className="w-5 h-5 fill-current animate-pulse" /> 30 Days
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-left">
                    <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase block">Completion Rate</span>
                    <span className="text-xl font-display font-black text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 92%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-left p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] text-emerald-400 leading-relaxed flex items-start gap-2">
                <span className="text-sm leading-none mt-0.5">💡</span>
                <span>Classmates solve challenges together, driving consistency through transparent progress, peer tracking, and visual streaks.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (BEAUTIFUL TIMELINE) */}
      <section id="how-it-works" className="py-32 border-t border-[var(--border-subtle)] bg-white/[0.002]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-[10px] font-mono text-indigo-500 tracking-widest uppercase font-bold">The Playbook</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--text-primary)] mt-2 mb-4">How PeerSolve Works</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base">
              Five structured steps designed to construct bulletproof coding habits with your peers.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-subtle)] -translate-x-1/2" />

            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-stretch mb-14">
              <div className="flex items-center md:w-1/2 md:justify-end md:pr-12 pl-12 md:pl-0">
                <div className="premium-card p-6.5 text-left hover:border-indigo-500/20 max-w-md">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">Step 01</span>
                  <h4 className="font-display font-bold text-sm text-[var(--text-primary)] mb-2">Create or Join a Squad</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Form a private group of 3-5 peers and share your squad invite code. Set timezones and daily time cutoff goals.</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-indigo-500 flex items-center justify-center -translate-x-1/2 z-10 text-xs font-bold text-indigo-400 shadow shadow-indigo-500/10">1</div>
              <div className="md:w-1/2" />
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-stretch mb-14">
              <div className="md:w-1/2" />
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-pink-500 flex items-center justify-center -translate-x-1/2 z-10 text-xs font-bold text-pink-400 shadow shadow-pink-500/10">2</div>
              <div className="flex items-center md:w-1/2 pl-12 md:pl-12">
                <div className="premium-card p-6.5 text-left hover:border-pink-500/20 max-w-md">
                  <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider block mb-1">Step 02</span>
                  <h4 className="font-display font-bold text-sm text-[var(--text-primary)] mb-2">Receive Daily Challenges</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Every morning, the system assigns a rotating problem pick slot to one coordinator. A LeetCode challenge link goes active.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-stretch mb-14">
              <div className="flex items-center md:w-1/2 md:justify-end md:pr-12 pl-12 md:pl-0">
                <div className="premium-card p-6.5 text-left hover:border-emerald-500/20 max-w-md">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">Step 03</span>
                  <h4 className="font-display font-bold text-sm text-[var(--text-primary)] mb-2">Solve and Submit</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Write and execute your code on LeetCode. PeerSolve automatically fetches profile sub state and updates your status.</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-emerald-500 flex items-center justify-center -translate-x-1/2 z-10 text-xs font-bold text-emerald-400 shadow shadow-emerald-500/10">3</div>
              <div className="md:w-1/2" />
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-stretch mb-14">
              <div className="md:w-1/2" />
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-amber-500 flex items-center justify-center -translate-x-1/2 z-10 text-xs font-bold text-amber-400 shadow shadow-amber-500/10">4</div>
              <div className="flex items-center md:w-1/2 pl-12 md:pl-12">
                <div className="premium-card p-6.5 text-left hover:border-amber-500/20 max-w-md">
                  <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block mb-1">Step 04</span>
                  <h4 className="font-display font-bold text-sm text-[var(--text-primary)] mb-2">Maintain Your Streak</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Ensure everyone solves daily before cutoff limit. Activate streak freezes on sick or busy days to protect multipliers.</p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-stretch">
              <div className="flex items-center md:w-1/2 md:justify-end md:pr-12 pl-12 md:pl-0">
                <div className="premium-card p-6.5 text-left hover:border-indigo-500/20 max-w-md">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">Step 05</span>
                  <h4 className="font-display font-bold text-sm text-[var(--text-primary)] mb-2">Compete Global Ranks</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Rise up global squad rankings, unlock custom consistency badges, and level up your engineering profiles.</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-indigo-500 flex items-center justify-center -translate-x-1/2 z-10 text-xs font-bold text-indigo-400 shadow shadow-indigo-500/10">5</div>
              <div className="md:w-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES GRID (10 CARDS) */}
      <section id="features" className="py-32 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-mono text-indigo-500 tracking-widest uppercase font-bold">The Engine</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--text-primary)] mt-2 mb-4">Features Engineered for Habits</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base">
              Social pressure and gamification loops designed to keep engineers coding daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Code2 className="text-indigo-400 w-5 h-5" />, title: "Daily Challenges", desc: "Hand-picked daily coding challenges on Leetcode, HackerRank, or custom slots." },
              { icon: <RefreshCw className="text-pink-400 w-5 h-5" />, title: "Challenge Rotation", desc: "Problem picker duty rotates daily across squad members to keep tasks engaging." },
              { icon: <Activity className="text-emerald-400 w-5 h-5" />, title: "Realtime Activity Feed", desc: "Instant websocket feed updates when classmates code, making consistency visible." },
              { icon: <Trophy className="text-amber-500 w-5 h-5" />, title: "Leaderboard Engine", desc: "Point multipliers track squad rankings based on consecutive streak consistency." },
              { icon: <Flame className="text-orange-500 w-5 h-5" />, title: "Streak System", desc: "Visual consecutive daily progress matrices keep squads motivated not to break chains." },
              { icon: <Snowflake className="text-indigo-400 w-5 h-5" />, title: "Freeze System", desc: "Two free freeze buffers protect streaks when exams or vacation delays work." },
              { icon: <Monitor className="text-indigo-400 w-5 h-5" />, title: "Socket.IO Realtime", desc: "Ensures latency-free notifications when someone completes their daily solve." },
              { icon: <Users className="text-emerald-400 w-5 h-5" />, title: "Group Accountability", desc: "Restricts squad sizes to 3-5 members to maximize communication and pressure." },
              { icon: <CalendarRange className="text-pink-400 w-5 h-5" />, title: "Activity Timeline", desc: "Visualize squad consistency graphs over weeks and months to review routines." },
              { icon: <Terminal className="text-indigo-400 w-5 h-5" />, title: "Challenge History", desc: "Archive completed problems, solution codes, and discussion notes for revision." }
            ].map((feat, idx) => (
              <div key={idx} className="premium-card p-6.5 text-left hover:border-white/10 group">
                <div className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/[0.03] border border-[var(--border-subtle)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="font-display font-bold text-sm text-[var(--text-primary)] mb-2">{feat.title}</h3>
                <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: LIVE PLATFORM PREVIEW */}
      <section id="preview" className="py-32 border-t border-[var(--border-subtle)] bg-white/[0.001]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-indigo-500 font-bold tracking-widest uppercase">High Fidelity Workspace</span>
            <h2 className="font-display font-extrabold text-4xl text-[var(--text-primary)] mt-2 mb-4">Live Platform Preview</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base">Explore the realtime dashboard workspace synchronizing squads.</p>
          </div>

          <div className="bg-[var(--bg-surface)]/95 border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl relative max-w-5xl mx-auto">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4.5 border-b border-[var(--border-subtle)] bg-[var(--stat-box)] gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="text-[10px] font-mono text-[var(--text-muted)] ml-3">squad-dashboard.peersolve.com</span>
              </div>
              
              {/* Tab Selector */}
              <div className="flex gap-1.5 p-1 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                {[
                  { id: 'challenge', label: 'Challenge Card' },
                  { id: 'leaderboard', label: 'Leaderboard' },
                  { id: 'matrix', label: 'Participation Grid' },
                  { id: 'feed', label: 'Realtime Feed' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreviewTab(tab.id as any)}
                    className={`text-[10px] font-sans font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                      activePreviewTab === tab.id 
                        ? 'bg-[var(--bg-surface-light)] text-indigo-400 border border-indigo-500/10'
                        : 'text-[var(--text-secondary)] hover:text-white border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inner Dashboard Mockup Area */}
            <div className="p-8 min-h-[380px] text-left">
              <AnimatePresence mode="wait">
                {activePreviewTab === 'challenge' && (
                  <motion.div
                    key="challenge"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
                  >
                    <div className="md:col-span-8 space-y-4">
                      <div>
                        <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase block mb-1">Today's Task</span>
                        <h3 className="text-2xl font-display font-extrabold text-[var(--text-primary)]">Merge Intervals (LeetCode #56)</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">Given an array of intervals, merge all overlapping intervals, and return an array of the non-overlapping intervals.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] space-y-3">
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Input Constraints</span>
                        <code className="text-[10px] font-mono text-indigo-300 block">1 &lt;= intervals.length &lt;= 10^4<br />intervals[i].length == 2</code>
                      </div>
                    </div>
                    <div className="md:col-span-4 p-5 rounded-2xl bg-[var(--stat-box)] border border-[var(--border-subtle)] flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider block">Submission Stats</span>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Solved:</span>
                            <span className="text-emerald-500">3/4 Members</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[var(--bg-base)] overflow-hidden">
                            <div className="w-[75%] h-full bg-emerald-500 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <button className="w-full py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-xs font-bold text-indigo-400 transition-colors mt-6">
                        Solve on LeetCode
                      </button>
                    </div>
                  </motion.div>
                )}

                {activePreviewTab === 'leaderboard' && (
                  <motion.div
                    key="leaderboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3 max-w-3xl mx-auto"
                  >
                    {[
                      { rank: 1, name: 'Aditya Tomar', streak: 45, solved: 112, pts: 1450, status: 'Solved 🔥' },
                      { rank: 2, name: 'Rohan Verma', streak: 32, solved: 94, pts: 1380, status: 'Solved 🔥' },
                      { rank: 3, name: 'Kunal Patel', streak: 18, solved: 76, pts: 1120, status: 'Pending ⋯' }
                    ].map((user) => (
                      <div key={user.rank} className="flex justify-between items-center p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)]">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[var(--text-muted)] font-bold">#{user.rank}</span>
                          <span className="font-display font-bold text-xs text-[var(--text-primary)]">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-8 font-mono text-xs">
                          <span className="text-orange-400 font-bold flex items-center gap-0.5"><Flame className="w-3.5 h-3.5 fill-current" /> {user.streak}d</span>
                          <span className="text-[var(--text-secondary)]">{user.solved} solved</span>
                          <span className="text-[var(--text-primary)] font-bold">{user.pts} pts</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${
                            user.status.includes('Solved') 
                              ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/25' 
                              : 'bg-amber-500/5 text-amber-500 border-amber-500/25'
                          }`}>{user.status}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activePreviewTab === 'matrix' && (
                  <motion.div
                    key="matrix"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase block mb-1">Grid Activity</span>
                      <h4 className="font-display font-bold text-sm text-[var(--text-primary)]">Squad Solves History (Past 4 Weeks)</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {Array.from({ length: 28 }).map((_, idx) => {
                        const solvedCount = idx % 7 === 0 ? 0 : idx % 5 === 0 ? 2 : idx % 3 === 0 ? 3 : 5;
                        return (
                          <div 
                            key={idx} 
                            className={`w-10 h-10 rounded-lg border flex items-center justify-center text-[10px] font-mono font-bold ${
                              solvedCount === 0 ? 'bg-black/10 dark:bg-white/5 border-[var(--border-subtle)] text-[var(--text-muted)]' :
                              solvedCount <= 2 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                              solvedCount <= 4 ? 'bg-emerald-500/25 border-emerald-500/35 text-emerald-300' :
                              'bg-emerald-500/40 border-emerald-500/60 text-white shadow shadow-emerald-500/10'
                            }`}
                            title={`${solvedCount} solves`}
                          >
                            {solvedCount > 0 ? `+${solvedCount}` : ''}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activePreviewTab === 'feed' && (
                  <motion.div
                    key="feed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {[
                      { msg: 'Aditya Tomar completed Leetcode #56: Merge Intervals', tag: 'Streak: 45 days', time: '14m ago' },
                      { msg: 'Rohan Verma completed Leetcode #56: Merge Intervals', tag: 'Streak: 32 days', time: '2h ago' },
                      { msg: 'Kunal Patel activated a Streak Freeze buffer', tag: 'Freeze active', time: '3h ago' }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3.5 rounded-xl bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          <span className="text-[var(--text-primary)] font-medium">{item.msg}</span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[10px] text-[var(--text-muted)]">
                          <span className="bg-white/5 px-2 py-0.5 rounded">{item.tag}</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: STREAK ENGINE */}
      <section id="streak-engine" className="py-32 border-t border-[var(--border-subtle)] bg-white/[0.002]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-mono text-indigo-500 font-bold tracking-widest uppercase">The Milestones</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--text-primary)] mt-2 mb-4">Streak Engine Milestones</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base">
              Gamified progress levels built to reward long term coding consistency.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { milestone: '7 Days', title: 'Habit Anchor', desc: 'The hardest hurdle. Anchors the daily study routine.', multiplier: '1.1x XP', percent: 100, color: 'from-indigo-500 to-indigo-600' },
              { milestone: '30 Days', title: 'Commitment Wave', desc: 'Consistency becomes second nature. Point gains increase by 1.5x.', multiplier: '1.5x XP', percent: 80, color: 'from-pink-500 to-purple-600' },
              { milestone: '100 Days', title: 'DSA Mastery', desc: 'Deep problem-solving habits formed. Unlocks custom profile badges.', multiplier: '2.0x XP', percent: 45, color: 'from-amber-500 to-orange-600' },
              { milestone: '365 Days', title: 'Grandmaster Code-wizard', desc: 'A rare year-long streak achieved. Enters global Hall of Fame.', multiplier: '3.0x XP', percent: 15, color: 'from-emerald-500 to-teal-600' }
            ].map((item, idx) => (
              <div key={idx} className="premium-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-indigo-500/10">
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-display font-black text-[var(--text-primary)]">{item.milestone}</span>
                    <span className="text-xs font-mono text-indigo-400 font-bold">— {item.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                </div>
                {/* Visual Progress bar */}
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-lg shrink-0">{item.multiplier}</span>
                  <div className="w-44 text-left space-y-1">
                    <div className="w-full h-1.5 rounded-full bg-black/20 dark:bg-white/5 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-[var(--text-muted)]">
                      <span>Completion:</span>
                      <span>{item.percent}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: REALTIME EXPERIENCE (SOCKET FEED SIMULATOR) */}
      <section className="py-32 border-t border-[var(--border-subtle)] bg-white/[0.001]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-pink-500 font-bold tracking-widest uppercase">Active WebSocket connection</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mt-2 mb-4">Realtime Simulator Feed</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm">
              Live updates pushed directly to the dashboard, providing positive peer pressure feedback loops.
            </p>
          </div>

          <div className="premium-card overflow-hidden border-indigo-500/10">
            <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--stat-box)] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-mono">
                <Terminal className="w-4 h-4 text-pink-500" />
                <span>realtime-feed-stream.log</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulsing-glow" />
            </div>
            
            <div className="p-5 space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
              <AnimatePresence initial={false}>
                {socketLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border-subtle)] text-left hover:border-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span className="text-xs text-[var(--text-primary)] font-medium">{log.msg}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 sm:mt-0 ml-4 sm:ml-0">
                      <span className="text-[9px] font-mono text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded">{log.tag}</span>
                      <span className="text-[9px] font-mono text-[var(--text-muted)]">{log.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: SOCIAL ACCOUNTABILITY DIAGRAM */}
      <section className="py-32 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-mono text-emerald-500 font-bold tracking-widest uppercase">The Chain</span>
            <h2 className="font-display font-extrabold text-4xl text-[var(--text-primary)] mt-2 mb-4">Accountability Chain Loop</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base">
              PeerSolve synchronizes daily routines to construct an automated social contract.
            </p>
          </div>

          {/* SVG Accountability diagram */}
          <div className="premium-card p-8 max-w-4xl mx-auto flex flex-col items-center justify-center">
            <svg viewBox="0 0 800 220" className="w-full h-auto text-[var(--text-primary)] fill-none stroke-[var(--border-subtle)]">
              {/* Nodes */}
              <rect x="30" y="60" width="160" height="70" rx="12" fill="var(--bg-surface)" stroke="var(--border-subtle)" strokeWidth="1.5" />
              <rect x="290" y="60" width="220" height="70" rx="12" fill="var(--bg-surface)" stroke="var(--border-subtle)" strokeWidth="1.5" />
              <rect x="610" y="60" width="160" height="70" rx="12" fill="var(--bg-surface)" stroke="var(--border-subtle)" strokeWidth="1.5" />

              {/* Node Labels */}
              <text x="110" y="95" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold" fontFamily="Outfit">1. Share Invite Code</text>
              <text x="110" y="112" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter">Create Squad & Invite Peers</text>

              <text x="400" y="95" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold" fontFamily="Outfit">2. Rotated challenge picks</text>
              <text x="400" y="112" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter">Coordinator selects challenge</text>

              <text x="690" y="95" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold" fontFamily="Outfit">3. Auto Sync status</text>
              <text x="690" y="112" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter">Leetcode profile checked</text>

              {/* Connecting Arrows */}
              <path d="M190 95 H290" stroke="var(--border-subtle)" strokeWidth="1.5" strokeDasharray="4 4" />
              <polygon points="290,95 282,90 282,100" fill="var(--text-secondary)" />

              <path d="M510 95 H610" stroke="var(--border-subtle)" strokeWidth="1.5" />
              <polygon points="610,95 602,90 602,100" fill="var(--text-secondary)" />

              {/* Bottom Loop Arrow */}
              <path d="M690 130 V180 H110 V130" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5" />
              <polygon points="110,130 115,138 105,138" fill="rgba(99, 102, 241, 0.4)" />
              <text x="400" y="170" textAnchor="middle" fill="rgba(99, 102, 241, 0.8)" fontSize="10" fontWeight="bold" fontFamily="Outfit">Missed Day? Streak resets or Freeze buffer active</text>
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 9: ANIMATED LEADERBOARD SHOWCASE */}
      <section className="py-32 border-t border-[var(--border-subtle)] bg-white/[0.001]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-mono text-indigo-500 font-bold tracking-widest uppercase">Live Sorting</span>
            <h2 className="font-display font-extrabold text-4xl text-[var(--text-primary)] mt-2 mb-4">Realtime Rank Transitions</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base">
              Watch row positions shift automatically as squad members log solves in real time.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-secondary)] pb-2 border-b border-[var(--border-subtle)]">
              <span>SQUAD MEMBER</span>
              <div className="flex items-center gap-8">
                <span>STREAK</span>
                <span>SOLVED</span>
                <span>TOTAL POINTS</span>
              </div>
            </div>

            {/* Framer motion layout transitions for row rank swaps */}
            <motion.div layout className="space-y-3">
              {leaderboardPlayers.map((player, idx) => (
                <motion.div 
                  key={player.id}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`flex justify-between items-center p-3.5 rounded-xl bg-[var(--bg-base)]/60 border text-xs text-left transition-colors ${
                    player.movement === 'up' ? 'border-emerald-500/25 bg-emerald-500/[0.02]' :
                    player.movement === 'down' ? 'border-red-500/25 bg-red-500/[0.02]' :
                    'border-[var(--border-subtle)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-black w-4 ${
                      idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : 'text-amber-700'
                    }`}>#{idx + 1}</span>
                    <div className={`w-6.5 h-6.5 rounded-full bg-gradient-to-br ${player.avatarBg} flex items-center justify-center text-[10px] font-bold text-white uppercase`}>
                      {player.name.charAt(0)}
                    </div>
                    <span className="font-display font-bold text-[var(--text-primary)]">{player.name}</span>
                  </div>
                  <div className="flex items-center gap-8 font-mono">
                    <span className="text-orange-500 font-bold flex items-center gap-0.5">
                      <Flame className="w-3.5 h-3.5 fill-current" /> {player.streak}d
                    </span>
                    <span className="text-[var(--text-secondary)]">{player.solved} solved</span>
                    <span className="text-[var(--text-primary)] font-bold bg-white/5 px-2.5 py-0.5 rounded">{player.points} pts</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 10: TESTIMONIALS */}
      <section className="py-32 border-t border-[var(--border-subtle)] bg-white/[0.002]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-mono text-pink-500 font-bold tracking-widest uppercase">Endorsements</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mt-2 mb-10">Loved by Coding Squads</h2>
          
          <div className="premium-card p-8 sm:p-12 text-left relative min-h-[260px] flex flex-col justify-between border-indigo-500/10">
            <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] italic leading-relaxed">
              "{testimonials[testimonialIdx].quote}"
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-10 border-t border-[var(--border-subtle)] pt-6">
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonials[testimonialIdx].avatarBg} flex items-center justify-center text-white font-display font-bold text-xs uppercase shadow`}>
                  {testimonials[testimonialIdx].author.substring(0, 2)}
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[var(--text-primary)] block">{testimonials[testimonialIdx].author}</span>
                  <span className="font-sans text-[10px] text-[var(--text-muted)] block mt-0.5">{testimonials[testimonialIdx].role} • <span className="text-indigo-400 font-medium">#{testimonials[testimonialIdx].squad}</span></span>
                </div>
              </div>

              {/* Slider indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIdx(idx)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      testimonialIdx === idx ? 'bg-indigo-500 w-6' : 'bg-[var(--border-subtle)]'
                    }`}
                    style={{ border: 'none' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ */}
      <section id="faq" className="py-32 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-mono text-indigo-500 font-bold tracking-widest uppercase">Knowledge Base</span>
            <h2 className="font-display font-extrabold text-4xl text-[var(--text-primary)] mt-2 mb-4">Frequently Asked Questions</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base">
              Everything you need to know about PeerSolve accountability rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqItems.map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <div 
                  key={idx} 
                  onClick={() => toggleFaq(idx)}
                  className="bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] p-5.5 rounded-xl cursor-pointer hover:border-[var(--border-card-hover)] hover:bg-[var(--bg-surface-light)]/95 transition-all text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display font-bold text-xs text-[var(--text-primary)] leading-relaxed">{faq.q}</h4>
                      <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] shrink-0 transition-transform duration-300 mt-0.5 ${isOpen ? 'rotate-180 text-[var(--text-primary)]' : ''}`} />
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed mt-3.5 pt-3.5 border-t border-[var(--border-subtle)]">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 12: FINAL CLOSING CTA SIGNUP BANNER */}
      <section className="py-32 border-t border-[var(--border-subtle)] relative z-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent pointer-events-none" />

            <span className="text-[10px] font-mono text-indigo-500 font-bold tracking-widest uppercase block mb-3">Instant Join</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] mb-4 leading-tight">Start Building Consistency Today</h2>
            <p className="font-sans text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto mb-10">
              Join thousands of developers keeping each other accountable. Create a group, invite friends, and master problem solving together.
            </p>

            <form className="relative z-10 max-w-md mx-auto space-y-4 text-center">
              <SignUpButton mode="redirect" forceRedirectUrl="/signup">
                <Button className="w-full py-3.5 text-sm font-bold">
                  Create Free Account
                </Button>
              </SignUpButton>
              <p className="text-[11px] text-text-muted">
                No credit card required • Instant dashboard sync • 2 free freezes included
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-[var(--border-subtle)] bg-[var(--bg-base)] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-sm tracking-tight text-[var(--text-primary)]">PeerSolve</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] text-[var(--text-secondary)] font-medium">
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Contact Support</a>
              <a
                href="https://www.linkedin.com/in/aditya-singh-tomar-1683a3279/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Aditya Singh Tomar
              </a>
            </div>

            <span className="font-sans text-[10px] text-[var(--text-muted)]">
              © {new Date().getFullYear()} PeerSolve. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* WATCH DEMO MODAL */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8 text-left"
            >
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-full bg-white/5 border border-white/5 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Product Walkthrough</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[var(--text-primary)] mb-4">PeerSolve Interactive Demo</h3>
              
              <div className="aspect-video w-full rounded-xl bg-[#06080F] border border-white/5 flex flex-col items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none" />

                <div className="relative z-10 text-center p-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4 cursor-pointer hover:bg-indigo-500/25 hover:border-indigo-500/50 transition-all duration-300 shadow shadow-indigo-500/20 active:scale-95">
                    <Play className="w-6 h-6 text-indigo-400 fill-current ml-0.5" />
                  </div>
                  <span className="text-xs font-bold text-white block mb-1">Click to play walkthrough video</span>
                  <span className="text-[10px] text-[var(--text-secondary)] block">Duration: 1m 45s • High Definition</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none opacity-50 text-[9px] font-mono text-[var(--text-muted)]">
                  <span>peer-solve-v2.0-demo.mp4</span>
                  <span>1080p • 60 FPS</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  { title: "1. Create Group", desc: "Select group size, set daily cutoffs, and configure a custom timezone." },
                  { title: "2. Solve Daily", desc: "PeerSolve auto-checks your LeetCode account and updates the leaderboard." },
                  { title: "3. Maintain Streak", desc: "Maintain the group combo multiplier or use freezes to survive rest days." }
                ].map((pt, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)]">
                    <h5 className="text-xs font-bold text-[var(--text-primary)] mb-1">{pt.title}</h5>
                    <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
