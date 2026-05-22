"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft, Globe, Sun, Moon, GraduationCap, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "@/components/ui/Logo";
import { useAppStore } from "@/store/useAppStore";
import { t, type Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "uz", label: "UZ", flag: "🇺🇿" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

type InstitutionType = "school" | "college" | "institute" | "university";
type UserRole = "teacher" | "student";

const institutions: { value: InstitutionType; icon: string }[] = [
  { value: "school", icon: "🏫" },
  { value: "college", icon: "🏛️" },
  { value: "institute", icon: "🔬" },
  { value: "university", icon: "🎓" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, locale, setLocale, theme, toggleTheme } = useAppStore();

  const [step, setStep] = useState(1); // 1: info, 2: institution, 3: role
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "" as InstitutionType | "",
    role: "" as UserRole | "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = t(locale, "firstNameRequired");
    if (!form.lastName) errs.lastName = t(locale, "lastNameRequired");
    if (!form.email) errs.email = t(locale, "emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t(locale, "invalidEmail");
    if (!form.password) errs.password = t(locale, "passwordRequired");
    else if (form.password.length < 8) errs.password = t(locale, "passwordTooShort");
    if (form.password !== form.confirmPassword) errs.confirmPassword = t(locale, "passwordsNotMatch");
    return errs;
  };

  const handleNext = () => {
    if (step === 1) {
      const errs = validateStep1();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
      setErrors({});
    }
    if (step === 2 && !form.institution) {
      toast.error("Please select an institution type");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!form.role) { toast.error("Please select your role"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          institution_type: form.institution,
          role: form.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || t(locale, "registerError"));
      setUser(data.user, data.access_token);
      toast.success(t(locale, "registerSuccess"));
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t(locale, "registerError");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8"
      style={{ background: "#0B0C10" }}
    >
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(69,162,158,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
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
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#C5C6C7" }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="glass-strong rounded-3xl p-8" style={{ border: "1px solid rgba(0,245,255,0.12)" }}>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: step >= s ? "linear-gradient(135deg, #00F5FF, #45A29E)" : "rgba(255,255,255,0.06)",
                    color: step >= s ? "#0B0C10" : "#C5C6C7",
                  }}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className="flex-1 h-0.5 rounded-full transition-all duration-500"
                    style={{
                      background: step > s ? "linear-gradient(90deg, #00F5FF, #45A29E)" : "rgba(255,255,255,0.08)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
                  {t(locale, "createAccount")}
                </h1>
                <p className="text-sm mb-6" style={{ color: "#C5C6C7" }}>
                  Fill in your personal information
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#C5C6C7" }}>
                        {t(locale, "firstName")}
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#45A29E" }} />
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          placeholder="John"
                          className="input-cyber w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                      {errors.firstName && <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#C5C6C7" }}>
                        {t(locale, "lastName")}
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#45A29E" }} />
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          placeholder="Doe"
                          className="input-cyber w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                      {errors.lastName && <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#C5C6C7" }}>
                      {t(locale, "email")}
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#45A29E" }} />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@gmail.com"
                        className="input-cyber w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                    {errors.email && <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#C5C6C7" }}>
                      {t(locale, "password")}
                    </label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#45A29E" }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="••••••••"
                        className="input-cyber w-full pl-9 pr-9 py-2.5 rounded-xl text-sm"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#C5C6C7" }}>
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#C5C6C7" }}>
                      {t(locale, "confirmPassword")}
                    </label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#45A29E" }} />
                      <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        className="input-cyber w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>{errors.confirmPassword}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Institution */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
                  {t(locale, "selectInstitution")}
                </h1>
                <p className="text-sm mb-6" style={{ color: "#C5C6C7" }}>
                  Where do you study or teach?
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {institutions.map((inst) => (
                    <motion.button
                      key={inst.value}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setForm({ ...form, institution: inst.value })}
                      className="p-4 rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: form.institution === inst.value
                          ? "rgba(0,245,255,0.1)"
                          : "rgba(255,255,255,0.03)",
                        border: form.institution === inst.value
                          ? "1px solid rgba(0,245,255,0.4)"
                          : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: form.institution === inst.value
                          ? "0 0 20px rgba(0,245,255,0.1)"
                          : "none",
                      }}
                    >
                      <div className="text-2xl mb-2">{inst.icon}</div>
                      <div
                        className="text-sm font-semibold capitalize"
                        style={{ color: form.institution === inst.value ? "#00F5FF" : "#FFFFFF" }}
                      >
                        {t(locale, inst.value)}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Role */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
                  {t(locale, "selectRole")}
                </h1>
                <p className="text-sm mb-6" style={{ color: "#C5C6C7" }}>
                  This helps us personalize your AI experience
                </p>

                <div className="space-y-3">
                  {(["teacher", "student"] as UserRole[]).map((role) => (
                    <motion.button
                      key={role}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setForm({ ...form, role })}
                      className="w-full p-5 rounded-2xl text-left transition-all duration-200 flex items-start gap-4"
                      style={{
                        background: form.role === role ? "rgba(0,245,255,0.08)" : "rgba(255,255,255,0.03)",
                        border: form.role === role ? "1px solid rgba(0,245,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: form.role === role ? "0 0 20px rgba(0,245,255,0.08)" : "none",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: form.role === role ? "rgba(0,245,255,0.15)" : "rgba(255,255,255,0.05)",
                          border: form.role === role ? "1px solid rgba(0,245,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {role === "teacher" ? (
                          <GraduationCap size={20} style={{ color: form.role === role ? "#00F5FF" : "#C5C6C7" }} />
                        ) : (
                          <BookOpen size={20} style={{ color: form.role === role ? "#00F5FF" : "#C5C6C7" }} />
                        )}
                      </div>
                      <div>
                        <div
                          className="font-semibold capitalize mb-1"
                          style={{ color: form.role === role ? "#00F5FF" : "#FFFFFF" }}
                        >
                          {t(locale, role)}
                        </div>
                        <div className="text-xs leading-relaxed" style={{ color: "#C5C6C7" }}>
                          {t(locale, role === "teacher" ? "teacherDesc" : "studentDesc")}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step - 1)}
                className="btn-ghost flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            )}

            {step < 3 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
              >
                Continue
                <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
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
                    {t(locale, "signUp")}
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Login link */}
          <p className="text-center text-sm mt-4" style={{ color: "#C5C6C7" }}>
            {t(locale, "haveAccount")}{" "}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: "#00F5FF" }}>
              {t(locale, "signIn")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
