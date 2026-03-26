import { PortfolioContent } from "@/types/portfolio";

export const FALLBACK_CONTENT: PortfolioContent = {
  navItems: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#tech-stack" },
    { label: "Awards", href: "#achievements" },
    { label: "Contact", href: "#contact" }
  ],
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Production Systems", value: "20+" },
    { label: "Global Users Served", value: "5M+" }
  ],
  profile: {
    name: "Mr. Sunil",
    title: "Software Engineer",
    tagline:
      "I design resilient, high-performance products where strong architecture meets polished user experience.",
    location: "Haryana, India",
    email: "mrsunilsaini3600@gmail.com",
    summary:
      "Software Engineer focused on distributed systems, frontend architecture, and cloud-native delivery with measurable business impact.",
    yearsExperience: "Fresher",
    availability: "Open to  Software Developer  and staff-track roles"
  },
  about: [
    "Across the Last 1 year, I have shipped full-stack platforms from zero to scale across fintech, SaaS analytics, and developer tooling.",
    "I combine product thinking with engineering rigor: architecture decisions tied to latency, reliability, and maintainability goals.",
    "My current work centers on platform modernization, AI-assisted workflows, and frontend systems that remain fast and stable at scale."
  ],
  skillGroups: [
    {
      category: "Frontend Engineering",
      items: [
        { name: "React / Next.js", level: 95, icon: "R" },
        { name: "TypeScript", level: 93, icon: "TS" },
        { name: "Design Systems", level: 90, icon: "DS" },
        { name: "Performance Optimization", level: 89, icon: "PO" }
      ]
    },
    {
      category: "Backend & Architecture",
      items: [
        { name: "SpringBoot", level: 92, icon: "N" },
        { name: "System Design", level: 90, icon: "SD" },
        { name: "Microservices", level: 87, icon: "MS" },
        { name: "API Design", level: 91, icon: "API" }
      ]
    },
    {
      category: "Cloud & Delivery",
      items: [
        { name: "AWS", level: 88, icon: "AWS" },
        { name: "Kubernetes", level: 82, icon: "K8" },
        { name: "CI/CD", level: 90, icon: "CI" },
        { name: "Observability", level: 86, icon: "OBS" }
      ]
    }
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Vertex Cloud Systems",
      period: "2023 - Present",
      location: "Bengaluru (Hybrid)",
      summary:
        "Leading platform modernization for a multi-tenant analytics suite used by enterprise customers across APAC and EU.",
      highlights: [
        "Architected an event-driven ingestion pipeline reducing median data processing time by 38%.",
        "Led a Next.js migration strategy that improved Lighthouse performance scores from 62 to 92.",
        "Mentored a team of 5 engineers on architecture reviews, release quality, and incident handling."
      ]
    },
    {
      role: "Software Engineer II",
      company: "NovaPay Labs",
      period: "2021 - 2023",
      location: "Remote",
      summary:
        "Built core services and frontend modules for merchant onboarding, risk checks, and transaction reporting.",
      highlights: [
        "Delivered a workflow orchestration service handling 120K+ daily onboarding tasks.",
        "Introduced typed API contracts and contract tests that reduced integration defects by 45%.",
        "Designed dashboard rendering optimizations that cut first meaningful paint by 32%."
      ]
    },
    {
      role: "Software Engineer",
      company: "BlueOrbit Technologies",
      period: "2019 - 2021",
      location: "Pune",
      summary:
        "Contributed to customer-facing portals and internal tools for subscription management and support operations.",
      highlights: [
        "Built reusable UI primitives adopted across 4 product lines.",
        "Implemented backend caching and query tuning to reduce average response times by 41%.",
        "Partnered with product and design to launch 10+ high-impact features in two years."
      ]
    }
  ],
  projects: [
    {
      name: "PulseOps Reliability Console",
      description:
        "An internal observability and incident response workspace for engineering teams with real-time service health monitoring.",
      impact: "Reduced alert triage time by 52% and improved MTTR across 14 services.",
      stack: ["Next.js", "TypeScript", "GraphQL", "Redis", "AWS"],
      repoUrl: "https://github.com/placeholder/pulseops-console",
      liveUrl: "https://pulseops-demo.example.dev"
    },
    {
      name: "LedgerFlow Reconciliation Engine",
      description:
        "A high-throughput transaction reconciliation platform processing financial event streams with deterministic matching.",
      impact: "Scaled from 2M to 11M records/day with sub-second query experience.",
      stack: ["Node.js", "Kafka", "PostgreSQL", "Kubernetes", "React"],
      repoUrl: "https://github.com/placeholder/ledgerflow",
      liveUrl: "https://ledgerflow-demo.example.dev"
    },
    {
      name: "Aurora Design System",
      description:
        "A component and token system that unified UI patterns across web properties and improved release consistency.",
      impact: "Cut implementation effort for new UI screens by ~35% across product teams.",
      stack: ["React", "Storybook", "Tailwind", "Motion", "Vite"],
      repoUrl: "https://github.com/placeholder/aurora-ds",
      liveUrl: "https://aurora-ds.example.dev"
    }
  ],
  techStack: [
    {
      category: "Languages",
      tools: ["TypeScript", "JavaScript", "Python", "SQL", "Go"]
    },
    {
      category: "Frameworks",
      tools: ["Next.js", "React", "Node.js", "Express", "Fastify"]
    },
    {
      category: "Data & Messaging",
      tools: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Elasticsearch"]
    },
    {
      category: "Cloud & DevOps",
      tools: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"]
    }
  ],
  achievements: [ 
    {
      title: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      year: "2024",
      detail: "Focused on secure, resilient architecture patterns for distributed cloud applications."
    },
    {
      title: "Top Engineering Impact Award",
      issuer: "Vertex Cloud Systems",
      year: "2025",
      detail: "Recognized for leading reliability and performance initiatives across critical product surfaces."
    },
    {
      title: "Google Professional Cloud DevOps Engineer",
      issuer: "Google Cloud",
      year: "2023",
      detail: "Validated deep expertise in SRE principles, release automation, and monitoring strategy."
    }
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/placeholder", handle: "@placeholder" },
    { label: "LinkedIn", href: "https://linkedin.com/in/placeholder", handle: "in/placeholder" },
    { label: "Email", href: "mailto:arjun.m@example.dev", handle: "arjun.m@example.dev" }
  ]
};
