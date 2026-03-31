import { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Reveal } from "@/components/motion/reveal";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export const SectionShell = ({
  id,
  eyebrow,
  title,
  description,
  children,
  className
}: SectionShellProps) => {
  return (
    <section id={id} className={cn("section-padding relative isolate overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="cosmic-starfield absolute inset-0 opacity-45" />
        <div className="cosmic-orb absolute -left-20 top-14 h-40 w-40 rounded-full bg-violet-500/14 blur-3xl" />
        <div className="cosmic-orb absolute -right-14 bottom-10 h-44 w-44 rounded-full bg-mint-500/10 blur-3xl [animation-delay:1.2s]" />
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-10 space-y-4 lg:mb-14">
          <span className="inline-flex items-center rounded-full border border-accent-400/35 bg-accent-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
            {eyebrow}
          </span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{title}</h2>
          {description ? <p className="max-w-3xl text-sm text-slate-300 sm:text-base">{description}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
};
