"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAppStore } from "@/store/useAppStore";
import Loader from "@/components/ui/Loader";

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  return (
    <>
      <Loader />
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#121214",
            color: "#FFFFFF",
            border: "1px solid rgba(0,245,255,0.2)",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#00F5FF", secondary: "#0B0C10" },
          },
          error: {
            iconTheme: { primary: "#ff6b6b", secondary: "#0B0C10" },
          },
        }}
      />
    </>
  );
}
