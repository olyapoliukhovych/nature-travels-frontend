import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import { getUserByIdPublic } from "@/lib/api/users/clientApi";
import css from "./page.module.css";
import TravellerProfileClient from "./TravellerProfile.client";
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

  if (!data?.user) return <div>Користувача не знайдено</div>;
  return (
    <section className={css.travellerProfilePageSection}>
      <div className="container">
        <TravellerInfo user={data.user} />
        <h1 className={css.travellerProfilePageTitle}>Історії мандрівника</h1>

        <TravellerProfileClient
          initialStories={data.stories}
          userId={userId}
          totalPages={data.totalPages}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
