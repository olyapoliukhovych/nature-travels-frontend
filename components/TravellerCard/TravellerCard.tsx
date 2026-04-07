import css from "./TravellerCard.module.css";
import AppLink from "../AppLink/AppLink";
import Image from "next/image";
import { User } from "@/types/user";

interface Props {
  user: User;
}

export default function TravellerCard({ user }: Props) {
  return (
    <div className={css.card}>
      <div className={css.pictureWrapper}>
        <Image
          className={css.picture}
          src={user.avatarUrl}
          width={130}
          height={130}
          alt={"user"}
        />
      </div>
      <div className={css.infoWrappper}>
        <div className={css.userInfo}>
          <h3 className={css.userName}>{user.name}</h3>
          <p>Статей: {user.totalUserStories}</p>
        </div>
        <AppLink
          href={`/travellers/${user._id}`}
          variant="neutral"
          className={css.userButton}
        >
          Переглянути профіль
        </AppLink>
      </div>
    </div>
  );
}
