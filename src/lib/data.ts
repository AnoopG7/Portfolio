// ── Navigation ──
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Personal Info ──
export const PERSONAL = {
  name: "Anoop Gupta",
  firstName: "Anoop",
  role: "AI/ML Engineer & Full-Stack Developer",
  tagline: "I build AI-powered apps that learn",
  bio: "AI/ML engineer and full-stack developer with hands-on experience building production-grade AI systems, RAG architectures, multi-agent workflows, and scalable SaaS platforms. Skilled in LLM applications, backend architecture, cloud deployment, and production reliability.",
  email: "gupta.anoop2006@gmail.com",
  phone: "+91-7039386723",
  education: {
    degree: "B.Tech in Computer Science Engineering (AI & ML Specialization)",
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
  ctaHeading: "Let's build something amazing",
  ctaSubtitle: "AI & full-stack developer: Python, FastAPI, and the MERN stack",
  subtitlePhrases: [
    "Building AI-powered applications with Python & MERN",
    "Turning data into intelligent, production-ready systems",
    "Exploring ML models, LLMs & full-stack AI products",
  ],
} as const;

// ── Hero Focus Areas ──
export const FOCUS_AREAS = [
  "RAG pipelines",
  "AI agents",
  "Context-aware agents",
  "Full-stack",
] as const;

// ── Hero Impact Points ──
export interface ImpactPoint {
  pre: string;
  strong: string;
  post?: string;
}

export const HERO_METRICS: ImpactPoint[] = [
  { pre: "Cut AI running costs by", strong: "60%" },
  { pre: "Use", strong: "14×", post: "fewer AI calls per answer" },
  { pre: "Ground AI answers in", strong: "real data", post: "to stop hallucinations" },
  { pre: "Managed ", strong: "Evals", post: "without compromising production" },
] as const;

// ── Current Focus ──
export const CURRENTLY_EXPLORING = "Artificial Intelligence, Machine Learning & building production-ready AI systems" as const;

// ── Stats ──
export const STATS = [
  { value: "15+", label: "AI & Full-Stack Projects" },
  { value: "9.55", label: "CGPA" },
  { value: "10+", label: "AI-Powered Apps" },
  { value: "5+", label: "ML Models Built" },
] as const;

// ── Experience ──
export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Internship" | "Full-time" | "Freelance" | "Contract";
  description: string;
  highlights: string[];
  tech: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: "AI Engineer Intern",
    company: "Shovihini Tech LLP",
    location: "Remote",
    period: "Apr 2026 – Jun 2026",
    type: "Internship",
    description:
      "Built AI-powered applications using LLMs, RAG pipelines, vector embeddings, and NLP workflows.",
    highlights: [
      "Built AI-powered applications using LLMs, RAG pipelines, vector embeddings, and NLP workflows",
      "Developed scalable backend services for AI inference and data processing using Python and FastAPI",
      "Improved retrieval accuracy, latency, and response quality through prompt and pipeline optimization",
    ],
    tech: ["Python", "FastAPI", "LLMs", "RAG", "Vector Embeddings", "NLP"],
  },
  {
    role: "Web Development Intern",
    company: "CodeDev Verse",
    location: "Remote",
    period: "May 2025 – Jul 2025",
    type: "Internship",
    description:
      "Developed responsive full-stack web applications using modern frontend and backend technologies.",
    highlights: [
      "Developed responsive full-stack web applications using modern frontend and backend technologies",
      "Built APIs, integrated databases, and implemented authentication workflows",
      "Contributed to debugging, testing, deployment, and performance optimization",
    ],
    tech: ["React", "Node.js", "REST APIs", "Database Integration", "Authentication"],
  },
];

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

// ── Achievements ──
export interface Achievement {
  title: string;
  tag: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { title: "Academic Excellence Award", tag: "Academic" },
  { title: "AWS Certificate", tag: "AWS Cloud" },
  { title: "Machine Learning Specialization", tag: "DeepLearning.AI" },
];

