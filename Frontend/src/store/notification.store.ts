import { create } from 'zustand';

export interface AppNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface NotificationState {
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => {
  // Load initial from localStorage
  const saved = localStorage.getItem('peer_solve_notifications');
  let initialNotifications: AppNotification[] = [];
  try {
    if (saved) {
      initialNotifications = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse notifications', e);
  }

  const saveToStorage = (notifications: AppNotification[]) => {
    localStorage.setItem('peer_solve_notifications', JSON.stringify(notifications));
  };

  return {
    notifications: initialNotifications,
    addNotification: (title, message, type) => {
      const newNotification: AppNotification = {
        id: Math.random().toString(36).substring(2, 11),
        type,
        title,
        message,
        createdAt: new Date().toISOString(),
        read: false,
      };
      const updated = [newNotification, ...get().notifications].slice(0, 50); // limit to 50 logs
      saveToStorage(updated);
      set({ notifications: updated });
    },
    markAllRead: () => {
      const updated = get().notifications.map((n) => ({ ...n, read: true }));
      saveToStorage(updated);
      set({ notifications: updated });
    },
    clearAll: () => {
      saveToStorage([]);
      set({ notifications: [] });
    },
    getUnreadCount: () => {
      return get().notifications.filter((n) => !n.read).length;
    },
  };
});
