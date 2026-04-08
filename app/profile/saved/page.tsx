import ProfileStoriesClient from "@/components/ProfileStories/ProfileStories";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
export default async function SavedStoriesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  try {
    const res = await api.get("/users/saved", {
      params: { page: 1, perPage: 6 },
      headers: {
        Cookie: `accessToken=${token}; sessionId=${sessionId}`,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;
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
            type="saved"
          />
        ) : (
          <MessageNoStories
            text="У вас ще немає збережених історій, спершу збережіть вашу першу історію!"
            buttonText="До історій"
            linkTo="/stories"
          />
        )}
      </>
    );
  } catch (error) {
    return <p>Не вдалося завантажити збережені історії.</p>;
  }
}
