import { PERSONAL } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="contact" className="py-28 md:py-36 relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center relative z-10">
        {/* Section header */}
        <div data-reveal className="flex items-center justify-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            05
          </Badge>
          <Separator className="w-12 bg-border" />
        </div>

        <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Let's Connect
        </h2>
        <p data-reveal className="text-muted-foreground text-lg mb-14 max-w-lg mx-auto leading-relaxed">
          Got a project idea, freelance opportunity, or just want to chat?
          I'd love to hear from you.
        </p>

        {/* Contact Cards */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 mb-14">
          <Card data-reveal className="flex-1 border-border bg-card/60 hover:border-accent/30 transition-all duration-300 py-0 group">
            <a href={`mailto:${PERSONAL.email}`} className="block">
              <CardContent className="flex items-center gap-4 py-5 px-5">
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 ring-1 ring-accent/20">
                  <Mail className="size-5 text-accent" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] mb-0.5">Email</p>
                  <p className="text-foreground text-sm font-medium group-hover:text-accent transition-colors truncate">
                    {PERSONAL.email}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </CardContent>
            </a>
          </Card>

          <Card data-reveal className="flex-1 border-border bg-card/60 hover:border-accent/30 transition-all duration-300 py-0 group">
            <a href={`tel:${PERSONAL.phone}`} className="block">
              <CardContent className="flex items-center gap-4 py-5 px-5">
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 ring-1 ring-accent/20">
                  <Phone className="size-5 text-accent" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] mb-0.5">Phone</p>
                  <p className="text-foreground text-sm font-medium group-hover:text-accent transition-colors truncate">
                    {PERSONAL.phone}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </CardContent>
            </a>
          </Card>
        </div>

        {/* Social Icons */}
        <div data-reveal className="flex items-center justify-center gap-3">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="size-11 rounded-xl border-border text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10"
          >
            <a
              href={PERSONAL.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <SiGithub className="size-5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="size-11 rounded-xl border-border text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10"
          >
            <a
              href={PERSONAL.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
