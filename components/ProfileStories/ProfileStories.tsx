"use client";

import { Story } from "@/types/stories";
import TravellersStories from "../TravellersStories/TravellersStories";
import {
  getUserStoriesFavorites,
  getUserStoriesPrivate,
} from "@/lib/api/users/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INITIAL_PAGE, PROFILE_STORIES_PER_PAGE } from "@/constants/pagination";
import { useMemo } from "react";

interface Props {
  initialStories: Story[];
  initialTotalPages: number;
  type: "saved" | "my";
}

export default function ProfileStoriesClient({
  initialStories,
  initialTotalPages,
  type,
}: Props) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
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
      placeholderData:
        initialStories.length > 0
          ? {
              pages: [
                {
                  stories: initialStories,
                  totalPages: initialTotalPages,
                  totalItems: initialStories.length,
                  page: INITIAL_PAGE,
                  perPage: PROFILE_STORIES_PER_PAGE,
                },
              ],
              pageParams: [INITIAL_PAGE],
            }
          : undefined,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const stories = useMemo(() => {
    const all = data?.pages.flatMap((page) => page.stories) || [];

    const map = new Map();

    for (const story of all) {
      map.set(story._id, story);
    }

    return Array.from(map.values());
  }, [data]);

  return (
    <TravellersStories
      stories={stories}
      fetchNextPage={() => fetchNextPage()}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}
    />
  );
}
