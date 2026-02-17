export const personalInfo = {
  name: "Anoop Gupta",
  firstName: "Anoop",
  role: "Full-Stack Developer",
  tagline: "I ship production-ready apps",
  email: "gupta.anoop2006@gmail.com",
  phone: "+91-7039386723",
  linkedin: "https://www.linkedin.com/in/itsan00p/",
  github: "https://github.com/AnoopG7",
  university: "ITM Skills University, Navi Mumbai",
  degree: "B.Tech in Computer Science Engineering",
  graduation: "2028",
  cgpa: "9.5",
};

export const stats = [
  { label: "Projects Shipped", value: 4 },
  { label: "Tests Written", value: 500, suffix: "+" },
  { label: "API Endpoints", value: 57, suffix: "+" },
  { label: "CGPA", value: 9.5, decimals: 1 },
];

export interface Project {
  title: string;
  subtitle: string;
  tech: string[];
  highlights: string[];
  liveUrl: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "AI-Powered LMS",
    subtitle: "Full-Stack MERN + AI Integration",
    tech: ["React", "Node.js", "Express", "TypeScript", "MongoDB", "Socket.io", "Groq AI"],
    highlights: [
      "Converts PDFs/DOCX into flashcards & quizzes via Groq LLM",
      "Real-time collaborative chat with Socket.io",
      "Adaptive quiz system with analytics dashboards",
    ],
    liveUrl: "https://anoop-lms.vercel.app",
  },
  {
    title: "SabdaSparsh",
    subtitle: "Bilingual Literary Portfolio Platform",
    tech: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth"],
    highlights: [
      "Bilingual Hindi & English content platform",
      "Admin dashboard with draft/publish workflow",
      "Vercel Blob storage for validated image uploads",
    ],
    liveUrl: "https://sabdasparsh.vercel.app",
  },
  {
    title: "Building Management System",
    subtitle: "Residential Society Platform",
    tech: ["React", "Node.js", "Express", "TypeScript", "MongoDB"],
    highlights: [
      "Role-based access: Admin, Owner, Tenant",
      "57+ RESTful API endpoints with OpenAPI docs",
      "229+ unit and integration tests",
    ],
    liveUrl: "https://anoop-bms.vercel.app",
  },
  {
    title: "Day Tracker",
    subtitle: "Productivity & Analytics Application",
    tech: ["React", "Node.js", "Express 5", "TypeScript", "MongoDB", "Zustand"],
    highlights: [
      "Track daily activities, nutrition, expenses & analytics",
      "AI-powered nutrition estimation via Groq LLM",
      "90%+ backend test coverage with interactive dashboards",
    ],
    liveUrl: "https://anoop-day-tracker.vercel.app",
  },
];

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "Material UI" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "Zustand" },
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
    ],
  },
];

export const journeyMilestones = [
  {
    year: "2024",
    title: "Started B.Tech CSE",
    description: "Began Computer Science Engineering at ITM Skills University, Navi Mumbai",
  },
  {
    year: "2024",
    title: "First Full-Stack Projects",
    description: "Built BMS and Day Tracker from scratch with MERN stack",
  },
  {
    year: "2025",
    title: "Shipped Production Apps",
    description: "Launched AI-Powered LMS and SabdaSparsh to production",
  },
  {
    year: "2026",
    title: "Exploring AI/ML & DS",
    description: "Diving into Machine Learning, Data Science, and AI integrations",
  },
  {
    year: "→ Next",
    title: "What's Coming...",
    description: "Open to internships, freelance, and building impactful products",
  },
];
