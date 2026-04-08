"use client";

import { useState } from "react";
import { Story } from "@/types/stories";
import StoryCard from "@/components/StoryCard/StoryCard";
import Pagination from "@/components/Pagination/Pagination";
import { getUserStoriesPublic } from "@/lib/api/users/clientApi";
import css from "./TravellerProfile.module.css";

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
  currentPage,
}: Props) {
  // const [stories, setStories] = useState<Story[]>(
  //   initialStories.filter((s): s is Story => typeof s !== "string"),
  // );
  const [stories, setStories] = useState<Story[]>(() =>
    Array.isArray(initialStories)
      ? initialStories.filter(
          (s): s is Story => typeof s === "object" && s !== null && "_id" in s,
        )
      : [],
  );

  const [page, setPage] = useState(currentPage);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNextPage = async () => {
    if (isFetching || page >= totalPages) return;

    setIsFetching(true);
    try {
      const nextPage = page + 1;
      const data = await getUserStoriesPublic({
        userId,
        page: nextPage,
        perPage: 6,
      });

      if (data?.stories) {
        const validNewStories = data.stories.filter(
          (s): s is Story => typeof s === "object" && s !== null && "_id" in s,
        );

        setStories((prev) => [...prev, ...validNewStories]);
        setPage(page + 1);
      }
    } catch (error) {
      return <p>Помилка при завантаженні.</p>;
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
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
        {page < totalPages && (
          <Pagination
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetching}
          />
        )}
      </div>
    </div>
  );
}
