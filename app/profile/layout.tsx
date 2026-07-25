import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/api/users/serverApi";
import ProfileLayoutClient from "./ProfileLayoutClient";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserProfile();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className={"layoutWrapper"}>
      <Header />
      <ProfileLayoutClient user={user}>{children}</ProfileLayoutClient>
      <Footer />
    </div>
  );
}
