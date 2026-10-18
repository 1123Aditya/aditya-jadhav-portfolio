import { CONTACT } from "@/data/Contact";
import ResumeLink from "@/components/portfolio/ResumeLink";
import Link from "next/link";

const container = "mx-auto max-w-[clamp(1160px,78vw,1400px)] px-[max(24px,4vw)]";
const eyebrowRow = "mb-8.5 flex items-center gap-3.5";
const eyebrow =
  "font-(--mono) text-[11.5px] tracking-[0.12em] text-(--color-accent)";
const eyebrowRule = "h-px flex-1 bg-(--color-divider)";
const cardSurface =
  "rounded-xl bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-(--shadow-sm)";

const About = () => {
  return (
    <section id="about" className="py-[clamp(72px,9vh,124px)]">
      <div className={container}>
        <div data-reveal className={eyebrowRow}>
          <span className={eyebrow}>ABOUT</span>
          <span className={eyebrowRule} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(28px,4vw,64px)]">
          <div>
            <h2
              data-reveal
              className="mb-5.5 text-[clamp(30px,3.6vw,46px)] leading-[1.08] font-semibold tracking-[-0.03em]"
            >
              Own the module,
              <br />
              end to end
            </h2>
            <p
              data-reveal
              className="my-4 text-[17px] leading-[1.72] text-(--color-text)"
            >
              I&apos;m a Full Stack Developer based in Pune, with 1.5 years
              building enterprise web applications in React.js, TypeScript,
              Node.js, and Express.js. I work across REST API integration,
              Redux state management, and SQL and NoSQL databases — from the
              interface through release.
            </p>
            <p
              data-reveal
              className="text-[15.5px] leading-[1.7] text-[color-mix(in_srgb,var(--color-text)_72%,transparent)]"
            >
              I improved application performance by 70% through frontend
              optimization, and I debug by finding the root cause. I deliver
              in Agile and Scrum, ship through Jenkins CI/CD, and have solved
              200+ DSA problems on LeetCode.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                className="btn btn-primary px-4.5 py-2.25 text-[13.5px]"
                href={CONTACT.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
              <ResumeLink className="px-4.5 py-2.25 text-[13.5px]" />
            </div>
          </div>
          <div data-reveal className={`${cardSurface} px-6 py-1.5`}>
            {[
              ["Based in", "Pune, Maharashtra, India"],
              ["Experience", "1.5 years, enterprise web apps"],
              ["Core stack", "React · TypeScript · Node · Express"],
              ["Degree", "B.E. Computer Science · 8.4 SGPA"],
              [
                "College",
                "JSPM's Bhivarabai Sawant Institute of Technology & Research · 2021–2025",
              ],
              ["HSC", "PCMB · 84% · Kisan Veer Mahavidyalaya, Wai"],
              ["Focus", "Performance, APIs, debugging"],
              ["Available", "Full-time"],
            ].map(([label, value], i, arr) => (
              <div
                key={label}
                className={`grid grid-cols-[minmax(0,120px)_minmax(0,1fr)] gap-4 py-4 ${
                  i < arr.length - 1 ? "border-b border-(--color-divider)" : ""
                }`}
              >
                <span className="font-(--mono) text-[11px] tracking-[0.08em] text-[color-mix(in_srgb,var(--color-text)_60%,transparent)] uppercase">
                  {label}
                </span>
                <span
                  className={`text-[15.5px] ${
                    label === "Available" ? "text-(--color-accent)" : ""
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
