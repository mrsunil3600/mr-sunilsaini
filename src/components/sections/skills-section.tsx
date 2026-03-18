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
      <div className="grid gap-5 lg:grid-cols-3">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.category} delay={groupIndex * 0.06} className="glass-panel rounded-3xl p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold text-white">{group.category}</h3>
            <div className="mt-5 space-y-4">
              {group.items.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-200">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg border border-accent-300/30 bg-accent-500/12 px-1 text-[10px] font-semibold text-accent-300">
                        {skill.icon}
                      </span>
                      {skill.name}
                    </div>
                    <span className="text-xs text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-accent-400 to-mint-400"
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
    </SectionShell>
  );
};