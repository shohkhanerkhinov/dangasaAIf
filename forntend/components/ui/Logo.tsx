"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 36, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  };

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
        style={{ width: sizes[size].icon, height: sizes[size].icon }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, #00F5FF, #45A29E)",
            filter: "blur(6px)",
          }}
        />
        {/* Icon container */}
        <div
          className="relative w-full h-full rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #00F5FF22, #45A29E22)",
            border: "1px solid rgba(0, 245, 255, 0.4)",
          }}
        >
          {/* AI neural icon */}
          <svg
            width={sizes[size].icon * 0.6}
            height={sizes[size].icon * 0.6}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="3" fill="#00F5FF" />
            <circle cx="4" cy="6" r="2" fill="#45A29E" />
            <circle cx="20" cy="6" r="2" fill="#45A29E" />
            <circle cx="4" cy="18" r="2" fill="#45A29E" />
            <circle cx="20" cy="18" r="2" fill="#45A29E" />
            <line x1="12" y1="9" x2="6" y2="7" stroke="#00F5FF" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="12" y1="9" x2="18" y2="7" stroke="#00F5FF" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="12" y1="15" x2="6" y2="17" stroke="#00F5FF" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="12" y1="15" x2="18" y2="17" stroke="#00F5FF" strokeWidth="1.5" strokeOpacity="0.7" />
          </svg>
        </div>
      </motion.div>

      {showText && (
        <span
          className={`font-bold tracking-tight ${sizes[size].text}`}
          style={{
            background: "linear-gradient(135deg, #00F5FF, #45A29E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          DangasaAI
        </span>
      )}
    </Link>
  );
}
