import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Terminal-style stats card — shows key metrics in a
 * faux terminal window with GSAP line-by-line reveal.
 */

const STATS_LINES = [
  "→ 7 production apps shipped",
  "→ 60% API cost reduction achieved",
  "→ Sub-2s AI response latency",
  "→ 229+ tests written",
];

export default function TerminalStats() {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || hasAnimated.current) return;

    const lines = card.querySelectorAll<HTMLElement>("[data-stat-line]");
    const commandLine = card.querySelector<HTMLElement>("[data-command]");

    if (!lines.length) return;

    gsap.set(card, { opacity: 0, y: 30, scale: 0.97 });
    gsap.set(commandLine, { opacity: 0 });
    gsap.set(lines, { opacity: 0, x: -10 });

    // Delay to let heading animation complete first
    const tl = gsap.timeline({ delay: 1.2 });

    tl.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    tl.to(commandLine, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    tl.to(
      lines,
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.1"
    );

    hasAnimated.current = true;

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="mt-6 md:mt-8 flex justify-center">
      <Card
        ref={cardRef}
        className="w-full max-w-md border-border bg-card/80 backdrop-blur-sm overflow-hidden py-0"
      >
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-border/50">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-yellow-400/80" />
          <span className="size-2.5 rounded-full bg-green-400/80" />
          <span className="text-[10px] text-muted-foreground/60 ml-2 font-mono">
            terminal
          </span>
        </div>

        <CardContent className="px-4 py-3 font-mono text-xs sm:text-sm space-y-1">
          <p data-command className="text-foreground">
            <span className="text-accent">$</span> anoop --stats
          </p>
          {STATS_LINES.map((line, i) => (
            <p
              key={i}
              data-stat-line
              className="text-muted-foreground"
            >
              {line}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
