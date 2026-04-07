"use client";

import { useState } from "react";
import { Story } from "@/types/stories";
import StoryCard from "@/components/StoryCard/StoryCard";
import Pagination from "@/components/Pagination/Pagination";
import { getUserByIdPublic } from "@/lib/api/users/clientApi";
import css from "./TravellerProfile.module.css";

interface Props {
  initialStories: Story[];
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
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [page, setPage] = useState(currentPage);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNextPage = async () => {
    setIsFetching(true);
    try {
      const nextPage = page + 1;
      const data = await getUserByIdPublic({
        userId,
        page: nextPage,
        perPage: 6,
      });

      setStories((prev) => [...prev, ...data.stories]);
      setPage(nextPage);
    } catch (error) {
      console.error("Помилка при завантаженні", error);
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
