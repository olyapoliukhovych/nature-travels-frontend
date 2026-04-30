import { Suspense } from "react";
import VerifyContent from "./VerifyContent";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: "center", marginTop: 50 }}>Завантаження...</p>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
