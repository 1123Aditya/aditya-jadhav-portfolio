import { PROJECTS } from "@/data/Projects";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

const container = "mx-auto max-w-[clamp(1160px,78vw,1400px)] px-[max(24px,4vw)]";
const eyebrowRow = "mb-8.5 flex items-center gap-3.5";
const eyebrow =
  "font-(--mono) text-[11.5px] tracking-[0.12em] text-(--color-accent)";
const eyebrowRule = "h-px flex-1 bg-(--color-divider)";
const sectionPad = "py-[clamp(64px,8vh,112px)]";
const cardSurface =
  "rounded-xl bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-(--shadow-sm)";

const Projects = () => {
  return (
    <section id="projects" className={sectionPad}>
      <div className={container}>
        <div data-reveal className={eyebrowRow}>
          <span className={eyebrow}>PROJECTS</span>
          <span className={eyebrowRule} />
        </div>
        <h2
          data-reveal
          className="mb-3 text-[clamp(30px,3.6vw,46px)] leading-[1.08] font-semibold tracking-[-0.03em]"
        >
          Selected work
        </h2>
        <p
          data-reveal
          className="mb-8 max-w-[52ch] text-[16px] leading-[1.65] text-[color-mix(in_srgb,var(--color-text)_74%,transparent)]"
        >
          Four projects, newest first. Each card opens the code or my GitHub
          profile.
        </p>
        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-4">
          {PROJECTS.map((p, index) => (
            <article
              key={p.id}
              data-reveal
              className={`${cardSurface} flex flex-col gap-4 border border-(--color-divider) p-[clamp(20px,2.4vw,28px)]`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="mb-2 block font-(--mono) text-[12px] tracking-[0.08em] text-(--color-accent)">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 text-[22px] leading-[1.2] font-semibold tracking-[-0.02em]">
                    {p.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-(--color-divider) px-3 py-1.5 font-(--mono) text-[11px] tracking-[0.04em] text-(--color-accent)">
                  {p.period}
                </span>
              </div>
              <p className="m-0 text-[15.5px] leading-[1.65] text-(--color-text)">
                {p.description}
              </p>
              <ul className="m-0 grid list-none gap-2.5 p-0">
                {p.highlights.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[16px_1fr] gap-2 text-[14.5px] leading-[1.6] text-[color-mix(in_srgb,var(--color-text)_86%,transparent)]"
                  >
                    <span className="font-(--mono) text-(--color-accent)">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag tag-outline font-(--mono) text-[11.5px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {p.links && p.links.length > 0 ? (
                <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
                  {p.links.map((link) => (
                    <Link
                      key={`${link.label}-${link.href}`}
                      className="btn btn-primary inline-flex items-center gap-2 px-4.5 py-2.25 text-[13.5px]"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiGithub aria-hidden className="size-4" />
                      {link.label === "GitHub" ? "View GitHub" : "View code"}
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
