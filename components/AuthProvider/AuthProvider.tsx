"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { getUserProfile } from "@/lib/api/users/clientApi";
import { useEffect, useState } from "react";
import { checkClientSession } from "@/lib/api/auth/clientApi";

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = checkClientSession();

        if (session.success) {
          const user = await getUserProfile();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) return null;

  return children;
};

export default AuthProvider;
