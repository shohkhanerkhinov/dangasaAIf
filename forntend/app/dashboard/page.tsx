"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, FileText, BarChart3, Users, Zap, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAppStore } from "@/store/useAppStore";
export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, locale } = useAppStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const teacherCards = [
    { icon: Brain, title: "Generate Quiz", desc: "Create AI-powered quizzes instantly", color: "#00F5FF", href: "/dashboard/quiz" },
    { icon: FileText, title: "Create Test", desc: "Build full tests with answer keys", color: "#45A29E", href: "/dashboard/tests" },
    { icon: Users, title: "My Students", desc: "Monitor student progress", color: "#00F5FF", href: "/dashboard/students" },
    { icon: BarChart3, title: "Analytics", desc: "View detailed performance reports", color: "#45A29E", href: "/dashboard/analytics" },
    { icon: Zap, title: "AI Content", desc: "Generate educational materials", color: "#00F5FF", href: "/dashboard/content" },
    { icon: BookOpen, title: "Flashcards", desc: "Create smart flashcard sets", color: "#45A29E", href: "/dashboard/flashcards" },
  ];

  const studentCards = [
    { icon: Brain, title: "Practice Quiz", desc: "Take adaptive AI quizzes", color: "#00F5FF", href: "/dashboard/quiz" },
    { icon: BookOpen, title: "My Flashcards", desc: "Study with smart flashcards", color: "#45A29E", href: "/dashboard/flashcards" },
    { icon: BarChart3, title: "My Progress", desc: "Track your learning journey", color: "#00F5FF", href: "/dashboard/progress" },
    { icon: Zap, title: "AI Tutor", desc: "Get personalized AI help", color: "#45A29E", href: "/dashboard/tutor" },
  ];

  const cards = user.role === "teacher" ? teacherCards : studentCards;

  return (
    <div style={{ background: "#0B0C10", minHeight: "100vh" }}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00F5FF, #45A29E)", color: "#0B0C10" }}
            >
              {user.first_name[0]}{user.last_name[0]}
            </div>
            <div>
              <p className="text-sm" style={{ color: "#45A29E" }}>
                Welcome back,
              </p>
              <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                {user.first_name} {user.last_name}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium capitalize"
              style={{ background: "rgba(0,245,255,0.1)", color: "#00F5FF", border: "1px solid rgba(0,245,255,0.2)" }}
            >
              {user.role}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium capitalize"
              style={{ background: "rgba(69,162,158,0.1)", color: "#45A29E", border: "1px solid rgba(69,162,158,0.2)" }}
            >
              {user.institution_type}
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => router.push(card.href)}
                className="glass-strong rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at top left, ${card.color}08 0%, transparent 60%)`,
                  }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${card.color}12`,
                    border: `1px solid ${card.color}25`,
                  }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>

                <h3 className="text-base font-semibold mb-1" style={{ color: "#FFFFFF" }}>
                  {card.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: "#C5C6C7" }}>
                  {card.desc}
                </p>

                <div
                  className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: card.color }}
                >
                  Open <ArrowRight size={12} />
                </div>

                <div
                  className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Coming soon notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass rounded-2xl p-5 text-center"
          style={{ border: "1px solid rgba(0,245,255,0.08)" }}
        >
          <p className="text-sm" style={{ color: "#C5C6C7" }}>
            🚀 More features coming soon — AI quiz engine, analytics, and more are being built.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
