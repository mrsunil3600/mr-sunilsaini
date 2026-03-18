import { SocialLink } from "@/types/portfolio";

type FooterProps = {
  socials: SocialLink[];
};

export const Footer = ({ socials }: FooterProps) => {
  return (
    <footer className="section-padding pt-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>(c) {new Date().getFullYear()} Senior Engineer Portfolio. All rights reserved.</p>
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="transition hover:text-slate-100">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};