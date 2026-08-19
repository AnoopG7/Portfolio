import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

/** Reset scroll on route change; scroll to section if state.scrollTo is set */
function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const scrollTo = (state as { scrollTo?: string } | null)?.scrollTo;

    if (scrollTo) {
      // Reset to top first so getBoundingClientRect is accurate
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis as Lenis | undefined;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);

      const timer = setTimeout(() => {
        const el = document.querySelector(scrollTo) as HTMLElement | null;
        if (!el) return;
        const navbar = document.querySelector("nav");
        const navbarBottom = navbar ? navbar.getBoundingClientRect().bottom : 0;
        const y = el.getBoundingClientRect().top + window.scrollY - navbarBottom - 16;
        if (lenis) {
          lenis.scrollTo(y, { duration: 1.5 });
        } else {
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }

    // No scrollTo — just reset to top
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis as Lenis | undefined;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
}

function AppShell() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    // Expose Lenis globally so Navbar can use lenis.scrollTo()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis = lenis;

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
      <ScrollToTop />
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
