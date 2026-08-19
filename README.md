# Anoop Gupta — Portfolio

A personal portfolio showcasing AI/ML engineering work, built with React 19, Three.js, GSAP, and Tailwind CSS v4.

**Live:** [anoopg-portfolio.vercel.app](https://anoopg-portfolio.vercel.app/)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7 + SWC |
| Styling | Tailwind CSS v4 + shadcn/ui |
| 3D | Three.js via @react-three/fiber + @react-three/drei |
| Animations | GSAP (ScrollTrigger, SplitText) + Motion |
| Smooth Scroll | Lenis |
| Physics | Matter.js (FallingText) |
| Routing | React Router DOM v7 |
| Fonts | Syne (display), Inter (body), JetBrains Mono (mono) |
| Icons | Lucide React + React Icons |
| Deploy | Vercel |

## Project Structure

```
src/
├── App.tsx                    # Router, Lenis, GSAP setup, routes
├── main.tsx                   # React root
├── styles/globals.css         # Tailwind v4, theme tokens, dark mode
├── lib/
│   ├── data.ts                # All content (nav, bio, skills, projects, etc.)
│   └── utils.ts               # cn() helper
├── hooks/
│   └── useSectionPin.ts       # GSAP ScrollTrigger pinning hook
└── components/
    ├── common/                # Navbar, Footer, ScrollProgress, GradientMesh
    ├── hero/                  # NeuralNetwork (3D), CursorGlow (cursor trail)
    ├── sections/              # Hero, About, Experience, Skills, Achievements,
    │                          # Projects, ProjectDetail, Journey, Contact
    ├── reactbits/             # CountUp, TextType, SplitText, FallingText
    └── ui/                    # shadcn/ui components
```

## Features

### 3D Neural Network Hero
Concentric shells of nodes using Fibonacci golden-angle distribution, structured edges (ring + radial + cross-link), slow rotation, and pulse animation. Lazy-loaded in its own async chunk. Responsive node counts (55 desktop, 30 mobile).

### Cursor Neural Trail
Canvas-based particle trail that follows the mouse cursor. Spawns points along movement, connects nearby points with fading amber lines. Pauses on card hover. Skipped on touch devices.

### GSAP Scroll Animations
Every section uses ScrollTrigger reveal animations. Elements animate from `opacity: 0, y: 50, blur(3px)` into view. Skills section uses a falling badge animation with random rotation and stagger.

### Hero Character Stagger
Text split into individual character spans with staggered GSAP reveal — each character animates from `opacity: 0, y: 40, scale: 0.8, rotateX: 40` with `back.out(1.7)` easing.

### Dark Mode
Dual-theme system (warm cream light / near-black dark) with CSS custom properties. Persisted via localStorage. Pre-paint restore in index.html prevents flash.

### Project Case Studies
Featured projects have full case study pages (`/project/:slug`) with: problem, solution, architecture flow diagram, key decisions, features, impact metrics, and learnings.

## License

Built by Anoop Gupta. All rights reserved.
