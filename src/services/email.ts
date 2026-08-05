import nodemailer from "nodemailer";
import { company, siteConfig } from "@/config";

/**
 * Outbound email.
 *
 * Phase 8 owns the full email feature — HTML templates and the customer
 * acknowledgement. This module exists so the enquiry forms are honest today:
 * when SMTP is configured the message is delivered, and when it is not the
 * caller is told so rather than being shown a false success.
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
    subject,
    text: Object.entries(fields)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n"),
    html: `<div style="font-family:Inter,Arial,sans-serif;color:#202020">
      <h2 style="font-family:Georgia,serif;font-weight:500">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;font-size:14px">${renderRows(fields)}</table>
      <p style="color:#8c8c8c;font-size:12px;margin-top:24px">Received ${new Date().toUTCString()}</p>
    </div>`,
  });
}
