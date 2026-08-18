import { useEffect, useRef, useCallback } from "react";

/**
 * Magnetic cursor trail — instead of a generic radial glow, this draws
 * a constellation of small dots that trail behind the cursor and connect
 * to each other with fading lines, like a mini neural-network being
 * drawn in real time.
 */

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
}

const MAX_POINTS = 18;
const POINT_LIFETIME = 1.2; // seconds
const CONNECT_DISTANCE = 120;

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -500, y: -500 });
  const prevMouse = useRef({ x: -500, y: -500 });
  const points = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number>(0);
  const lastSpawn = useRef(0);
  const paused = useRef(false);
  const drawRef = useRef<(ts: number) => void>(() => {});

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dt = 1 / 60; // approximate
    const { x, y } = mouse.current;

    // When paused (hovering over a card), let existing points fade out then stop
    if (paused.current) {
      points.current = points.current.filter((p) => {
        p.age += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        return p.age < POINT_LIFETIME;
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.current.length === 0) {
        rafRef.current = requestAnimationFrame(drawRef.current);
        return;
      }
    }

    // Spawn new trail points as mouse moves (skip when paused)
    if (!paused.current) {
      const dx = x - prevMouse.current.x;
      const dy = y - prevMouse.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (
        x > 0 &&
        y > 0 &&
        speed > 3 &&
        timestamp - lastSpawn.current > 40
      ) {
        // Scatter slightly perpendicular to movement direction
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.8;
        const scatter = 8 + Math.random() * 15;

        points.current.push({
          x: x + Math.cos(angle) * scatter,
          y: y + Math.sin(angle) * scatter,
          age: 0,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
        });

        // Trim old points
        if (points.current.length > MAX_POINTS) {
          points.current.shift();
        }

        lastSpawn.current = timestamp;
      }

      prevMouse.current.x = x;
      prevMouse.current.y = y;
    }

    // Update points
    points.current = points.current.filter((p) => {
      p.age += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.96; // friction
      p.vy *= 0.96;
      return p.age < POINT_LIFETIME;
    });

    // Clear & draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = document.documentElement.classList.contains("dark");
    const pts = points.current;

    // Draw connecting lines between nearby points
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const ddx = pts[i].x - pts[j].x;
        const ddy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);

        if (dist < CONNECT_DISTANCE) {
          const alphaI = 1 - pts[i].age / POINT_LIFETIME;
          const alphaJ = 1 - pts[j].age / POINT_LIFETIME;
          const distFade = 1 - dist / CONNECT_DISTANCE;
          const alpha = Math.min(alphaI, alphaJ) * distFade * (isDark ? 0.3 : 0.2);

          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(217, 126, 22, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw trail dots
    for (const p of pts) {
      const alpha = (1 - p.age / POINT_LIFETIME);
      const radius = 2 + alpha * 2;

      // Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(217, 126, 22, ${alpha * (isDark ? 0.7 : 0.5)})`;
      ctx.fill();

      // Soft halo around each dot
      const haloGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5);
      haloGrad.addColorStop(0, `rgba(217, 126, 22, ${alpha * 0.12})`);
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius * 5, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();
    }

    // Also draw a subtle glow at the current cursor position
    if (x > 0 && y > 0) {
      const cursorGrad = ctx.createRadialGradient(x, y, 0, x, y, 60);
      cursorGrad.addColorStop(0, `rgba(217, 126, 22, ${isDark ? 0.1 : 0.07})`);
      cursorGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(x, y, 60, 0, Math.PI * 2);
      ctx.fillStyle = cursorGrad;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(drawRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on touch-only devices
    if (
      "ontouchstart" in window &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    // Keep drawRef in sync so the paused early-return can self-schedule
    drawRef.current = draw;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleLeave = () => {
      mouse.current.x = -500;
      mouse.current.y = -500;
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    // Pause cursor glow when hovering over [data-no-glow] elements
    const onEnter = () => { paused.current = true; };
    const onLeave = () => { paused.current = false; };
    const bindGlowElements = () => {
      document.querySelectorAll<HTMLElement>("[data-no-glow]").forEach((el) => {
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
      });
    };
    bindGlowElements();
    // Re-bind after lazy content loads
    const mo = new MutationObserver(bindGlowElements);
    mo.observe(document.body, { childList: true, subtree: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      mo.disconnect();
      document.querySelectorAll<HTMLElement>("[data-no-glow]").forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
      aria-hidden="true"
    />
  );
}
