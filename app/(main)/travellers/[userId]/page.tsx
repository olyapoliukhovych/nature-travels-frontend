import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import {
  getUserByIdPublic,
  getUserStoriesPublic,
} from "@/lib/api/users/clientApi";
import css from "./page.module.css";
import TravellerProfileClient from "./TravellerProfile.client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;

  const data = await getUserByIdPublic(userId);

  if (!data) {
    return { title: "Користувача не знайдено" };
  }

  const userAvatar = (data as { avatar?: string }).avatar;

  return {
    title: data.name,
    description: `Переглядайте історії мандрів та еко-пригоди користувача ${data.name} на платформі Природні Мандри.`,
    openGraph: {
      title: `${data.name} — Профіль мандрівника`,
      description: `Приєднуйтесь до пригод ${data.name} в Україні.`,
      images: [userAvatar || "/default-avatar.jpg"],
    },
  };
}
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import { UserPrivate } from "@/types/user";

export default async function TravellerPage({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { userId } = await params;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;

  const user = await getUserByIdPublic(userId);

  const storiesData = await getUserStoriesPublic({
    userId,
    page: currentPage,
    perPage: 6,
  });

  if (!user || !user._id) return <div>Користувача не знайдено</div>;
  const hasStories = user.totalUserStories > 0 || user.userStories?.length > 0;
  return (
    <section className={css.travellerProfilePageSection}>
      <div className="container">
        <TravellerInfo user={user as UserPrivate} />
        <h1 className={css.travellerProfilePageTitle}>Історії мандрівника</h1>

        {hasStories ? (
          <TravellerProfileClient
            initialStories={storiesData.stories}
            userId={userId}
            totalPages={storiesData.totalPages || 1}
            currentPage={currentPage}
          />
        ) : (
          <MessageNoStories
            text="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            linkTo="/stories"
          />
        )}
      </div>
    </section>
  );
}
