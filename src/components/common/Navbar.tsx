import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith("/project/");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

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
    const el = document.querySelector(href);
    if (!el) return;
    // Use Lenis scrollTo if available, otherwise fall back to native
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis as { scrollTo: (target: Element | string, opts?: { offset?: number; duration?: number }) => void } | undefined;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.5 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-3 py-1.5",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border border-border shadow-lg shadow-black/5"
            : "bg-background/40 backdrop-blur-md border border-transparent"
        )}
      >
        <div className="flex items-center gap-1.5 px-4">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const lenis = (window as any).__lenis as { scrollTo: (target: number, opts?: { duration?: number }) => void } | undefined;
              if (lenis) {
                lenis.scrollTo(0, { duration: 1.5 });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="font-display font-bold text-xl tracking-tight text-foreground hover:text-accent transition-colors mr-5"
          >
            AG<span className="text-accent">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.filter((link) => link.href !== "#contact").map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 text-[13px] font-medium tracking-wider uppercase rounded-full h-9 px-4"
              >
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </Button>
            ))}
            <Button
              asChild
              size="sm"
              className="ml-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-[13px] rounded-full h-9 px-5"
            >
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                Contact
              </a>
            </Button>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              aria-label="Toggle theme"
              className="ml-1 rounded-full h-9 w-9 border-border text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[60]"
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
        <div className="flex items-center gap-4">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="lg"
            className="rounded-full border-border text-foreground"
            aria-label="Toggle theme"
            style={{
              transitionDelay: mobileOpen ? `${NAV_LINKS.length * 75}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s, transform 0.4s, color 0.2s",
            }}
          >
            {isDark ? <Sun className="size-4 mr-2" /> : <Moon className="size-4 mr-2" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </div>
    </>
  );
}
