// ── Navigation ──
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Personal Info ──
export const PERSONAL = {
  name: "Anoop Gupta",
  firstName: "Anoop",
  role: "Full-Stack Developer",
  tagline: "I build full-stack apps that work",
  bio: "A passionate full-stack developer specializing in the MERN stack with hands-on experience building production-ready web applications. Currently a 2nd year B.Tech CSE student at ITM Skills University, exploring the intersections of web development, AI/ML, and Data Science.",
  email: "gupta.anoop2006@gmail.com",
  phone: "+91-7039386723",
  education: {
    degree: "B.Tech in Computer Science Engineering",
    university: "ITM Skills University, Navi Mumbai",
    graduation: "2028",
    cgpa: "9.5",
  },
  socials: {
    github: "https://github.com/AnoopG7",
    linkedin: "https://www.linkedin.com/in/itsan00p/",
  },
} as const;

// ── Stats ──
export const STATS = [
  { value: "4+", label: "Projects Built" },
  { value: "9.5", label: "CGPA" },
  { value: "500+", label: "Tests Written" },
  { value: "57+", label: "API Endpoints" },
] as const;

// ── Skills ──
export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "C++" },
      { name: "Java" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "Material UI" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Zod" },
      { name: "React Hook Form" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "Socket.io" },
      { name: "Zustand" },
      { name: "React Query" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Firebase" },
      { name: "Supabase" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Figma" },
      { name: "Vercel" },
      { name: "Render" },
      { name: "n8n" },
    ],
  },
];

// ── Projects ──
export interface Project {
  title: string;
  subtitle: string;
  tech: string[];
  live: string;
  github?: string;
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "AI-Powered LMS",
    subtitle: "Full-Stack MERN + AI Integration",
    tech: ["Node.js", "Express 5", "TypeScript", "MongoDB", "React 19", "Socket.io", "Groq AI"],
    live: "https://anoop-lms.vercel.app",
    highlights: [
      "AI-driven flashcard & quiz generation from uploaded study materials",
      "Real-time collaborative chat with Socket.io room-based broadcasting",
      "Adaptive quiz system with analytics dashboards",
    ],
  },
  {
    title: "SabdaSparsh",
    subtitle: "Bilingual Literary Portfolio Platform",
    tech: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth"],
    live: "https://sabdasparsh.vercel.app",
    highlights: [
      "Bilingual (Hindi & English) content platform with admin CMS",
      "Secure auth with NextAuth + draft/publish workflow",
      "Vercel Blob storage for validated image uploads",
    ],
  },
  {
    title: "Building Management System",
    subtitle: "Residential Society Management Platform",
    tech: ["Node.js", "Express", "TypeScript", "MongoDB", "React 19"],
    live: "https://anoop-bms.vercel.app",
    highlights: [
      "Role-based access control (Admin, Owner, Tenant)",
      "57+ RESTful API endpoints with OpenAPI/Swagger docs",
      "229+ unit & integration tests with automated coverage",
    ],
  },
  {
    title: "Day Tracker",
    subtitle: "Full-Stack Productivity & Analytics App",
    tech: ["Node.js", "Express 5", "TypeScript", "MongoDB", "React 19", "Zustand"],
    live: "https://anoop-day-tracker.vercel.app",
    highlights: [
      "Daily activity, nutrition, expense tracking with analytics",
      "AI-powered nutrition estimation via Groq (LLaMA model)",
      "90%+ backend test coverage with interactive trend dashboards",
    ],
  },
];

// ── Journey / Timeline ──
export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const JOURNEY: Milestone[] = [
  {
    year: "2024",
    title: "Started B.Tech CSE",
    description: "Began Computer Science Engineering at ITM Skills University, Navi Mumbai.",
  },
  {
    year: "2024",
    title: "First Full-Stack Projects",
    description: "Built Building Management System & Day Tracker — learning backend architecture and testing.",
  },
  {
    year: "2025",
    title: "Shipped Production Apps",
    description: "Launched AI-Powered LMS and SabdaSparsh — integrating AI, real-time features, and CMS.",
  },
  {
    year: "2026",
    title: "Exploring AI/ML & DS",
    description: "Diving into Machine Learning, Data Science, and expanding into freelance & internships.",
  },
  {
    year: "Next →",
    title: "What's coming...",
    description: "More projects, deeper into AI/ML, and building things that matter.",
  },
];
