"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { UserPrivate } from "@/types/user";

type Props = {
  initialUser: UserPrivate | null;
  children: React.ReactNode;
};

const AuthProvider = ({ initialUser, children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      clearAuth();
    }
  }, [initialUser, setUser, clearAuth]);

  return <>{children}</>;
};

export default AuthProvider;
