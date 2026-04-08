import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TravellersClient from "./Travellers.client";
import { getAllUsers } from "@/lib/api/users/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мандрівники",
  description: "Познайомтеся зі спільнотою Природні Мандри.",
};

export default async function Travellers() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["users", 1],
    queryFn: () => getAllUsers({ page: 1, perPage: 12 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellersClient />
    </HydrationBoundary>
  );
}
