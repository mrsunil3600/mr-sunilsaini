export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Skill = {
  name: string;
  level: number;
  icon: string;
};

export type SkillGroup = {
  category: string;
  items: Skill[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type ProjectItem = {
  name: string;
  description: string;
  impact: string;
  stack: string[];
  repoUrl: string;
  liveUrl: string;
};

export type TechStackGroup = {
  category: string;
  tools: string[];
};

export type Achievement = {
  title: string;
  issuer: string;
  year: string;
  detail: string;
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  summary: string;
  yearsExperience: string;
  availability: string;
};

export type PortfolioContent = {
  navItems: NavItem[];
  stats: Stat[];
  profile: Profile;
  about: string[];
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  techStack: TechStackGroup[];
  achievements: Achievement[];
  socials: SocialLink[];
};