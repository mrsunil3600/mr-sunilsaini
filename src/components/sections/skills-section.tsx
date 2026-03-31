"use client";

import { motion } from "framer-motion";

import { SkillGroup } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

type SkillsSectionProps = {
  skillGroups: SkillGroup[];
};

export const SkillsSection = ({ skillGroups }: SkillsSectionProps) => {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Depth across product engineering and scalable architecture"
      description="Hands-on across full-stack delivery, with strong emphasis on maintainability, reliability, and measurable performance gains."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-accent-300/25 bg-gradient-to-b from-violet-500/[0.12] via-ink-900/55 to-ink-900/75 p-4 shadow-[0_0_90px_rgba(11,109,255,0.14)] sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:90px_90px] opacity-15" />
        <div className="cosmic-starfield pointer-events-none absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/22 animate-[spin_52s_linear_infinite]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-400/20 animate-[spin_36s_linear_infinite_reverse]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint-400/28 animate-[spin_22s_linear_infinite]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,231,255,0.28),rgba(124,82,255,0.06),transparent_72%)] blur-xl" />

        <div className="relative grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              key={group.category}
              delay={groupIndex * 0.06}
              className="glass-panel rounded-3xl border-accent-300/24 bg-gradient-to-br from-ink-900/80 via-violet-500/[0.09] to-accent-500/[0.09] p-5 shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(0,231,255,0.16)] sm:p-6"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                <span className="gradient-text">{group.category}</span>
              </h3>
              <div className="mt-5 space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-sm text-slate-200">
                        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg border border-accent-300/50 bg-gradient-to-br from-violet-500/40 via-accent-500/40 to-mint-500/35 px-1 text-[10px] font-semibold text-white">
                          {skill.icon}
                        </span>
                        {skill.name}
                      </div>
                      <span className="text-xs font-medium text-slate-300">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full border border-white/10 bg-slate-900/80">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-violet-400 via-accent-400 to-mint-400 shadow-[0_0_14px_rgba(0,231,255,0.4)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.55 }}
                        transition={{ duration: 0.85, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};
