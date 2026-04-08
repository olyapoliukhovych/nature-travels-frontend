import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import { getUserByIdPublic } from "@/lib/api/users/serverApi";
import css from "./page.module.css";
import TravellerProfileClient from "./TravellerProfile.client";
import { User } from "@/types/user";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;

  const data = await getUserByIdPublic({ userId, page: 1, perPage: 1 });

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

  const data = await getUserByIdPublic({
    userId,
    page: currentPage,
    perPage: 6,
  });

  if (!data || !data._id) return <div>Користувача не знайдено</div>;
  return (
    <section className={css.travellerProfilePageSection}>
      <div className="container">
        <TravellerInfo user={data as unknown as User} />
        <h1 className={css.travellerProfilePageTitle}>Історії мандрівника</h1>

        <TravellerProfileClient
          initialStories={data.userStories}
          userId={userId}
          totalPages={data.totalPages || 1}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
