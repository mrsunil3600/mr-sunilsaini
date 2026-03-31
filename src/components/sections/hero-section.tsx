"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

import { Profile, SocialLink, Stat } from "@/types/portfolio";

const HeroScene = dynamic(() => import("@/components/three/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-slate-800/40" />
});

type HeroSectionProps = {
  profile: Profile;
  stats: Stat[];
  socials: SocialLink[];
};

const iconMap: Record<string, ReactNode> = {
  GitHub: <Github size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Email: <Mail size={16} />
};

export const HeroSection = ({ profile, stats, socials }: HeroSectionProps) => {
  const [shouldMountScene, setShouldMountScene] = useState(false);

  useEffect(() => {
    const windowWithIdle = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const requestIdle = windowWithIdle.requestIdleCallback;

    if (requestIdle) {
      const idleId = requestIdle(() => setShouldMountScene(true), { timeout: 1200 });
      return () => {
        windowWithIdle.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(() => setShouldMountScene(true), 450);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section id="hero" className="section-padding relative overflow-hidden pt-32 sm:pt-36">
      <div className="absolute inset-0 -z-10 bg-mesh-gradient opacity-95" />
      <div className="pointer-events-none absolute inset-0 -z-10 cosmic-starfield opacity-55" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,82,255,0.36),rgba(11,109,255,0.06),transparent_74%)] blur-[30px]" />

      <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-accent-300/24 bg-gradient-to-br from-ink-900/58 via-ink-900/42 to-violet-500/10 p-4 shadow-[0_0_70px_rgba(11,109,255,0.18)] sm:p-6">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
            className="space-y-7"
          >
            <span className="cyber-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
              {profile.title}
            </span>

            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {profile.name}
                <span className="mt-2 block gradient-text">Building systems that scale with confidence.</span>
              </h1>
              <p className="max-w-xl text-sm text-slate-300 sm:text-base">{profile.tagline}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 sm:text-sm">
              <span className="cyber-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                <MapPin size={14} className="text-mint-300" />
                {profile.location}
              </span>
              <span className="cyber-chip inline-flex rounded-full px-3 py-1.5">{profile.availability}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-accent-500 to-mint-500 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:shadow-glow"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-accent-300/40 bg-accent-500/10 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-accent-500/20"
              >
                Contact Me
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent-300/30 bg-accent-500/12 px-3 py-2 text-xs text-slate-100 transition hover:border-mint-300/50 hover:bg-mint-500/18"
                >
                  {iconMap[link.label] ?? <ArrowRight size={14} />}
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="space-y-5"
          >
            <div className="cyber-panel universe-border relative h-[360px] overflow-hidden rounded-3xl sm:h-[430px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_14%,rgba(124,82,255,0.35),transparent_45%),radial-gradient(circle_at_20%_90%,rgba(0,231,255,0.2),transparent_50%)]" />
              {shouldMountScene ? <HeroScene /> : <div className="h-full w-full animate-pulse rounded-3xl bg-slate-800/40" />}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="cyber-panel rounded-2xl p-4">
                  <div className="font-display text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
