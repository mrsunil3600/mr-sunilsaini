"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { NavItem } from "@/types/portfolio";

type FloatingNavProps = {
  items: NavItem[];
};

export const FloatingNav = ({ items }: FloatingNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/12 bg-ink-900/70 px-4 py-3 backdrop-blur-xl">
        <a href="#hero" className="font-display text-sm font-semibold tracking-[0.16em] text-slate-100 uppercase">
          Portfolio
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-200 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-3 flex w-full max-w-6xl flex-col gap-1 rounded-2xl border border-white/12 bg-ink-900/95 p-2 backdrop-blur-xl md:hidden"
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
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