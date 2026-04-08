import { PortfolioContent } from "@/types/portfolio";

export const FALLBACK_CONTENT: PortfolioContent = {
  navItems: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#tech-stack" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" }
  ],

  stats: [
    {
      value: "5+",
      label: "Backend Projects"
    },
    {
      value: "Kafka + WebSocket",
      label: "Real-time Systems"
    },
    {
      value: "JWT + OAuth2",
      label: "Security Systems"
    }
  ],

  profile: {
    name: "Sunil Saini",
    title: "Software Engineer (Backend)",
    tagline:
      "Backend developer focused on Spring Boot, WebSockets, Redis, and Kafka — building real-time and scalable systems.",
    location: "Haryana, India",
    email: "mrsunilsaini3600@gmail.com",
    summary:
      "B.Tech Computer Science student with hands-on experience in building real-time and distributed backend systems. Skilled in Spring Boot, Kafka, Redis, and WebSockets, with a strong focus on system design, scalability, and clean architecture.",
    yearsExperience: "Fresher",
    availability: "Open to Software Developer roles"
  },

  about: [
    "I am a backend-focused Software Engineer currently pursuing B.Tech in Computer Science. I enjoy building scalable systems and solving real-world backend problems.",
    "My experience includes implementing secure authentication systems using Spring Security with JWT and OAuth2, and designing APIs with proper architecture and performance considerations.",
    ],

  skillGroups: [
    {
      category: "Backend & Core",
      items: [
        { name: "Java", level: 90, icon: "J" },
        { name: "Spring Boot", level: 92, icon: "SB" },
        { name: "Spring Security", level: 88, icon: "SS" },
        { name: "Hibernate / JPA", level: 85, icon: "JPA" }
      ]
    },
    {
      category: "Systems & Messaging",
      items: [
        { name: "Kafka", level: 80, icon: "K" },
        { name: "Redis", level: 85, icon: "R" },
        { name: "WebSocket", level: 90, icon: "WS" },
        { name: "System Design", level: 82, icon: "SD" }
      ]
    },
    {
      category: "Tools & Others",
      items: [
        { name: "MySQL", level: 88, icon: "SQL" },
        { name: "MongoDB", level: 75, icon: "M" },
        { name: "Docker", level: 70, icon: "D" },
        { name: "Git / GitHub", level: 85, icon: "G" }
      ]
    }
  ],

  experience: [
    {
      role: "Java Developer Intern",
      company: "Aptron Solutions",
      period: "June 2024 - July 2024",
      location: "India",
      summary:
        "Worked on Java-based applications focusing on backend logic and system design.",
      highlights: [
        "Developed a banking system using Java Servlet and MVC architecture.",
        "Implemented transaction handling with ACID properties using logging mechanisms.",
        "Worked on backend logic, request handling, and data flow management."
      ]
    },
    {
      role: "Java Developer Intern (Virtual)",
      company: "Deloitte (Forage)",
      period: "2024",
      location: "Remote",
      summary:
        "Completed a virtual internship focused on backend systems using Spring Boot.",
      highlights: [
        "Worked on Kafka integration for event-driven architecture.",
        "Implemented H2 database usage with Spring Boot.",
        "Gained understanding of microservices communication patterns."
      ]
    }
  ],

  projects: [
    {
      name: "Real-time Chat Application (E2EE Ready)",
      description:
        "A real-time chat system using WebSocket and Redis with support for message persistence, caching, and cursor-based pagination.",
      impact:
        "Designed scalable messaging architecture with real-time communication and optimized message retrieval.",
      stack: ["Spring Boot", "WebSocket", "Redis", "MySQL"],
      repoUrl: "https://github.com/mrsunil3600",
      liveUrl: ""
    },
    {
      name: "Kafka Notification Service",
      description:
        "Event-driven notification system supporting Email, Text, and App notifications using Kafka.",
      impact:
        "Implemented retry mechanism with dead-letter queue (DLT) for fault tolerance.",
      stack: ["Spring Boot", "Kafka", "Microservices"],
      repoUrl: "https://github.com/mrsunil3600",
      liveUrl: ""
    },
    {
      name: "Spring Security System",
      description:
        "Comprehensive authentication system with JWT, OAuth2 (Google/GitHub), and Basic Authentication.",
      impact:
        "Handled secure authentication and authorization with multiple strategies.",
      stack: ["Spring Boot", "Spring Security", "JWT", "OAuth2"],
      repoUrl: "https://github.com/mrsunil3600",
      liveUrl: ""
    },
    {
      name: "AI Email Generator Extension",
      description:
        "Chrome extension integrated with Gemini API to generate email replies automatically.",
      impact:
        "Automated email drafting using AI, improving productivity.",
      stack: ["Spring Boot", "Gemini API", "JavaScript"],
      repoUrl: "https://github.com/mrsunil3600",
      liveUrl: ""
    }
  ],

  techStack: [
    {
      category: "Languages",
      tools: ["Java", "Python", "C", "SQL"]
    },
    {
      category: "Frameworks",
      tools: ["Spring Boot", "Spring Security", "Hibernate", "React (Basic)"]
    },
    {
      category: "Data & Messaging",
      tools: ["MySQL", "MongoDB", "Redis", "Kafka"]
    },
    {
      category: "Tools",
      tools: ["Docker", "Git", "GitHub", "Postman"]
    }
  ],

  achievements: [
    {
      title: "Java Developer Internship",
      issuer: "Aptron Solutions",
      year: "2024",
      detail: "Completed hands-on training in Java backend development."
    },
    {
      title: "Deloitte Virtual Internship",
      issuer: "Forage",
      year: "2024",
      detail: "Worked on Spring Boot and Kafka-based backend tasks."
    },
    {
      title: "C Programming Certification",
      issuer: "Calicut University",
      year: "2023",
      detail: "Strong foundation in programming using C."
    },
    {
      title: "Cyber Security Certification",
      issuer: "Dr. B.R. Ambedkar University",
      year: "2023",
      detail: "Basic knowledge of cyber security concepts."
    }
  ],

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/mrsunil3600",
      handle: "@mrsunil3600"
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mr-sunil-1a12a4285/",
      handle: "Sunil Saini"
    },
    {
      label: "Email",
      href: "mailto:mrsunilsaini3600@gmail.com",
      handle: "mrsunilsaini3600@gmail.com"
    }
  ]
};