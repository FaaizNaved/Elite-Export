import { NextResponse } from "next/server";
import { enquiryFormSchema } from "@/models/forms";
import { isEmailConfigured, sendEnquiryEmail } from "@/services/email";
import { countryName } from "@/utils/country";

/**
 * The enquiry endpoint. One surface, one door, one endpoint (UX R25.2).
 *
 * ### Abuse protection
 *
 * This route sends mail on behalf of an unauthenticated caller, which makes it
 * the only place on the site where a stranger can cost the company something.
 * Three defences, in the order a request meets them, and no library:
 *
 * 1. **A body ceiling**, read before the body is parsed. `request.json()` will
 *    buffer whatever it is given; a 40MB POST is a denial of service that never
 *    reaches validation. 32KB is roughly forty times the largest legitimate
 *    enquiry this form can produce.
 * 2. **A rate limit per address**, fixed window. Five enquiries in ten minutes
 *    is far above what a real buyer does and far below what a script needs.
 * 3. **The honeypot**, already present, kept: a bot that fills every field is
 *    answered `200` and dropped, because telling it that it failed is telling
 *    it how to succeed.
 *
 * The limiter is in-process and therefore per-instance: on a serverless
 * platform a determined attacker gets one window per cold instance. That is a
 * deliberate ceiling rather than an oversight — a shared store is a dependency
 * and an operational surface, and the honest place to enforce a hard limit is
 * the platform's own edge (Vercel WAF, Cloudflare) once the domain exists.
 * `ponytail: in-process fixed window; move to the platform edge or a shared
 * store if the endpoint is ever actually targeted.`
 */

/** Roughly forty times the largest enquiry the form can produce. */
const MAX_BODY_BYTES = 32 * 1024;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/** address → window start and count. Bounded below by the sweep in `allow`. */
const attempts = new Map<string, { start: number; count: number }>();

function callerAddress(request: Request): string {
  /*
   * `x-forwarded-for` is set by the platform proxy and may be a chain; the
   * client is the first entry. It is spoofable by anyone talking to the origin
   * directly, which is why this is one defence of three rather than the only
   * one. Unknown callers share a bucket, which is the safe direction to fail.
   */
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function allow(address: string, now: number): boolean {
  /* Sweep expired windows so the map cannot grow without bound. */
  for (const [key, seen] of attempts) {
    if (now - seen.start > WINDOW_MS) attempts.delete(key);
  }

  const seen = attempts.get(address);
  if (!seen || now - seen.start > WINDOW_MS) {
    attempts.set(address, { start: now, count: 1 });
    return true;
  }

  seen.count += 1;
  return seen.count <= MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const now = Date.now();

  /* 1 — the ceiling, before anything is buffered. */
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That enquiry is too large to send." }, { status: 413 });
  }

  const raw = await request.text().catch(() => null);
  if (raw === null || raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That enquiry is too large to send." }, { status: 413 });
  }

  /* 2 — the window. */
  if (!allow(callerAddress(request), now)) {
    return NextResponse.json(
      { error: "Too many enquiries from this connection. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(WINDOW_MS / 1000)) } },
    );
  }

  let payload: unknown = null;
  try {
    payload = JSON.parse(raw);
  } catch {
    payload = null;
  }

  const result = enquiryFormSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  /* 3 — the honeypot. Answered, not corrected. */
  if (result.data.website) return NextResponse.json({ ok: true });

  if (!isEmailConfigured) {
    return NextResponse.json(
      { error: "Email delivery is not configured on this environment." },
      { status: 503 },
    );
  }

  const data = result.data;

  try {
    await sendEnquiryEmail({
      subject: `Buyer enquiry — ${data.companyName}`,
      /*
       * `replyTo` is a submitted value and goes into a mail header, so it is
       * checked for the two characters that would let a caller add headers of
       * their own. Zod has already asserted it is an email; this asserts it is
       * one line. Anything else is dropped rather than sanitised — the enquiry
       * still arrives, with the address in the body where it cannot inject.
       */
      replyTo: /[\r\n]/.test(data.email) ? undefined : data.email,
      fields: {
        Company: data.companyName,
        "Contact person": data.contactPerson,
        Email: data.email,
        Phone: data.phone,
        WhatsApp: data.whatsapp ?? "",
        Country: countryName(data.country),
        "Business type": data.businessType,
        "Interested products": data.interestedProducts,
        "Estimated quantity": data.estimatedQuantity,
        Message: data.message,
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not send your enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
