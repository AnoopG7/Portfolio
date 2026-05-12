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
  role: "AI/ML Engineer & Full-Stack Developer",
  tagline: "I build AI-powered apps that learn",
  bio: "A passionate AI/ML engineer and full-stack developer building intelligent, data-driven applications. Experienced in Python, ML frameworks, and the MERN stack — shipping production-ready AI products from LLM-powered features to predictive models. Currently a 2nd year B.Tech CSE student at ITM Skills University, diving deep into Machine Learning, Deep Learning, and Data Science.",
  email: "anoopgfortech@gmail.com",
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
    twitter: "https://twitter.com/itsan00p",
    instagram: "https://instagram.com/itsan00p",
  },
} as const;

// ── Hero ──
export const HERO = {
  greeting: "Hi, I'm Anoop",
  headingLine1: "I design & build",
  headingLine2: "AI-powered systems",
  status: "Open to freelance & internships",
  ctaHeading: "Let's build something amazing",
  ctaSubtitle: "AI & full-stack developer — Python, MERN, and ML",
  projectCount: "15+",
  projectCountLabel: "AI & Full-Stack Apps",
  subtitlePhrases: [
    "Building AI-powered applications with Python & MERN",
    "Turning data into intelligent, production-ready systems",
    "Exploring ML models, LLMs & full-stack AI products",
  ],
} as const;

// ── Currently Exploring ──
export const CURRENTLY_EXPLORING = "Artificial Intelligence, Machine Learning & Data Science" as const;

// ── Stats ──
export const STATS = [
  { value: "15+", label: "AI & Full-Stack Projects" },
  { value: "9.5", label: "CGPA" },
  { value: "10+", label: "AI-Powered Apps" },
  { value: "5+", label: "ML Models Built" },
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
    category: "AI / ML",
    skills: [
      { name: "Python" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Matplotlib" },
      { name: "Scikit-learn" },
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "LangChain" },
      { name: "Jupyter" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
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
      { name: "Zustand" },
      { name: "React Query" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Python" },
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "Socket.io" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL" },
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
      { name: "Docker" },
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
    title: "AI Lead Gen Platform",
    subtitle: "AI-Powered Lead Generation SaaS — WhatsApp Conversational Agent",
    tech: ["FastAPI", "Python", "PostgreSQL 16", "OpenAI", "React", "TypeScript", "Docker", "Meta Graph API"],
    live: "#",
    highlights: [
      "Deterministic AI agent orchestration engine using raw OpenAI function calling — 8 custom tools, 10-turn autonomous loop with 429 retry backoff & JSON recovery",
      "Async-first FastAPI backend with SQLAlchemy async ORM, Alembic migrations, custom JWT auth, structlog logging, and comprehensive REST API",
      "CRM admin dashboard in React + TypeScript with Tailwind v4 — lead management, property CRUD, meeting scheduler, conversation viewer, analytics",
      "16-table relational database schema (leads, properties, meetings, users, conversations, audit logs) with Alembic migration management",
      "Meta Lead Ads webhook pipeline — Facebook Graph API lead retrieval with automatic AI agent invocation on new lead capture",
      "~60% API cost reduction using Groq Llama-3 inference (~2100 tokens/call) with fallback to local Ollama for development",
    ],
  },
  {
    title: "TutorX",
    subtitle: "AI-Powered CBSE Tutoring System",
    tech: ["React", "TypeScript", "FastAPI", "Python", "Supabase", "Groq LLM", "pgvector"],
    live: "https://anoop-tutorx.vercel.app/",
    highlights: [
      "RAG-based tutor that references NCERT textbooks directly — delivering accurate, context-aware explanations aligned with the CBSE curriculum for better exam prep",
      "3-strategy retrieval (pgvector cosine search, LLM query reformulation, chunk enrichment) reducing API calls from 14+ to 1 per query",
      "Personalized AI tutor adapting to grade, subjects, weak topics & 4 teaching styles",
      "Supabase Auth + JWT with auto-profile creation & conversation history",
      "Telegram bot integration sharing the same agent loop for cross-platform Q&A",
      "PDF ingestion pipeline — 9 subjects × 2 grades, 450-token chunks with 50-token overlap",
    ],
  },
  {
    title: "TaskFlow",
    subtitle: "AI-Powered Proactive Task Management",
    tech: ["React", "TypeScript", "FastAPI", "Python", "Groq LLM", "Supabase", "Telegram Bot"],
    live: "https://anoop-taskflow.vercel.app/",
    highlights: [
      "Multi-action AI agent — single LLM call executes 10 action types atomically",
      "Self-improving time estimation with bias tracking across last 30 completed tasks",
      "Proactive APScheduler — daily morning briefs + hourly due date Telegram alerts",
      "Multi-channel interaction via React SPA and natural language Telegram commands",
      "9-table Supabase schema with Row-Level Security & per-user timezone config",
    ],
  },
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
    subtitle: "Bilingual NLP Literary Platform",
    tech: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth"],
    live: "https://sabdasparsh.vercel.app",
    highlights: [
      "Bilingual (Hindi & English) NLP-driven content platform with admin CMS",
      "Secure auth with NextAuth + draft/publish workflow",
      "Vercel Blob storage for validated image uploads",
    ],
  },
  {
    title: "Building Management System",
    subtitle: "Smart Society Management Platform",
    tech: ["Node.js", "Express", "TypeScript", "MongoDB", "React 19"],
    live: "https://anoop-bms.vercel.app",
    highlights: [
      "Role-based access control (Admin, Owner, Tenant) with smart notifications",
      "57+ RESTful API endpoints with OpenAPI/Swagger docs",
      "229+ unit & integration tests with automated coverage",
    ],
  },
  {
    title: "Day Tracker",
    subtitle: "AI-Enhanced Productivity & Analytics App",
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
    title: "Full-Stack Projects",
    description: "Built Building Management System & Day Tracker — learning backend architecture and testing.",
  },
  {
    year: "2025",
    title: "Shipped Production Apps",
    description: "Launched AI-Powered LMS and SabdaSparsh — integrating AI, real-time features, and CMS.",
  },
  {
    year: "2026",
    title: "Shipped AI Ready Production Systems",
    description: "Built TutorX (RAG-powered CBSE tutoring), TaskFlow (proactive AI task manager), and AI Lead Gen Platform (conversational lead capture agent) — all running on production infrastructure.",
  },
  {
    year: "Next →",
    title: "What's coming...",
    description: "More projects, deeper into AI/ML, and building things that matter.",
  },
];
