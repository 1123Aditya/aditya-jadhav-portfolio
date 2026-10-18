import { ACHIEVEMENTS } from "@/data/Certifications";

const container = "mx-auto max-w-[clamp(1160px,78vw,1400px)] px-[max(24px,4vw)]";
const eyebrowRow = "mb-8.5 flex items-center gap-3.5";
const eyebrow =
  "font-(--mono) text-[11.5px] tracking-[0.12em] text-(--color-accent)";
const eyebrowRule = "h-px flex-1 bg-(--color-divider)";
const sectionPad = "py-[clamp(64px,8vh,112px)]";
const cardSurface =
  "rounded-xl bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-(--shadow-sm)";

const Certifications = () => {
  return (
    <section id="achievements" className={sectionPad}>
      <div className={container}>
        <div data-reveal className={eyebrowRow}>
          <span className={eyebrow}>ACHIEVEMENTS</span>
          <span className={eyebrowRule} />
        </div>
        <div className="grid grid-cols-1 min-[660px]:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className={`${cardSurface} border border-(--color-divider) px-5.5 py-6`}
            >
              <span className="mb-3 block font-(--mono) text-[12px] tracking-[0.08em] text-(--color-accent)">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-[18px] font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-text)_78%,transparent)]">
                {item.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
