"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useThemeMode } from "@/lib/useThemeMode";
import { useHeroObject, useHeroScene } from "@/lib/useHeroThree";
import ResumeLink from "@/components/portfolio/ResumeLink";

const statLabel =
  "mt-1.5 font-(--mono) text-[10.5px] tracking-[0.08em] text-[color-mix(in_srgb,var(--color-text)_74%,transparent)] uppercase";
const statValue = "text-[28px] leading-none font-semibold tracking-tight";
const dot =
  "size-2.25 rounded-full bg-[color-mix(in_srgb,var(--color-text)_24%,transparent)]";

const Hero = () => {
  const heroSceneCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  const reducedMotion = useReducedMotion();
  const { mode } = useThemeMode();

  useHeroObject(heroCanvasRef, mode, reducedMotion);
  useHeroScene(heroSceneCanvasRef, mode, reducedMotion);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden py-20 pt-37.5"
    >
      <canvas
        ref={heroSceneCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40"
      />
      <div className="relative z-1 mx-auto grid w-full max-w-[clamp(1160px,78vw,1400px)] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-[clamp(36px,5vw,72px)] px-[max(24px,4vw)]">
        <div className="min-w-0">
          <div
            data-reveal
            className="mb-7 inline-flex items-center gap-2.25 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] px-2.75 py-1.25 font-(--mono) text-[11.5px] tracking-[0.09em] text-(--color-accent) uppercase"
          >
            <span className="size-1.5 animate-[n-blink_2.6s_ease-in-out_infinite] rounded-full bg-(--color-accent)" />
            Pune, India — open to full-stack roles
          </div>
          <h1
            data-reveal
            className="mb-6 text-[clamp(42px,5.8vw,78px)] leading-none font-semibold tracking-[-0.035em]"
          >
            Aditya Jadhav
          </h1>
          <p
            data-reveal
            className="mb-4.5 font-(--mono) text-[13.5px] tracking-[0.01em] text-(--color-accent)"
          >
            Full-Stack Developer · React / TypeScript / Node
          </p>
          <p
            data-reveal
            className="mb-8.5 max-w-[44ch] text-lg leading-[1.65] text-(--color-text)"
          >
            I build enterprise web applications with React, TypeScript, and
            Node.js — reliable APIs, fast interfaces, and code that holds up
            in production. 1.5 years shipping real product.
          </p>
          <div data-reveal className="flex flex-wrap gap-3">
            <Link
              className="btn btn-primary px-5.5 py-2.75 text-[14.5px]"
              href="#contact"
            >
              Get in touch
            </Link>
            <ResumeLink className="px-5.5 py-2.75 text-[14.5px]" />
          </div>
          <div
            data-reveal
            className="mt-13 flex flex-wrap gap-0 border-t border-(--color-divider) pt-5.5"
          >
            <div className="pr-7">
              <div className={statValue}>1.5 yrs</div>
              <div className={statLabel}>Experience</div>
            </div>
            <div className="border-l border-(--color-divider) px-7">
              <div className={statValue}>70%</div>
              <div className={statLabel}>Faster frontend</div>
            </div>
            <div className="border-l border-(--color-divider) py-0 pr-0 pl-7">
              <div className={`${statValue} text-(--color-accent)`}>91</div>
              <div className={statLabel}>Lighthouse</div>
            </div>
          </div>
        </div>

        <div
          data-reveal
          data-tilt
          className="min-w-0 overflow-hidden rounded-xl bg-(--color-surface) shadow-(--shadow-md)"
        >
          <div className="flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--color-text)_10%,transparent)] px-4 py-3">
            <span className={dot} />
            <span className={dot} />
            <span className="size-2.25 rounded-full bg-(--color-accent)" />
            <span className="ml-2 font-(--mono) text-[11.5px] text-[color-mix(in_srgb,var(--color-text)_66%,transparent)]">
              ~/portfolio — stack.ts
            </span>
            <span className="flex-1" />
            <canvas
              ref={heroCanvasRef}
              aria-hidden="true"
              className="pointer-events-none block size-8.5"
            />
          </div>
          <pre className="m-0 px-4.5 pt-5 pb-5.5 font-(--mono) text-[12.5px] leading-[1.85] wrap-break-word whitespace-pre-wrap text-(--color-text)">
            <code>
              <div>
                <span className="opacity-55">
                  {"// what I reach for, in order"}
                </span>
              </div>
              <div>
                <span className="text-(--color-accent)">export const</span>{" "}
                stack = {"{"}
              </div>
              <div>
                &nbsp;&nbsp;ui:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[
                <span className="opacity-80">&apos;React&apos;</span>,{" "}
                <span className="opacity-80">&apos;TypeScript&apos;</span>,{" "}
                <span className="opacity-80">&apos;Tailwind&apos;</span>],
              </div>
              <div>
                &nbsp;&nbsp;state:&nbsp;&nbsp;[
                <span className="opacity-80">&apos;Redux&apos;</span>,{" "}
                <span className="opacity-80">&apos;Context&apos;</span>],
              </div>
              <div>
                &nbsp;&nbsp;server:&nbsp;&nbsp;[
                <span className="opacity-80">&apos;Node&apos;</span>,{" "}
                <span className="opacity-80">&apos;Express&apos;</span>,{" "}
                <span className="opacity-80">&apos;REST&apos;</span>
                ],
              </div>
              <div>
                &nbsp;&nbsp;data:&nbsp;&nbsp;&nbsp;&nbsp;[
                <span className="opacity-80">&apos;MongoDB&apos;</span>,{" "}
                <span className="opacity-80">&apos;MySQL&apos;</span>,{" "}
                <span className="opacity-80">&apos;Firebase&apos;</span>],
              </div>
              <div>
                {"}"} <span className="text-(--color-accent)">satisfies</span>{" "}
                Stack;
              </div>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Hero;
