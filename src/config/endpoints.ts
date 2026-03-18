const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.dev";

export const API_CONFIG = {
  enableRemoteContent: process.env.NEXT_PUBLIC_ENABLE_REMOTE_CONTENT === "true",
  timeoutMs: 5000,
  endpoints: {
    profile: process.env.NEXT_PUBLIC_PROFILE_API_URL ?? `${API_BASE_URL}/portfolio/profile`,
    about: process.env.NEXT_PUBLIC_ABOUT_API_URL ?? `${API_BASE_URL}/portfolio/about`,
    skills: process.env.NEXT_PUBLIC_SKILLS_API_URL ?? `${API_BASE_URL}/portfolio/skills`,
    experience: process.env.NEXT_PUBLIC_EXPERIENCE_API_URL ?? `${API_BASE_URL}/portfolio/experience`,
    projects: process.env.NEXT_PUBLIC_PROJECTS_API_URL ?? `${API_BASE_URL}/portfolio/projects`,
    techStack: process.env.NEXT_PUBLIC_TECH_STACK_API_URL ?? `${API_BASE_URL}/portfolio/tech-stack`,
    achievements: process.env.NEXT_PUBLIC_ACHIEVEMENTS_API_URL ?? `${API_BASE_URL}/portfolio/achievements`,
    socials: process.env.NEXT_PUBLIC_SOCIALS_API_URL ?? `${API_BASE_URL}/portfolio/socials`
  }
};