import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getStoryById } from "@/lib/api/stories/serverApi";
import StoryDetailsClient from "./StoryDetailsClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const story = await getStoryById(id);

  if (!story) {
    return { title: "Історію не знайдено" };
  }

  return {
    title: story.title,
    description: story.article?.substring(0, 160),
    openGraph: {
      title: story.title,
      description: story.article?.substring(0, 160),
      type: "article",
      images: [
        {
          url: story.img,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
    },
  };
}

export default async function StoryDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["story", id],
    queryFn: () => getStoryById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryDetailsClient />
    </HydrationBoundary>
  );
}
