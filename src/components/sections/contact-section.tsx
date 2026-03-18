"use client";

import { FormEvent, ReactNode, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";

import { API_CONFIG } from "@/config/endpoints";
import { Profile, SocialLink } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

type ContactSectionProps = {
  profile: Profile;
  socials: SocialLink[];
};

const iconMap: Record<string, ReactNode> = {
  GitHub: <Github size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Email: <Mail size={16} />
};

export const ContactSection = ({ profile, socials }: ContactSectionProps) => {
  const [status, setStatus] = useState<string>("Frontend only: wire this form to your backend contact endpoint.");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Submission captured on frontend. Connect backend URL and API handler for live messages.");
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let us build the next high-leverage product"
      description="Open to impactful product engineering challenges, platform modernization programs, and senior architecture roles."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Reveal className="glass-panel rounded-3xl p-6 sm:p-7">
          <div className="space-y-4">
            <p className="text-sm text-slate-300 sm:text-base">Reach out for collaborations, consulting, or full-time opportunities.</p>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-accent-300 transition hover:text-accent-200">
              <Mail size={16} />
              {profile.email}
            </a>
            <p className="text-xs text-slate-500">Data source toggle: `NEXT_PUBLIC_ENABLE_REMOTE_CONTENT`</p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                Name
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent-300/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                Email
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent-300/60"
                />
              </label>
            </div>

            <label className="space-y-2 text-xs uppercase tracking-[0.15em] text-slate-400">
              Message
              <textarea
                rows={5}
                placeholder="Tell me about your product or platform challenge..."
                className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent-300/60"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-mint-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
            >
              Send Message
              <Send size={15} />
            </button>

            <p className="text-xs text-slate-500">{status}</p>
          </form>
        </Reveal>

        <Reveal className="glass-panel rounded-3xl p-6 sm:p-7" delay={0.08}>
          <h3 className="font-display text-xl font-semibold text-white">Social Links</h3>
          <div className="mt-5 space-y-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 transition hover:border-accent-300/45 hover:bg-accent-500/10"
              >
                <span className="inline-flex items-center gap-2 text-sm text-slate-200">
                  {iconMap[social.label]}
                  {social.label}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-slate-200">{social.handle}</span>
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-ink-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Configured Data Endpoints</p>
            <ul className="mt-3 space-y-2 text-xs text-slate-400">
              <li className="truncate">profile: {API_CONFIG.endpoints.profile}</li>
              <li className="truncate">projects: {API_CONFIG.endpoints.projects}</li>
              <li className="truncate">experience: {API_CONFIG.endpoints.experience}</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
};