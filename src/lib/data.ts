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
    subtitle: "RAG Tutoring System",
    tagline:
      "Gives students free, textbook-grounded answers with page citations, unlike chatbots that can’t show their sources.",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Supabase",
      "pgvector",
      "Groq",
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
      "Built a multi-stage, self-correcting RAG tutor over CBSE textbooks that returns chapter, section and page citations with every answer, so students can verify the source",
      "Replaced a ReAct agent that needed 14+ LLM calls per question and frequently timed out with a 1–3 call pipeline, cutting LLM calls by 80%+",
      "Engineered context and memory management that combines textbook passages, the student’s learning profile and recent chat history into a single prompt",
      "Weak searches are rewritten into alternative queries, and the best passage is enriched with an example and a common misconception before answering",
      "Finds the right chapter in the top 5 results for 91% of a 58-question retrieval benchmark",
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
      "Flags overfit strategies before any money is risked by catching ones that look profitable in testing but lose money on new data.",
    tech: [
      "Python",
      "scikit-learn",
      "FastAPI",
      "React",
      "TypeScript",
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
      "Built a platform that tests trading strategies on years of historical market data, simulating real trading costs (fees, slippage, stop-losses) across 12 strategies and 35+ risk and return metrics",
      "Added walk-forward testing (tuning on past data, then testing on unseen future data), which showed that strategies lose most of their edge on new data: average risk-adjusted return (Sharpe ratio) fell from 0.66 to 0.06",
      "Trained Random Forest and Gradient Boosting models on 111 market signals, with safeguards that prevent the models from seeing future prices during training",
      "Runs a full parameter search 14× faster than brute force (26 s vs 6 min)",
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
    subtitle: "AI Sales Agent for Lead Generation",
    tagline:
      "Automates the first-response and qualification work a sales rep does by hand: replies instantly at any hour, records leads in the CRM and books demo calls.",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Groq (Llama 3.3)",
      "WhatsApp Cloud API",
    ],
    live: "#",
    github: "https://github.com/AnoopG7/AI-Sales-Agent",
    featured: true,

    problem:
      "Leads from ads go cold when nobody replies for hours. Sales reps spend their first conversations asking the same qualification questions, and the answers often never make it into the CRM.",

    solution:
      "I built a WhatsApp AI sales agent on raw LLM function calling. It answers every inbound message instantly, qualifies the lead (company, team size, use case, budget, timeline), recommends plans from the product catalog, books a demo call, emails a summary, and hands off to a human for custom pricing or contracts. An admin dashboard manages leads, the catalog and meetings.",

    impact: [
      "Built a WhatsApp AI agent with 9 tools (product search, lead qualification, demo booking, human handoff) that moves each lead through a 7-stage pipeline, from first message to a booked demo call",
      "Kept the agent’s view of each lead accurate by refreshing its context after every update, and capped tool rounds and chat history to control token costs",
      "Records company, team size, budget and requirements in the CRM, and books demo calls, handing off to a human when needed",
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
    slug: "ark-agent",
    title: "Ark-Agent",
    subtitle: "Human-in-the-Loop Relief Planning Agent",
    tagline:
      "Plans flood-relief deliveries from live data and guidelines, and never dispatches anything without a coordinator’s approval.",
    tech: [
      "Python",
      "LangGraph",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Groq",
      "React",
      "TypeScript",
    ],
    live: "#",
    github: "https://github.com/AnoopG7/Ark-Agent",
    featured: true,

    problem:
      "During a flood, relief coordinators juggle depot stock, blocked roads, available teams and standard operating procedures under time pressure, and decisions made on one shift are easily lost by the next. An AI planner is only useful if it respects the rules, shows its reasoning and never dispatches anything without a human's sign-off.",

    solution:
      "I built Ark, a LangGraph planning agent for a relief coordination centre. A coordinator types a request like \"Ward 7 needs drinking water for 300 people by evening\"; Ark recalls what earlier shifts decided about that ward, looks up the relevant guideline with RAG, checks stock at three depots, road status and volunteer teams, and plans around problems such as a blocked road. The plan is validated against live data and the guidelines, then the graph pauses for the coordinator to approve, revise or reject it. Every decision is stored so the next shift sees it, even after a restart.",

    impact: [
      "Built a LangGraph ReAct agent with 7 tools (stock, roads, teams, guideline search, memory, dispatch) that plans relief deliveries and routes around blocked roads",
      "Paused every dispatch for human approval with a LangGraph interrupt, after validating the plan against live stock, routes, team skills and guideline minimums",
      "Kept decisions across shifts and restarts with Postgres-backed short- and long-term memory, and cited guidelines via RAG over 9 SOPs",
      "Covered 8 evaluation scenarios (blocked road, insufficient stock, step limit, memory, revisions) and 121 offline unit tests",
    ],

    architecture: [
      { label: "React Dashboard", detail: "Chat, live trace, approval slip", color: "blue" },
      { label: "FastAPI", detail: "Server-sent event streaming", color: "green" },
      { label: "LangGraph", detail: "ReAct loop + interrupt()", color: "red" },
      { label: "Groq LLM", detail: "Tool calling", color: "amber" },
      { label: "Postgres + pgvector", detail: "Ops data, memory, HNSW index", color: "purple" },
      { label: "RAG", detail: "9 SOPs, bge-small embeddings", color: "cyan" },
    ],

    keyDecisions: [
      "Custom LangGraph nodes instead of a prebuilt agent - load_memory → reason ⇄ tools → approval → finalize_plan makes every transition explicit and testable",
      "Validate before asking a human - a deterministic validator checks quantities, team skills, blocked routes, boat-only routes, stock and ETA, and sends violations back to the reasoning step",
      "interrupt() before any write - LangGraph re-runs the approval node on resume, so nothing is reserved until the coordinator has decided",
      "Two memory layers - a checkpointer keeps each conversation, and a long-term store keeps decisions and rejections per ward across shifts",
      "Citations must be earned - a plan may only cite guideline passages actually retrieved in the current request",
    ],

    features: [
      "7 tools - stock lookup, road status, team list, guideline search, recall and save facts, and a dispatch proposal",
      "Human approval with approve, revise or reject, and a reason saved to memory",
      "Plan validation against live operational data and guideline rules",
      "Step limit that ends the run cleanly with a clear message",
      "RAG over 9 relief SOPs with heading-aware chunks and citations",
      "Live reasoning trace streamed to the dashboard",
      "Docker Compose setup: Postgres 16 + pgvector, backend, frontend",
    ],

    learnings: [
      "Human-in-the-loop is a state-machine problem - the hard part is making pause and resume safe, not asking the question",
      "A validator turns an LLM planner from risky to usable - most bad plans are caught by plain code before a person ever sees them",
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
    slug: "ai-video-dubbing",
    title: "AI Video Dubbing",
    subtitle: "Voice-Cloned English Dubbing Pipeline",
    tagline:
      "Turns a YouTube video in another language into an English dub in the original speaker's cloned voice, on an 8 GB laptop.",
    tech: ["Whisper", "XTTS v2 Voice Cloning", "Speaker Clustering", "FFmpeg", "Python"],
    live: "#",
    github: "https://github.com/AnoopG7/ai-video-dubbing",
    featured: false,

    problem:
      "Dubbing a video usually means a generic synthetic voice and speech that drifts out of sync with the original timing.",

    solution:
      "A 6-stage local pipeline: download the video, transcribe and translate it with Whisper, polish the translation, clone each speaker's voice with XTTS v2, time-stretch every generated line to fit its original slot, and remix the new audio into the video. Models load one at a time so it runs on a CPU with 8 GB of RAM.",

    impact: [
      "Speech generated in each speaker's own cloned voice",
      "Each dubbed line time-fitted to the original timestamps",
      "Runs on an 8 GB RAM CPU by loading models one at a time",
    ],

    features: [
      "Whisper transcription and translation from many source languages",
      "Up to 2 speakers separated by vocal pitch, each cloned separately",
      "Time alignment with chained FFmpeg atempo filters",
      "Falls back to edge-tts voices if voice cloning fails",
      "Fast preset for long videos",
    ],
  },
];

