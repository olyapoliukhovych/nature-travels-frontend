import AuthFooter from "@/components/AuthFooter/AuthFooter";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import MainAuthNav from "@/components/MainAuthNav/MainAuthNav";
import css from "./AuthLayout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.layoutWrapper}>
      <AuthHeader />
      <main className={css.mainContent}>
        <div className={css.loginAuthWrapper}>
          <MainAuthNav />
          {children}
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
