"use client";

import { useState, useEffect } from "react";
import { Story } from "@/types/stories";
import TravellersStories from "../TravellersStories/TravellersStories";
import {
  getUserStoriesFavorites,
  getUserStoriesPrivate,
  getUserProfile,
} from "@/lib/api/users/clientApi";
import { useQuery } from "@tanstack/react-query";
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
  const [allStories, setAllStories] = useState<Story[]>(initialStories);

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  const { data, isFetching } = useQuery({
    queryKey: ["profile-stories", type, page],
    queryFn: () =>
      type === "saved"
        ? getUserStoriesFavorites({ page, perPage })
        : getUserStoriesPrivate({ page, perPage }),
    enabled: page > 1,
  });

  useEffect(() => {
    if (data?.stories && page > 1) {
      setAllStories((prev) => {
        const existingIds = new Set(prev.map((s) => s._id));
        const newUnique = data.stories.filter((s) => !existingIds.has(s._id));
        return [...prev, ...newUnique];
      });
    }
  }, [data, page]);

  useEffect(() => {
    if (type === "saved" && userProfile?.savedStories) {
      const savedIds = new Set(
        userProfile.savedStories.map((s: string | { _id: string }) =>
          typeof s === "string" ? s : s._id,
        ),
      );

      setAllStories((prev) => prev.filter((story) => savedIds.has(story._id)));
    }
  }, [userProfile, type]);

  const handleFetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const totalPages = data?.totalPages || initialTotalPages;

  return (
    <TravellersStories
      stories={allStories}
      fetchNextPage={handleFetchNextPage}
      isFetchingNextPage={isFetching}
      hasNextPage={page < totalPages}
    />
  );
}
