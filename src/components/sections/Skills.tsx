import { useEffect } from "react";
import gsap from "gsap";
import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSectionPin } from "@/hooks/useSectionPin";
import type { IconType } from "react-icons";
import {
  SiTypescript, SiJavascript, SiPython, SiCplusplus,
  SiReact, SiNextdotjs, SiTailwindcss, SiShadcnui,
  SiMui, SiHtml5, SiCss3, SiZod,
  SiNodedotjs, SiExpress, SiSocketdotio, SiReactquery,
  SiMongodb, SiMysql, SiFirebase, SiSupabase,
  SiGit, SiGithub, SiFigma, SiVercel, SiRender, SiN8N,
} from "react-icons/si";
import { TbApi, TbBrandSocketIo } from "react-icons/tb";
import { BiLogoJava } from "react-icons/bi";
import { VscCode } from "react-icons/vsc";
import { TbAtom } from "react-icons/tb";

// ── Icon map: skill name → react-icon ──
const SKILL_ICONS: Record<string, IconType> = {
  TypeScript:       SiTypescript,
  JavaScript:       SiJavascript,
  Python:           SiPython,
  "C++":            SiCplusplus,
  Java:             BiLogoJava,
  React:            SiReact,
  "Next.js":        SiNextdotjs,
  "Tailwind CSS":   SiTailwindcss,
  "Shadcn UI":      SiShadcnui,
  "Material UI":    SiMui,
  HTML5:            SiHtml5,
  CSS3:             SiCss3,
  Zod:              SiZod,
  "React Hook Form":SiReact,
  "Node.js":        SiNodedotjs,
  "Express.js":     SiExpress,
  "REST APIs":      TbApi,
  WebSockets:       TbBrandSocketIo,
  "Socket.io":      SiSocketdotio,
  Zustand:          TbAtom,
  "React Query":    SiReactquery,
  MongoDB:          SiMongodb,
  MySQL:            SiMysql,
  Firebase:         SiFirebase,
  Supabase:         SiSupabase,
  Git:              SiGit,
  GitHub:           SiGithub,
  "VS Code":        VscCode,
  Figma:            SiFigma,
  Vercel:           SiVercel,
  Render:           SiRender,
  n8n:              SiN8N,
};

export default function Skills() {
  const { containerRef, viewportRef } = useSectionPin({
    duration: 1.1,
    gap: 0.5,
    hold: 0.5,
  });

  // Fire badge fall when the categories block becomes visible (useSectionPin fades it in)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const categoriesBlock = container.querySelector<HTMLElement>("[data-categories]");
    const badges = container.querySelectorAll<HTMLElement>("[data-skill-badge]");
    if (!categoriesBlock || !badges.length) return;

    gsap.set(badges, { opacity: 0 });

    let triggered = false;
    const interval = setInterval(() => {
      if (triggered) return;
      if (parseFloat(getComputedStyle(categoriesBlock).opacity) > 0.1) {
        triggered = true;
        clearInterval(interval);

        badges.forEach((badge, i) => {
          const rect = badge.getBoundingClientRect();
          const fallDistance = -(rect.top - 64);

          gsap.set(badge, {
            y: fallDistance,
            opacity: 0,
            rotation: gsap.utils.random(-8, 8),
          });

          gsap.to(badge, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: gsap.utils.random(1.4, 2.2),
            delay: i * 0.04,
            ease: "power1.out",
          });
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [containerRef]);

  return (
    <div ref={containerRef} id="skills" style={{ height: "400vh" }}>
      <div ref={viewportRef} className="h-screen w-full overflow-hidden">
        <div data-pin-content className="max-w-6xl mx-auto px-6 md:px-10 w-full pt-20 overflow-y-auto max-h-screen [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
          {/* Section header */}
          <div data-pin-item className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
              02
            </Badge>
            <Separator className="flex-1 bg-border" />
          </div>
          <h2 data-pin-item className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
            Tech Stack
          </h2>

          {/* All categories revealed at once as a single pin item */}
          <div data-pin-item data-categories className="space-y-5">
            {SKILLS.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="font-display text-sm font-semibold text-accent uppercase tracking-[0.15em] shrink-0">
                    {category.category}
                  </h3>
                  <Separator className="flex-1 bg-border/50" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const Icon = SKILL_ICONS[skill.name];
                    return (
                      <Badge
                        key={skill.name}
                        data-skill-badge
                        variant="outline"
                        className="px-4 py-2 text-sm font-medium bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-colors duration-300 cursor-default rounded-lg flex items-center gap-2"
                      >
                        {Icon && <Icon className="size-3.5 shrink-0" />}
                        {skill.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Exploring callout */}
          <div data-pin-item>
            <Card className="mt-8 border-accent/20 bg-accent/4 py-0">
              <CardContent className="py-5 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/4 rounded-full blur-3xl" />
                <p className="text-base relative z-10">
                  <span className="text-accent font-semibold font-display">Currently exploring</span>
                  <span className="mx-2.5 text-border">—</span>
                  <span className="text-muted-foreground">Artificial Intelligence, Machine Learning &amp; Data Science</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
