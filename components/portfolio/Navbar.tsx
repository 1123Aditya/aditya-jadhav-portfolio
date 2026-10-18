import { useThemeMode } from "@/lib/useThemeMode";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
];

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { mode, toggle, spins } = useThemeMode();

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-center gap-5 px-[max(20px,calc((100%-clamp(1160px,78vw,1400px))/2))] py-3.25 bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur-lg backdrop-saturate-140 border-b border-[color-mix(in_srgb,var(--color-text)_10%,transparent)] gap-y-2.5">
      <Link
        href="#top"
        className="flex items-center gap-2.5 text-(--color-text) font-(--font-heading) text-[15.5px] tracking-[-0.005em]"
      >
        <span className="grid h-5.5 w-5.5 flex-none place-items-center rounded-md bg-(--color-accent) font-(--mono) text-[11px] text-(--color-bg)">
          A
        </span>
        Aditya Jadhav
      </Link>

      <span className="flex-1" />

      <div
        id="nav-links"
        className={`flex flex-wrap items-center gap-5 ${navOpen ? "n-open" : ""}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === "A") setNavOpen(false);
        }}
      >
        {NAV_LINKS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <Link
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className={`whitespace-nowrap text-[14px] underline decoration-2 underline-offset-4 transition-colors ${
                isActive
                  ? "font-semibold text-(--color-accent) decoration-(--color-accent) opacity-100 underline"
                  : "font-medium decoration-transparent opacity-85"
              }`}
            >
              {label}
            </Link>
          );
        })}

        <Link
          className="btn btn-primary whitespace-nowrap font-(--mono) text-[12.5px]"
          href="#contact"
        >
          Get in touch
        </Link>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle dark and light mode"
        className="grid h-8.5 w-8.5 flex-none place-items-center rounded-xl border border-(--color-divider) bg-transparent font-(--mono) text-[12px] leading-none text-(--color-accent) cursor-pointer"
        style={{ transform: `rotate(${spins * 180}deg)` }}
        suppressHydrationWarning
      >
        {mode === "dark" ? "☀" : "☾"}
      </button>

      <button
        type="button"
        id="nav-burger"
        onClick={() => setNavOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={navOpen}
        className="hidden h-8.5 w-8.5 flex-none items-center justify-center rounded-lg border border-(--color-divider) bg-transparent text-(--color-text) text-[16px] leading-none cursor-pointer"
      >
        ☰
      </button>
    </nav>
  );
}
