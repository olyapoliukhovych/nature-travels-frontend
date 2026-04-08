"use client";

import { getUserStoriesPrivate } from "@/lib/api/users/clientApi";
import { useQuery } from "@tanstack/react-query";
import ProfileStoriesClient from "@/components/ProfileStories/ProfileStories";
import Loader from "@/components/Loader/Loader";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
export default function MyStoriesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories", "my"],
    queryFn: () => getUserStoriesPrivate({ page: 1, perPage: 6 }),
  });

  if (isLoading) return <Loader />;

  if (isError) return <div>Помилка завантаження історій</div>;

  const hasStories = data?.stories && data.stories.length > 0;
  return (
    <>
      {hasStories ? (
        <ProfileStoriesClient
          key="my-stories"
          initialStories={data.stories}
          initialTotalPages={data.totalPages}
          type="my"
        />
      ) : (
        <MessageNoStories
          text="Ви ще нічого не публікували, поділіться своєю першою історією"
          buttonText="Опублікувати історію"
          linkTo="/stories/new"
        />
      )}
    </>
  );
}
