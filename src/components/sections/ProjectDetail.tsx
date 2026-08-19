import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { PROJECTS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Play,
  Target,
  Lightbulb,
  Layers,
  Zap,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sectionRef = useRef<HTMLElement>(null);

  const project = PROJECTS.find((p) => p.slug === slug);

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
          delay: i * 0.08,
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

  const isFeatured = project.featured;

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
            <Link to="/#projects" state={{ scrollTo: "#projects" }}>
              <ArrowLeft className="mr-1.5 size-4" />
              Back to projects
            </Link>
          </Button>
        </div>

        {/* ─── Hero Header ─── */}
        <div data-reveal className="mb-8 md:mb-12">
          <Badge
            variant="outline"
            className="font-mono text-[10px] text-accent border-accent/20 bg-accent/5 mb-4 px-2.5 py-0.5"
          >
            {isFeatured ? "CASE STUDY" : "PROJECT"}
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl mb-1">
            {project.subtitle}
          </p>
          <p className="text-muted-foreground/80 text-sm sm:text-base leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </div>

        {/* Tech stack */}
        <div data-reveal className="flex flex-wrap gap-2 mb-6 md:mb-8">
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

        {/* Action buttons */}
        <div data-reveal className="flex flex-wrap gap-3 mb-8 md:mb-10">
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
              Private / Local Only
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
                <Github className="mr-1.5 size-4" />
                Source Code
              </a>
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
                <Play className="mr-1.5 size-4" />
                Demo Video
              </a>
            </Button>
          )}
        </div>

        {/* Screenshots / Video */}
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
              <CardContent className="flex items-center justify-center py-16 sm:py-20">
                <div className="text-center">
                  <div className="size-14 mx-auto mb-3 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Play className="size-6 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Screenshots & demo video coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="mb-10 md:mb-14" />

        {/* ─── The Problem ─── */}
        <div data-reveal className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
              <Target className="size-4.5 text-red-400" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold">
              The Problem
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* ─── The Solution ─── */}
        <div data-reveal className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-9 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
              <Lightbulb className="size-4.5 text-green-400" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold">
              The Solution
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            {project.solution}
          </p>
        </div>

        {/* ─── Architecture (featured only) ─── */}
        {isFeatured && project.architecture && project.architecture.length > 0 && (
          <div data-reveal className="mb-8 md:mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Layers className="size-3.5 text-blue-400" />
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold">
                Architecture
              </h2>
            </div>
            <div className="overflow-x-hidden">
              <div className="flex flex-col gap-0">
                {project.architecture.map((node, i) => {
                  const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
                    blue:   { bg: "bg-blue-500/8",   border: "border-blue-500/20",   text: "text-blue-400",   dot: "bg-blue-400" },
                    green:  { bg: "bg-green-500/8",  border: "border-green-500/20",  text: "text-green-400",  dot: "bg-green-400" },
                    purple: { bg: "bg-purple-500/8", border: "border-purple-500/20", text: "text-purple-400", dot: "bg-purple-400" },
                    amber:  { bg: "bg-amber-500/8",  border: "border-amber-500/20",  text: "text-amber-400",  dot: "bg-amber-400" },
                    red:    { bg: "bg-red-500/8",    border: "border-red-500/20",    text: "text-red-400",    dot: "bg-red-400" },
                    cyan:   { bg: "bg-cyan-500/8",   border: "border-cyan-500/20",   text: "text-cyan-400",   dot: "bg-cyan-400" },
                  };
                  const c = colorMap[node.color] || colorMap.blue;
                  return (
                    <div key={i} className="flex items-stretch gap-2.5 sm:gap-4">
                      <div className="flex flex-col items-center w-3 sm:w-4 shrink-0">
                        {i > 0 && <div className="w-px flex-1 bg-border" />}
                        <div className={`size-2.5 sm:size-3 rounded-full ${c.dot} shrink-0 ring-2 ring-background`} />
                        {i < project.architecture!.length - 1 && <div className="w-px flex-1 bg-border" />}
                      </div>
                      <div className={`flex-1 rounded-lg border ${c.border} ${c.bg} px-3 py-2 sm:px-4 sm:py-3 my-1 min-w-0`}>
                        <p className={`text-xs sm:text-sm font-semibold ${c.text} truncate`}>
                          {node.label}
                        </p>
                        {node.detail && (
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                            {node.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── Key Technical Decisions (featured only) ─── */}
        {isFeatured && project.keyDecisions && project.keyDecisions.length > 0 && (
          <div data-reveal className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <Zap className="size-4.5 text-purple-400" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold">
                Key Decisions
              </h2>
            </div>
            <div className="space-y-4">
              {project.keyDecisions.map((decision, i) => {
                const [title, ...rest] = decision.split(" - ");
                const body = rest.join(" - ");
                return (
                  <div key={i} className="group">
                    <p className="text-sm sm:text-base md:text-lg">
                      <span className="text-foreground font-medium">
                        {title}
                      </span>
                      {body && (
                        <span className="text-muted-foreground">
                          {" - "}
                          {body}
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Separator className="mb-10 md:mb-14" />

        {/* ─── Features ─── */}
        <div data-reveal className="mb-8 md:mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="size-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-3.5 text-accent" />
            </div>
            <h2 className="font-display text-lg sm:text-xl font-bold">
              Features
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {project.features.map((feature, i) => {
              const [title, ...rest] = feature.split(" - ");
              const body = rest.join(" - ");
              return (
                <div key={i} className="rounded-lg border border-border bg-card/40 px-3 py-2.5">
                  <p className="text-xs sm:text-sm">
                    <span className="text-foreground font-medium">
                      {title}
                    </span>
                    {body && (
                      <span className="text-muted-foreground block mt-0.5 text-[10px] sm:text-[11px] leading-relaxed">
                        {body}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Impact & Results ─── */}
        {project.impact && project.impact.length > 0 && (
          <div data-reveal className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <TrendingUp className="size-4.5 text-amber-400" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold">
                Impact & Results
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.impact.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-accent/5 border border-accent/10"
                >
                  <span className="text-accent text-sm mt-0.5 shrink-0">▸</span>
                  <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Learnings (featured only) ─── */}
        {isFeatured && project.learnings && project.learnings.length > 0 && (
          <>
            <Separator className="mb-10 md:mb-14" />
            <div data-reveal className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="size-4.5 text-cyan-400" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold">
                  What I Learned
                </h2>
              </div>
              <div className="space-y-4">
                {project.learnings.map((learning, i) => {
                  const [title, ...rest] = learning.split(" - ");
                  const body = rest.join(" - ");
                  return (
                    <div key={i}>
                      <p className="text-sm sm:text-base md:text-lg">
                        <span className="text-foreground font-medium">
                          {title}
                        </span>
                        {body && (
                          <span className="text-muted-foreground">
                            {" - "}
                            {body}
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <Separator className="mb-8 md:mb-10" />

        {/* Bottom CTAs */}
        <div data-reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {project.live && project.live !== "#" && (
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
                  <Github className="mr-1.5 size-4" />
                  Source Code
                </a>
              </Button>
            )}
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/#projects" state={{ scrollTo: "#projects" }}>
              <ArrowLeft className="mr-1.5 size-4" />
              All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
