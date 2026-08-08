import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import AppToaster from "@/components/AppToaster/AppToaster";
import { getUserProfile } from "@/lib/api/users/serverApi";

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
    description:
      "Платформа для екологічних мандрів Україною: відкривайте нові місця, діліться історіями та знаходьте однодумців.",
    url: "https://nature-travels-frontend.vercel.app",
    siteName: "Природні Мандри",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Природні Мандри",
    description: "Еко-подорожі Україною",
    images: ["/preview.png"],
  },
};

const themeInitializerScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('theme') || 'system';
      if (savedTheme === 'system') {
        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    } catch (e) {}
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserProfile();

  return (
    <html
      lang="uk"
      className={`${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body>
        <TanStackProvider>
          <AuthProvider initialUser={user}>
            <ThemeProvider>
              <NextTopLoader
                color="#4a9849"
                showSpinner={false}
                height={2}
                speed={150}
              />
              {children}
              <ScrollToTopBtn />
            </ThemeProvider>
          </AuthProvider>
        </TanStackProvider>
        <AppToaster />
      </body>
    </html>
  );
}
