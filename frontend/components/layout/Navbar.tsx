"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sun, Moon, Globe, ChevronDown, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAppStore } from "@/store/useAppStore";
import { t, type Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, theme, toggleTheme, locale, setLocale, logout } = useAppStore();
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b"
      style={{ borderColor: "rgba(0,245,255,0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setProfileOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 hover:bg-white/5"
                style={{ color: "#C5C6C7" }}
              >
                <Globe size={15} />
                <span>{languages.find((l) => l.code === locale)?.flag}</span>
                <span>{locale.toUpperCase()}</span>
                <ChevronDown size={13} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-40 glass-strong rounded-xl overflow-hidden shadow-2xl"
                    style={{ border: "1px solid rgba(0,245,255,0.15)" }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-all hover:bg-white/5"
                        style={{ color: locale === lang.code ? "#00F5FF" : "#C5C6C7" }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all hover:bg-white/5"
              style={{ color: "#C5C6C7" }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {/* Auth buttons or profile */}
            {isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setProfileOpen(!profileOpen); setLangOpen(false); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-strong transition-all"
                  style={{ border: "1px solid rgba(0,245,255,0.2)" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #00F5FF, #45A29E)", color: "#0B0C10" }}
                  >
                    {user.first_name[0]}{user.last_name[0]}
                  </div>
                  <span className="text-sm" style={{ color: "#C5C6C7" }}>
                    {user.first_name}
                  </span>
                  <ChevronDown size={13} style={{ color: "#C5C6C7" }} className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl overflow-hidden shadow-2xl"
                      style={{ border: "1px solid rgba(0,245,255,0.15)" }}
                    >
                      <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#45A29E" }}>
                          {user.role} · {user.institution_type}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm transition-all hover:bg-white/5"
                        style={{ color: "#C5C6C7" }}
                      >
                        <LayoutDashboard size={15} />
                        {t(locale, "dashboard")}
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm transition-all hover:bg-white/5"
                        style={{ color: "#C5C6C7" }}
                      >
                        <User size={15} />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-all hover:bg-red-500/10"
                        style={{ color: "#ff6b6b" }}
                      >
                        <LogOut size={15} />
                        {t(locale, "logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-ghost px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    {t(locale, "login")}
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    {t(locale, "register")}
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#C5C6C7" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t"
            style={{ borderColor: "rgba(0,245,255,0.1)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {/* Language */}
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all"
                    style={{
                      background: locale === lang.code ? "rgba(0,245,255,0.1)" : "transparent",
                      color: locale === lang.code ? "#00F5FF" : "#C5C6C7",
                      border: locale === lang.code ? "1px solid rgba(0,245,255,0.3)" : "1px solid transparent",
                    }}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>

              {!isAuthenticated && (
                <div className="flex gap-2">
                  <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="btn-ghost w-full py-2 rounded-xl text-sm font-medium">
                      {t(locale, "login")}
                    </button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="btn-primary w-full py-2 rounded-xl text-sm font-medium">
                      {t(locale, "register")}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
