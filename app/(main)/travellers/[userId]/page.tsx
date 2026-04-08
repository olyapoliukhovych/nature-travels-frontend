import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import { getUserByIdPublic } from "@/lib/api/users/serverApi";
import css from "./page.module.css";
import TravellerProfileClient from "./TravellerProfile.client";
import { User } from "@/types/user";

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
