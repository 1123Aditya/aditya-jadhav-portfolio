"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHIP_LABELS, ROUTE_WAYPOINTS } from "@/data/ScrollerEffect";

let registered = false;
function ensureScrollTrigger() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

function sample(p: number) {
  const w = ROUTE_WAYPOINTS;
  let i = 0;
  while (i < w.length - 2 && p > w[i + 1][0]) i++;
  const a = w[i];
  const b = w[i + 1];
  let t = (p - a[0]) / (b[0] - a[0] || 1);
  t = Math.max(0, Math.min(1, t));
  const s = t * t * (3 - 2 * t);
  return { x: a[1] + (b[1] - a[1]) * s, y: a[2] + (b[2] - a[2]) * s, seg: i };
}

export type ScrollEffectRefs = {
  rootRef: RefObject<HTMLDivElement | null>;
  routeLayerRef: RefObject<HTMLDivElement | null>;
  routeSvgRef: RefObject<SVGSVGElement | null>;
  routePathRef: RefObject<SVGPathElement | null>;
  routeGhostRef: RefObject<SVGPathElement | null>;
  chipRef: RefObject<HTMLDivElement | null>;
  chipImgRef: RefObject<HTMLImageElement | null>;
  progressRef: RefObject<number>;
};

/**
 * Drives the whole-page scroll timeline: a token that travels the route from
 * hero to footer, scroll-scrubbed skill meters, and a subtle 3D tilt on
 * pointer-hover cards. One ScrollTrigger over the full document height feeds
 * `progressRef`, which the WebGL background field also reads.
 */
export function useScrollEffects(
  refs: ScrollEffectRefs,
  reducedMotion: boolean,
  showRoute: boolean,
) {
  useEffect(() => {
    const root = refs.rootRef.current;
    if (!root) return;
    ensureScrollTrigger();

    const triggers: ScrollTrigger[] = [];
    const cleanups: Array<() => void> = [];

    const layer = refs.routeLayerRef.current;
    const svg = refs.routeSvgRef.current;
    const path = refs.routePathRef.current;
    const ghost = refs.routeGhostRef.current;
    const chip = refs.chipRef.current;

    let routeW = innerWidth;
    let routeSpan = 1;
    let routeLen = 0;
    let lastSeg = -1;

    const buildRoute = () => {
      if (!layer || !svg || !path) return;
      layer.style.height = `${root.scrollHeight}px`;
      const W = layer.clientWidth || innerWidth;
      const H = layer.clientHeight || innerHeight;
      const vh = innerHeight;
      const span = Math.max(H - vh, 1);
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      let d = "";
      const N = 160;
      for (let i = 0; i <= N; i++) {
        const p = i / N;
        const s = sample(p);
        const x = s.x * W;
        const y = p * span + s.y * vh;
        d += (i ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      path.setAttribute("d", d);
      ghost?.setAttribute("d", d);
      routeW = W;
      routeSpan = span;
      routeLen = path.getTotalLength();
      path.style.strokeDasharray = String(routeLen);
      path.style.strokeDashoffset = String(
        routeLen * (1 - (refs.progressRef.current ?? 0)),
      );
    };

    let qx: gsap.QuickToFunc | null = null;
    let qy: gsap.QuickToFunc | null = null;
    if (chip) {
      qx = gsap.quickTo(chip, "x", { duration: 0.45, ease: "power2.out" });
      qy = gsap.quickTo(chip, "y", { duration: 0.45, ease: "power2.out" });
    }

    const place = (p: number, immediate = false) => {
      if (!chip) return;
      const s = sample(p);
      const x = s.x * routeW;
      const y = p * routeSpan + s.y * innerHeight;
      if (immediate) gsap.set(chip, { x, y });
      else {
        qx?.(x);
        qy?.(y);
      }
      if (path && routeLen)
        path.style.strokeDashoffset = String(routeLen * (1 - p));
      const img = refs.chipImgRef.current;
      if (img && lastSeg !== s.seg) {
        lastSeg = s.seg;
        img.src = CHIP_LABELS[s.seg % CHIP_LABELS.length];
        gsap.fromTo(
          img,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        );
      }
    };

    const refresh = () => {
      buildRoute();
      place(refs.progressRef.current ?? 0, true);
    };

    if (showRoute) {
      refresh();
      if (chip) gsap.to(chip, { opacity: 1, duration: 0.8, delay: 0.3 });
      ScrollTrigger.addEventListener("refresh", refresh);
      addEventListener("resize", refresh);
      cleanups.push(() => {
        ScrollTrigger.removeEventListener("refresh", refresh);
        removeEventListener("resize", refresh);
      });
    } else if (chip && svg) {
      // eslint-disable-next-line react-hooks/immutability -- imperative DOM mutation inside an effect
      chip.style.display = "none";
      svg.style.display = "none";
    }

    triggers.push(
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          (refs.progressRef as RefObject<number>).current = self.progress;
          if (showRoute) place(self.progress);
        },
      }),
    );

    // Scroll-scrubbed skill meters.
    root.querySelectorAll<HTMLElement>("[data-meter]").forEach((el) => {
      triggers.push(
        gsap.fromTo(
          el,
          { width: "0%" },
          {
            width: `${el.dataset.meter}%`,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "+=240",
              scrub: 0.4,
            },
          },
        ).scrollTrigger!,
      );
    });

    // Pointer-driven 3D tilt on cards.
    if (!reducedMotion && matchMedia("(pointer: fine)").matches) {
      root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", {
          duration: 0.5,
          ease: "power2.out",
        });
        const ry = gsap.quickTo(card, "rotationY", {
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.set(card, {
          transformPerspective: 1000,
          transformOrigin: "50% 50%",
        });
        const onMove = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
          ry(((e.clientX - r.left) / r.width - 0.5) * 5);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    const settleTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(settleTimer);
      triggers.forEach((t) => t.kill());
      cleanups.forEach((fn) => fn());
    };
  }, [refs, reducedMotion, showRoute]);
}
