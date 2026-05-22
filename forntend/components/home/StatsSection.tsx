"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Eye, Activity } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}K` : Math.round(v).toString()
  );
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

interface StatsData {
  total_visitors: number;
  registered_users: number;
  active_users: number;
}

const defaultStats: StatsData = {
  total_visitors: 16480,
  registered_users: 0,
  active_users: 0,
};

export default function StatsSection() {
  const { locale } = useAppStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [statsData, setStatsData] = useState<StatsData>(defaultStats);

  useEffect(() => {
    fetch("http://localhost:8000/api/stats/")
      .then((res) => res.json())
      .then((data: StatsData) => setStatsData(data))
      .catch(() => {
        // fallback to defaults on error
      });
  }, []);

  const stats = [
    { key: "totalVisitors" as const, value: statsData.total_visitors, icon: Eye, color: "#00F5FF" },
    { key: "registeredUsers" as const, value: statsData.registered_users, icon: Users, color: "#45A29E" },
    { key: "activeUsers" as const, value: statsData.active_users, icon: Activity, color: "#00F5FF" },
  ];

  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass-strong rounded-2xl p-6 text-center relative overflow-hidden group"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}10 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>

                {/* Number */}
                <div
                  className="text-4xl font-black mb-2"
                  style={{ color: stat.color }}
                >
                  <AnimatedNumber value={stat.value} />+
                </div>

                {/* Label */}
                <p className="text-sm font-medium" style={{ color: "#C5C6C7" }}>
                  {t(locale, stat.key)}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
