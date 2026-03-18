import { API_CONFIG } from "@/config/endpoints";
import { FALLBACK_CONTENT } from "@/data/fallback-content";
import {
  Achievement,
  ExperienceItem,
  PortfolioContent,
  Profile,
  ProjectItem,
  SkillGroup,
  SocialLink,
  TechStackGroup
} from "@/types/portfolio";

type AboutResponse = {
  paragraphs: string[];
};

const fetchWithTimeout = async <T>(url: string): Promise<T | null> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const loadPortfolioContent = async (): Promise<PortfolioContent> => {
  if (!API_CONFIG.enableRemoteContent) {
    return FALLBACK_CONTENT;
  }

  const [profile, about, skills, experience, projects, techStack, achievements, socials] = await Promise.all([
    fetchWithTimeout<Profile>(API_CONFIG.endpoints.profile),
    fetchWithTimeout<AboutResponse>(API_CONFIG.endpoints.about),
    fetchWithTimeout<SkillGroup[]>(API_CONFIG.endpoints.skills),
    fetchWithTimeout<ExperienceItem[]>(API_CONFIG.endpoints.experience),
    fetchWithTimeout<ProjectItem[]>(API_CONFIG.endpoints.projects),
    fetchWithTimeout<TechStackGroup[]>(API_CONFIG.endpoints.techStack),
    fetchWithTimeout<Achievement[]>(API_CONFIG.endpoints.achievements),
    fetchWithTimeout<SocialLink[]>(API_CONFIG.endpoints.socials)
  ]);

  return {
    ...FALLBACK_CONTENT,
    profile: profile ?? FALLBACK_CONTENT.profile,
    about: about?.paragraphs ?? FALLBACK_CONTENT.about,
    skillGroups: skills ?? FALLBACK_CONTENT.skillGroups,
    experience: experience ?? FALLBACK_CONTENT.experience,
    projects: projects ?? FALLBACK_CONTENT.projects,
    techStack: techStack ?? FALLBACK_CONTENT.techStack,
    achievements: achievements ?? FALLBACK_CONTENT.achievements,
    socials: socials ?? FALLBACK_CONTENT.socials
  };
};