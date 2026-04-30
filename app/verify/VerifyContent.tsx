"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { verifyEmail } from "@/lib/api/users/clientApi";

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
        toast.success("Email підтверджено");
      } catch {
        setStatus("error");
        toast.error("Невалідний або прострочений токен");
      } finally {
        setTimeout(() => {
          router.push("/profile/my-stories");
        }, 2500);
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div style={{ padding: "40px", marginTop: "50px", textAlign: "center" }}>
      {status === "loading" && <p>Підтверджуємо email...</p>}
      {/* {status === "success" && <p>Email успішно підтверджено ✅</p>}
      {status === "error" && <p>Помилка підтвердження ❌</p>} */}
    </div>
  );
}
