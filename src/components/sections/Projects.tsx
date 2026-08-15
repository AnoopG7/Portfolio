import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  project,
  index,
  isFeatured,
}: {
  project: Project;
  index: number;
  isFeatured: boolean;
}) {
  return (
    <Link to={`/project/${project.slug}`} className="block h-full group/link">
      <Card
        className={`group border-border bg-card/60 hover:border-accent/30 hover:bg-card transition-all duration-500 h-full flex flex-col ${
          isFeatured ? "ring-1 ring-accent/10" : ""
        }`}
      >
        <CardHeader>
          <div>
            <Badge
              variant="outline"
              className="font-mono text-[10px] text-accent border-accent/20 bg-accent/5 mb-3 px-2 py-0.5"
            >
              {isFeatured ? "FEATURED" : `PROJECT ${String(index + 1).padStart(2, "0")}`}
            </Badge>
            <CardTitle className="font-display text-lg sm:text-xl md:text-2xl font-bold group-hover:text-accent transition-colors duration-300">
              {project.title}
            </CardTitle>
            <CardDescription className="mt-1 text-xs sm:text-sm">
              {project.subtitle}
            </CardDescription>
          </div>
          <CardAction>
            {project.live && project.live !== "#" ? (
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title}`}
                >
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            ) : null}
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-5 flex-1">
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-wider bg-background border border-border text-muted-foreground rounded-md px-1.5 sm:px-2 py-0.5"
              >
                {t}
              </Badge>
            ))}
          </div>

          <ul className="space-y-2 sm:space-y-2.5">
            {project.highlights.slice(0, isFeatured ? 4 : 3).map((h, i) => (
              <li
                key={i}
                className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2 sm:gap-3"
              >
                <span className="text-accent text-[10px] sm:text-xs mt-1 sm:mt-1.5 shrink-0">
                  ▸
                </span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="border-t border-border pt-3 sm:pt-4 gap-2 sm:gap-3 flex-wrap">
          <span className="text-xs sm:text-sm text-accent font-medium group-hover/link:underline flex items-center gap-1">
            View Details <ArrowRight className="size-3.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>("[data-reveal]");

      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95, filter: "blur(4px)" });

      cards.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
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

  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div className="flex items-center gap-4 mb-4">
          <Badge
            variant="outline"
            className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1"
          >
            04
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4 mb-8 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xs">
            AI-powered and production-ready applications
          </p>
        </div>

        {/* Featured projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-12">
          {featured.map((project, i) => (
            <div key={project.slug} data-reveal className="h-full">
              <ProjectCard project={project} index={i} isFeatured />
            </div>
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground shrink-0">
                More Projects
              </h3>
              <Separator className="flex-1 bg-border/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {others.map((project, i) => (
                <div key={project.slug} data-reveal className="h-full">
                  <ProjectCard
                    project={project}
                    index={featured.length + i}
                    isFeatured={false}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
