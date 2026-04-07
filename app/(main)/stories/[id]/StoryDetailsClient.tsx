"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getStoryById } from "@/lib/api/stories/clientApi";
import StoryDetailsPage from "@/components/StoryDetails/StoryDetails";
import Loader from "@/components/Loader/Loader";
import css from "./StoryDetailsClient.module.css";
import SaveStorySection from "@/components/StoryDetails/SaveStorySection";
import clsx from "clsx";

export default function StoryDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: story,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: () => getStoryById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError || !story) return <p>Some error...</p>;

  return (
    <div className={clsx(css.section, "container")}>
      <StoryDetailsPage story={story} />
      <SaveStorySection storyId={story._id} />
    </div>
  );
}
