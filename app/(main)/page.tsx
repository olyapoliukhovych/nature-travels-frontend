import Hero from "@/components/Hero/Hero";
// import styles from "./page.module.css";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import About from "@/components/About/About";
import PopularStories from "@/components/PopularStories/PopularStories";
import Join from "@/components/Join/Join";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllStories } from "@/lib/api/stories/serverApi";
import { getAllUsers } from "@/lib/api/users/serverApi";

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["popular-stories"],
      queryFn: () => getAllStories({ page: 1, perPage: 10 }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["popular-travellers"],
      queryFn: () => getAllUsers({ page: 1, perPage: 12 }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Hero />
      <PopularStories
        title="Популярні статті"
        linkLabel="Всі статті"
        linkHref="/stories"
        queryKeyName="popular-stories"
      />
      <About />
      <OurTravellers />
      <Join />
    </HydrationBoundary>
  );
}
