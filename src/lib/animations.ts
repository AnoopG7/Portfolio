import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals children with a staggered fade-up animation when the element
 * enters the viewport. Attach `ref` to the container and add
 * `data-reveal` to each child you want animated.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    delay?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    stagger = 0.1,
    duration = 0.8,
    y = 40,
    delay = 0,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-reveal]");
    if (children.length === 0) return;

    gsap.set(children, { y, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [stagger, duration, y, delay, start]);

  return ref;
}

/**
 * Hero-specific cinematic entry animation.
 * Returns a ref to attach to the hero container.
 */
export function useHeroAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Badge
    const badge = el.querySelector("[data-hero-badge]");
    if (badge) {
      gsap.set(badge, { y: -20, opacity: 0, scale: 0.9 });
      tl.to(badge, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" });
    }

    // Intro text ("Hi, I'm Anoop")
    const intro = el.querySelector("[data-hero-intro]");
    if (intro) {
      gsap.set(intro, { y: 20, opacity: 0 });
      tl.to(intro, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2");
    }

    // Headline — each line
    const lines = el.querySelectorAll("[data-hero-line]");
    if (lines.length) {
      gsap.set(lines, { y: 60, opacity: 0, rotateX: 15 });
      tl.to(lines, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      }, "-=0.3");
    }

    // Subtitle
    const sub = el.querySelector("[data-hero-sub]");
    if (sub) {
      gsap.set(sub, { y: 20, opacity: 0 });
      tl.to(sub, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }

    // CTA buttons
    const ctas = el.querySelectorAll("[data-hero-cta]");
    if (ctas.length) {
      gsap.set(ctas, { y: 20, opacity: 0 });
      tl.to(ctas, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.2");
    }

    // Scroll indicator
    const scroll = el.querySelector("[data-hero-scroll]");
    if (scroll) {
      gsap.set(scroll, { opacity: 0 });
      tl.to(scroll, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.1");
    }

    return () => tl.kill();
  }, []);

  return ref;
}
