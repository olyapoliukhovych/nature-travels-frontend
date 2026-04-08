import { getUserStoriesFavorites } from "@/lib/api/users/clientApi";
import ProfileStoriesClient from "@/components/ProfileStories/ProfileStories";

export default async function SavedStoriesPage() {
  const data = await getUserStoriesFavorites({ page: 1, perPage: 6 });
  const stories = data?.stories || [];
  const totalPages = data?.totalPages || 1;
  const hasSavedStories = stories.length > 0;
  return (
    <>
      {hasSavedStories ? (
        <ProfileStoriesClient
          key="saved-stories"
          initialStories={stories}
          initialTotalPages={totalPages}
          userId="me"
          type="saved"
        />
      ) : (
        <p>заглушка</p>
      )}
    </>
  );
}
