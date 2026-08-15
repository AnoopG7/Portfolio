import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { PROJECTS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sectionRef = useRef<HTMLElement>(null);

  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>("[data-reveal]");

      gsap.set(items, { opacity: 0, y: 40, filter: "blur(3px)" });

      items.forEach((item, i) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, section);

    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl font-bold mb-4">
          Project not found
        </h1>
        <Button asChild variant="outline">
          <Link to="/">← Back to Home</Link>
        </Button>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        {/* Back link */}
        <div data-reveal className="mb-8 md:mb-12">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <Link to="/#projects">
              <ArrowLeft className="mr-1.5 size-4" />
              Back to projects
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div data-reveal className="mb-8 md:mb-12">
          <Badge
            variant="outline"
            className="font-mono text-[10px] text-accent border-accent/20 bg-accent/5 mb-4 px-2.5 py-0.5"
          >
            PROJECT
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            {project.subtitle}
          </p>
        </div>

        {/* Tech stack */}
        <div data-reveal className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-[10px] sm:text-xs font-mono font-medium uppercase tracking-wider bg-background border border-border text-muted-foreground rounded-md px-2.5 py-1"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Screenshots / Video placeholder */}
        <div data-reveal className="mb-10 md:mb-14">
          {project.videoUrl ? (
            <div className="rounded-xl overflow-hidden border border-border aspect-video">
              <video
                src={project.videoUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          ) : project.screenshots && project.screenshots.length > 0 ? (
            <div className="grid gap-3">
              {project.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border"
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-border bg-card/40 overflow-hidden">
              <CardContent className="flex items-center justify-center py-16 sm:py-24 md:py-32">
                <div className="text-center">
                  <div className="size-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Play className="size-7 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Screenshots & demo video coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Description */}
        <div data-reveal className="mb-10 md:mb-14">
          <h2 className="font-display text-xl sm:text-2xl font-bold mb-4">
            Overview
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technical highlights */}
        <div data-reveal className="mb-10 md:mb-14">
          <h2 className="font-display text-xl sm:text-2xl font-bold mb-6">
            Technical Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="text-muted-foreground text-sm sm:text-base flex items-start gap-3"
              >
                <span className="text-accent text-xs mt-1.5 shrink-0">▸</span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="mb-8 md:mb-10" />

        {/* Action buttons */}
        <div data-reveal className="flex flex-wrap gap-3">
          {project.live && project.live !== "#" ? (
            <Button
              asChild
              size="default"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-[0_0_20px_rgba(217,126,22,0.2)]"
            >
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <ExternalLink className="ml-1.5 size-4" />
              </a>
            </Button>
          ) : (
            <Button
              disabled
              size="default"
              className="bg-accent/40 text-accent-foreground/60 font-semibold cursor-not-allowed"
            >
              Private Project
            </Button>
          )}
          {project.demo && (
            <Button
              asChild
              variant="outline"
              size="default"
              className="border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
            >
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo Video
                <Play className="ml-1.5 size-4" />
              </a>
            </Button>
          )}
          {project.github && (
            <Button
              asChild
              variant="outline"
              size="default"
              className="border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
