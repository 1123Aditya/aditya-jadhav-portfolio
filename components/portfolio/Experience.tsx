import { EXPERIENCE } from "@/data/Experience";
const container = "mx-auto max-w-[clamp(1160px,78vw,1400px)] px-[max(24px,4vw)]";
const eyebrowRow = "mb-8.5 flex items-center gap-3.5";
const eyebrow =
  "font-(--mono) text-[11.5px] tracking-[0.12em] text-(--color-accent)";
const eyebrowRule = "h-px flex-1 bg-(--color-divider)";
const sectionPad = "py-[clamp(64px,8vh,112px)]";
const cardSurface =
  "rounded-xl bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-(--shadow-sm)";

const Experience = () => {
  return (
    <section id="work" className={sectionPad}>
      <div className={container}>
        <div data-reveal className={eyebrowRow}>
          <span className={eyebrow}>EXPERIENCE</span>
          <span className={eyebrowRule} />
        </div>

        {EXPERIENCE.map((job, i) => (
          <article
            key={job.role}
            data-reveal
            className={`${cardSurface} grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(20px,3.5vw,52px)] p-[clamp(24px,3vw,38px)] ${
              i < EXPERIENCE.length - 1 ? "mb-3.5" : ""
            }`}
          >
            <div>
              <span
                className={`mb-4 block text-[44px] leading-none font-semibold tracking-[-0.03em] ${
                  job.accent
                    ? "text-(--color-accent)"
                    : "text-[color-mix(in_srgb,var(--color-text)_52%,transparent)]"
                }`}
              >
                {job.index}
              </span>
              <h3 className="mb-1.5 text-2xl font-semibold tracking-tight">
                {job.role}
              </h3>
              <p className="mb-1 text-[15.5px]">{job.company}</p>
              <p
                className={`mb-4.5 font-(--mono) text-xs tracking-wider ${
                  job.accent
                    ? "text-(--color-accent)"
                    : "text-[color-mix(in_srgb,var(--color-text)_66%,transparent)]"
                }`}
              >
                {job.period}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${
                      job.accent ? "tag tag-accent" : "tag tag-neutral"
                    } font-(--mono) text-xs`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ul className="m-0 grid max-w-[60ch] list-none gap-3 p-0">
              {job.bullets.map((bullet, bi) => (
                <li
                  key={bi}
                  className="grid grid-cols-[16px_1fr] gap-2.5 text-base leading-[1.68]"
                >
                  <span className="font-(--mono) text-(--color-accent)">-</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
