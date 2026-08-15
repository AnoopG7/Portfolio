import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS, CURRENTLY_EXPLORING } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { IconType } from "react-icons";
import {
  SiTypescript, SiJavascript, SiPython, SiCplusplus,
  SiReact, SiNextdotjs, SiTailwindcss, SiShadcnui,
  SiMui, SiHtml5, SiCss, SiZod,
  SiNodedotjs, SiExpress, SiSocketdotio, SiReactquery, SiFastapi,
  SiMongodb, SiMysql, SiFirebase, SiSupabase, SiPostgresql,
  SiGit, SiGithub, SiFigma, SiVercel, SiRender, SiN8N, SiDocker,
  SiNumpy, SiPandas, SiScikitlearn, SiTensorflow, SiPytorch,
  SiHuggingface, SiLangchain, SiJupyter,
} from "react-icons/si";
import { TbApi, TbBrandSocketIo } from "react-icons/tb";
import { BiLogoJava } from "react-icons/bi";
import { VscCode } from "react-icons/vsc";
import { TbAtom, TbChartScatter } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

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
  CSS3:             SiCss,
  Zod:              SiZod,
  "React Hook Form":SiReact,
  "Node.js":        SiNodedotjs,
  "Express.js":     SiExpress,
  FastAPI:          SiFastapi,
  "REST APIs":      TbApi,
  WebSockets:       TbBrandSocketIo,
  "Socket.io":      SiSocketdotio,
  Zustand:          TbAtom,
  "React Query":    SiReactquery,
  MongoDB:          SiMongodb,
  MySQL:            SiMysql,
  PostgreSQL:       SiPostgresql,
  Firebase:         SiFirebase,
  Supabase:         SiSupabase,
  Git:              SiGit,
  GitHub:           SiGithub,
  Docker:           SiDocker,
  "VS Code":        VscCode,
  Figma:            SiFigma,
  Vercel:           SiVercel,
  Render:           SiRender,
  n8n:              SiN8N,
  NumPy:            SiNumpy,
  Pandas:           SiPandas,
  Matplotlib:       TbChartScatter,
  "Scikit-learn":   SiScikitlearn,
  TensorFlow:       SiTensorflow,
  PyTorch:          SiPytorch,
  "Hugging Face":   SiHuggingface,
  LangChain:        SiLangchain,
  Jupyter:          SiJupyter,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [badgesReady, setBadgesReady] = useState(false);

  // Scroll-triggered reveal for all items
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>("[data-reveal]");

      gsap.set(items, { opacity: 0, y: 50, scale: 0.97, filter: "blur(3px)" });

      items.forEach((item) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Badge fall animation — trigger once via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || badgesReady) return;

    const categoriesBlock = section.querySelector<HTMLElement>("[data-categories]");
    if (!categoriesBlock) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBadgesReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(categoriesBlock);
    return () => observer.disconnect();
  }, [badgesReady]);

  // Run badge animation once badgesReady
  useEffect(() => {
    if (!badgesReady) return;

    const section = sectionRef.current;
    if (!section) return;

    const badges = section.querySelectorAll<HTMLElement>("[data-skill-badge]");
    if (!badges.length) return;

    gsap.set(badges, { opacity: 0 });

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
  }, [badgesReady]);

  return (
    <section ref={sectionRef} id="skills" className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            02
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <h2 data-reveal className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8">
          Tech Stack
        </h2>

        <div data-reveal data-categories className="space-y-5">
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
                      className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-colors duration-300 cursor-default rounded-lg flex items-center gap-1.5 sm:gap-2"
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

        <div data-reveal>
          <Card className="mt-8 border-accent/20 bg-accent/4 py-0">
            <CardContent className="py-5 px-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/4 rounded-full blur-3xl" />
              <p className="text-sm sm:text-base relative z-10">
                <span className="text-accent font-semibold font-display">Proficient in</span>
                <span className="text-muted-foreground"> {CURRENTLY_EXPLORING}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
