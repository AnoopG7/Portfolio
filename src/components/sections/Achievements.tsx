import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACHIEVEMENTS, type Achievement } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy, Cloud, BrainCircuit } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  "Academic Excellence Award": Trophy,
  "AWS Certificate": Cloud,
  "Machine Learning Specialization": BrainCircuit,
};

export default function Achievements() {
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
    <section ref={sectionRef} id="achievements" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            03
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12">
          Achievements
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = ACHIEVEMENT_ICONS[achievement.title];

  return (
    <div data-reveal className="h-full">
      <Card className="h-full group border-border bg-card/60 hover:border-accent/30 hover:bg-card transition-all duration-500">
        <CardContent className="flex flex-col items-center justify-center h-full p-6 md:p-8 text-center gap-3">
          <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center ring-1 ring-accent/20 group-hover:bg-accent/15 group-hover:ring-accent/30 transition-colors duration-300">
            {Icon && <Icon className="size-6 text-accent" />}
          </div>
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-snug">
            {achievement.title}
          </h3>
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-mono">
            {achievement.tag}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
