import css from "./TravellerCard.module.css";
import AppLink from "../AppLink/AppLink";
import Image from "next/image";
import { UserPublic } from "@/types/user";
import AnimatedText from "../AnimatedText/AnimatedText";

interface Props {
  user: UserPublic;
}

export default function TravellerCard({ user }: Props) {
  const profileUrl = `/travellers/${user._id}`;

  return (
    <div className={css.card}>
      <div className={css.pictureWrapper}>
        <Image
          className={css.picture}
          src={user.avatarUrl}
          width={130}
          height={130}
          alt={"user"}
          priority
        />
      </div>
      <div className={css.infoWrappper}>
        <div className={css.userInfo}>
          <AnimatedText tag="h3" className={css.userName}>
            {user.name}
          </AnimatedText>
          <AnimatedText tag="p">{`Статей: ${user.totalUserStories}`}</AnimatedText>
        </div>
        <AppLink href={profileUrl} variant="neutral" className={css.userButton}>
          Переглянути профіль
        </AppLink>
      </div>
    </div>
  );
}
