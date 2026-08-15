import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HERO } from "@/lib/data";
import { ArrowRight } from "lucide-react";

import CursorGlow from "@/components/hero/CursorGlow";
import FloatingIcons from "@/components/hero/FloatingIcons";
import type { HeroPlacement, HeroVariant } from "@/components/hero/Hero3D";

// Lazy-loaded so three.js ships in its own async chunk, not the main bundle.
const Hero3D = lazy(() => import("@/components/hero/Hero3D"));

gsap.registerPlugin(ScrollTrigger);

/**
 * Split text into word groups, each word containing individual character spans.
 * This preserves natural word-wrapping while enabling per-character animation.
 */
function splitIntoWords(text: string, charClass: string, gradient = false) {
  // When `gradient` is true, the gradient must live on each character
  // (not the parent block) so the per-character stagger reveal works.
  // A parent-level background-clip:text paints the whole gradient through
  // the still-hidden characters, making the line appear solid instead.
  const charBaseClass = gradient ? `${charClass} text-gradient` : charClass;

  return text.split(" ").map((word, wi) => (
    <span key={wi} className="inline-flex">
      {word.split("").map((char, ci) => (
        <span
          key={ci}
          className={`${charBaseClass} inline-block`}
          style={{ perspective: "600px" }}
        >
          {char}
        </span>
      ))}
      {/* Whitespace between words — regular space so wrapping works */}
      {wi < text.split(" ").length - 1 && (
        <span className={`${charBaseClass} inline-block`}>&nbsp;</span>
      )}
    </span>
  ));
}

export default function Hero({
  variant,
  placement,
}: {
  variant: HeroVariant;
  placement: HeroPlacement;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // ── Character-level stagger animation for headings ──
      const heading1Chars = container.querySelectorAll<HTMLElement>(".hero-char-1");
      const heading2Chars = container.querySelectorAll<HTMLElement>(".hero-char-2");

      gsap.set([".hero-greeting", ".hero-ctas", ".hero-status"], {
        opacity: 0,
        y: 30,
      });
      gsap.set(heading1Chars, { opacity: 0, y: 40, scale: 0.8, rotateX: 40 });
      gsap.set(heading2Chars, { opacity: 0, y: 40, scale: 0.8, rotateX: 40 });

      const tl = gsap.timeline({ delay: 0.15 });

      // Greeting
      tl.to(".hero-greeting", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Heading line 1 — character stagger
      tl.to(
        heading1Chars,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: 0.025,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      // Heading line 2 — character stagger
      tl.to(
        heading2Chars,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: 0.025,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.25"
      );

      // Status + CTAs
      tl.to(
        ".hero-status",
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.1"
      );
      tl.to(
        ".hero-ctas",
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} id="hero" className="relative">
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20 pb-8">
        {/* Cursor glow effect */}
        <CursorGlow />

        {/* Floating tech icons */}
        <FloatingIcons />

        {/* 3D background element (behind content) */}
        {placement === "background" && (
          <Suspense fallback={null}>
            <Hero3D variant={variant} placement="background" />
          </Suspense>
        )}

        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] rounded-full bg-accent/[0.06] blur-[100px] md:blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full bg-accent/[0.04] blur-[80px] md:blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl w-full">
          {/* Greeting */}
          <p className="hero-greeting text-muted-foreground text-sm sm:text-base md:text-xl font-medium tracking-[0.2em] uppercase mb-3 sm:mb-5 md:mb-6">
            {HERO.greeting}
          </p>

          {/* Heading with character stagger — word groups for proper wrapping */}
          <h1 className="font-display font-extrabold leading-[1.1] tracking-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-foreground mb-1 md:mb-2 flex flex-wrap justify-center">
              {splitIntoWords(HERO.headingLine1, "hero-char-1")}
            </span>
            {/*
              Gradient line: the gradient is applied per character (via the
              `gradient` flag) so the per-character stagger reveal works.
              Keep text-align:center with inline children for wrapping.
            */}
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-center">
              {splitIntoWords(HERO.headingLine2, "hero-char-2", true)}
            </span>
          </h1>

          {/* 3D centerpiece element (in content flow, below heading) */}
          {placement === "centerpiece" && (
            <Suspense fallback={null}>
              <Hero3D variant={variant} placement="centerpiece" />
            </Suspense>
          )}

          {/* Status badge */}
          <div className="hero-status mt-5 md:mt-7 flex justify-center">
            <Badge
              variant="outline"
              className="px-3 py-1.5 text-xs bg-card/60 border-border text-muted-foreground"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {HERO.status}
            </Badge>
          </div>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 md:mt-5">
            <Button
              asChild
              size="default"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-[0_0_25px_rgba(217,126,22,0.25)] hover:shadow-[0_0_35px_rgba(217,126,22,0.35)] transition-all duration-300 w-full sm:w-auto"
            >
              <a
                href="#projects"
                onClick={(e) => handleAnchorClick(e, "#projects")}
              >
                View Projects
                <ArrowRight className="ml-1.5 size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="default"
              className="border-border hover:border-accent/40 hover:text-accent w-full sm:w-auto"
            >
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, "#contact")}
              >
                Contact Me
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
          <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono">
            Scroll to explore
          </span>
          <span className="w-px h-8 sm:h-10 bg-gradient-to-b from-muted-foreground/50 to-transparent animate-pulse" />
        </div>
      </section>
    </div>
  );
}
