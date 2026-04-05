import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import css from "./Mainlayout.module.css";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.layoutWrapper}>
      <Header />
      <main className={clsx(css.mainContent)}>{children}</main>
      <Footer />
    </div>
  );
}
