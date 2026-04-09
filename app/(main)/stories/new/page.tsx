import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Створити історію",
  description:
    "Поділіться своєю еко-подорожжю з іншими! Завантажуйте фото та розповідайте про неймовірні куточки України на платформі Природні Мандри.",
};

export default function NewStoryPage() {
  return (
    <div className="container">
      <AddStoryForm />
    </div>
  );
}
