"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

import { ProjectItem } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Selected work with production-scale outcomes"
      description="Representative projects focused on reliability, throughput, user experience, and engineering velocity."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08}>
            <motion.article
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass-panel group relative h-full rounded-3xl p-5 sm:p-6"
            >
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent-300/80 to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
                <p className="text-sm text-slate-300">{project.description}</p>
                <p className="rounded-xl border border-mint-400/25 bg-mint-500/10 px-3 py-2 text-sm text-mint-300">{project.impact}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-slate-200 transition hover:border-accent-300/60 hover:text-white"
                >
                  <Github size={14} />
                  Code
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-400/35 bg-accent-500/12 px-3 py-2 text-xs text-accent-200 transition hover:bg-accent-500/25"
                >
                  <ArrowUpRight size={14} />
                  Live Preview
                </a>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};