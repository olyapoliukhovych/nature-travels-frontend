import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import css from "./layout.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/api/users/serverApi";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;

  try {
    user = await getUserProfile();
  } catch {
    redirect("/auth/login");
  }

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
}
