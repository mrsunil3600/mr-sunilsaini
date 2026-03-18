"use client";

import dynamic from "next/dynamic";
import { CheckCircle2 } from "lucide-react";

import { Profile } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

const AvatarScene = dynamic(() => import("@/components/three/avatar-scene").then((mod) => mod.AvatarScene), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-slate-800/40" />
});

type AboutSectionProps = {
  profile: Profile;
  about: string[];
};

export const AboutSection = ({ profile, about }: AboutSectionProps) => {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Engineering with product clarity and platform depth"
      description={profile.summary}
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="glass-panel rounded-3xl p-6 sm:p-8">
          <div className="space-y-5 text-sm leading-relaxed text-slate-300 sm:text-base">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Experience</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">{profile.yearsExperience}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Location</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">{profile.location}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 className="mt-0.5 text-accent-300" size={16} />
              Led architecture and delivery for products serving millions of active users.
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 className="mt-0.5 text-accent-300" size={16} />
              Strong track record in performance optimization, reliability, and developer experience.
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 className="mt-0.5 text-accent-300" size={16} />
              Comfortable owning systems end-to-end across frontend, backend, and cloud infrastructure.
            </li>
          </ul>
        </Reveal>

        <Reveal className="glass-panel rounded-3xl border-accent-300/25 p-4 sm:p-6" delay={0.08}>
          <div className="h-[340px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent sm:h-[420px]">
            <AvatarScene />
          </div>
          <p className="mt-4 px-2 text-center text-xs text-slate-400 sm:text-sm">3D placeholder avatar (replaceable with your custom model later).</p>
        </Reveal>
      </div>
    </SectionShell>
  );
};