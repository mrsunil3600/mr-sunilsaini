"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { NavItem } from "@/types/portfolio";

type FloatingNavProps = {
  items: NavItem[];
};

type SiteTheme = "cyber" | "light";

const THEME_STORAGE_KEY = "portfolio-theme";

export const FloatingNav = ({ items }: FloatingNavProps) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<SiteTheme>("light");
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const nextTheme = savedTheme === "light" || savedTheme === "cyber" ? savedTheme : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) {
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [isThemeReady, theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "cyber" ? "light" : "cyber"));
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-8">
      <div className="cyber-panel mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-none md:backdrop-blur-xl">
        <a href="#hero" className="font-display text-sm font-semibold tracking-[0.16em] text-slate-100 uppercase">
          Portfolio
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-accent-300/35 hover:bg-accent-500/15 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="cyber-chip inline-flex h-10 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold tracking-wide text-slate-100"
            aria-label={theme === "cyber" ? "Switch to light professional theme" : "Switch to cyberpunk theme"}
            title={theme === "cyber" ? "Switch to light professional theme" : "Switch to cyberpunk theme"}
          >
            {theme === "cyber" ? <Sun size={15} /> : <Moon size={15} />}
            <span className="hidden sm:inline">{theme === "cyber" ? "Light" : "Cyber"}</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent-300/35 bg-accent-500/10 text-slate-200 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="cyber-panel mx-auto mt-3 flex w-full max-w-6xl flex-col gap-1 rounded-2xl p-2 backdrop-blur-none md:hidden md:backdrop-blur-xl"
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-accent-500/14 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