// ── Projects ──
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  live: string;
  github?: string;
  demo?: string;
  highlights: string[];
  featured: boolean;
  screenshots?: string[];
  videoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "ai-lead-gen",
    title: "AI Lead Gen Platform",
    subtitle: "AI-Powered Lead Generation SaaS — WhatsApp Conversational Agent",
    description: "A production SaaS platform that captures, qualifies, and nurtures real estate leads through an autonomous AI agent on WhatsApp. The system handles the complete lead lifecycle — from Meta Lead Ads capture to intelligent conversation and CRM management.",
    tech: ["FastAPI", "Python", "PostgreSQL 16", "OpenAI", "React", "TypeScript", "Docker", "Meta Graph API"],
    live: "#",
    featured: true,
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
    slug: "tutorx",
    title: "TutorX",
    subtitle: "AI-Powered CBSE Tutoring System",
    description: "A full-stack RAG-based AI tutoring platform for CBSE students (Grades 9-12). Delivers accurate, curriculum-aligned explanations by referencing NCERT textbooks directly, with personalized teaching styles and cross-platform availability.",
    tech: ["React", "TypeScript", "FastAPI", "Python", "Supabase", "Groq LLM", "pgvector"],
    live: "https://anoop-tutorx.vercel.app/",
    featured: true,
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
    slug: "taskflow",
    title: "TaskFlow",
    subtitle: "AI-Powered Proactive Task Management",
    description: "An AI 'Chief of Staff' that autonomously manages tasks, detects risks, estimates time, and sends proactive reminders via Telegram. Features multi-action AI agents and self-improving time estimation.",
    tech: ["React", "TypeScript", "FastAPI", "Python", "Groq LLM", "Supabase", "Telegram Bot"],
    live: "https://anoop-taskflow.vercel.app/",
    featured: true,
    highlights: [
      "Multi-action AI agent — single LLM call executes 10 action types atomically",
      "Self-improving time estimation with bias tracking across last 30 completed tasks",
      "Proactive APScheduler — daily morning briefs + hourly due date Telegram alerts",
      "Multi-channel interaction via React SPA and natural language Telegram commands",
      "9-table Supabase schema with Row-Level Security & per-user timezone config",
    ],
  },
  {
    slug: "ai-lms",
    title: "AI-Powered LMS",
    subtitle: "Full-Stack MERN + AI Integration",
    description: "A learning management system that converts uploaded study materials into AI-generated flashcards and quizzes, with real-time collaborative chat and adaptive difficulty.",
    tech: ["Node.js", "Express 5", "TypeScript", "MongoDB", "React 19", "Socket.io", "Groq AI"],
    live: "https://anoop-lms.vercel.app",
    featured: false,
    highlights: [
      "AI-driven flashcard & quiz generation from uploaded study materials",
      "Real-time collaborative chat with Socket.io room-based broadcasting",
      "Adaptive quiz system with analytics dashboards",
    ],
  },
  {
    slug: "sabdasparsh",
    title: "SabdaSparsh",
    subtitle: "Bilingual NLP Literary Platform",
    description: "A bilingual Hindi & English literary content platform with admin-based content management, secure authentication, and image upload workflows.",
    tech: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth"],
    live: "https://sabdasparsh.vercel.app",
    featured: false,
    highlights: [
      "Bilingual (Hindi & English) NLP-driven content platform with admin CMS",
      "Secure auth with NextAuth + draft/publish workflow",
      "Vercel Blob storage for validated image uploads",
    ],
  },
  {
    slug: "bms",
    title: "Building Management System",
    subtitle: "Smart Society Management Platform",
    description: "A full-stack residential society management system with role-based access control, comprehensive REST APIs, and extensive automated testing.",
    tech: ["Node.js", "Express", "TypeScript", "MongoDB", "React 19"],
    live: "https://anoop-bms.vercel.app",
    featured: false,
    highlights: [
      "Role-based access control (Admin, Owner, Tenant) with smart notifications",
      "57+ RESTful API endpoints with OpenAPI/Swagger docs",
      "229+ unit & integration tests with automated coverage",
    ],
  },
  {
    slug: "day-tracker",
    title: "Day Tracker",
    subtitle: "AI-Enhanced Productivity & Analytics App",
    description: "A daily tracking system for activities, nutrition, and expenses with AI-powered nutrition estimation and interactive analytics dashboards.",
    tech: ["Node.js", "Express 5", "TypeScript", "MongoDB", "React 19", "Zustand"],
    live: "https://anoop-day-tracker.vercel.app",
    featured: false,
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
    title: "What's next...",
    description: "Building more RAG pipelines, autonomous agents, and AI-powered apps that solve real problems.",
  },
];
