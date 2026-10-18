"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Progressive-enhancement fade/rise for every [data-reveal] element inside
 * root. Content is opacity:1 by default in CSS, so a slow join or a script
 * error never leaves anything hidden — this only ever adds motion on top.
 */
export function useReveal(
  rootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean
) {
  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el) => el.classList.add("n-pre"));
    const show = (el: HTMLElement) => {
      el.classList.remove("n-pre");
      el.classList.add("n-in");
    };

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show(entry.target as HTMLElement);
              io!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      els.forEach((el) => io!.observe(el));
    } catch {
      els.forEach(show);
    }

    const safety = setTimeout(() => els.forEach(show), 1500);

    return () => {
      clearTimeout(safety);
      io?.disconnect();
    };
  }, [rootRef, reducedMotion]);
}
