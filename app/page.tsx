import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import AppLink from "@/components/AppLink/AppLink";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Button
          isLoading={false}
          loadingText=""
          variant="mantis"
          className={styles.button1}
        >
          Button
        </Button>

        <AppLink href="#" variant="base">
          send
        </AppLink>
      </div>
    </div>
  );
}
