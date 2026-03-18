"use client";

import { BriefcaseBusiness, CalendarRange, MapPin } from "lucide-react";

import { ExperienceItem } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

type ExperienceSectionProps = {
  experience: ExperienceItem[];
};

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="Six-plus years of impact across product, platform, and scale"
      description="Progressive ownership from product delivery to architecture leadership across high-availability systems."
    >
      <div className="relative space-y-5 pl-0 md:pl-10">
        <div className="absolute left-3 top-0 hidden h-full w-px bg-gradient-to-b from-accent-400/80 via-mint-400/40 to-transparent md:block" />

        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.period}`} delay={index * 0.08} className="relative">
            <article className="glass-panel rounded-3xl p-5 sm:p-6 md:ml-2">
              <span className="absolute -left-9 top-7 hidden h-4 w-4 rounded-full border border-accent-300/70 bg-ink-900 shadow-glow md:block" />

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{item.role}</h3>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-accent-300">
                    <BriefcaseBusiness size={15} />
                    {item.company}
                  </p>
                </div>
                <div className="space-y-1 text-sm text-slate-400">
                  <p className="inline-flex items-center gap-2">
                    <CalendarRange size={14} />
                    {item.period}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <MapPin size={14} />
                    {item.location}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-300">{item.summary}</p>

              <ul className="mt-5 space-y-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-slate-300">
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};