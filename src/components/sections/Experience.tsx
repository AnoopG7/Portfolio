import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        {/* Section header */}
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge
            variant="outline"
            className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1"
          >
            02
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>

        <h2
          data-reveal
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-10 sm:mb-14"
        >
          Experience
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8 sm:space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                data-reveal
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 sm:left-4.5 top-2 size-3 rounded-full bg-accent ring-4 ring-background" />

                <Card className="border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-300">
                  <CardContent className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-accent font-medium text-sm sm:text-base mt-0.5">
                          <Briefcase className="size-3.5 shrink-0" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Type badge */}
                    <Badge
                      variant="outline"
                      className="text-[10px] sm:text-xs border-accent/20 text-accent bg-accent/5 mb-3"
                    >
                      {exp.type}
                    </Badge>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {exp.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-accent mt-1 shrink-0">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[10px] sm:text-xs bg-muted/50 text-muted-foreground font-normal"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
