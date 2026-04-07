"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getUserProfile } from "@/lib/api/users/clientApi";
import { checkClientSession } from "@/lib/api/auth/clientApi";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated, _hasHydrated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!_hasHydrated) return;

    if (isInitialized.current) return;
    isInitialized.current = true;

    const initAuth = async () => {
      try {
        const session = checkClientSession();

        if (session.success) {
          const user = await getUserProfile();
          if (user) {
            setUser(user);
          } else {
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("Session sync failed:", error);
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [_hasHydrated, setUser, clearIsAuthenticated]);

  if (isLoading) return null;

  return <>{children}</>;
}
