import { lazy, Suspense } from "react";
import type { HeroPlacement, HeroVariant } from "@/components/hero/Hero3D";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Lazy so the preview cards share the same async three.js chunk as the hero.
const Hero3D = lazy(() => import("@/components/hero/Hero3D"));

const VARIANTS: { id: HeroVariant; name: string; desc: string }[] = [
  {
    id: "neural",
    name: "Neural Network",
    desc: "Layered nodes with data pulses flowing along the connections.",
  },
  {
    id: "graph",
    name: "Knowledge Graph",
    desc: "A query node retrieving from a cluster — edges light up like RAG.",
  },
  {
    id: "particles",
    name: "Particle Stream",
    desc: "Amber data energy flowing upward through the space.",
  },
];

const PLACEMENTS: { id: HeroPlacement; label: string }[] = [
  { id: "centerpiece", label: "Centerpiece (below heading)" },
  { id: "background", label: "Background (behind headline)" },
];

interface Hero3DPreviewProps {
  selected: HeroVariant;
  placement: HeroPlacement;
  onSelect: (variant: HeroVariant) => void;
  onPlacementChange: (placement: HeroPlacement) => void;
}

/**
 * Dev-only preview harness — lets you compare all three 3D variants
 * on the page and promote one into the hero. Removed once a choice is made.
 */
export default function Hero3DPreview({
  selected,
  placement,
  onSelect,
  onPlacementChange,
}: Hero3DPreviewProps) {
  if (!import.meta.env.DEV) return null;

  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div className="flex items-center gap-4 mb-4">
          <Badge
            variant="outline"
            className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1"
          >
            DEV PREVIEW
          </Badge>
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-[0.15em]">
            pick a 3D hero element
          </span>
        </div>

        {/* Placement toggle */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {PLACEMENTS.map((p) => (
            <button
              key={p.id}
              onClick={() => onPlacementChange(p.id)}
              className={cn(
                "px-4 py-2 rounded-full border text-xs font-medium transition-colors",
                placement === p.id
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:border-accent/30 hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {VARIANTS.map((v) => {
            const isSelected = selected === v.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelect(v.id)}
                className={cn(
                  "text-left rounded-2xl transition-all duration-300",
                  isSelected
                    ? "ring-2 ring-accent/60 shadow-[0_0_30px_rgba(217,126,22,0.15)]"
                    : "hover:ring-1 hover:ring-accent/30",
                )}
              >
                <Card className="h-full border-border bg-card/60 hover:border-accent/30 transition-colors duration-300 overflow-hidden">
                  <div className="relative h-48 bg-secondary/40">
                    <Suspense fallback={null}>
                      <Hero3D variant={v.id} placement="centerpiece" heightClass="h-48" />
                    </Suspense>
                  </div>
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                        {v.name}
                      </h3>
                      <span
                        className={cn(
                          "text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full transition-colors",
                          isSelected
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          The selected variant renders live in the hero above. Toggle dark mode
          (navbar button) to preview both themes. This panel disappears once you
          pick a winner.
        </p>
      </div>
    </section>
  );
}
