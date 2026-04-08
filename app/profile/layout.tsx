import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import css from "./layout.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { redirect } from "next/navigation";

interface ApiError extends Error {
  response?: {
    status: number;
  };
}

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  // if (!token) {
  //   redirect("/auth/login");
  // }
  try {
    const res = await api.get("/users/me", {
      headers: {
        Cookie: `accessToken=${token}; sessionId=${cookieStore.get("sessionId")?.value}`,
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data;

    return (
      <>
        <Header />
        <div className={css.profileLayoutWrapper}>
          <div className="container">
            <TravellerInfo user={user} />
            <ProfileTabs />
            <div className={css.storiesContent}>{children}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  } catch (error: unknown) {
    // if (error instanceof Error) {
    //   const apiError = error as ApiError;
    //   if (apiError.response?.status === 401) {
    //     redirect("/auth/login");
    //   }
    // }
  }
}
