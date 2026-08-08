import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProfileLayoutClient from "./ProfileLayoutClient";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"layoutWrapper"}>
      <Header />
      <ProfileLayoutClient>{children}</ProfileLayoutClient>
      <Footer />
    </div>
  );
}
