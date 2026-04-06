import { getCategories } from "@/lib/api/category/clientApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import StoriesClient from "./Stories.client";
import { getAllStories } from "@/lib/api/stories/clientApi";

export default async function Stories() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["stories", "", 9],
      queryFn: ({ pageParam = 1 }) =>
        getAllStories({ page: pageParam, perPage: 9 }),
      initialPageParam: 1,
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient />
    </HydrationBoundary>
  );
}
