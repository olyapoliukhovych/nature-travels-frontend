"use client";

import { usePathname } from "next/navigation";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import css from "./layout.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function ProfileLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const isSettingsPage = pathname.includes("/profile/settings");
  const isEditPage = pathname.includes("/profile/stories/edit");

  return (
    <div className={css.profileLayoutWrapper}>
      <div className="container">
        {!isSettingsPage && !isEditPage && user && (
          <>
            <TravellerInfo user={user} />
            <ProfileTabs />
          </>
        )}

        <main className={"mainContent"}>{children}</main>
      </div>
    </div>
  );
}
