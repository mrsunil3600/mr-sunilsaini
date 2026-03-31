"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
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
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const isSceneInView = useInView(sceneContainerRef, { once: true, margin: "220px 0px" });
  const [shouldMountAvatar, setShouldMountAvatar] = useState(false);

  useEffect(() => {
    if (!isSceneInView || shouldMountAvatar) {
      return;
    }

    const timeoutId = window.setTimeout(() => setShouldMountAvatar(true), 120);
    return () => window.clearTimeout(timeoutId);
  }, [isSceneInView, shouldMountAvatar]);

  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Engineering with product clarity and platform depth"
      description={profile.summary}
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="cyber-panel rounded-3xl p-6 sm:p-8">
          <div className="space-y-5 text-sm leading-relaxed text-slate-300 sm:text-base">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="cyber-panel rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Experience</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">{profile.yearsExperience}</p>
            </div>
            <div className="cyber-panel rounded-2xl p-4">
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

        <Reveal className="cyber-panel rounded-3xl p-4 sm:p-6" delay={0.08}>
          <div
            ref={sceneContainerRef}
            className="universe-border h-[340px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-accent-500/10 via-ink-900/35 to-ink-900/65 sm:h-[420px]"
          >
            {isSceneInView && shouldMountAvatar ? (
              <AvatarScene />
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src="/my.jpg"
                  alt={`${profile.name} profile photo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full border border-accent-300/35 bg-ink-900/70 px-3 py-1 text-xs text-slate-100">
                  Loading 3D model...
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
};
