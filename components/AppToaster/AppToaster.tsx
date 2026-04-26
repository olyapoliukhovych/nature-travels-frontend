"use client";

import { ToastBar, Toaster, toast } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      gutter={12}
      containerStyle={{
        top: 24,
        right: 24,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--color-mantis-lightest)",
          color: "var(--color-mantis-darkest)",
          border: "1px solid var(--color-mantis-lighter)",
          padding: "14px 16px",
          borderRadius: "16px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 10px 24px var(--opacity-neutral-darkest-10)",
        },
        success: {
          style: {
            background: "var(--color-mantis-lightest)",
            color: "var(--color-mantis-darkest)",
            border: "1px solid var(--color-mantis-light)",
          },
          iconTheme: {
            primary: "var(--color-mantis)",
            secondary: "var(--color-white)",
          },
        },
        error: {
          style: {
            background: "#fff5f5",
            color: "var(--color-red)",
            border: "1px solid rgba(176, 1, 1, 0.2)",
          },
          iconTheme: {
            primary: "var(--color-red)",
            secondary: "var(--color-white)",
          },
        },
      }}
    >
      {(currentToast) => (
        <div
          role="button"
          tabIndex={0}
          aria-label="Закрити сповіщення"
          title="Натисніть, щоб закрити"
          onClick={() => toast.dismiss(currentToast.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toast.dismiss(currentToast.id);
            }
          }}
        >
          <ToastBar
            toast={currentToast}
            style={{
              ...currentToast.style,
              cursor: "pointer",
            }}
          />
        </div>
      )}
    </Toaster>
  );
}
