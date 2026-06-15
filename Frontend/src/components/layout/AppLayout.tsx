import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/react';
import { useAuthStore } from '../../store/auth.store';
import { useThemeStore } from '../../store/theme.store';
import { useSocketStore } from '../../store/socket.store';
import { useNotificationStore } from '../../store/notification.store';
import { socketService } from '../../services/socket/socket.service';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  LayoutDashboard,
  Swords,
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Bell, 
  Trash2, 
  CheckCheck,
  Sun,
  Moon
} from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  const { status } = useSocketStore();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const { notifications, markAllRead, clearAll, getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();
  
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle socket connection lifecycle
  useEffect(() => {
    if (token) {
      socketService.connect(token);
    }
    return () => {
      socketService.disconnect();
    };
  }, [token]);

  const getPageTitle = () => {
    if (location.pathname === '/groups') return 'Groups';
    if (location.pathname === '/challenges') return 'Challenges';
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
        {/* Left branding & navigation */}
        <div className="flex items-center gap-3 md:gap-5 min-w-0">
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

          <nav className="hidden md:flex items-center gap-1 ml-2">
            {[
              { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { to: '/groups', label: 'Groups', icon: Users },
              { to: '/challenges', label: 'Challenges', icon: Swords },
            ].map((item) => {
              const isActive =
                item.to === '/groups'
                  ? location.pathname === '/groups'
                  : item.to === '/challenges'
                    ? location.pathname === '/challenges'
                    : location.pathname === '/dashboard';

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-text-secondary hover:bg-background-surfaceLight hover:text-text-primary'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
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

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-background-surfaceLight border border-border-subtle text-text-secondary hover:text-text-primary transition-all cursor-pointer"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Clerk account menu */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
              },
            }}
          />
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col overflow-y-auto min-h-0 relative z-10">
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
