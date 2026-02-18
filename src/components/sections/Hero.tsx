import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PERSONAL } from "@/lib/data";
import { ArrowRight, GraduationCap, Code2, Layers } from "lucide-react";
import {
  SiReact, SiNodedotjs, SiTypescript, SiMongodb,
  SiNextdotjs, SiTailwindcss, SiExpress, SiGit,
} from "react-icons/si";
import TextType from "@/components/reactbits/TextType";

gsap.registerPlugin(ScrollTrigger);

const TECH = [
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
  { icon: SiExpress, label: "Express", color: "#ffffff" },
  { icon: SiGit, label: "Git", color: "#F05032" },
];

const SUBTITLE_PHRASES = [
  "Crafting production-ready applications with the MERN stack",
  "Building scalable full-stack web experiences",
  "Turning ideas into deployed, working products",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !viewportRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-line-1", { opacity: 0, y: 60 });
      gsap.set(".hero-line-2", { opacity: 0, y: 80 });
      gsap.set(".hero-line-3", { opacity: 0, y: 80 });
      gsap.set(".hero-sub", { opacity: 0, y: 30 });
      gsap.set(".act-2", { visibility: "hidden" });
      gsap.set(".bento-cell", { opacity: 0, y: 50, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: viewportRef.current,
          scrub: 1.2,
        },
      });

      // ── ACT 1: Cinematic text reveal ──
      tl.to(".hero-line-1", { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        .to(".hero-line-2", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "+=0.3")
        .to(".hero-line-3", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "+=0.3")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.2")
        .to({}, { duration: 0.6 }) // breathe

        // ── TRANSITION ──
        .to(".act-1-content", { opacity: 0, y: -80, duration: 1.2, ease: "power2.in" })

        // ── ACT 2: Bento grid ──
        .set(".act-2", { visibility: "visible" })
        .to(".bento-cell", {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.15, duration: 1, ease: "power3.out",
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="hero" className="relative" style={{ height: "400vh" }}>
      {/* Pinned viewport */}
      <div ref={viewportRef} className="h-screen w-full relative overflow-hidden">
        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[120px] pointer-events-none" />

        {/* ── ACT 1 ── */}
        <div className="act-1 absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="act-1-content text-center px-6 max-w-5xl" style={{ perspective: "800px" }}>
            <p className="hero-line-1 text-muted-foreground text-xl md:text-2xl font-medium tracking-[0.2em] uppercase mb-8">
              Hi, I'm Anoop
            </p>
            <h1 className="font-display font-extrabold leading-[1.05] tracking-tight">
              <span className="hero-line-2 block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground mb-2">
                I design &amp; build
              </span>
              <span className="hero-line-3 block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-gradient">
                full-stack web apps
              </span>
            </h1>
            <div className="hero-sub mt-8 max-w-2xl mx-auto">
              <TextType
                text={SUBTITLE_PHRASES}
                className="text-muted-foreground text-lg md:text-xl leading-relaxed"
                typingSpeed={40}
                deletingSpeed={25}
                pauseDuration={3000}
                loop
                showCursor
                cursorCharacter="|"
                cursorClassName="text-accent"
                startOnVisible
              />
            </div>
          </div>
        </div>

        {/* ── ACT 2: Bento Grid ── */}
        <div className="act-2 invisible absolute inset-0 z-10 flex items-center justify-center px-6 py-20">
          <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 max-w-5xl w-full" style={{ height: "min(420px, 55vh)" }}>

            {/* Cell 1 — Status + CTAs (span 2) */}
            <Card className="bento-cell col-span-2 border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 overflow-hidden relative py-0">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.03] rounded-full blur-3xl" />
              <CardContent className="flex flex-col justify-center h-full p-6 md:p-8 relative z-10">
                <Badge variant="outline" className="w-fit mb-4 px-3 py-1 text-xs bg-card/60 border-border text-muted-foreground">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Open to freelance &amp; internships
                </Badge>
                <p className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">
                  Let's build something amazing
                </p>
                <p className="text-muted-foreground text-sm mb-5">
                  Full-stack developer specializing in MERN applications
                </p>
                <div className="flex gap-3 pointer-events-auto">
                  <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-[0_0_20px_rgba(232,168,56,0.15)]">
                    <a href="#projects">View Projects <ArrowRight className="ml-1 size-3.5" /></a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="border-border hover:border-accent/40 hover:text-accent">
                    <a href="#contact">Contact Me</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cell 2 — Code snippet */}
            <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 overflow-hidden py-0">
              <CardContent className="flex flex-col h-full p-4 md:p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-[10px] text-muted-foreground/60 ml-2 font-mono">server.ts</span>
                </div>
                <pre className="text-[11px] md:text-xs font-mono text-muted-foreground leading-relaxed flex-1 overflow-hidden">
                  <code>{`const app = express()

app.get('/api', async (req, res) => {
  const data = await db.find()
  res.json({ success: true, data })
})`}</code>
                </pre>
              </CardContent>
            </Card>

            {/* Cell 3 — Tech stack with colored icons */}
            <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 py-0">
              <CardContent className="flex flex-col items-center justify-center h-full p-4 gap-2">
                <Layers className="size-4 text-accent" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-semibold">Tech Stack</p>
                <div className="grid grid-cols-4 gap-2.5 mt-1">
                  {TECH.map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex flex-col items-center gap-1 group">
                      <Icon className="size-5 transition-colors duration-300" style={{ color }} />
                      <span className="text-[8px] text-muted-foreground/60 font-mono uppercase group-hover:text-muted-foreground transition-colors">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cell 4 — Project count */}
            <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 py-0">
              <CardContent className="flex flex-col items-center justify-center h-full p-4 text-center">
                <Code2 className="size-5 text-accent mb-2" />
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground">4+</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] mt-1">Production Apps</p>
              </CardContent>
            </Card>

            {/* Cell 5 — Education */}
            <Card className="bento-cell border-border bg-card/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500 py-0">
              <CardContent className="flex flex-col items-center justify-center h-full p-4 text-center">
                <GraduationCap className="size-5 text-accent mb-2" />
                <p className="font-display text-sm font-bold text-foreground">{PERSONAL.education.degree}</p>
                <p className="text-accent font-display font-bold text-2xl mt-1">{PERSONAL.education.cgpa}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] mt-0.5">CGPA • {PERSONAL.education.graduation}</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
