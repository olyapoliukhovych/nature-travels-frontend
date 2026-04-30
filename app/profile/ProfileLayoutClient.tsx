"use client";

import { usePathname } from "next/navigation";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import css from "./layout.module.css";
import { UserPrivate } from "@/types/user";

export default function ProfileLayoutClient({
  user,
  children,
}: {
  user: UserPrivate;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isSettingsPage = pathname.includes("/profile/settings");

  return (
    <div className={css.profileLayoutWrapper}>
      <div className="container">
        {!isSettingsPage && (
          <>
            <TravellerInfo user={user} />
            <ProfileTabs />
          </>
        )}

        <div
          className={isSettingsPage ? css.settingsContent : css.storiesContent}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
