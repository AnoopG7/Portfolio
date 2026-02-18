import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useScrollReveal } from "@/lib/animations";

export default function Skills() {
  const sectionRef = useScrollReveal<HTMLElement>({ stagger: 0.06 });

  return (
    <section ref={sectionRef} id="skills" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            02
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16">
          Tech Stack
        </h2>

        <div className="space-y-10">
          {SKILLS.map((category) => (
            <div key={category.category} data-reveal>
              <div className="flex items-center gap-4 mb-4">
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
        <div data-reveal>
          <Card className="mt-14 border-accent/20 bg-accent/[0.04] py-0">
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
    </section>
  );
}
