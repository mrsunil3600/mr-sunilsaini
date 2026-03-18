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
    <section id={id} className={cn("section-padding", className)}>
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