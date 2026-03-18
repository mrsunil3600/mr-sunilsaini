"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ReactNode } from "react";

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
  return (
    <section id="hero" className="section-padding relative overflow-hidden pt-32 sm:pt-36">
      <div className="absolute inset-0 -z-10 bg-mesh-gradient opacity-90" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.02fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            {profile.title}
          </span>

          <div className="space-y-5">
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="mt-2 block gradient-text">Building systems that scale with confidence.</span>
            </h1>
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">{profile.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <MapPin size={14} className="text-accent-300" />
              {profile.location}
            </span>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{profile.availability}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-mint-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-accent-300/50 hover:text-white"
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
          <div className="glass-panel relative h-[360px] overflow-hidden rounded-3xl border-accent-300/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-2xl shadow-black/30 sm:h-[430px]">
            <HeroScene />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-4">
                <div className="font-display text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};