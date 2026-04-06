import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Природні Мандри",
  description:
    "Платформа для екологічних мандрів Україною: відкривайте нові місця, діліться історіями та знаходьте однодумців.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${montserrat.variable}`}>
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
