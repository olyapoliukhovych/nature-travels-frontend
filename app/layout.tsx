import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Природні Мандри",
    default: "Природні Мандри — Еко-подорожі Україною",
  },
  description:
    "Платформа для екологічних мандрів Україною: відкривайте нові місця, діліться історіями та знаходьте однодумців.",

  metadataBase: new URL("https://nature-travels-frontend.vercel.app"),

  icons: {
    icon: [
      {
        url: "/favicon.png",
      },
    ],
  },

  openGraph: {
    title: "Природні Мандри",
    description: "Діліться вашими історіями",
    url: "https://nature-travels-frontend.vercel.app",
    siteName: "Природні Мандри",
    locale: "uk_UA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Природні Мандри",
    description: "Еко-подорожі Україною",
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
        <TanStackProvider>
          <AuthProvider>
            {/* для переходів між сторінками */}
            <NextTopLoader
              color="#4a9849"
              showSpinner={false}
              height={2}
              speed={150}
            />
            {children}
            <ScrollToTopBtn />
          </AuthProvider>
        </TanStackProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
