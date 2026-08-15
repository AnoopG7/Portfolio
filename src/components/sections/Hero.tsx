import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PERSONAL, HERO, FOCUS_AREAS, HERO_METRICS } from "@/lib/data";
import { ArrowRight, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import TextType from "@/components/reactbits/TextType";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // ── Intro loads immediately on mount ──
      gsap.set([".hero-line-1", ".hero-line-2", ".hero-line-3", ".hero-sub"], { opacity: 0, y: 60 });

      gsap.timeline({ delay: 0.2 })
        .to(".hero-line-1", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(".hero-line-2", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.3")
        .to(".hero-line-3", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.3")
        .to(".hero-sub",    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.2");

      // ── Bento grid reveals as it scrolls into view ──
      gsap.set(".bento-cell", { opacity: 0, y: 50, scale: 0.95 });

      gsap.to(".bento-cell", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 80%",
          once: true,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} id="hero" className="relative">
      {/* ── Intro — full viewport ── */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl pointer-events-none">
          <p className="hero-line-1 text-muted-foreground text-xl md:text-2xl font-medium tracking-[0.2em] uppercase mb-8">
            {HERO.greeting}
          </p>
          <h1 className="font-display font-extrabold leading-[1.05] tracking-tight">
            <span className="hero-line-2 block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground mb-2">
              {HERO.headingLine1}
            </span>
            <span className="hero-line-3 block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-gradient">
              {HERO.headingLine2}
            </span>
          </h1>
          <div className="hero-sub mt-8 max-w-2xl mx-auto">
            <TextType
              text={[...HERO.subtitlePhrases]}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed"
              typingSpeed={40}
              deletingSpeed={25}
              pauseDuration={3000}
              loop
              showCursor
              cursorCharacter="|"
              cursorClassName="text-accent"
              startOnVisible
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono">
            Scroll to explore
          </span>
          <span className="w-px h-10 bg-gradient-to-b from-muted-foreground/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Bento grid ── */}
      <section className="relative max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="bento-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Cell 1 — Status + CTAs (span 2) */}
          <Card className="bento-cell col-span-2 border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 overflow-hidden relative py-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.07] rounded-full blur-3xl" />
            <CardContent className="flex flex-col justify-center h-full p-6 md:p-8 relative z-10">
              <Badge variant="outline" className="w-fit mb-4 px-3 py-1 text-xs bg-card/60 border-border text-muted-foreground">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                {HERO.status}
              </Badge>
              <p className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">
                {HERO.ctaHeading}
              </p>
              <p className="text-muted-foreground text-sm mb-5">
                {HERO.ctaSubtitle}
              </p>
              <div className="flex gap-3">
                <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-[0_0_20px_rgba(217,126,22,0.25)]">
                  <a href="#projects" onClick={(e) => handleAnchorClick(e, "#projects")}>View Projects <ArrowRight className="ml-1 size-3.5" /></a>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-border hover:border-accent/40 hover:text-accent">
                  <a href="#contact" onClick={(e) => handleAnchorClick(e, "#contact")}>Contact Me</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cell 2 — Zen of Python */}
          <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 overflow-hidden py-0">
            <CardContent className="flex flex-col h-full p-4 md:p-5">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-[10px] text-muted-foreground/60 ml-2 font-mono">import this</span>
              </div>
              <pre className="text-[11px] md:text-xs font-mono text-muted-foreground leading-relaxed flex-1 overflow-hidden">
                <code>
                  <span className="text-green-700 dark:text-green-500"># import this</span>
                  {"\n\n"}
                  {"Beautiful is better than ugly.\n"}
                  {"Explicit is better than implicit.\n"}
                  {"Simple is better than complex.\n"}
                  {"Readability counts."}
                </code>
              </pre>
            </CardContent>
          </Card>

          {/* Cell 3 — What I build */}
          <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 py-0">
            <CardContent className="flex flex-col items-center justify-center h-full p-4 gap-2">
              <Sparkles className="size-4 text-accent" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-semibold">What I Build</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cell 4 — Impact */}
          <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 py-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.07] rounded-full blur-3xl" />
            <CardContent className="flex flex-col h-full p-4 md:p-5 relative z-10">
              <div className="flex items-center gap-1.5 mb-3">
                <TrendingUp className="size-4 text-accent" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-semibold">Impact</p>
              </div>
              <div className="space-y-2 flex-1">
                {HERO_METRICS.map((point) => (
                  <div
                    key={point.strong}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background/50 px-3 py-2.5 group/row hover:border-accent/30 hover:bg-accent/[0.04] transition-colors duration-300"
                  >
                    <p className="text-[13px] leading-snug text-muted-foreground">
                      {point.pre}{" "}
                      <span className="text-accent font-semibold font-display">{point.strong}</span>
                      {point.post && <span className="text-muted-foreground"> {point.post}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cell 5 — Education */}
          <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 py-0">
            <CardContent className="flex flex-col items-center justify-center h-full p-4 text-center">
              <GraduationCap className="size-5 text-accent mb-2" />
              <p className="font-display text-sm font-bold text-foreground leading-snug">{PERSONAL.education.degree}</p>
              <p className="text-muted-foreground text-[10px] mt-1.5 uppercase tracking-[0.1em] font-medium">{PERSONAL.education.university}</p>
              <p className="text-accent font-display font-bold text-2xl mt-2">{PERSONAL.education.cgpa}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] mt-0.5">CGPA • {PERSONAL.education.graduation}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
