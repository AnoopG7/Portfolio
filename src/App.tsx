import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TooltipProvider } from "@/components/ui/tooltip";

import CursorGlow from "@/components/hero/CursorGlow";
import Navbar from "@/components/common/Navbar";
import ScrollProgress from "@/components/common/ScrollProgress";
import Footer from "@/components/common/Footer";
import GradientMesh from "@/components/common/GradientMesh";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

const ProjectDetail = lazy(
  () => import("@/components/sections/ProjectDetail")
);

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  return (
    <main className="relative z-[1]">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Achievements />
      <Projects />
      <Journey />
      <Contact />
    </main>
  );
}

function AppShell() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      wheelMultiplier: 0.7,
    });

    lenisRef.current = lenis;

    // Connect Lenis ↔ GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <TooltipProvider>
      <CursorGlow />
      <GradientMesh />
      <ScrollProgress />
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/project/:slug"
            element={
              <main className="relative z-[1]">
                <ProjectDetail />
              </main>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </TooltipProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
