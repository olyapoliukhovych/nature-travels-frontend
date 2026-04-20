"use client";

import { Story } from "@/types/stories";
import StoryCard from "@/components/StoryCard/StoryCard";
import Pagination from "@/components/Pagination/Pagination";
import { getUserStoriesPublic } from "@/lib/api/users/clientApi";
import css from "./TravellerProfile.module.css";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import {
  INITIAL_PAGE,
  TRAVELLER_STORIES_PER_PAGE,
} from "@/constants/pagination";

interface Props {
  userId: string;
}

export default function TravellerProfileClient({
  userId,
  initialStories = [],
  totalPages = 1,
}: Props) {
  const validInitialStories = initialStories.filter(
    (s): s is Story => typeof s === "object" && s !== null
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
    initialData: initialStories.length > 0 ? {
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
    } : undefined,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    refetchOnMount: false,
  });

  const allStories = data?.pages.flatMap((page) => page.stories) || [];

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
    <>
      <ul className={css.travellerProfileClientList}>
        {allStories.map((story) => (
          <motion.li
            layout
            key={story._id}
            className={css.travellerProfileClientcard}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <StoryCard story={story} />
          </motion.li>
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