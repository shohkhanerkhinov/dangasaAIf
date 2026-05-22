"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Globe, Sun, Moon } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "@/components/ui/Logo";
import { useAppStore } from "@/store/useAppStore";
import { t, type Locale } from "@/lib/i18n";
import { apiRequest } from "@/lib/api";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "uz", label: "UZ", flag: "🇺🇿" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setGuest, locale, setLocale, theme, toggleTheme } = useAppStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = t(locale, "emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t(locale, "invalidEmail");
    if (!form.password) errs.password = t(locale, "passwordRequired");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const data = await apiRequest<{ user: { id: number; first_name: string; last_name: string; email: string; role: "teacher" | "student"; institution_type: "school" | "college" | "institute" | "university" }; access_token: string }>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email: form.email, password: form.password }),
        }
      );
      setUser(data.user, data.access_token);
      toast.success(t(locale, "loginSuccess"));
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t(locale, "loginError");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    setGuest(true);
    router.push("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#0B0C10" }}
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          {/* Language */}
          <div className="flex items-center gap-1 glass rounded-xl px-2 py-1" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <Globe size={13} style={{ color: "#45A29E" }} />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className="px-2 py-0.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: locale === lang.code ? "rgba(0,245,255,0.15)" : "transparent",
                  color: locale === lang.code ? "#00F5FF" : "#C5C6C7",
                }}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#C5C6C7" }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md mx-4"
      >
        <div
          className="glass-strong rounded-3xl p-8"
          style={{ border: "1px solid rgba(0,245,255,0.12)" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(69,162,158,0.15))",
                border: "1px solid rgba(0,245,255,0.25)",
              }}
            >
              <Lock size={24} style={{ color: "#00F5FF" }} />
            </motion.div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
              {t(locale, "welcomeBack")}
            </h1>
            <p className="text-sm" style={{ color: "#C5C6C7" }}>
              Sign in to your DangasaAI account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#C5C6C7" }}>
                {t(locale, "email")}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#45A29E" }} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-cyber w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  style={{
                    borderColor: errors.email ? "rgba(255,107,107,0.5)" : undefined,
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#C5C6C7" }}>
                {t(locale, "password")}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#45A29E" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-cyber w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                  style={{
                    borderColor: errors.password ? "rgba(255,107,107,0.5)" : undefined,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "#C5C6C7" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>{errors.password}</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-xs hover:underline" style={{ color: "#45A29E" }}>
                {t(locale, "forgotPassword")}
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn-primary w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 rounded-full border-2 border-transparent"
                  style={{ borderTopColor: "#0B0C10" }}
                />
              ) : (
                <>
                  {t(locale, "signIn")}
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs" style={{ color: "#C5C6C7" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Register link */}
          <p className="text-center text-sm" style={{ color: "#C5C6C7" }}>
            {t(locale, "noAccount")}{" "}
            <Link href="/register" className="font-semibold hover:underline" style={{ color: "#00F5FF" }}>
              {t(locale, "signUp")}
            </Link>
          </p>

          {/* Skip */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            onClick={handleSkip}
            className="w-full mt-3 py-2.5 rounded-xl text-sm transition-all hover:bg-white/5"
            style={{ color: "#C5C6C7", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {t(locale, "skipForNow")} →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
