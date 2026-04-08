"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getUserProfile } from "@/lib/api/users/clientApi";
import { refreshSession } from "@/lib/api/auth/clientApi";
import axios from "axios";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initAuth = async () => {
      try {
        const user = await getUserProfile();
        setUser(user);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            try {
              await refreshSession();
              const user = await getUserProfile();
              setUser(user);
            } catch (refreshError) {
              console.error("Error:", refreshError);
              clearIsAuthenticated();
            }
          } else {
            clearIsAuthenticated();
          }
        } else {
          console.error("Non-axios error:", error);
          clearIsAuthenticated();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) return null;

  return <>{children}</>;
}
