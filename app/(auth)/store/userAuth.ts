import { create } from "zustand";

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));
