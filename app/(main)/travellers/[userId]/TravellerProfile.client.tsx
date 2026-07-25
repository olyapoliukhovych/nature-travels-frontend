"use client";

import { Story } from "@/types/stories";
import { getUserStoriesPublic } from "@/lib/api/users/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import {
  INITIAL_PAGE,
  TRAVELLER_STORIES_PER_PAGE,
} from "@/constants/pagination";
import { useMemo } from "react";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

interface Props {
  userId: string;
  initialStories?: Story[];
  totalPages?: number;
}

export default function TravellerProfileClient({
  userId,
  initialStories = [],
  totalPages = 1,
}: Props) {
  const validInitialStories = initialStories.filter(
    (s): s is Story => typeof s === "object" && s !== null,
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["user-public-stories", userId],
    queryFn: ({ pageParam = INITIAL_PAGE }) =>
      getUserStoriesPublic({
        userId,
        page: pageParam as number,
        perPage: TRAVELLER_STORIES_PER_PAGE,
      }),
    initialPageParam: INITIAL_PAGE,
    placeholderData:
      initialStories.length > 0
        ? {
            pages: [
              {
                stories: validInitialStories,
                totalPages,
                page: INITIAL_PAGE,
                perPage: TRAVELLER_STORIES_PER_PAGE,
                totalItems: validInitialStories.length,
              },
            ],
            pageParams: [INITIAL_PAGE],
          }
        : undefined,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    staleTime: 1000 * 60 * 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const allStories = useMemo(() => {
    const flat = data?.pages.flatMap((page) => page.stories) || [];

    const map = new Map();

    for (const story of flat) {
      map.set(story._id, story);
    }

    return Array.from(map.values());
  }, [data]);

  if (isError && allStories.length === 0) {
    return (
      <MessageNoStories
        text="Виникла помилка при завантаженні історій"
        buttonText="Спробувати ще раз"
        onClick={() => refetch()}
      />
    );
  }

  return (
    <TravellersStories
      stories={allStories}
      fetchNextPage={() => fetchNextPage()}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}
    />
  );
}
