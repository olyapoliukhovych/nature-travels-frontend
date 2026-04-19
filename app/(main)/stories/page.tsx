import { getCategories } from "@/lib/api/category/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import StoriesClient from "./Stories.client";
import { getAllStories } from "@/lib/api/stories/serverApi";
import { INITIAL_PAGE, STORIES_PER_PAGE } from "@/constants/pagination";

export default async function Stories() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["stories", ""],
      queryFn: ({ pageParam = INITIAL_PAGE }) =>
        getAllStories({ page: pageParam, perPage: STORIES_PER_PAGE }),
      initialPageParam: INITIAL_PAGE,
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
