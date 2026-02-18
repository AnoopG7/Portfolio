import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-2 py-1",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/20"
            : "bg-background/40 backdrop-blur-md border border-transparent"
        )}
      >
        <div className="flex items-center gap-1 px-3">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display font-bold text-lg tracking-tight text-foreground hover:text-accent transition-colors mr-4"
          >
            AG<span className="text-accent">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-white/5 text-xs font-medium tracking-wider uppercase rounded-full h-8"
              >
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </Button>
            ))}
            <Button
              asChild
              size="sm"
              className="ml-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs rounded-full h-8"
            >
              <a href="mailto:gupta.anoop2006@gmail.com">Let's Talk</a>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-60"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-5 h-[1.5px] bg-foreground transition-all duration-300",
                mobileOpen && "rotate-45 translate-y-[4px]"
              )}
            />
            <span
              className={cn(
                "w-5 h-[1.5px] bg-foreground transition-all duration-300",
                mobileOpen && "-rotate-45 -translate-y-[4px]"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 transition-all duration-500",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-display text-3xl font-bold text-foreground hover:text-accent transition-colors"
            style={{
              transitionDelay: mobileOpen ? `${i * 75}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s, transform 0.4s, color 0.2s",
            }}
          >
            {link.label}
          </a>
        ))}
        <Button
          asChild
          size="lg"
          className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full"
          style={{
            transitionDelay: mobileOpen ? `${NAV_LINKS.length * 75}ms` : "0ms",
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s, transform 0.4s, color 0.2s",
          }}
        >
          <a href="mailto:gupta.anoop2006@gmail.com">Let's Talk</a>
        </Button>
      </div>
    </>
  );
}
