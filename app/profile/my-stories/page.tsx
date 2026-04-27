"use client";

import { getUserStoriesPrivate } from "@/lib/api/users/clientApi";
import { useQuery } from "@tanstack/react-query";
import ProfileStoriesClient from "@/components/ProfileStories/ProfileStories";
import Loader from "@/components/Loader/Loader";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import { INITIAL_PAGE, PROFILE_STORIES_PER_PAGE } from "@/constants/pagination";

export default function MyStoriesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile-stories-initial", "my"],
    queryFn: () =>
      getUserStoriesPrivate({
        page: INITIAL_PAGE,
        perPage: PROFILE_STORIES_PER_PAGE,
      }),
  });

  if (isLoading) return <Loader size="md" />;

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
