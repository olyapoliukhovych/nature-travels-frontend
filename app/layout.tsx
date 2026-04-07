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
