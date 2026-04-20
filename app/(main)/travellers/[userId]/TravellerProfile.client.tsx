"use client";

import { Story } from "@/types/stories";
import StoryCard from "@/components/StoryCard/StoryCard";
import Pagination from "@/components/Pagination/Pagination";
import { getUserStoriesPublic } from "@/lib/api/users/clientApi";
import css from "./TravellerProfile.module.css";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  initialStories: (Story | string)[];
  userId: string;
  totalPages: number;
  currentPage: number;
}

export default function TravellerProfileClient({
  initialStories,
  userId,
  totalPages,
}: Props) {
  const PER_PAGE = 6;

  const validInitialStories = Array.isArray(initialStories)
    ? initialStories.filter(
        (s): s is Story => typeof s === "object" && s !== null,
      )
    : [];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["stories-public", userId],
      queryFn: ({ pageParam = 1 }) =>
        getUserStoriesPublic({
          userId,
          page: pageParam as number,
          perPage: PER_PAGE,
        }),
      initialPageParam: 1,
      initialData: {
        pages: [
          {
            stories: validInitialStories,
            totalPages,
            page: 1,
            perPage: PER_PAGE,
            totalItems: validInitialStories.length,
          },
        ],
        pageParams: [1],
      },
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const allStories = data?.pages.flatMap((page) => page.stories) || [];

  return (
    <div>
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
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
}
