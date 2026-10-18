import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Aditya Jadhav",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--color-bg) px-6 text-center text-(--color-text)">
      <span className="font-(--mono) text-[13px] tracking-[0.08em] text-(--color-accent) uppercase">
        Error 404
      </span>
      <h1 className="font-(--font-heading) text-6xl tracking-[-0.02em] md:text-8xl">
        404
      </h1>
      <h2 className="font-(--font-heading) text-xl md:text-2xl">
        This page doesn&apos;t exist
      </h2>
      <p className="max-w-md text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-text)_74%,transparent)]">
        The page you&apos;re looking for may have been moved, renamed, or never
        existed. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="btn btn-primary mt-2 px-4.5 py-2.25 font-(--mono) text-[13.5px]"
      >
        Back to homepage
      </Link>
    </div>
  );
}
