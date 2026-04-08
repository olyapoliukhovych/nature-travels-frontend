import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мої історії",
  description:
    "Керуйте своїми еко-історіями та переглядайте власні публікації на платформі Природні Мандри.",
};

export default function MyStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
