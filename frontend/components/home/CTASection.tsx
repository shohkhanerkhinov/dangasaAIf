"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

export default function CTASection() {
  const { locale } = useAppStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden"
          style={{ border: "1px solid rgba(0,245,255,0.15)" }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,245,255,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Animated corner accents */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-16 h-16`}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(circle at ${i < 2 ? "top" : "bottom"} ${i % 2 === 0 ? "left" : "right"}, rgba(0,245,255,0.2), transparent)`,
                }}
              />
            </motion.div>
          ))}

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(69,162,158,0.2))",
                border: "1px solid rgba(0,245,255,0.3)",
              }}
            >
              <Zap size={28} style={{ color: "#00F5FF" }} />
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span style={{ color: "#FFFFFF" }}>Ready to </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #00F5FF, #45A29E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Transform
              </span>
              <br />
              <span style={{ color: "#FFFFFF" }}>Education?</span>
            </h2>

            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#C5C6C7" }}>
              Join thousands of teachers and students already using DangasaAI to revolutionize learning.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-ghost flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold"
                >
                  {t(locale, "login")}
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
