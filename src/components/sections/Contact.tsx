import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
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

  const contacts = [
    { href: `mailto:${PERSONAL.email}`, label: "Email", handle: PERSONAL.email, icon: <Mail className="size-5 text-accent" />, external: false },
    { href: `tel:${PERSONAL.phone}`, label: "Phone", handle: PERSONAL.phone, icon: <Phone className="size-5 text-accent" />, external: false },
    { href: PERSONAL.socials.github, label: "GitHub", handle: "@AnoopG7", icon: <SiGithub className="size-5 text-accent" />, external: true },
    { href: PERSONAL.socials.linkedin, label: "LinkedIn", handle: "@itsan00p", icon: <SiLinkedin className="size-5 text-accent" />, external: true },
    { href: PERSONAL.socials.twitter, label: "Twitter / X", handle: "@itsan00p", icon: <SiX className="size-4 text-accent" />, external: true },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-accent/[0.07] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center relative z-10 w-full">
        <div data-reveal className="flex items-center justify-center gap-4 mb-4">
          <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1">
            06
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl mx-auto">
          {contacts.map(({ href, label, handle, icon, external }) => (
            <div key={label} data-reveal>
              <Card className="border-border bg-card/60 hover:border-accent/30 transition-all duration-300 py-0 group">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