// ── Journey / Timeline ──
export interface Milestone {
  year: string;
  title: string;
  points: string[];
}

export const JOURNEY: Milestone[] = [
  {
    year: "2024",
    title: "Started B.Tech & Learnt the Fundamentals",
    points: [
      "Began B.Tech in Computer Science & Engineering (AI, ML & Data Science) at ITM Skills University",
      "Learnt programming fundamentals in Python, C++ and Java",
      "Built web foundations with HTML, CSS and JavaScript, then moved to the MERN stack",
      "Joined the Developer Student Club core team",
    ],
  },
  {
    year: "2025",
    title: "First Internship & Full-Stack Projects",
    points: [
      "Web Development Intern at CodeDev Verse, building the student-facing frontend of an early-stage LMS",
      "Ranked 5th of 150 in Year 1 (Academic Excellence Award)",
      "Sharpened my MERN stack skills and built more full-stack projects",
    ],
  },
  {
    year: "2026",
    title: "Building AI Systems",
    points: [
      "Learnt LLMs, RAG and AI agents through courses including the Machine Learning Specialization (DeepLearning.AI & Stanford) and Fullstack Generative & Agentic AI",
      "Built TutorX (RAG tutor, live), TSRL (trading strategy research lab), an AI sales agent for WhatsApp and Ark-Agent (human-in-the-loop LangGraph planner)",
      "Ranked 2nd of 150 in Year 2 (Academic Excellence Award)",
    ],
  },
  {
    year: "Next →",
    title: "Open to 6-Month Internships",
    points: [
      "Actively looking for a 6-month internship from January – June 2027",
      "In AI/ML engineering, LLM systems or related roles",
    ],
  },
];
