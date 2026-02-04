import { create } from "zustand";
interface userType {
  id: string;
  phone: string;
  email: string;
  created_at: string;
  app_metadata: {
    role?: string;
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    email_verified?: boolean;
    user_metadata?: {
      bio?: string;
      firstName?: string;
      lastName?: string;
      location?: string;
      phone?: string;
    };
  };
}
interface AuthState {
  user: userType | null;
  setUser: (user: any) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));
