"use client";

import { TechStackGroup } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

type TechStackSectionProps = {
  techStack: TechStackGroup[];
};

export const TechStackSection = ({ techStack }: TechStackSectionProps) => {
  return (
    <SectionShell
      id="tech-stack"
      eyebrow="Tech Stack"
      title="Tools I use to build fast, resilient products"
      description="A practical stack tuned for product velocity, operational reliability, and long-term maintainability."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {techStack.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.06} className="glass-panel rounded-3xl p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold text-white">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs font-medium tracking-wide text-slate-200 uppercase"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};