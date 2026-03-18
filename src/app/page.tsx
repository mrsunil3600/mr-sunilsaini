"use client";

import { motion } from "framer-motion";

import { usePortfolioContent } from "@/hooks/use-portfolio-content";

import { AboutSection } from "@/components/sections/about-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { BackgroundAura } from "@/components/layout/background-aura";
import { FloatingNav } from "@/components/layout/floating-nav";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";

export default function HomePage() {
  const { content, isLoading } = usePortfolioContent();

  return (
    <main className="relative overflow-hidden">
      <ScrollProgress />
      <BackgroundAura />
      <FloatingNav items={content.navItems} />

      {isLoading ? (
        <div className="fixed bottom-4 right-4 z-50 rounded-full border border-white/15 bg-ink-900/90 px-4 py-2 text-xs text-slate-300 backdrop-blur">
          Syncing content...
        </div>
      ) : null}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <HeroSection profile={content.profile} stats={content.stats} socials={content.socials} />
        <AboutSection profile={content.profile} about={content.about} />
        <SkillsSection skillGroups={content.skillGroups} />
        <ExperienceSection experience={content.experience} />
        <ProjectsSection projects={content.projects} />
        <TechStackSection techStack={content.techStack} />
        <AchievementsSection achievements={content.achievements} />
        <ContactSection profile={content.profile} socials={content.socials} />
        <Footer socials={content.socials} />
      </motion.div>
    </main>
  );
}