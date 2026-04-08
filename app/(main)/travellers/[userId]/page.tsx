import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import {
  getUserByIdPublic,
  getUserStoriesPublic,
} from "@/lib/api/users/serverApi";
import css from "./page.module.css";
import TravellerProfileClient from "./TravellerProfile.client";
import { UserPublic } from "@/types/user";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";

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
        <TravellerInfo user={user as UserPublic} />
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
