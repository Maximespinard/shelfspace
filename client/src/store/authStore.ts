import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  hasCheckedAuth: boolean;
  login: (user: User | null, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  setHasCheckedAuth: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      hasCheckedAuth: false,

      login: (user, token) => {
        set({ user, token });
        if (token) localStorage.setItem('access_token', token);
      },

      logout: () => {
        set({ user: null, token: null, hasCheckedAuth: false });
        localStorage.removeItem('access_token');
      },

      isAuthenticated: () => !!get().token,

      setHasCheckedAuth: (value) => set({ hasCheckedAuth: value }),
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
