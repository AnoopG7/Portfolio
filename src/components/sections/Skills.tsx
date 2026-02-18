import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const badges = section.querySelectorAll<HTMLElement>("[data-skill-badge]");
    const header = section.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!badges.length) return;

    // ── Reveal section header normally ──
    gsap.set(header, { opacity: 0, y: 30 });

    const headerTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(header, {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.1, ease: "power3.out",
        });
      },
      once: true,
    });

    // ── Each badge falls from navbar height into its placeholder ──
    gsap.set(badges, { opacity: 0 });

    const badgeTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 65%",
      onEnter: () => {
        badges.forEach((badge, i) => {
          // Distance from navbar (64px) to the badge's natural position
          const rect = badge.getBoundingClientRect();
          const fallDistance = -(rect.top - 64);

          // Set them up at navbar height
          gsap.set(badge, {
            y: fallDistance,
            opacity: 1,
            rotation: gsap.utils.random(-8, 8),
          });

          // Fall into place — low gravity (slow, floaty)
          gsap.to(badge, {
            y: 0,
            rotation: 0,
            duration: gsap.utils.random(1.4, 2.2),
            delay: i * 0.055,
            ease: "power1.out",         // low gravity: decelerates smoothly at bottom
          });
        });
      },
      once: true,
    });

    return () => {
      headerTrigger.kill();
      badgeTrigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            02
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16">
          Tech Stack
        </h2>

        <div className="space-y-10">
          {SKILLS.map((category) => (
            <div key={category.category}>
              {/* Category label */}
              <div data-reveal className="flex items-center gap-4 mb-4">
                <h3 className="font-display text-sm font-semibold text-accent uppercase tracking-[0.15em] shrink-0">
                  {category.category}
                </h3>
                <Separator className="flex-1 bg-border/50" />
              </div>

              {/* Skill badges — each falls independently */}
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
        <div data-reveal>
          <Card className="mt-14 border-accent/20 bg-accent/[0.04] py-0">
            <CardContent className="py-5 px-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.04] rounded-full blur-3xl" />
              <p className="text-base relative z-10">
                <span className="text-accent font-semibold font-display">Currently exploring</span>
                <span className="mx-2.5 text-border">—</span>
                <span className="text-muted-foreground">Artificial Intelligence, Machine Learning &amp; Data Science</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
