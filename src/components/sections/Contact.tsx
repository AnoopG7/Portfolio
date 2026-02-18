import { PERSONAL } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useSectionPin } from "@/hooks/useSectionPin";

export default function Contact() {
  const { containerRef, viewportRef } = useSectionPin({
    duration: 1,
    gap: 0.5,
    hold: 0.6,
  });

  const contacts = [
    { href: `mailto:${PERSONAL.email}`, label: "Email", handle: PERSONAL.email, icon: <Mail className="size-5 text-accent" />, external: false },
    { href: `tel:${PERSONAL.phone}`, label: "Phone", handle: PERSONAL.phone, icon: <Phone className="size-5 text-accent" />, external: false },
    { href: PERSONAL.socials.github, label: "GitHub", handle: "@AnoopG7", icon: <SiGithub className="size-5 text-accent" />, external: true },
    { href: PERSONAL.socials.linkedin, label: "LinkedIn", handle: "@itsan00p", icon: <SiLinkedin className="size-5 text-accent" />, external: true },
    { href: PERSONAL.socials.twitter, label: "Twitter / X", handle: "@itsan00p", icon: <SiX className="size-4 text-accent" />, external: true },
    { href: PERSONAL.socials.instagram, label: "Instagram", handle: "@itsan00p", icon: <SiInstagram className="size-5 text-accent" />, external: true },
  ];

  return (
    <div ref={containerRef} id="contact" style={{ height: "300vh" }}>
      <div ref={viewportRef} className="h-screen w-full relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div data-pin-content className="max-w-5xl mx-auto px-6 md:px-10 text-center relative z-10 w-full pt-32">
          {/* Section header */}
          <div data-pin-item className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
              05
            </Badge>
            <Separator className="w-12 bg-border" />
          </div>

          <h2 data-pin-item className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Let's Connect
          </h2>
          <p data-pin-item className="text-muted-foreground text-lg mb-14 max-w-lg mx-auto leading-relaxed">
            Got a project idea, freelance opportunity, or just want to chat?
            I'd love to hear from you.
          </p>

          {/* All contact cards — uniform grid */}
          <div data-pin-item className="grid grid-cols-2 gap-3 w-full max-w-3xl mx-auto">
            {contacts.map(({ href, label, handle, icon, external }) => (
              <Card key={label} className="border-border bg-card/60 hover:border-accent/30 transition-all duration-300 py-0 group">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={label}
                  className="block"
                >
                  <CardContent className="flex items-center gap-4 py-5 px-5">
                    <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 ring-1 ring-accent/20">
                      {icon}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] mb-0.5">{label}</p>
                      <p className="text-foreground text-sm font-medium group-hover:text-accent transition-colors truncate">{handle}</p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
