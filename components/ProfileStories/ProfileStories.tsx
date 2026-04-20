"use client";

import { useState } from "react";
import { Story } from "@/types/stories";
import TravellersStories from "../TravellersStories/TravellersStories";
import {
  getUserStoriesFavorites,
  getUserStoriesPrivate,
} from "@/lib/api/users/clientApi";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

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
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data, isFetching } = useQuery({
    queryKey: ["profile-stories", type],
    queryFn: () =>
      type === "saved"
        ? getUserStoriesFavorites({ page: 1, perPage: page * perPage })
        : getUserStoriesPrivate({ page: 1, perPage: page * perPage }),
    initialData: {
      stories: initialStories,
      totalPages: initialTotalPages,
      totalItems: initialStories.length,
      page: 1,
      perPage: 6,
    },
    placeholderData: keepPreviousData,
  });

  const handleFetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const stories = data?.stories || [];
  const totalPages = data?.totalPages || initialTotalPages;

  return (
    <TravellersStories
      stories={stories}
      fetchNextPage={handleFetchNextPage}
      isFetchingNextPage={isFetching}
      hasNextPage={page < totalPages}
    />
  );
}
