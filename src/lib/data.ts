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
      { name: "RAG Systems" },
      { name: "Multi-Agent Workflows" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "C++" },
      { name: "Java" },
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "Socket.io" },
      { name: "JWT Authentication" },
      { name: "Zod" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
      { name: "Zustand" },
      { name: "React Query" },
      { name: "Shadcn UI" },
      { name: "Material UI" },
      { name: "React Hook Form" },
      { name: "Figma" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "pgvector" },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitHub Actions" },
      { name: "CI/CD" },
      { name: "Linux" },
      { name: "Nginx" },
      { name: "Prometheus" },
      { name: "Grafana" },
      { name: "Vercel" },
      { name: "Render" },
      { name: "n8n" },
      { name: "VS Code" },
    ],
  },
  {
    category: "Cloud & System Design",
    skills: [
      { name: "AWS" },
      { name: "Terraform" },
      { name: "Distributed Systems" },
      { name: "Microservices" },
      { name: "API Design" },
      { name: "Caching" },
      { name: "Load Balancing" },
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
  { title: "AWS Cloud Practitioner Essentials", tag: "Coursera" },
  { title: "Machine Learning Specialization", tag: "DeepLearning.AI" },
  { title: "Fullstack Generative & Agentic AI", tag: "Udemy" },
];

// ── Architecture Flow ──
export interface ArchNode {
  label: string;
  detail?: string;
  color: string; // tailwind color class like "blue" "green" "amber"
}

// ── Projects ──
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  tech: string[];
  live: string;
  github?: string;
  demo?: string;
  featured: boolean;
  screenshots?: string[];
  videoUrl?: string;

  // Story-driven content
  problem: string;
  solution: string;
  impact: string[];
  architecture?: ArchNode[];
  keyDecisions?: string[];
  features: string[];
  learnings?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "tsrl",
    title: "TSRL",
    subtitle: "Trading Strategy Research Lab",
    tagline:
      "AI-powered quantitative trading platform for strategy research, backtesting, optimization & ML signal generation.",
    tech: [
      "ML Signal Generation",
      "Quantitative Backtesting",
      "Genetic Algorithm Optimization",
      "AI Sentiment Analysis",
      "Walk-Forward Validation",
      "50+ Risk Metrics",
      "Scikit-learn",
      "FastAPI REST",
      "React Dashboard",
    ],
    live: "#",
    github: "https://github.com/AnoopG7/TSRL",
    featured: true,

    problem:
      "Retail traders are flying blind. They don't have access to the institutional-grade backtesting, strategy optimization, and risk analytics that hedge funds use daily. Existing retail tools either cost hundreds per month or are too simplistic to validate whether a strategy actually works before risking real capital.",

    solution:
      "I built TSRL - a full-stack quantitative trading research platform that gives retail traders the same analytical firepower as institutional desks. It packages 12 battle-tested trading strategies, dual backtesting engines (event-driven for realistic fills, vectorized for speed), 3 optimization algorithms (Grid Search, Random Search, Genetic), walk-forward validation to catch overfitting, and ML-based signal generation - all accessible through an interactive dashboard with heatmaps, equity curves, and radar charts.",

    impact: [
      "12 trading strategies implemented and backtested",
      "50+ risk metrics (Sharpe, Sortino, Max Drawdown, VaR, CVaR, Kelly Criterion)",
      "116 ML features engineered for signal generation",
      "20+ REST API endpoints for backtesting, optimization & ML training",
      "6 interactive analysis pages with real-time charting",
    ],

    architecture: [
      { label: "React Dashboard", detail: "Charts, heatmaps, radar", color: "blue" },
      { label: "FastAPI", detail: "REST API, 20+ endpoints", color: "green" },
      { label: "SQLAlchemy + SQLite", detail: "Alembic migrations", color: "purple" },
      { label: "Data Sources", detail: "Yahoo, Alpha Vantage, Finnhub, SEC", color: "amber" },
      { label: "ML Pipeline", detail: "Scikit-learn, 116 features", color: "red" },
      { label: "Backtesting Engine", detail: "Event-driven + Vectorized", color: "cyan" },
    ],

    keyDecisions: [
      "Dual backtesting engines - event-driven for realistic order execution with slippage/commission modeling, vectorized for rapid parameter sweeps during optimization",
      "Genetic algorithm optimization - converges 10x faster than grid search on large parameter spaces while avoiding local minima",
      "Walk-forward validation - prevents the most common quant mistake: overfitting to historical data. Tests strategy robustness across rolling windows",
      "Multi-source data aggregation - Yahoo Finance as primary (free, reliable), Alpha Vantage for fundamentals, Finnhub for news sentiment, SEC EDGAR for insider transactions",
      "SQLite with Alembic - lightweight enough for a research tool but migration-ready for PostgreSQL if needed in production",
    ],

    features: [
      "12 trading strategies - EMA Crossover, RSI Mean Reversion, MACD, Bollinger Bands, ML-based signals & more",
      "Dual backtesting - event-driven (realistic fills) & vectorized (fast execution)",
      "3 optimization methods - Grid Search, Random Search, Genetic Algorithm",
      "Walk-forward analysis - rolling & expanding window validation",
      "Fundamental analysis - 5 financial pillars, Piotroski F-Score, Altman Z-Score",
      "AI sentiment analysis - Finnhub + Alpha Vantage news pipeline",
      "ML signal generation - Random Forest & Gradient Boosting with 116 features",
      "Interactive dashboard - equity curves, drawdown charts, parameter heatmaps, radar charts",
      "Company comparison - side-by-side analysis of up to 5 stocks",
      "CLI interface - backtest, optimize, and fetch data from the terminal",
    ],

    learnings: [
      "Overfitting is the silent killer in quant finance - walk-forward validation revealed that several 'profitable' strategies were just curve-fitting noise",
      "Feature engineering matters more than model selection - 116 carefully crafted features outperformed complex models with raw data",
      "Event-driven backtesting is essential for realistic performance estimates - vectorized backtests consistently overstate returns by ignoring slippage and fill mechanics",
    ],
  },
  {
    slug: "tutorx",
    title: "TutorX",
    subtitle: "AI-Powered CBSE Tutoring System",
    tagline:
      "A RAG-grounded AI tutor that reads NCERT textbooks, understands learning gaps, and teaches like a personal tutor - for $0/month.",
    tech: [
      "RAG Pipeline",
      "LLaMA 3.3 70B",
      "pgvector Embeddings",
      "PDF Ingestion",
      "Query Reformulation",
      "Chunk Enrichment",
      "Groq Cloud",
      "Telegram Bot",
    ],
    live: "https://anoop-tutorx.vercel.app",
    github: "https://github.com/AnoopG7/TutorX",
    featured: true,

    problem:
      "Over 250 million Indian students can't afford personal tutors. The ones that turn to AI chatbots get generic, often hallucinated answers that aren't aligned to their actual curriculum. A student asking about photosynthesis doesn't need Wikipedia - they need the exact explanation from their NCERT Chapter 6 textbook, explained at their grade level, in a style that matches how they learn best.",

    solution:
      "I built TutorX - a full-stack RAG tutoring platform that ingests 80 NCERT textbook PDFs across 8 subjects, chunks them into a pgvector database, and answers student questions using a 3-stage intelligent retrieval pipeline. The system doesn't just find text - it reformulates weak queries, enriches retrieved chunks with pedagogical context (examples, misconceptions, real-world connections), and delivers personalized responses adapted to each student's teaching style, weak areas, and mastery level. All running on free-tier infrastructure at $0/month.",

    impact: [
      "Reduced API calls from 14+ to 1 per query (vs. original ReAct agent design)",
      "~2 second response latency on Groq cloud inference",
      "$0/month operating cost on free-tier infrastructure",
      "80 NCERT PDFs ingested across 8 subjects × 2 grades",
      "4 teaching styles - Definition-First, Analogy-First, Example-First, Socratic",
    ],

    architecture: [
      { label: "React Frontend", detail: "Vercel CDN", color: "blue" },
      { label: "FastAPI Backend", detail: "Render free tier", color: "green" },
      { label: "Supabase + pgvector", detail: "PostgreSQL, IVFFlat index", color: "purple" },
      { label: "Ollama Embeddings", detail: "nomic-embed-text, 768-dim", color: "amber" },
      { label: "Groq LLM", detail: "LLaMA 3.3 70B", color: "red" },
      { label: "3-Stage RAG", detail: "Reformulate → Search → Enrich", color: "cyan" },
    ],

    keyDecisions: [
      "3-stage RAG over naive similarity search - initial vector search often fails on student queries ('how does photosynthesis work') because textbook language differs from conversational queries. Reformulation generates 4 alternative search phrasings and retries",
      "Chunk enrichment before final LLM call - raw textbook excerpts are dry. Adding one example, one misconception, and one real-world connection transforms them into teaching-ready context",
      "Deterministic pipeline over ReAct agent - the original design burned 14+ LLM calls per question. Restructuring into a deterministic 3-stage pipeline reduced it to 1 call (worst case: 3 calls)",
      "pgvector with IVFFlat indexing over external vector databases - keeps everything in Supabase, eliminates another managed service, and cosine similarity over 768-dim embeddings is fast enough",
      "Per-student teaching style adaptation - the system prompt dynamically adjusts explanation format based on the student's preference profile",
    ],

    features: [
      "3-stage RAG pipeline - query reformulation, vector search, chunk enrichment",
      "80 NCERT PDF ingestion - automated chunking (450 tokens, 50 overlap) with embedding",
      "Personalized AI tutor - adapts to grade, subjects, weak topics & teaching style",
      "4 teaching styles - Definition-First, Analogy-First, Example-First, Socratic",
      "Supabase Auth - JWT, email verification, auto-profile creation",
      "Telegram bot - cross-platform Q&A sharing the same agent loop",
      "Conversation history - persistent chat with session management",
      "Graceful fallback - 3-tier degradation (RPC → local cosine → general knowledge)",
    ],

    learnings: [
      "Naive RAG is not enough - embedding similarity alone fails on 40%+ of student queries. Query reformulation was the single biggest accuracy improvement",
      "Cost optimization is an architecture problem - switching from ReAct (14+ calls) to a deterministic pipeline (1 call) wasn't just cheaper, it was faster and more reliable",
      "Teaching style matters as much as content accuracy - the same correct answer explained four different ways gets four different comprehension rates",
    ],
  },
  {
    slug: "taskflow",
    title: "TaskFlow",
    subtitle: "AI-Powered Proactive Daily Planner",
    tagline:
      "An AI 'Chief of Staff' that doesn't just store your tasks - it plans your day, tracks your patterns, and reaches out before deadlines slip.",
    tech: [
      "LLM Orchestration",
      "Multi-Action AI Agent",
      "Proactive Scheduling",
      "Self-Improving Estimation",
      "Telegram Bot API",
      "Supabase RLS",
      "LLaMA 3.3 70B",
      "APScheduler Cron",
    ],
    live: "https://anoop-taskflow.vercel.app",
    github: "https://github.com/AnoopG7/TaskFlow",
    featured: true,

    problem:
      "Every to-do app is passive. They wait for you to open them, check off items, and manually prioritize. Nobody warns you that your 3-hour task is due in 2 hours. Nobody notices that you consistently underestimate design tasks by 40%. Nobody sends you a morning brief with your top 3 priorities. Traditional task management is a filing system - not a productivity partner.",

    solution:
      "I built TaskFlow - a full-stack AI agent that acts as your personal chief of staff. A single LLM call can create a project, spawn 5 tasks, set priorities, assign deadlines, and respond naturally - all in one shot. The agent learns your estimation patterns (bias tracking across your last 30 tasks), auto-corrects future estimates, scans for overdue tasks hourly, and proactively sends you Telegram alerts with morning briefs and deadline warnings. All running on free-tier infrastructure.",

    impact: [
      "Single LLM call executes up to 12 action types atomically",
      "Self-improving time estimation with historical bias tracking",
      "Proactive daily morning briefs via Telegram (top 3 priorities + motivation)",
      "Hourly deadline scans with color-coded Telegram alerts (🔴 overdue, 🟡 due soon)",
      "30 REST API endpoints with 9-table Supabase schema",
    ],

    architecture: [
      { label: "React SPA", detail: "Vercel", color: "blue" },
      { label: "FastAPI Backend", detail: "Render free tier", color: "green" },
      { label: "Supabase", detail: "PostgreSQL + RLS", color: "purple" },
      { label: "Groq LLM", detail: "LLaMA 3.3 70B", color: "red" },
      { label: "Telegram Bot", detail: "Proactive alerts", color: "amber" },
      { label: "APScheduler", detail: "Morning briefs, hourly scans", color: "cyan" },
    ],

    keyDecisions: [
      "Single-call multi-action over ReAct tool-calling - instead of burning tokens on sequential tool calls, the LLM outputs a structured action plan in one pass. The backend executes actions deterministically, projects first (so IDs are available), then tasks",
      "Self-improving estimation - the agent tracks bias = avg(actual/estimated) across the last 30 completed tasks and injects this correction factor into every future prompt. If you consistently underestimate by 1.4x, the agent learns and adjusts",
      "APScheduler in-process over external cron - keeps the architecture simple. Morning briefs use a dedicated LLM call to generate personalized top-3 priorities with motivational context",
      "Per-user timezone & DND settings - every scheduled action respects the user's timezone and quiet hours. No 3am Telegram alerts",
      "Supabase RLS over application-level auth - Row-Level Security policies ensure users can only access their own data, even if the API layer has bugs",
    ],

    features: [
      "12 AI action types - create/complete/delete tasks & projects, batch operations, linking",
      "Self-improving time estimation - learns from your last 30 tasks' actual vs. estimated hours",
      "Proactive morning briefs - LLM-generated daily top-3 priorities via Telegram",
      "Hourly deadline scans - 🔴 overdue / 🟡 due-within-24h alerts on Telegram",
      "Natural language chat - conversational task management in both web and Telegram",
      "Dashboard - tasks, projects, productivity metrics, streaks",
      "Multi-channel - React SPA + Telegram bot sharing the same agent loop",
      "Per-user settings - timezone, work hours, DND, notification preferences",
    ],

    learnings: [
      "Proactive > reactive - the hourly Telegram alerts caught more missed deadlines than any dashboard notification ever could. Meeting people where they already are (messaging apps) is better than expecting them to open your app",
      "Structured JSON output is more reliable than tool-calling for multi-action scenarios - fewer parsing failures, lower token usage, and deterministic execution order",
      "Estimation bias tracking was surprisingly accurate - after 20+ tasks, the correction factor stabilized and genuinely improved prediction quality",
    ],
  },
  {
    slug: "ai-leadgen",
    title: "AI Lead Generation Platform",
    subtitle: "SaaS for PropTech Lead Capture",
    tagline:
      "Deterministic AI agent orchestration engine with autonomous execution, multi-provider LLM routing, and full CRM dashboard.",
    tech: ["OpenAI Function Calling", "FastAPI Async", "React + shadcn/ui", "PostgreSQL 16", "SQLAlchemy", "Docker", "Meta Graph API"],
    live: "#",
    github: "https://github.com/AnoopG7/AI-LeadGen",
    featured: false,

    problem: "PropTech teams lose leads because manual follow-up is slow, CRM tools are expensive, and Facebook ad leads sit untouched for hours.",
    solution: "A deterministic AI agent orchestration engine with 8 custom tools, 10-turn autonomous execution, multi-provider LLM routing (Groq / Ollama), and a React CRM dashboard for lead management.",
    impact: [
      "~60% API cost reduction via Groq Llama-3 vs OpenAI-equivalent models",
      "8 custom AI tools with 429 retry backoff and JSON recovery",
      "16-table relational schema with timezone-aware timestamps",
    ],
    features: [
      "Deterministic AI agent with 10-turn autonomous execution loop",
      "Multi-provider LLM routing (Groq / Ollama) via single env variable",
      "Meta Lead Ads webhook pipeline with automatic agent invocation",
      "React CRM dashboard — lead management, property CRUD, meeting scheduler",
    ],
  },
  {
    slug: "ai-lms",
    title: "AI-Powered LMS",
    subtitle: "Full-Stack MERN + AI Learning Platform",
    tagline:
      "Upload study materials, get AI-generated flashcards and quizzes with adaptive difficulty and real-time collaborative chat.",
    tech: ["AI Quiz Generation", "Groq LLM", "Real-time WebSockets", "Socket.io", "MERN Stack", "Adaptive Difficulty"],
    live: "https://anoop-lms.vercel.app",
    github: "https://github.com/AnoopG7/ai-lms",
    featured: false,

    problem: "Students spend hours manually creating flashcards and practice quizzes from their study materials.",
    solution: "An AI-driven LMS that converts uploaded PDFs/DOCX/TXT into flashcards and quizzes using Groq LLM, with real-time collaborative chat and adaptive difficulty.",
    impact: [
      "Automated flashcard & quiz generation from uploaded materials",
      "Real-time collaborative chat with Socket.io",
      "Adaptive difficulty-based question generation",
    ],
    features: [
      "AI-driven flashcard & quiz generation from uploaded study materials",
      "Real-time collaborative chat with Socket.io room-based broadcasting",
      "Adaptive quiz system with attempt tracking and analytics",
      "JWT authentication with secure file upload handling",
    ],
  },
  {
    slug: "sabdasparsh",
    title: "SabdaSparsh",
    subtitle: "Bilingual Literary Portfolio Platform",
    tagline:
      "A bilingual Hindi & English literary content platform with admin CMS, NextAuth, and Vercel Blob storage.",
    tech: ["Next.js SSR", "NextAuth JWT", "Vercel Blob", "MongoDB", "Bilingual CMS"],
    live: "https://sabdasparsh.vercel.app",
    github: "https://github.com/AnoopG7/SabdaSparsh",
    featured: false,

    problem: "Independent writers need a professional platform to publish bilingual literary content without the overhead of a full CMS.",
    solution: "A full-stack bilingual platform with admin dashboard, NextAuth JWT authentication, and draft/publish workflow.",
    impact: [
      "Bilingual (Hindi & English) content management",
      "Secure admin dashboard with draft/publish workflow",
      "Vercel Blob storage for validated image uploads",
    ],
    features: [
      "Bilingual (Hindi & English) literary content platform",
      "Admin CMS with draft/publish workflow",
      "NextAuth JWT authentication",
      "Vercel Blob storage for image uploads",
    ],
  },
  {
    slug: "bms",
    title: "Building Management System",
    subtitle: "Smart Society Management Platform",
    tagline:
      "Role-based residential management with 57+ API endpoints and 229+ automated tests.",
    tech: ["229+ Tests", "57+ API Endpoints", "RBAC", "OpenAPI/Swagger", "MERN Stack"],
    live: "https://anoop-bms.vercel.app",
    github: "https://github.com/AnoopG7/BMS",
    featured: false,

    problem: "Residential societies manage operations manually - maintenance requests, billing, and communications are scattered across WhatsApp groups and spreadsheets.",
    solution: "A full-stack management system with role-based access (Admin, Owner, Tenant), comprehensive REST APIs, and automated testing.",
    impact: [
      "57+ RESTful API endpoints with OpenAPI/Swagger docs",
      "229+ unit & integration tests with automated coverage",
      "Role-based access control (Admin, Owner, Tenant)",
    ],
    features: [
      "Role-based access control - Admin, Owner, Tenant",
      "57+ RESTful API endpoints with centralized error handling",
      "229+ unit & integration tests with OpenAPI/Swagger docs",
      "JWT authentication with bcrypt password hashing",
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
    description: "Built Building Management System - learning backend architecture and testing.",
  },
  {
    year: "2025",
    title: "Shipped Production Apps",
    description: "Launched AI-Powered LMS and SabdaSparsh - integrating AI, real-time features, and CMS.",
  },
  {
    year: "2026",
    title: "Shipped AI Ready Production Systems",
    description: "Built TutorX (RAG-powered CBSE tutoring), TaskFlow (proactive AI task manager), and AI Lead Gen Platform (conversational lead capture agent) - all running on production infrastructure.",
  },
  {
    year: "Next →",
    title: "What's next...",
    description: "Building more RAG pipelines, autonomous agents, and AI-powered apps that solve real problems.",
  },
];
