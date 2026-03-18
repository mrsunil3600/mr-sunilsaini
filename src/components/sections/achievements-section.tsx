"use client";

import { Award, BadgeCheck } from "lucide-react";

import { Achievement } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

type AchievementsSectionProps = {
  achievements: Achievement[];
};

export const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  return (
    <SectionShell
      id="achievements"
      eyebrow="Achievements"
      title="Certifications and recognition"
      description="Signals of technical depth, delivery impact, and engineering leadership over time."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Reveal key={achievement.title} delay={index * 0.07} className="glass-panel rounded-3xl p-5 sm:p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent-300/35 bg-accent-500/15 text-accent-300">
              {index === 0 ? <Award size={18} /> : <BadgeCheck size={18} />}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">{achievement.title}</h3>
            <p className="mt-1 text-sm text-accent-300">{achievement.issuer}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">{achievement.year}</p>
            <p className="mt-3 text-sm text-slate-300">{achievement.detail}</p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};