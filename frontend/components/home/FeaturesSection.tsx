"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain, FileText, BarChart3, Users, Zap, BookOpen,
  Download, Layers, Target, Sparkles
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

const features = [
  {
    icon: Brain,
    title: "AI Quiz Generation",
    desc: "Generate intelligent quizzes from any topic in seconds using advanced AI models.",
    color: "#00F5FF",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    icon: Target,
    title: "Adaptive Learning",
    desc: "Questions adapt to student performance — easy to hard, personalized for each learner.",
    color: "#45A29E",
    gradient: "from-teal-500/10 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Real-time dashboards showing student progress, weak areas, and performance trends.",
    color: "#00F5FF",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    icon: FileText,
    title: "AI Test Creation",
    desc: "Teachers can auto-generate full tests with answer keys and difficulty levels.",
    color: "#45A29E",
    gradient: "from-teal-500/10 to-transparent",
  },
  {
    icon: Users,
    title: "Student Monitoring",
    desc: "Track every student's activity, scores, and learning patterns in real time.",
    color: "#00F5FF",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    icon: Zap,
    title: "Instant Grading",
    desc: "AI automatically checks and grades tests, saving teachers hours of manual work.",
    color: "#45A29E",
    gradient: "from-teal-500/10 to-transparent",
  },
  {
    icon: BookOpen,
    title: "AI Flashcards",
    desc: "Generate smart flashcard sets from any educational material automatically.",
    color: "#00F5FF",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    icon: Download,
    title: "PDF Export",
    desc: "Export any quiz, test, or report as a beautifully formatted PDF document.",
    color: "#45A29E",
    gradient: "from-teal-500/10 to-transparent",
  },
  {
    icon: Layers,
    title: "Content Generation",
    desc: "Create lesson plans, summaries, and educational materials with one click.",
    color: "#00F5FF",
    gradient: "from-cyan-500/10 to-transparent",
  },
];

export default function FeaturesSection() {
  const { locale } = useAppStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            style={{ border: "1px solid rgba(0,245,255,0.15)" }}
          >
            <Sparkles size={14} style={{ color: "#00F5FF" }} />
            <span className="text-sm" style={{ color: "#45A29E" }}>Platform Features</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span style={{ color: "#FFFFFF" }}>{t(locale, "featuresTitle")} </span>
            <span
              style={{
                background: "linear-gradient(135deg, #00F5FF, #45A29E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(locale, "featuresAccent")}
            </span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#C5C6C7" }}>
            {t(locale, "featuresSubtitle")}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at top left, ${feature.color}08 0%, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}12`,
                    border: `1px solid ${feature.color}25`,
                  }}
                >
                  <Icon size={20} style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold mb-2" style={{ color: "#FFFFFF" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#C5C6C7" }}>
                  {feature.desc}
                </p>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
