"use client";

import TravellersStories from "../TravellersStories/TravellersStories";
import {
  getUserStoriesFavorites,
  getUserStoriesPrivate,
} from "@/lib/api/users/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INITIAL_PAGE, PROFILE_STORIES_PER_PAGE } from "@/constants/pagination";
import Loader from "@/components/Loader/Loader";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";

interface Props {
  type: "saved" | "my";
}

export default function ProfileStoriesClient({ type }: Props) {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["profile-stories", type],
    queryFn: ({ pageParam = INITIAL_PAGE }) =>
      type === "saved"
        ? getUserStoriesFavorites({
            page: pageParam as number,
            perPage: PROFILE_STORIES_PER_PAGE,
          })
        : getUserStoriesPrivate({
            page: pageParam as number,
            perPage: PROFILE_STORIES_PER_PAGE,
          }),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    select: (data) => {
      const flat = data.pages.flatMap((page) => page.stories);
      const map = new Map();
      for (const story of flat) {
        map.set(story._id, story);
      }
      return Array.from(map.values());
    },
  });

  if (isLoading) return <Loader size="md" />;

  if (isError)
    return (
      <MessageNoStories
        text="Не вдалося завантажити історії"
        buttonText="До історій"
        linkTo="/stories"
      />
    );

  const stories = data || [];
  const hasStories = stories.length > 0;

  if (!hasStories) {
    return type === "saved" ? (
      <MessageNoStories
        text="У вас ще немає збережених історій, спершу збережіть вашу першу історію!"
        buttonText="До історій"
        linkTo="/stories"
      />
    ) : (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю першою історією"
        buttonText="Опублікувати історію"
        linkTo="/stories/new"
      />
    );
  }

  return (
    <TravellersStories
      stories={stories}
      fetchNextPage={() => fetchNextPage()}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}
    />
  );
}
