import { CONTACT } from "@/data/Contact";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { transporter } from "@/lib/transporter";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Best-effort per-IP throttle. State is held in module scope, so it only
// persists for the lifetime of a single server/lambda instance — enough to
// blunt a script hammering the form, not a substitute for a shared store.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function mailHtml({ name, email, subject, message }: ContactFormData) {
  return `
            <h3>New message from your portfolio</h3>
            <br/>
            <h2><span style="font-weight: bold;">Name:</span> <span style="font-weight: lighter;">${escapeHtml(name)}</span></h2>
            <h2><span style="font-weight: bold;">Email:</span> <span style="font-weight: lighter;">${escapeHtml(email)}</span></h2>
            <h2><span style="font-weight: bold;">Subject:</span> <span style="font-weight: lighter;">${escapeHtml(subject)}</span></h2>
            <h2><span style="font-weight: bold;">Message:</span> <span style="font-weight: lighter;">${escapeHtml(message)}</span></h2>
            `;
}

async function deliver(payload: ContactFormData, pageUrl: string) {
  const subjectLine = `Portfolio message: ${payload.subject}`;

  if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: CONTACT.email,
      replyTo: payload.email,
      subject: subjectLine,
      html: mailHtml(payload),
    });
    return;
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: pageUrl,
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        _subject: subjectLine,
        _replyto: payload.email,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const result = (await response.json().catch(() => null)) as {
    success?: boolean | string;
    message?: string;
  } | null;
  const accepted = result?.success === true || result?.success === "true";
  if (!response.ok || !accepted) {
    const message = result?.message || "Form delivery failed";
    if (/activation/i.test(message)) {
      throw new DeliveryError(
        `FormSubmit sent an activation email to ${CONTACT.email}. Open it (check spam), click Activate Form, then send your message again.`,
        503,
      );
    }
    throw new DeliveryError("Unable to send your message. Please try again.");
  }
}

class DeliveryError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "DeliveryError";
    this.status = status;
  }
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (isRateLimited(ip)) {
      return Response.json(
        { message: "Too many requests. Please try again later.", success: false },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { message: "Invalid form data", success: false },
        { status: 400 },
      );
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { message: "Invalid form data", success: false },
        { status: 400 },
      );
    }

    const requestUrl = new URL(req.url);
    const origin =
      req.headers.get("origin") ?? `${requestUrl.protocol}//${requestUrl.host}`;
    await deliver(result.data, `${origin}/#contact`);

    return Response.json({ message: "Email sent successfully", success: true });
  } catch (error: unknown) {
    if (error instanceof DeliveryError) {
      console.error("Error sending email:", error.message);
      return Response.json(
        { message: error.message, success: false },
        { status: error.status },
      );
    }
    console.error("Error sending email:", error);
    return Response.json(
      { message: "Unable to send your message. Please try again.", success: false },
      { status: 500 },
    );
  }
}
