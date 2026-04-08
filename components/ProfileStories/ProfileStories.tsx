"use client";

import { useState, useEffect } from "react";
import { Story } from "@/types/stories";
import TravellersStories from "../TravellersStories/TravellersStories";
import {
  getUserStoriesFavorites,
  getUserStoriesPrivate,
} from "@/lib/api/users/clientApi";

interface Props {
  initialStories: Story[];
  initialTotalPages: number;
  userId: string;
  type: "saved" | "my";
}

export default function ProfileStoriesClient({
  initialStories,
  initialTotalPages,
  type,
}: Props) {
  const [perPage, setPerPage] = useState(6);
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 1440;
      const newPerPage = isMobile ? 4 : 6;

      setPerPage(newPerPage);

      if (isMobile && initialStories.length === 6 && page === 1) {
        setStories(initialStories.slice(0, 4));

        const estimatedTotalItems = initialTotalPages * 6;
        const newTotalPages = Math.ceil(estimatedTotalItems / newPerPage);
        setTotalPages(newTotalPages);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [initialStories, initialTotalPages]);

  const fetchNextPage = async () => {
    if (isFetching || page >= totalPages) return;

    setIsFetching(true);
    try {
      const nextPage = page + 1;
      const data =
        type === "saved"
          ? await getUserStoriesFavorites({ page: nextPage, perPage })
          : await getUserStoriesPrivate({ page: nextPage, perPage });

      if (data?.stories) {
        setStories((prev) => [...prev, ...data.stories]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading profile stories:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <TravellersStories
      stories={stories}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetching}
      hasNextPage={page < totalPages}
    />
  );
}
