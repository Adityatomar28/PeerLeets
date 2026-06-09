import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useSocketStore } from '../../store/socket.store';
import { socketService } from '../../services/socket/socket.service';
import { LayoutDashboard, User, LogOut, Users, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, token, clearAuth } = useAuthStore();
  const { status } = useSocketStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle socket connection lifecycle
  useEffect(() => {
    if (token) {
      socketService.connect(token);
    }
    return () => {
      socketService.disconnect();
    };
  }, [token]);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background-base text-text-primary flex flex-col md:flex-row relative">
      {/* Grid overlay */}
      <div className="grid-bg-overlay" />

      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-background-surface border-b md:border-b-0 md:border-r border-border-subtle p-6 flex flex-col justify-between shrink-0 relative z-10">
        <div>
          {/* Logo banner */}
          <Link to="/dashboard" className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <Users className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-display font-extrabold text-lg text-white">
              Peer<span className="text-indigo-400">Solve</span>
            </span>
          </Link>

          {/* Links stack */}
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25'
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary border border-transparent'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile and Logout Footer */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col gap-4">
          {user && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300 uppercase shrink-0">
                {user.name[0]}
              </div>
              <div className="text-left overflow-hidden">
                <span className="font-sans font-bold text-xs text-white block truncate">{user.name}</span>
                <span className="font-sans text-[10px] text-text-secondary block truncate">{user.email}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-text-secondary hover:bg-accent-rose/10 hover:text-accent-rose transition-all border border-transparent cursor-pointer"
            style={{ background: 'none' }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col overflow-y-auto min-h-0 relative z-10">
        {/* Global Connection & Status Header */}
        <header className="h-16 border-b border-border-subtle px-6 md:px-8 flex items-center justify-end shrink-0 bg-background-base/50 backdrop-blur-md">
          {/* Connection status pills */}
          <div className="flex items-center gap-3">
            {status === 'connected' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-semibold text-accent-emerald">
                <Wifi className="w-3.5 h-3.5" /> Synchronized
              </span>
            )}
            {status === 'connecting' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono font-semibold text-accent-indigo pulsing-glow">
                <RefreshCw className="w-3 h-3 animate-spin" /> Synchronizing...
              </span>
            )}
            {status === 'reconnecting' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-semibold text-accent-amber pulsing-glow">
                <RefreshCw className="w-3 h-3 animate-spin" /> Reconnecting...
              </span>
            )}
            {status === 'offline' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-rose/10 border border-accent-rose/25 text-[10px] font-mono font-semibold text-accent-rose">
                <WifiOff className="w-3.5 h-3.5" /> Disconnected
              </span>
            )}
          </div>
        </header>

        {/* Dynamic page container */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
