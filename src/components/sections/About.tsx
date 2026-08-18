import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL, STATS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import CountUp from "@/components/reactbits/CountUp";

gsap.registerPlugin(ScrollTrigger);

function parseStat(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseFloat(match[1]), suffix: match[2] };
}

function StatCard({ value, label }: { value: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { number, suffix } = parseStat(value);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Card
      ref={cardRef}
      data-reveal
      className="group border-border bg-card/50 hover:border-accent/30 hover:bg-card transition-all duration-300 py-4"
    >
      <CardContent className="p-0 px-5">
        <p className="font-display text-2xl md:text-3xl font-bold text-accent group-hover:text-accent/90 transition-colors">
          <CountUp
            to={number}
            from={0}
            duration={2.5}
            startWhen={visible}
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
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            01
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <h2 data-reveal className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 sm:mb-12 md:mb-16">
          About me
        </h2>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div data-reveal className="md:col-span-2 flex flex-col items-center md:items-start gap-4">
            <div data-no-glow className="w-48 h-56 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-xl overflow-hidden group hover:ring-accent/30 hover:ring-2 transition-all duration-500">
              <img
                src="/Pfp.jpeg"
                alt="Anoop Gupta"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col md:flex-row flex-wrap gap-2 w-full md:w-auto">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-border hover:border-accent/40 hover:text-accent w-full md:w-auto h-11 text-sm md:h-9 md:text-[13px]"
              >
                <a href="/Anoop_Gupta_Resume.pdf" download>
                  <Download className="mr-1.5 size-4 md:size-3.5" />
                  Download Resume
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-border hover:border-accent/40 hover:text-accent w-full md:w-auto h-11 text-sm md:h-9 md:text-[13px]"
              >
                <a
                  href="https://docs.google.com/document/d/1di2IGkJID1psMzqXX5-PzDiuE_yoht4M/edit#heading=h.faq9awsjk3sr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-1.5 size-4 md:size-3.5" />
                  View Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-8">
            <div data-reveal className="space-y-4">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                {PERSONAL.bio}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base text-muted-foreground">
                <span>B.Tech CSE (AI & ML) from</span>
                <span className="text-foreground font-medium">{PERSONAL.education.university}</span>
                <span>|</span>
                <span>Graduating {PERSONAL.education.graduation}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {STATS.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
