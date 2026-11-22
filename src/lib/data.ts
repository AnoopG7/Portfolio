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
  role: "AI/ML Engineer | LLM Systems, RAG & AI Agents",
  tagline: "I build AI-powered apps that learn",
  bio: "AI/ML engineering student who builds LLM applications end to end, from RAG pipelines and agents to the APIs and interfaces around them. Focused on making AI systems reliable: measuring retrieval quality, cutting LLM cost and testing models on unseen data.",
  email: "gupta.anoop2006@gmail.com",
  phone: "+91-7039386723",
  education: {
    degree: "B.Tech in Computer Science & Engineering (Specialization: AI, ML & Data Science)",
    university: "ITM Skills University, Navi Mumbai",
    graduation: "2028",
    cgpa: "9.68",
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
  { pre: "Cut LLM calls per answer by", strong: "80%+" },
  { pre: "Find the right source for", strong: "9 in 10", post: "questions" },
  { pre: "Ground AI answers in", strong: "real data", post: "with citations" },
  { pre: "Catch overfit strategies before they", strong: "cost money" },
] as const;

// ── Current Focus ──
export const CURRENTLY_EXPLORING = "Artificial Intelligence, Machine Learning & building production-ready AI systems" as const;

// ── Stats ──
export const STATS = [
  { value: "15+", label: "AI & Full-Stack Projects" },
  { value: "9.68", label: "CGPA" },
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
    role: "Web Development Intern",
    company: "CodeDev Verse",
    location: "Remote",
    period: "May 2025 – Jul 2025",
    type: "Internship",
    description:
      "Built the student-facing frontend of an early-stage LMS in React, TypeScript and Material UI.",
    highlights: [
      "Built the student-facing frontend of an early-stage LMS in React, TypeScript and Material UI",
      "Validated every form with React Hook Form and Zod, and connected pages to the REST backend through a shared Axios client",
      "Delivered the core student journey, from sign-up and enrolment through learning and quizzes",
    ],
    tech: ["React", "TypeScript", "Material UI", "React Hook Form", "Zod", "Axios"],
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
    category: "Generative AI & LLMs",
    skills: [
      { name: "RAG Systems" },
      { name: "AI Agents" },
      { name: "Multi-Agent Workflows" },
      { name: "Function Calling" },
      { name: "Prompt Engineering" },
      { name: "Embeddings & Semantic Search" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "OpenAI" },
      { name: "Anthropic" },
      { name: "Groq" },
      { name: "Ollama" },
    ],
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "Python" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Matplotlib" },
      { name: "Scikit-learn" },
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "Feature Engineering" },
      { name: "Model Evaluation" },
      { name: "Jupyter" },
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
      { name: "Kafka" },
      { name: "Redis" },
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
      { name: "Qdrant" },
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
      { name: "Jenkins" },
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
  { title: "Academic Excellence Award - 2nd of 150", tag: "Academic" },
  { title: "Core Team Member, Developer Student Club", tag: "Leadership" },
  { title: "AI/ML & software prototypes at 5+ hackathons", tag: "Hackathons" },
  { title: "AWS Cloud Practitioner Essentials", tag: "Coursera" },
  { title: "Machine Learning Specialization (in progress)", tag: "DeepLearning.AI" },
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
    slug: "tutorx",
    title: "TutorX",
    subtitle: "RAG Tutoring System for CBSE Students",
    tagline:
      "A RAG tutor that answers from the student's own NCERT textbook, cites the chapter, section and page, and runs for $0/month.",
    tech: [
      "Self-Correcting RAG",
      "pgvector (HNSW)",
      "nomic-embed-text",
      "Query Rewriting",
      "Chunk Enrichment",
      "Retrieval Benchmark",
      "Groq Cloud",
      "FastAPI + React",
    ],
    live: "https://anoop-tutorx.vercel.app",
    github: "https://github.com/AnoopG7/TutorX",
    featured: true,
    videoUrl: "https://nfvhlk7rxobcland.public.blob.vercel-storage.com/TutorX.mov",

    problem:
      "Most students can't afford a personal tutor, and general-purpose chatbots give answers that aren't tied to their curriculum and can't show where the answer came from. A student asking about photosynthesis needs the explanation from their own NCERT chapter, at their grade level, with a page they can check.",

    solution:
      "I built TutorX, a full-stack RAG tutor over 80 Class 9 NCERT textbook PDFs, split into 1,581 passages tagged by chapter, section and printed page. When a search comes back weak, an LLM rewrites the question into alternative queries and searches again; the best passage is then enriched with an example and a common misconception before one final LLM call writes the answer, personalized to the student's teaching-style preference, weak areas and recent conversation. Every answer carries chapter, section and page citations.",

    impact: [
      "Cut LLM calls per question from 14+ (original ReAct agent, which timed out) to 1-3",
      "Finds the right chapter in the top 5 results for 91% of a 58-question retrieval benchmark (78% as the top result)",
      "Caught a vector-index misconfiguration that silently dropped that to 55%, and fixed it by migrating to HNSW",
      "Chapter, section and page citations on every answer",
      "$0/month on free tiers, with quantized embeddings that fit a 512 MB server",
    ],

    architecture: [
      { label: "React Frontend", detail: "Vercel", color: "blue" },
      { label: "FastAPI Backend", detail: "Render free tier", color: "green" },
      { label: "Supabase + pgvector", detail: "PostgreSQL, HNSW index", color: "purple" },
      { label: "FastEmbed", detail: "nomic-embed-text, 768-dim, in-process", color: "amber" },
      { label: "Groq LLM", detail: "Answer, rewrite & enrich calls", color: "red" },
      { label: "Self-Correcting RAG", detail: "Search → Rewrite → Enrich", color: "cyan" },
    ],

    keyDecisions: [
      "Deterministic pipeline over a ReAct agent - the original agent needed 14+ LLM calls per question and frequently timed out. A fixed retrieve → (rewrite) → (enrich) → answer pipeline needs 1-3 calls and never loops",
      "Query rewriting only when retrieval is weak - if fewer than 3 passages clear the similarity floor, the LLM rewrites the question into alternative search phrases. Strong searches skip the extra call",
      "Measure retrieval instead of guessing - a 58-question benchmark (hit@1 / hit@5 per subject) showed the IVFFlat index was probing about 1% of a small table and cutting hit@5 from 91% to 55%; HNSW fixed it, and the benchmark also set the similarity floor (0.65 → 0.55)",
      "Embeddings in-process - a quantized nomic-embed-text model (~130 MB) runs inside the API, so there's no separate embedding service and it still fits Render's 512 MB free instance",
      "Citations as structured data - sources are grouped by chapter and section with every contributing page, so the UI can show exactly where an answer came from",
    ],

    features: [
      "Self-correcting retrieval - weak searches are rewritten and retried",
      "Chunk enrichment - the top passage gains an example and a common misconception",
      "Chapter, section and printed-page citations on every answer",
      "Personalized answers - teaching style, weak areas, mastered topics and custom instructions",
      "4 teaching styles - Definition-First, Analogy-First, Example-First, Socratic",
      "Persistent chat sessions with auto-titles",
      "Graceful fallback - database search, then local cosine search, then a clearly-marked ungrounded answer",
      "Retrieval benchmark script reporting hit@1 / hit@5 per subject",
    ],

    learnings: [
      "Measure retrieval before tuning prompts - the benchmark exposed an index problem that no amount of prompt engineering would have fixed",
      "Cost optimization is an architecture problem - replacing the ReAct loop with a deterministic pipeline was cheaper, faster and more reliable at the same time",
      "Ingestion quality decides answer quality - fixing chapter titles and page numbers in the source PDFs mattered as much as the model",
    ],
  },
  {
    slug: "tsrl",
    title: "TSRL",
    subtitle: "Trading Strategy Research Lab",
    tagline:
      "A research platform that backtests trading strategies on historical data and tells you which ones only work on paper.",
    tech: [
      "Event-Driven Backtesting",
      "Walk-Forward Validation",
      "Genetic Algorithm Optimization",
      "Random Forest & Gradient Boosting",
      "35+ Risk Metrics",
      "Scikit-learn",
      "FastAPI",
      "React Dashboard",
    ],
    live: "#",
    github: "https://github.com/AnoopG7/TSRL",
    featured: true,
    videoUrl: "https://nfvhlk7rxobcland.public.blob.vercel-storage.com/TSRL.mov",

    problem:
      "A strategy that looks profitable in a backtest often isn't. Tuning parameters on the same data you evaluate on finds settings that fit past noise, and retail tools rarely test strategies on data they haven't seen or model real trading costs.",

    solution:
      "I built TSRL, a full-stack research platform with 12 strategies, event-driven and vectorized backtesting engines that model commission, slippage, stop-losses and multi-asset rebalancing, grid / random / genetic-algorithm optimizers, walk-forward validation, and Random Forest / Gradient Boosting signal models - all behind an 8-page React dashboard.",

    impact: [
      "Walk-forward testing over 180 train/test windows (4 strategies × 3 tickers, 2015-24): average Sharpe fell from 0.66 in-sample to 0.06 out-of-sample",
      "Exposed Bollinger mean-reversion as overfit (Sharpe 0.95 → −0.06) while EMA crossover held up (0.68 → 0.54)",
      "Genetic optimizer found a setting in the top 0.42% of an 8,736-point grid, 14× faster than brute force (26 s vs 369 s)",
      "35+ risk and return metrics (Sharpe, Sortino, Calmar, VaR, CVaR, Kelly)",
      "111 engineered features with leakage-safe walk-forward model retraining",
    ],

    architecture: [
      { label: "React Dashboard", detail: "8 pages, charts & heatmaps", color: "blue" },
      { label: "FastAPI", detail: "Backtest, optimize, ML, fundamentals", color: "green" },
      { label: "SQLAlchemy + SQLite", detail: "Alembic migrations", color: "purple" },
      { label: "Data Sources", detail: "Yahoo, Alpha Vantage, Finnhub, SEC", color: "amber" },
      { label: "ML Pipeline", detail: "Scikit-learn, 111 features", color: "red" },
      { label: "Backtesting Engines", detail: "Event-driven + Vectorized", color: "cyan" },
    ],

    keyDecisions: [
      "Two backtesting engines - event-driven for realistic bar-by-bar execution with commission, slippage and stop-losses, vectorized for fast parameter sweeps",
      "Walk-forward validation - tune on a rolling 2-year window, test on the next 6 months, repeat. It's the only way to see whether a strategy's edge survives on data it wasn't tuned on",
      "Genetic algorithm next to grid search - 600 evaluations instead of 8,736, landing in the top 0.42% of the full grid",
      "Leakage-safe ML - models retrain on an expanding window and only see labels whose forward window has closed (an embargo equal to the prediction horizon), enforced by a unit test",
      "Multi-source data - Yahoo Finance for prices, Alpha Vantage and FMP for fundamentals, Finnhub for news, SEC filings for insider transactions",
    ],

    features: [
      "12 strategies - EMA Crossover, RSI Mean Reversion, MACD, Bollinger Bands, MA Ribbon, Volume, ML-based & more",
      "Event-driven & vectorized backtesting with commission, slippage, stop-loss / take-profit",
      "Multi-asset portfolio backtests with rebalancing",
      "3 optimizers - Grid Search, Random Search, Genetic Algorithm",
      "Walk-forward analysis - rolling & expanding windows",
      "Random Forest & Gradient Boosting signal models on 111 engineered features",
      "Fundamental analysis - financial health scores, Piotroski F-Score, Altman Z-Score, news & insider activity",
      "Interactive dashboard - equity curves, drawdowns, monthly-return heatmaps, parameter sensitivity",
      "CLI for backtesting, optimization and data fetching",
    ],

    learnings: [
      "Overfitting is the default, not the exception - most strategies lost nearly all of their risk-adjusted return once tested on unseen data",
      "Some strategies are robust and some aren't - EMA crossover kept most of its edge while Bollinger mean-reversion flipped to a loss, which a single backtest would never show",
      "Leakage hides in the details - an ML model that trains on labels whose future window hasn't closed yet looks great and is useless",
    ],
  },
  {
    slug: "ai-sales-agent",
    title: "AI Sales Agent",
    subtitle: "WhatsApp Sales Agent for Lead Qualification",
    tagline:
      "A WhatsApp AI agent that replies to inbound leads instantly, qualifies them, recommends the right plan and books a demo call.",
    tech: [
      "LLM Function Calling",
      "9-Tool Agent Loop",
      "FastAPI Async",
      "PostgreSQL + SQLAlchemy",
      "WhatsApp Cloud API",
      "Groq / Ollama",
      "React + shadcn/ui",
    ],
    live: "#",
    github: "https://github.com/AnoopG7/AI-Sales-Agent",
    featured: true,

    problem:
      "Leads from ads go cold when nobody replies for hours. Sales reps spend their first conversations asking the same qualification questions, and the answers often never make it into the CRM.",

    solution:
      "I built a WhatsApp AI sales agent on raw LLM function calling. It answers every inbound message instantly, qualifies the lead (company, team size, use case, budget, timeline), recommends plans from the product catalog, books a demo call, emails a summary, and hands off to a human for custom pricing or contracts. An admin dashboard manages leads, the catalog and meetings.",

    impact: [
      "Automates the first-response and qualification work a rep does by hand, at any hour",
      "9-tool function-calling loop that moves each lead through a 7-stage pipeline to a booked demo call",
      "Lead details saved straight to the database as the conversation happens",
      "Agent name, company and currency configurable, so it can sell any catalog",
    ],

    architecture: [
      { label: "WhatsApp Cloud API", detail: "Inbound webhook + replies", color: "green" },
      { label: "FastAPI", detail: "Async, HMAC-verified webhook", color: "blue" },
      { label: "Agent Loop", detail: "9 tools, max 10 rounds", color: "red" },
      { label: "Groq / Ollama", detail: "One OpenAI-compatible client", color: "amber" },
      { label: "PostgreSQL 16", detail: "SQLAlchemy async + Alembic", color: "purple" },
      { label: "React Dashboard", detail: "Leads, catalog, meetings", color: "cyan" },
    ],

    keyDecisions: [
      "Raw function calling instead of LangChain/LangGraph - the whole loop is one function, so every message, tool call and retry is visible and debuggable",
      "Rebuild the system prompt after state-changing tools - otherwise the model keeps the lead profile from the start of the turn and re-asks questions it just saved the answers to",
      "Bounded loop - at most 10 tool rounds and 10 history messages per reply, then a final tools-disabled call so the lead always gets an answer",
      "Webhook hardening - HMAC signature verification rejects forged requests, and message-ID dedup stops Meta's retries from being processed twice",
      "Catalog data only through tools - the prompt forbids inventing prices or features; everything the agent quotes comes from the database",
    ],

    features: [
      "9 tools - product search, plan details, currency conversion, lead updates, stage tracking, demo booking, email, human handoff",
      "7-stage pipeline - greeting, qualification, discovery, proposal, demo scheduling, follow-up, closed",
      "Seat-range matching - recommends plans that fit the lead's team size and budget",
      "Retry with backoff on LLM rate limits",
      "Switch between hosted Groq and local Ollama with one env variable",
      "Terminal simulator that runs the exact webhook code path for testing",
      "React admin dashboard with lead, product and meeting management",
    ],
  },
  {
    slug: "taskflow",
    title: "TaskFlow",
    subtitle: "AI Task Planner with Telegram Alerts",
    tagline:
      "An AI task manager you talk to in plain language, that also messages you on Telegram before deadlines slip.",
    tech: [
      "Multi-Action LLM Agent",
      "Structured JSON Output",
      "Telegram Bot API",
      "APScheduler",
      "Supabase RLS",
      "FastAPI + React",
    ],
    live: "https://anoop-taskflow.vercel.app",
    github: "https://github.com/AnoopG7/TaskFlow",
    featured: false,
    videoUrl: "https://nfvhlk7rxobcland.public.blob.vercel-storage.com/TaskFlow.mov",

    problem:
      "To-do apps are passive: they wait for you to open them, and nobody warns you that a task is due in two hours.",

    solution:
      "I built TaskFlow, an AI task manager where one natural-language message (\"create a launch project with 5 tasks due this week\") becomes a list of typed actions in a single structured LLM call. A scheduler sends morning briefs and hourly due-date alerts on Telegram, and the same agent answers in both the web app and Telegram.",

    impact: [
      "One LLM call turns a request into multiple task and project operations across 10 action types",
      "Morning briefs and hourly due-within-24h alerts on Telegram, in each user's timezone",
      "Row-level security so users can only ever read their own data",
    ],

    architecture: [
      { label: "React SPA", detail: "Vercel", color: "blue" },
      { label: "FastAPI Backend", detail: "Render free tier", color: "green" },
      { label: "Supabase", detail: "PostgreSQL + RLS", color: "purple" },
      { label: "Groq LLM", detail: "Structured action plans", color: "red" },
      { label: "Telegram Bot", detail: "Alerts & chat", color: "amber" },
      { label: "APScheduler", detail: "Morning briefs, hourly scans", color: "cyan" },
    ],

    keyDecisions: [
      "Structured multi-action output instead of tool-calling - the LLM returns a list of actions in one pass; the backend runs them in order, so tasks can reference a project created earlier in the same request",
      "Per-action error isolation - one failed action doesn't stop the rest, and the reply reports what succeeded",
      "Timezone-aware scheduling - briefs and alerts are scheduled in each user's own timezone",
      "Supabase row-level security as a second line of defense behind the API",
    ],

    features: [
      "10 action types - create, complete, delete and link tasks and projects, including bulk operations",
      "Morning briefs and hourly due-date alerts on Telegram",
      "Natural-language chat in the web app and on Telegram",
      "Validated task status state machine",
      "Dashboard with tasks and projects",
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
    title: "Built AI Systems",
    description: "Built TutorX (RAG tutor, live), TSRL (trading strategy research lab), an AI sales agent for WhatsApp, and TaskFlow (AI task planner).",
  },
  {
    year: "Next →",
    title: "Open to 6-month internships",
    description: "Actively looking for 6-month internships (January – June 2027) in AI/ML engineering, LLM systems, or related roles.",
  },
];
