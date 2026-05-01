import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/api/users/serverApi";
import ProfileSettingsForm from "@/components/ProfileSettingsForm/ProfileSettingsForm";

export default async function ProfileSettingsPage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/auth/login");
  }

  return <ProfileSettingsForm user={user} />;
}
