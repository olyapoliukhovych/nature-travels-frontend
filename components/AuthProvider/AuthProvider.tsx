"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { refreshSession } from "@/lib/api/auth/clientApi";
import { getUserProfile } from "@/lib/api/users/clientApi";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await refreshSession();
      console.log(isAuthenticated);

      if (isAuthenticated) {
        const user = await getUserProfile();

        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
