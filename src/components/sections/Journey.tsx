import { JOURNEY } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useScrollReveal } from "@/lib/animations";

export default function Journey() {
  const sectionRef = useScrollReveal<HTMLElement>({ stagger: 0.12 });

  return (
    <section ref={sectionRef} id="journey" className="py-28 md:py-36">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            04
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-20">
          My Journey
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />

          <div className="space-y-14">
            {JOURNEY.map((milestone, i) => {
              const isLast = i === JOURNEY.length - 1;
              return (
                <div key={i} data-reveal className="relative pl-10 md:pl-14 group">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 md:left-1 top-1.5 size-[15px] rounded-full border-2 transition-all duration-300 ${
                      isLast
                        ? "border-accent bg-accent/20 shadow-[0_0_12px_rgba(232,168,56,0.4)]"
                        : "border-border bg-background group-hover:border-accent group-hover:bg-accent/10"
                    }`}
                  >
                    <div
                      className={`absolute inset-[3px] rounded-full transition-colors duration-300 ${
                        isLast
                          ? "bg-accent"
                          : "bg-border group-hover:bg-accent"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <Badge variant="outline" className="font-mono text-xs text-accent border-accent/20 bg-accent/5 mb-2 px-2.5 py-0.5">
                      {milestone.year}
                    </Badge>
                    <h3 className="font-display text-xl md:text-2xl font-bold mt-1.5 mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
