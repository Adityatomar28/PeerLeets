import { create } from 'zustand';

export type ConnectionState = 'connecting' | 'connected' | 'reconnecting' | 'offline';

interface SocketStore {
  status: ConnectionState;
  setStatus: (status: ConnectionState) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  status: 'offline',
  setStatus: (status) => set({ status }),
}));
