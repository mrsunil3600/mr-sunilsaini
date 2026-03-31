"use client";

import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";

import { API_CONFIG } from "@/config/endpoints";
import { Profile, SocialLink } from "@/types/portfolio";

import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

type ContactSectionProps = {
  profile: Profile;
  socials: SocialLink[];
};

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const initialFormValues: ContactFormValues = {
  name: "",
  email: "",
  message: ""
};

const iconMap: Record<string, ReactNode> = {
  GitHub: <Github size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Email: <Mail size={16} />
};

export const ContactSection = ({ profile, socials }: ContactSectionProps) => {
  const [values, setValues] = useState<ContactFormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string>("Send me a message and I will reply soon.");

  const onChange = (field: keyof ContactFormValues) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "Unable to send message right now.");
      }

      setStatus(result.message ?? "Message sent successfully.");
      setValues(initialFormValues);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send message right now.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let us build the next high-leverage product"
      description="Open to impactful product engineering challenges, platform modernization programs, and senior architecture roles."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Reveal className="cyber-panel rounded-3xl p-6 sm:p-7">
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
                  required
                  placeholder="Your name"
                  value={values.name}
                  onChange={onChange("name")}
                  className="w-full rounded-xl border border-accent-300/25 bg-ink-900/55 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent-300/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                Email
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={onChange("email")}
                  className="w-full rounded-xl border border-accent-300/25 bg-ink-900/55 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent-300/60"
                />
              </label>
            </div>

            <label className="space-y-2 text-xs uppercase tracking-[0.15em] text-slate-400">
              Message
              <textarea
                rows={5}
                required
                placeholder="Tell me about your product or platform challenge..."
                value={values.message}
                onChange={onChange("message")}
                className="w-full rounded-xl border border-accent-300/25 bg-ink-900/55 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent-300/60"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-accent-500 to-mint-500 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-none"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={15} />
            </button>

            <p className="text-xs text-slate-500">{status}</p>
          </form>
        </Reveal>

        <Reveal className="cyber-panel rounded-3xl p-6 sm:p-7" delay={0.08}>
          <h3 className="font-display text-xl font-semibold text-white">Social Links</h3>
          <div className="mt-5 space-y-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-accent-300/25 bg-accent-500/10 px-4 py-3 transition hover:border-accent-300/45 hover:bg-accent-500/18"
              >
                <span className="inline-flex items-center gap-2 text-sm text-slate-200">
                  {iconMap[social.label]}
                  {social.label}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-slate-200">{social.handle}</span>
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-accent-300/20 bg-ink-950/60 p-4">
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
