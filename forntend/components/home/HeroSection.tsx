"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap, Brain } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

export default function HeroSection() {
  const { locale } = useAppStore();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(69,162,158,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? "#00F5FF" : "#45A29E",
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8"
          style={{ border: "1px solid rgba(0,245,255,0.2)" }}
        >
          <Sparkles size={14} style={{ color: "#00F5FF" }} />
          <span className="text-sm font-medium" style={{ color: "#00F5FF" }}>
            AI-Powered Education Platform
          </span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00F5FF" }}
          />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
        >
          <span style={{ color: "#FFFFFF" }}>{t(locale, "heroTitle")} </span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00F5FF 0%, #45A29E 50%, #00F5FF 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-x 3s ease infinite",
            }}
          >
            {t(locale, "heroTitleAccent")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#C5C6C7" }}
        >
          {t(locale, "heroSubtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,245,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold"
            >
              <Zap size={18} />
              {t(locale, "getStarted")}
              <ArrowRight size={18} />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-ghost flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)" }}
            >
              <Play size={14} style={{ color: "#00F5FF" }} fill="#00F5FF" />
            </div>
            {t(locale, "watchDemo")}
          </motion.button>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-12"
        >
          {["AI Quiz Generation", "Smart Analytics", "Adaptive Learning", "PDF Export", "Multi-language"].map(
            (feature, i) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass"
                style={{
                  color: "#C5C6C7",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Brain size={11} style={{ color: "#45A29E" }} />
                {feature}
              </motion.span>
            )
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: "rgba(0,245,255,0.3)" }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: "#00F5FF" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
