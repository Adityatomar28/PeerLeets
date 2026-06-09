import { io, Socket } from 'socket.io-client';
import { useSocketStore } from '../../store/socket.store';
import { useNotificationStore } from '../../store/notification.store';
import { toast } from 'sonner';

class SocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    if (this.socket) {
      if (this.socket.connected) return;
      this.socket.connect();
      return;
    }

    useSocketStore.getState().setStatus('connecting');

    // Connect to the backend server (Vite proxy config doesn't apply to WebSockets directly,
    // so we connect to the server at http://localhost:3000 directly)
    this.socket = io('http://localhost:3000', {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    this.socket.on('connect', () => {
      console.log('[Socket] Connected to server');
      useSocketStore.getState().setStatus('connected');
      toast.success('Realtime connection established');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
      useSocketStore.getState().setStatus('offline');
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, need to reconnect manually
        this.socket?.connect();
      } else {
        toast.warning('Realtime connection lost');
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('[Socket] Connection Error:', error.message);
      useSocketStore.getState().setStatus('offline');
    });

    this.socket.on('reconnect_attempt', () => {
      console.log('[Socket] Reconnecting...');
      useSocketStore.getState().setStatus('reconnecting');
    });

    // Listen for global push notifications and route them to Sonner toasts & Notifications Store
    this.socket.on('challenge:activated', (data: any) => {
      toast.info(`New Challenge Activated! 🧠`);
      useNotificationStore.getState().addNotification(
        'Challenge Activated 🧠',
        `A new daily coding challenge has been posted for your squad.`,
        'challenge:activated'
      );
    });

    this.socket.on('solve:first', (data: any) => {
      toast.success(`First Solver Alert! 🏆`);
      useNotificationStore.getState().addNotification(
        'First Solver Alert 🏆',
        `${data.userName || data.name || 'A squad member'} was the first to solve today's challenge!`,
        'solve:first'
      );
    });

    this.socket.on('streak:freeze', (data: any) => {
      toast.info(`Streak Freeze Used! ❄️`);
      useNotificationStore.getState().addNotification(
        'Streak Freeze Used ❄️',
        `${data.userName || data.name || 'A squad member'} used a streak freeze to protect their consistency multiplier.`,
        'streak:freeze'
      );
    });

    this.socket.on('challenge:closed', () => {
      toast.info(`Challenge Closed 🔒`);
      useNotificationStore.getState().addNotification(
        'Challenge Closed 🔒',
        `Today's challenge cutoff has been reached. Ranks and streaks are locked.`,
        'challenge:closed'
      );
    });

    this.socket.on('socket:error', (error: { message: string; code: string }) => {
      console.error('[Socket Server Error]', error);
      toast.error(error.message || 'Realtime error encountered');
      
      if (error.code === 'ROOM_EVICTED') {
        // Redirect to dashboard on eviction
        window.location.href = '/dashboard';
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      useSocketStore.getState().setStatus('offline');
    }
  }

  joinGroup(groupId: string) {
    if (this.socket && this.socket.connected) {
      console.log(`[Socket] Joining room group:${groupId}`);
      this.socket.emit('join-group', { groupId });
    } else {
      console.warn('[Socket] Join group failed: Socket is not connected');
    }
  }

  leaveGroup(groupId: string) {
    if (this.socket && this.socket.connected) {
      console.log(`[Socket] Leaving room group:${groupId}`);
      this.socket.emit('leave-group', { groupId });
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export const socketService = new SocketService();
