import css from "./page.module.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TravellerProfileClient from "./TravellerProfile.client";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getUserByIdPublic,
  getUserStoriesPublic,
} from "@/lib/api/users/clientApi";
import {
  INITIAL_PAGE,
  TRAVELLER_STORIES_PER_PAGE,
} from "@/constants/pagination";

interface Props {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function TravellerPage({ params }: Props) {
  const { userId } = await params;
  const queryClient = new QueryClient();

  const user = await queryClient.ensureQueryData({
    queryKey: ["user-public", userId],
    queryFn: () => getUserByIdPublic(userId),
  });

  if (!user || !user._id) {
    notFound();
  }

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["user-public-stories", userId],
    queryFn: ({ pageParam = INITIAL_PAGE }) =>
      getUserStoriesPublic({
        userId,
        page: pageParam,
        perPage: TRAVELLER_STORIES_PER_PAGE,
      }),
    initialPageParam: INITIAL_PAGE,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={css.travellerProfilePageSection}>
        <div className="container">
          <TravellerInfo user={user} />

          <h1 className={css.travellerProfilePageTitle}>Історії мандрівника</h1>

          {user.totalUserStories > 0 ? (
            <TravellerProfileClient userId={userId} />
          ) : (
            <MessageNoStories
              text="Цей користувач ще не публікував історій"
              buttonText="Назад до історій"
              linkTo="/stories"
            />
          )}
        </div>
      </section>
    </HydrationBoundary>
  );
}
