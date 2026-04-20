import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TravellersClient from "./Travellers.client";
import { getAllUsers } from "@/lib/api/users/serverApi";
import { Metadata } from "next";
import { INITIAL_PAGE, TRAVELLERS_PER_PAGE } from "@/constants/pagination";

export const metadata: Metadata = {
  title: "Мандрівники",
  description: "Познайомтеся зі спільнотою Природні Мандри.",
};

export default async function Travellers() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["users"],
    queryFn: () =>
      getAllUsers({ page: INITIAL_PAGE, perPage: TRAVELLERS_PER_PAGE }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellersClient />
    </HydrationBoundary>
  );
}
