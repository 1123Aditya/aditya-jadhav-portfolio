import Link from "next/link";
import { RESUME_HREF } from "@/data/Contact";

function ResumeIcon() {
  return (
    <svg className="resume-doc" viewBox="0 0 20 24" aria-hidden="true">
      <path className="resume-doc-page" d="M4 1.8h8.1L17.2 7.1V22H4z" />
      <path className="resume-doc-fold" d="M12.1 1.8V7.1h5.1" />
      <path className="resume-doc-line" d="M7 11.2h6.2" />
      <path className="resume-doc-line resume-doc-line-2" d="M7 14.6h6.2" />
      <path className="resume-doc-line resume-doc-line-3" d="M7 18h4" />
    </svg>
  );
}

export default function ResumeLink({
  variant = "button",
  className = "",
}: {
  variant?: "button" | "text";
  className?: string;
}) {
  if (variant === "text") {
    return (
      <Link href={RESUME_HREF} download className={`resume-text ${className}`}>
        <ResumeIcon />
        Resume
      </Link>
    );
  }

  return (
    <Link href={RESUME_HREF} download className={`btn resume-btn ${className}`}>
      <span className="resume-btn-shine" aria-hidden="true" />
      <ResumeIcon />
      Resume
      <svg className="resume-arrow" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 2.6v8.2" />
        <path d="M4.4 8.2 8 11.8l3.6-3.6" />
      </svg>
    </Link>
  );
}
