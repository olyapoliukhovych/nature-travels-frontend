import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getStoryById } from "@/lib/api/stories/clientApi";
import StoryDetailsClient from "./StoryDetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

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
