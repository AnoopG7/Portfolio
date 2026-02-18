import { useRef, useState, useEffect } from "react";
import { PERSONAL, STATS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSectionPin } from "@/hooks/useSectionPin";
import CountUp from "@/components/reactbits/CountUp";

/** Parse "4+", "9.5", "500+", "57+" into { number, suffix } */
function parseStat(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseFloat(match[1]), suffix: match[2] };
}

/** Watches computed opacity — returns true once element is visible (opacity > 0).
 *  Needed because useSectionPin starts items at opacity:0 via GSAP,
 *  which IntersectionObserver can't detect. */
function useOpacityVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) return;
    let raf: number;
    const check = () => {
      if (ref.current && parseFloat(getComputedStyle(ref.current).opacity) > 0) {
        setVisible(true);
        return;
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [ref, visible]);
  return visible;
}

/** Individual stat card with its own visibility-gated CountUp */
function StatCard({ value, label }: { value: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useOpacityVisible(cardRef);
  const { number, suffix } = parseStat(value);

  return (
    <Card
      ref={cardRef}
      data-pin-item
      className="group border-border bg-card/50 hover:border-accent/30 hover:bg-card transition-all duration-300 py-4"
    >
      <CardContent className="p-0 px-5">
        <p className="font-display text-2xl md:text-3xl font-bold text-accent group-hover:text-accent/90 transition-colors">
          <CountUp
            to={number}
            from={0}
            duration={2.5}
            startWhen={isVisible}
            className="tabular-nums"
          />
          {suffix}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.15em] font-medium">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}

export default function About() {
  const { containerRef, viewportRef } = useSectionPin({
    duration: 1.2,
    gap: 0.5,
    hold: 0.6,
  });

  return (
    <div ref={containerRef} id="about" style={{ height: "350vh" }}>
      <div ref={viewportRef} className="h-screen w-full overflow-hidden">
        <div data-pin-content className="max-w-6xl mx-auto px-6 md:px-10 w-full pt-32">
          {/* Section header */}
          <div data-pin-item className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
              01
            </Badge>
            <Separator className="flex-1 bg-border" />
          </div>
          <h2 data-pin-item className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16">
            About me
          </h2>

          <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Headshot */}
            <div data-pin-item className="md:col-span-2 flex justify-center md:justify-start">
              <Card className="w-64 h-72 md:w-72 md:h-80 border-border bg-card overflow-hidden group hover:border-accent/30 transition-colors duration-500">
                <CardContent className="flex items-center justify-center h-full p-0">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center ring-2 ring-accent/20">
                      <span className="font-display text-3xl font-bold text-accent">A</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Headshot</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bio + Stats */}
            <div className="md:col-span-3 space-y-8">
              <div data-pin-item className="space-y-4">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {PERSONAL.bio}
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Pursuing{" "}
                  <span className="text-foreground font-medium">{PERSONAL.education.degree}</span> at{" "}
                  <span className="text-foreground font-medium">{PERSONAL.education.university}</span>,
                  graduating in{" "}
                  <span className="text-accent font-semibold">{PERSONAL.education.graduation}</span>.
                </p>
              </div>

              {/* Stats — each card detects its own visibility for CountUp */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {STATS.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
