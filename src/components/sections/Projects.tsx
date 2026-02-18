import { PROJECTS, type Project } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Card data-reveal className="group border-border bg-card/60 hover:border-accent/30 hover:bg-card transition-all duration-500">
      <CardHeader>
        <div>
          <Badge variant="outline" className="font-mono text-[10px] text-accent border-accent/20 bg-accent/5 mb-3 px-2 py-0.5">
            PROJECT {String(index + 1).padStart(2, "0")}
          </Badge>
          <CardTitle className="font-display text-xl md:text-2xl font-bold group-hover:text-accent transition-colors duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="mt-1">{project.subtitle}</CardDescription>
        </div>
        <CardAction>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="rounded-full border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10"
          >
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}>
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-[10px] font-mono font-medium uppercase tracking-wider bg-background border border-border text-muted-foreground rounded-md px-2 py-0.5"
            >
              {t}
            </Badge>
          ))}
        </div>

        <ul className="space-y-2.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-muted-foreground text-sm flex items-start gap-3">
              <span className="text-accent text-xs mt-1.5 shrink-0">▸</span>
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="border-t border-border pt-4 gap-3">
        <Button
          asChild
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-[0_0_15px_rgba(232,168,56,0.1)] hover:shadow-[0_0_25px_rgba(232,168,56,0.2)] transition-all duration-300"
        >
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Live Demo
            <ExternalLink className="ml-1 size-3.5" />
          </a>
        </Button>
        {project.github && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function Projects() {
  const sectionRef = useScrollReveal<HTMLElement>({ stagger: 0.15 });

  return (
    <section ref={sectionRef} id="projects" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            03
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Production-ready applications built with modern technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
