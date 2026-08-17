import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { HERO } from "@/lib/data";
import { ArrowRight } from "lucide-react";


// Lazy-load so three.js ships in its own async chunk
const NeuralNetwork = lazy(() => import("@/components/hero/NeuralNetwork"));

gsap.registerPlugin(ScrollTrigger);

/**
 * Split text into word groups, each word containing individual character spans.
 * This preserves natural word-wrapping while enabling per-character animation.
 *
 * When `gradient` is true the `.text-gradient` class is placed on every character
 * instead of the parent block.  This lets the per-character stagger reveal work
 * correctly — a parent-level background-clip:text would paint through still-hidden
 * characters and make the line appear solid immediately.
 */
function splitIntoWords(text: string, charClass: string, gradient = false) {
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
      {wi < text.split(" ").length - 1 && (
        <span className={`${charBaseClass} inline-block`}>&nbsp;</span>
      )}
    </span>
  ));
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const heading1Chars = container.querySelectorAll<HTMLElement>(".hero-char-1");
      const heading2Chars = container.querySelectorAll<HTMLElement>(".hero-char-2");

      gsap.set([".hero-greeting", ".hero-ctas"], {
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

      // Heading line 1
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

      // Heading line 2
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

      // CTAs
      tl.to(
        ".hero-ctas",
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.1"
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

        {/* 3D Neural Network — lazy-loaded */}
        <Suspense fallback={null}>
          <NeuralNetwork />
        </Suspense>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] rounded-full bg-accent/[0.06] blur-[100px] md:blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full bg-accent/[0.04] blur-[80px] md:blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl w-full">
          {/* Greeting */}
          <p className="hero-greeting text-muted-foreground text-sm sm:text-base md:text-xl font-medium tracking-[0.2em] uppercase mb-3 sm:mb-5 md:mb-6">
            {HERO.greeting}
          </p>

          {/* Heading — word-grouped char stagger */}
          <h1 className="font-display font-extrabold leading-[1.1] tracking-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-foreground mb-1 md:mb-2 flex flex-wrap justify-center">
              {splitIntoWords(HERO.headingLine1, "hero-char-1")}
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-center">
              {splitIntoWords(HERO.headingLine2, "hero-char-2", true)}
            </span>
          </h1>

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
