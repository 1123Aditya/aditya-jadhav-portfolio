"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useThemeMode } from "@/lib/useThemeMode";
import { useReveal } from "@/lib/useReveal";
import { useBackgroundField } from "@/lib/useBackgroundField";
import { useScrollEffects } from "@/lib/useScrollEffects";
import Navbar from "./portfolio/Navbar";
import Hero from "./portfolio/Hero";
import Footer from "./portfolio/Footer";
import Contact from "./portfolio/Contact";
import Certifications from "./portfolio/Certifications";
import Projects from "./portfolio/Projects";
import Experience from "./portfolio/Experience";
import Skills from "./portfolio/Skills";
import About from "./portfolio/About";
import SceneBg from "./portfolio/SceneBg";

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const routeLayerRef = useRef<HTMLDivElement>(null);
  const routeSvgRef = useRef<SVGSVGElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const routeGhostRef = useRef<SVGPathElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const chipImgRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef(0);

  const reducedMotion = useReducedMotion();
  const { mode } = useThemeMode();

  useReveal(rootRef, reducedMotion);
  useBackgroundField(bgCanvasRef, mode, reducedMotion, progressRef);
  useScrollEffects(
    {
      rootRef,
      routeLayerRef,
      routeSvgRef,
      routePathRef,
      routeGhostRef,
      chipRef,
      chipImgRef,
      progressRef,
    },
    reducedMotion,
    true,
  );

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-(--color-bg) font-(--font-body) text-base leading-[1.6] text-(--color-text) transition-colors duration-500 ease-in-out"
    >
      <canvas
        ref={bgCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 block h-full w-full"
      />
      <div
        ref={routeLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden"
      >
        <svg
          ref={routeSvgRef}
          preserveAspectRatio="none"
          className="absolute top-0 left-0 h-full w-full overflow-visible"
        >
          <path
            ref={routeGhostRef}
            d=""
            fill="none"
            stroke="var(--n-net)"
            strokeWidth={1}
            opacity={0.16}
            strokeDasharray="2 7"
          />
          <path
            ref={routePathRef}
            d=""
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1.3}
            opacity={0.34}
            strokeLinejoin="round"
          />
        </svg>
        <div
          ref={chipRef}
          className="absolute top-0 left-0 grid place-items-center opacity-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- src is swapped imperatively by gsap as the reader scrolls */}
          <img
            ref={chipImgRef}
            alt=""
            className="relative size-6.5 object-contain filter-[drop-shadow(0_0_8px_var(--color-bg))_drop-shadow(0_0_4px_var(--color-bg))]"
          />
        </div>
      </div>

      <Navbar />

      <main className="relative z-1">
        <SceneBg />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
