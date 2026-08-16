import nodemailer from "nodemailer";
import { company, siteConfig } from "@/config";

/**
 * Outbound email.
 *
 * This module exists so the enquiry form is honest: when SMTP is configured the
 * message is delivered, and when it is not the caller is told so rather than
 * being shown a false success.
 *
 * The customer acknowledgement is deliberately absent. Dependency 20 — a named
 * person who answers — is outstanding, and an automated reply from a mailbox
 * nobody reads is the state R25.4 refuses.
 */

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

export const isEmailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASSWORD);

export interface EnquiryEmail {
  subject: string;
  /** Field label → submitted value, rendered as a definition list. */
  fields: Record<string, string>;
  replyTo?: string;
}

function renderRows(fields: Record<string, string>) {
  return Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 16px 6px 0;color:#666;font-weight:500;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Sends the enquiry to the owner inbox. Throws if SMTP is not configured. */
export async function sendEnquiryEmail({ subject, fields, replyTo }: EnquiryEmail): Promise<void> {
  if (!isEmailConfigured) {
    throw new Error("SMTP is not configured");
  }

  /*
   * The subject carries a submitted company name and goes into a mail header.
   * A newline in a header is how a caller adds headers of their own — a Bcc, a
   * second Reply-To — so both line-break characters are collapsed and the
   * length is capped. The body is escaped separately by `escapeHtml`.
   */
  const safeSubject = subject.replace(/[\r\n]+/g, " ").slice(0, 200);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"${siteConfig.name} website" <${SMTP_USER}>`,
    to: company.contact.salesEmail ?? company.contact.email,
    replyTo,
    subject: safeSubject,
    text: Object.entries(fields)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n"),
    html: `<div style="font-family:Inter,Arial,sans-serif;color:#202020">
      <h2 style="font-family:Georgia,serif;font-weight:500">${escapeHtml(safeSubject)}</h2>
      <table style="border-collapse:collapse;font-size:14px">${renderRows(fields)}</table>
      <p style="color:#8c8c8c;font-size:12px;margin-top:24px">Received ${new Date().toUTCString()}</p>
    </div>`,
  });
}
