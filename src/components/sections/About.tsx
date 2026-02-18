import { PERSONAL, STATS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/lib/animations";

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="about" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div data-reveal className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            01
          </Badge>
          <Separator className="flex-1 bg-border" />
        </div>
        <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16">
          About me
        </h2>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Headshot */}
          <div data-reveal className="md:col-span-2 flex justify-center md:justify-start">
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
            <div data-reveal className="space-y-4">
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {STATS.map((stat) => (
                <Card
                  key={stat.label}
                  data-reveal
                  className="group border-border bg-card/50 hover:border-accent/30 hover:bg-card transition-all duration-300 py-4"
                >
                  <CardContent className="p-0 px-5">
                    <p className="font-display text-2xl md:text-3xl font-bold text-accent group-hover:text-accent/90 transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.15em] font-medium">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
