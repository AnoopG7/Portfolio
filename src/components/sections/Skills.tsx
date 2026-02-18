import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSectionPin } from "@/hooks/useSectionPin";

export default function Skills() {
  // 8 items: header, title, Languages, Frontend, Backend, Database, Tools, callout
  // shiftAfter=6 means we only start shifting for item 7 (Tools) and 8 (callout)
  const { containerRef, viewportRef } = useSectionPin({
    duration: 1,
    gap: 0.45,
    hold: 0.5,
    shiftPerItem: 100,
    shiftAfter: 6,
  });

  return (
    <div ref={containerRef} id="skills" style={{ height: "400vh" }}>
      <div ref={viewportRef} className="h-screen w-full overflow-hidden">
        <div data-pin-content className="max-w-6xl mx-auto px-6 md:px-10 w-full pt-32">
          {/* Section header */}
          <div data-pin-item className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
              02
            </Badge>
            <Separator className="flex-1 bg-border" />
          </div>
          <h2 data-pin-item className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12">
            Tech Stack
          </h2>

          <div className="space-y-8">
            {SKILLS.map((category) => (
              <div key={category.category} data-pin-item>
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="font-display text-sm font-semibold text-accent uppercase tracking-[0.15em] shrink-0">
                    {category.category}
                  </h3>
                  <Separator className="flex-1 bg-border/50" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className="px-4 py-2 text-sm font-medium bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 cursor-default rounded-lg"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Exploring callout */}
          <div data-pin-item>
            <Card className="mt-10 border-accent/20 bg-accent/[0.04] py-0">
              <CardContent className="py-5 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.04] rounded-full blur-3xl" />
                <p className="text-base relative z-10">
                  <span className="text-accent font-semibold font-display">Currently exploring</span>
                  <span className="mx-2.5 text-border">—</span>
                  <span className="text-muted-foreground">Artificial Intelligence, Machine Learning & Data Science</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
