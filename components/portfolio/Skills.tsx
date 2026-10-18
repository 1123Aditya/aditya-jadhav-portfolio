import { SKILLS, SKILL_TABS } from "@/data/Skills";
import type { SkillGroup, SkillItem } from "@/data/Skills";
import { useState } from "react";

const sectionPad = "py-[clamp(64px,8vh,112px)]";
const container = "mx-auto max-w-[clamp(1160px,78vw,1400px)] px-[max(24px,4vw)]";
const eyebrowRow = "mb-8.5 flex items-center gap-3.5";
const eyebrow =
  "font-(--mono) text-[11.5px] tracking-[0.12em] text-(--color-accent)";
const eyebrowRule = "h-px flex-1 bg-(--color-divider)";
const sectionHeading =
  "mb-[clamp(28px,3.5vw,46px)] text-[clamp(30px,3.6vw,46px)] leading-[1.08] font-semibold tracking-[-0.03em]";

const Skills = () => {
  const [skillTab, setSkillTab] = useState(SKILL_TABS[0].id);
  const activeGroups = SKILLS[skillTab];

  return (
    <section id="skills" className={sectionPad}>
      <div className={container}>
        <div data-reveal className={eyebrowRow}>
          <span className={eyebrow}>SKILLS</span>
          <span className={eyebrowRule} />
        </div>
        <h2 data-reveal className={sectionHeading}>
          The technical stack
        </h2>

        <div
          role="tablist"
          data-reveal
          className="mb-5.5 flex flex-wrap gap-2 mt-7"
        >
          {SKILL_TABS.map((tab) => {
            const active = tab.id === skillTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSkillTab(tab.id)}
                className={`rounded-full border px-4.5 py-2.25 text-[12.5px] font-medium tracking-[0.03em] whitespace-nowrap transition-all duration-200 ease-in-out ${
                  active
                    ? "border-(--color-accent) bg-(--color-accent) text-(--color-bg)"
                    : "border-(--color-divider) bg-transparent text-[color-mix(in_srgb,var(--color-text)_74%,transparent)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-8">
          {activeGroups.map((group: SkillGroup) => (
            <div key={group.title}>
              <h3 className="mb-3 font-(--mono) text-[11.5px] tracking-[0.08em] text-[color-mix(in_srgb,var(--color-text)_62%,transparent)] uppercase">
                {group.title}
              </h3>
              <div className="grid min-h-46 grid-cols-[repeat(auto-fill,minmax(126px,1fr))] gap-3.5">
                {group.items.map((sk: SkillItem) => {
                  const Icon = sk.icon;
                  return (
                    <div
                      key={sk.name}
                      className="n-skill-card relative flex cursor-default flex-col items-center justify-center gap-2.75 overflow-hidden rounded-xl bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] px-2.5 pt-5.5 pb-4.5 text-center shadow-(--shadow-sm)"
                    >
                      <span className="n-skill-bar absolute top-0 right-0 left-0 h-[2.5px] origin-left scale-x-0 bg-(--color-accent) opacity-55" />
                      {Icon ? (
                        <Icon
                          aria-hidden
                          className="n-skill-icon h-8.5 w-8.5"
                          color={sk.color}
                        />
                      ) : null}
                      <span className="text-[12.5px] leading-[1.3] font-medium">
                        {sk.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* <div
          data-reveal
          className="mt-[clamp(24px,3vw,38px)] grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[clamp(18px,3vw,40px)]"
        >
          {SKILL_METERS.map((m) => (
            <div key={m.label}>
              <div className="mb-2.25 flex justify-between gap-3 font-(--mono) text-[11.5px] tracking-wider text-[color-mix(in_srgb,var(--color-text)_68%,transparent)] uppercase">
                <span>{m.label}</span>
                <span>{m.sub}</span>
              </div>
              <div className="h-0.75 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-text)_14%,transparent)]">
                <div
                  data-meter={m.value}
                  className="h-full w-0 bg-(--color-accent)"
                />
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Skills;
