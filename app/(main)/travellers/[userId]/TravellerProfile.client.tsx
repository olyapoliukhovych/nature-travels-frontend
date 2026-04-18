"use client";

import StoryCard from "@/components/StoryCard/StoryCard";
import Pagination from "@/components/Pagination/Pagination";
import { getUserStoriesPublic } from "@/lib/api/users/clientApi";
import css from "./TravellerProfile.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import {
  INITIAL_PAGE,
  TRAVELLER_STORIES_PER_PAGE,
} from "@/app/constants/pagination";

interface Props {
  userId: string;
}

export default function TravellerProfileClient({ userId }: Props) {
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
        page: pageParam,
        perPage: TRAVELLER_STORIES_PER_PAGE,
      }),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    refetchOnMount: false,
  });

  const stories = data?.pages.flatMap((page) => page.stories) || [];

  if (isError) {
    return (
      <MessageNoStories
        text="Виникла помилка при завантаженні історій"
        buttonText="Спробувати ще раз"
        onClick={() => refetch()}
      />
    );
  }

  return (
    <>
      <ul className={css.travellerProfileClientList}>
        {stories.map((story, index) => (
          <li
            key={`${story._id}-${index}`}
            className={css.travellerProfileClientcard}
          >
            <StoryCard story={story} />
          </li>
        ))}
      </ul>
      <div className={css.travellerProfileClientBtnWrapper}>
        {hasNextPage && (
          <Pagination
            fetchNextPage={() => fetchNextPage()}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </>
  );
}
