import { UserPrivate } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: UserPrivate | null;
  isAuthenticated: boolean;
  setUser: (user: UserPrivate) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
