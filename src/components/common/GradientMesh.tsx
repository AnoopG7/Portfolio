import { useEffect, useRef } from "react";

/**
 * Animated gradient mesh background.
 * Renders slowly morphing, drifting gradient blobs behind all content.
 */
export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Blob definitions — dark, muted tones that don't overwhelm
    const blobs = [
      { x: 0.2, y: 0.3, r: 350, color: "rgba(232, 168, 56, 0.03)", vx: 0.00008, vy: 0.00012, phase: 0 },
      { x: 0.7, y: 0.2, r: 400, color: "rgba(56, 100, 180, 0.025)", vx: -0.00006, vy: 0.0001, phase: 1.5 },
      { x: 0.5, y: 0.7, r: 300, color: "rgba(232, 168, 56, 0.02)", vx: 0.00007, vy: -0.00009, phase: 3 },
      { x: 0.8, y: 0.8, r: 280, color: "rgba(120, 60, 180, 0.02)", vx: -0.00005, vy: -0.00007, phase: 4.5 },
    ];

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const blob of blobs) {
        const t = time * 0.001;
        const cx = (blob.x + Math.sin(t * blob.vx * 1000 + blob.phase) * 0.1) * canvas.width;
        const cy = (blob.y + Math.cos(t * blob.vy * 1000 + blob.phase) * 0.1) * canvas.height;
        const r = blob.r + Math.sin(t * 0.3 + blob.phase) * 50;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
