import { CONTACT } from "@/data/Contact";
import ResumeLink from "@/components/portfolio/ResumeLink";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-5 mx-auto flex max-w-[clamp(1160px,78vw,1400px)] flex-wrap items-baseline gap-x-6 gap-y-2.5 px-[max(24px,4vw)] pt-4 pb-4 font-(--mono) text-[11.5px] tracking-[0.04em] text-[color-mix(in_srgb,var(--color-text)_74%,transparent)] border-t">
      <span>
        &copy; {new Date().getFullYear()} Aditya Jadhav — Pune, Maharashtra
      </span>
      <span className="flex-1" />
      <span className="flex gap-4.5">
        {CONTACT.githubHref ? (
          <Link
            href={CONTACT.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
          >
            GitHub
          </Link>
        ) : null}
        <Link
          href={CONTACT.linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
        >
          LinkedIn
        </Link>
        <ResumeLink variant="text" />
      </span>
    </footer>
  );
};

export default Footer;
