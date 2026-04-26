import { getStoryById } from "@/lib/api/stories/serverApi";
import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Редагування історії",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditStoryPage({ params }: Props) {
  const { id } = await params;
  const story = await getStoryById(id);

  return (
    // <div className="container">
    <AddStoryForm initialData={story} isEditMode={true} />
    // </div>
  );
}
