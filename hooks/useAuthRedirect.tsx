import { usePathname } from "next/navigation";

export const useAuthRedirect = () => {
  const pathname = usePathname();

  const setRedirect = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("redirectPath", pathname);
    }
  };

  const getRedirect = () => {
    if (typeof window !== "undefined") {
      const path = sessionStorage.getItem("redirectPath");
      sessionStorage.removeItem("redirectPath");
      return path || "/";
    }
    return "/";
  };

  return { setRedirect, getRedirect };
};
