"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/data/Contact";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

const container = "mx-auto max-w-[clamp(1160px,78vw,1400px)] px-[max(24px,4vw)]";
const eyebrowRow = "mb-8.5 flex items-center gap-3.5";
const eyebrow =
  "font-(--mono) text-[11.5px] tracking-[0.12em] text-(--color-accent)";
const eyebrowRule = "h-px flex-1 bg-(--color-divider)";

const contactRow = "flex items-center gap-3.5 text-inherit";
const contactIcon =
  "grid size-9.5 flex-none place-items-center rounded-[9px] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] font-(--mono) text-[15px] text-(--color-accent)";
const contactLabel =
  "mb-0.5 block font-(--mono) text-[10.5px] tracking-[0.09em] text-[color-mix(in_srgb,var(--color-text)_74%,transparent)] uppercase";
const contactValue = "text-[15.5px]";

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [sendError, setSendError] = useState("");
  const [receipt, setReceipt] = useState<{ name: string; subject: string } | null>(
    null,
  );
  const thanksRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") thanksRef.current?.focus();
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSendError("");
    if (status !== "submitting") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setSendError("");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setSendError("");

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });
      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (response.ok && payload?.success) {
        setReceipt({ name: result.data.name, subject: result.data.subject });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        setStatus("success");
      } else {
        setSendError(
          payload?.message || "Unable to send your message. Please try again.",
        );
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending the message:", error);
      setSendError("Unable to send your message. Please try again.");
      setStatus("error");
    }
  };

  const firstName = receipt?.name.trim().split(/\s+/)[0];

  return (
    <section id="contact" className="md:p-[clamp(64px,8vh,112px)]">
      <div className={container}>
        <div data-reveal className={eyebrowRow}>
          <span className={eyebrow}>CONTACT</span>
          <span className={eyebrowRule} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] overflow-hidden rounded-[14px] bg-(--color-surface) shadow-(--shadow-md)">
          <div
            data-reveal
            className="border-r border-(--color-divider) p-[clamp(28px,4vw,52px)]"
          >
            <h2 className="mb-5 max-w-[16ch] text-[clamp(30px,3.6vw,44px)] leading-[1.06] font-semibold tracking-[-0.03em]">
              Let&apos;s build something great together
            </h2>
            <p className=" pt-2 mb-8 max-w-[40ch] text-[16.5px] leading-[1.68] text-(--color-text)">
              Open to full-stack and frontend roles. Drop a message and
              I&apos;ll get back to you soon.
            </p>
            <div className="grid gap-4.5">
              <Link href={`mailto:${CONTACT.email}`} className={contactRow}>
                <span className={contactIcon}>@</span>
                <span>
                  <span className={contactLabel}>Email</span>
                  <span className={contactValue}>{CONTACT.email}</span>
                </span>
              </Link>
              <Link href={`tel:${CONTACT.phoneHref}`} className={contactRow}>
                <span className={contactIcon}>#</span>
                <span>
                  <span className={contactLabel}>Phone</span>
                  <span className={contactValue}>{CONTACT.phone}</span>
                </span>
              </Link>
              <div className={contactRow}>
                <span className={contactIcon}>⚲</span>
                <span>
                  <span className={contactLabel}>Location</span>
                  <span className={contactValue}>{CONTACT.location}</span>
                </span>
              </div>
            </div>
          </div>

          {status === "success" && receipt ? (
            <div
              data-reveal
              className="flex min-h-[420px] flex-col items-center justify-center gap-4 px-[clamp(28px,4vw,52px)] py-[clamp(36px,5vw,64px)] text-center"
              role="status"
            >
              <span
                aria-hidden
                className="mb-1 grid size-16 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] font-(--mono) text-[28px] text-(--color-accent)"
              >
                ✓
              </span>
              <span className={`${eyebrow} mb-0`}>MESSAGE SENT</span>
              <h3
                ref={thanksRef}
                tabIndex={-1}
                className="max-w-[14ch] text-[clamp(30px,3.4vw,42px)] leading-[1.08] font-semibold tracking-[-0.03em] outline-none"
              >
                Thank you{firstName ? `, ${firstName}` : ""}
              </h3>
              <p className="max-w-[38ch] text-[16.5px] leading-[1.68] text-[color-mix(in_srgb,var(--color-text)_78%,transparent)]">
                Your note is in. I&apos;ll read it and get back to you soon.
              </p>
              {receipt.subject && (
                <p className="font-(--mono) text-[12px] tracking-[0.04em] text-(--color-accent)">
                  {receipt.subject}
                </p>
              )}
              <button
                type="button"
                className="btn btn-primary mt-2 px-6 py-3 text-[15px]"
                onClick={() => {
                  setReceipt(null);
                  setStatus("idle");
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
          <form
            data-reveal
            onSubmit={handleSubmit}
            className="flex flex-col gap-4.5 p-[clamp(28px,4vw,52px)]"
            noValidate
          >
            <div className="field">
              <label htmlFor="n-name">Name</label>
              <input
                id="n-name"
                className="input"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "n-name-error" : undefined}
              />
              {errors.name && (
                <p id="n-name-error" className="form-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="n-email">Email</label>
              <input
                id="n-email"
                className="input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "n-email-error" : undefined}
              />
              {errors.email && (
                <p id="n-email-error" className="form-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="n-subject">Subject</label>
              <input
                id="n-subject"
                className="input"
                type="text"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "n-subject-error" : undefined
                }
              />
              {errors.subject && (
                <p id="n-subject-error" className="form-error">
                  {errors.subject}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="n-msg">Message</label>
              <textarea
                id="n-msg"
                className="input font-(--font-body)"
                name="message"
                rows={5}
                placeholder="What are you building?"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "n-msg-error" : undefined}
              />
              {errors.message && (
                <p id="n-msg-error" className="form-error">
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn btn-primary self-start px-6 py-3 text-[15px]"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>
            {status === "error" && sendError && (
              <p role="alert" className="form-error">
                {sendError}
              </p>
            )}
          </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
