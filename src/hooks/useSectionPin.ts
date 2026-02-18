import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionPinOptions {
  /** CSS selector for elements to reveal (default: "[data-pin-item]") */
  selector?: string;
  /** Starting Y offset (default: 40) */
  y?: number;
  /** Starting scale (default: 0.97) */
  scale?: number;
  /** Duration per element in the scrub timeline (default: 1) */
  duration?: number;
  /** Gap between elements (default: 0.4) */
  gap?: number;
  /** Hold at end before unpin (default: 0.5) */
  hold?: number;
  /**
   * How many px to shift the content wrapper up per item,
   * AFTER `shiftAfter` items have been revealed.
   * This prevents content from overflowing the viewport.
   */
  shiftPerItem?: number;
  /** Start shifting after this many items (default: 4) */
  shiftAfter?: number;
}

/**
 * Scroll-pins a section viewport and reveals [data-pin-item] children
 * one-by-one via a scrub timeline.
 *
 * If content exceeds the viewport, use `shiftPerItem` + `shiftAfter` to
 * automatically scroll the [data-pin-content] wrapper upward as later
 * items are revealed.
 */
export function useSectionPin<
  C extends HTMLElement = HTMLDivElement,
  V extends HTMLElement = HTMLDivElement,
>(options: SectionPinOptions = {}) {
  const containerRef = useRef<C>(null);
  const viewportRef = useRef<V>(null);

  const {
    selector = "[data-pin-item]",
    y = 40,
    scale = 0.97,
    duration = 1,
    gap = 0.4,
    hold = 0.5,
    shiftPerItem = 0,
    shiftAfter = 4,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const items = viewport.querySelectorAll<HTMLElement>(selector);
    if (items.length === 0) return;

    const wrapper = viewport.querySelector<HTMLElement>("[data-pin-content]");

    const ctx = gsap.context(() => {
      // Hide all items initially
      gsap.set(items, {
        opacity: 0,
        y,
        scale,
        filter: "blur(6px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: viewport,
          scrub: 1,
        },
      });

      let cumulativeShift = 0;

      items.forEach((item, i) => {
        // If this item is past the shiftAfter threshold, shift wrapper up
        if (wrapper && shiftPerItem > 0 && i >= shiftAfter) {
          cumulativeShift += shiftPerItem;
          tl.to(
            wrapper,
            {
              y: -cumulativeShift,
              duration: duration * 0.6,
              ease: "power2.inOut",
            },
            i === 0 ? 0 : `>+=${gap * 0.3}`,
          );
        }

        // Reveal the item
        tl.to(
          item,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration,
            ease: "power3.out",
          },
          shiftPerItem > 0 && i >= shiftAfter ? "<" : i === 0 ? 0 : `>+=${gap}`,
        );
      });

      // Hold at end
      tl.to({}, { duration: hold });
    }, container);

    return () => ctx.revert();
  }, [selector, y, scale, duration, gap, hold, shiftPerItem, shiftAfter]);

  return { containerRef, viewportRef };
}
