import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useSocketStore } from '../../store/socket.store';
import { useNotificationStore } from '../../store/notification.store';
import { socketService } from '../../services/socket/socket.service';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  LogOut, 
  Users, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Bell, 
  Trash2, 
  CheckCheck,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, token, clearAuth } = useAuthStore();
  const { status } = useSocketStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('peer_solve_theme') as 'light' | 'dark') || 'dark';
  });

  const { notifications, markAllRead, clearAll, getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();
  
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync theme selection to documentElement class list
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('peer_solve_theme', theme);
  }, [theme]);

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

  const getPageTitle = () => {
    if (location.pathname.startsWith('/groups')) return 'Squad Room';
    if (location.pathname === '/profile') return 'Profile Details';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-background-base text-text-primary flex flex-col relative">
      {/* Grid overlay */}
      <div className="grid-bg-overlay" />

      {/* Global Header */}
      <header className="h-16 border-b border-border-subtle px-6 md:px-8 flex items-center justify-between shrink-0 bg-background-base/50 backdrop-blur-md relative z-30">
        {/* Left branding & title */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/10">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-extrabold text-base text-text-primary hidden sm:inline">
              Peer<span className="text-indigo-400">Solve</span>
            </span>
          </Link>
          <span className="text-border-subtle font-light text-xl select-none">/</span>
          <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-text-muted select-none">
            {getPageTitle()}
          </div>
        </div>

        {/* Right navigation / status */}
        <div className="flex items-center gap-4">
          {/* Connection status pills */}
          <div className="hidden xs:flex items-center gap-3">
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

          {/* Notification Bell Icon */}
          <div className="relative" ref={notificationDropdownRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-background-surfaceLight border border-border-subtle text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              style={{ background: 'none' }}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-rose text-white text-[9px] font-bold flex items-center justify-center font-mono">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-background-surface border border-border-subtle rounded-xl shadow-glow overflow-hidden z-50 text-left"
                >
                  <div className="p-3 border-b border-border-subtle flex justify-between items-center bg-background-surfaceLight/20">
                    <span className="font-display font-extrabold text-xs text-text-primary">Notifications</span>
                    {notifications.length > 0 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={markAllRead}
                          className="text-[10px] font-semibold text-indigo-400 hover:text-text-primary flex items-center gap-0.5 cursor-pointer"
                          title="Mark all as read"
                          style={{ background: 'none', border: 'none' }}
                        >
                          <CheckCheck className="w-3.5 h-3.5" /> Read
                        </button>
                        <span className="text-text-muted">|</span>
                        <button
                          onClick={clearAll}
                          className="text-[10px] font-semibold text-text-secondary hover:text-accent-rose flex items-center gap-0.5 cursor-pointer"
                          title="Clear all"
                          style={{ background: 'none', border: 'none' }}
                        >
                          <Trash2 className="w-3 h-3" /> Clear
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-border-subtle/30 no-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-xs text-text-muted italic">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 transition-colors ${
                            n.read ? 'bg-transparent' : 'bg-indigo-500/[0.03]'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-sans font-bold text-xs text-text-primary leading-tight">
                              {n.title}
                            </h5>
                            {!n.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="font-sans text-[11px] text-text-secondary mt-1 leading-relaxed">
                            {n.message}
                          </p>
                          <span className="font-mono text-[9px] text-text-muted block mt-1.5">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown Trigger */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-background-surfaceLight border border-border-subtle/30 transition-all cursor-pointer bg-background-surface/30"
              style={{ background: 'none' }}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-md object-cover border border-indigo-500/20"
                />
              ) : (
                <div className="w-7 h-7 rounded-md bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center font-bold text-[11px] text-indigo-400 uppercase shrink-0">
                  {user?.name ? user.name[0] : 'U'}
                </div>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary pr-0.5" />
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-60 bg-background-surface border border-border-subtle rounded-xl shadow-glow overflow-hidden z-50 p-1.5 space-y-0.5 text-left"
                >
                  {/* User info details header */}
                  <div className="px-3 py-2 border-b border-border-subtle mb-1 flex items-center gap-3">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-lg object-cover border border-indigo-500/20"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400 uppercase shrink-0">
                        {user?.name ? user.name[0] : 'U'}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-text-primary truncate">{user?.name}</div>
                      <div className="text-[10px] text-text-secondary truncate">{user?.email}</div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <Link
                    to="/dashboard"
                    onClick={() => setShowProfileDropdown(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/dashboard'
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'text-text-secondary hover:bg-background-surfaceLight hover:text-text-primary border border-transparent'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setShowProfileDropdown(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/profile'
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'text-text-secondary hover:bg-background-surfaceLight hover:text-text-primary border border-transparent'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>

                  {/* Theme Switcher Button */}
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background-surfaceLight hover:text-text-primary transition-all border border-transparent cursor-pointer"
                    style={{ background: 'none' }}
                  >
                    <span className="flex items-center gap-2.5">
                      {theme === 'dark' ? (
                        <Sun className="w-4 h-4 text-amber-500 fill-amber-500/10" />
                      ) : (
                        <Moon className="w-4 h-4 text-indigo-500 fill-indigo-500/10" />
                      )}
                      {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
                    </span>
                    <span className="text-[8px] font-mono uppercase bg-background-surfaceLight px-1.5 py-0.5 rounded border border-border-subtle text-text-muted">
                      {theme}
                    </span>
                  </button>

                  <div className="border-t border-border-subtle my-1" />

                  {/* Log Out */}
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-text-secondary hover:bg-accent-rose/10 hover:text-accent-rose transition-all border border-transparent cursor-pointer"
                    style={{ background: 'none' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col overflow-y-auto min-h-0 relative z-10">
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

