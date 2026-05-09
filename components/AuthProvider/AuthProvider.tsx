"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { refreshSession } from "@/lib/api/auth/clientApi";
import { getUserProfile } from "@/lib/api/users/clientApi";
import { useSettingsStore } from "@/lib/store/settingsStore";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const resetSettings = useSettingsStore((state) => state.resetSettings);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await refreshSession();

      if (!isAuthenticated) {
        clearIsAuthenticated();
        resetSettings();
        return;
      }

      const user = await getUserProfile();

      if (user) {
        setUser(user);
      } else {
        clearIsAuthenticated();
        resetSettings();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated, resetSettings]);

  return children;
};

export default AuthProvider;
