import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Read initial token and user from localStorage if present
  const savedToken = localStorage.getItem('peer_solve_token');
  let savedUser: User | null = null;
  try {
    const userStr = localStorage.getItem('peer_solve_user');
    if (userStr) {
      savedUser = JSON.parse(userStr);
    }
  } catch (e) {
    console.error('Failed to parse saved user', e);
  }

  return {
    token: savedToken,
    user: savedUser,
    setAuth: (token, user) => {
      localStorage.setItem('peer_solve_token', token);
      localStorage.setItem('peer_solve_user', JSON.stringify(user));
      set({ token, user });
    },
    updateUser: (user) => {
      localStorage.setItem('peer_solve_user', JSON.stringify(user));
      set({ user });
    },
    clearAuth: () => {
      localStorage.removeItem('peer_solve_token');
      localStorage.removeItem('peer_solve_user');
      set({ token: null, user: null });
    },
  };
});
