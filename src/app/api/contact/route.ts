import { NextResponse } from "next/server";
import { countryName } from "@/utils/country";
import { contactFormSchema } from "@/models/forms";
import { isEmailConfigured, sendEnquiryEmail } from "@/services/email";

/**
 * Contact form endpoint.
 *
 * Validates with the same schema the browser used — never trust the client —
 * and returns 503 rather than a false success when email is not yet wired up.
 */
export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const result = contactFormSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot: a bot filled the hidden field. Accept silently so it learns nothing.
  if (result.data.website) return NextResponse.json({ ok: true });

  if (!isEmailConfigured) {
    return NextResponse.json(
      { error: "Email delivery is not configured on this environment." },
      { status: 503 },
    );
  }

  const { name, email, phone, country, reason, message } = result.data;

  try {
    await sendEnquiryEmail({
      subject: `Contact form — ${name}`,
      replyTo: email,
      fields: {
        Name: name,
        Email: email,
        Phone: phone ?? "",
        Country: countryName(country),
        Reason: reason,
        Message: message,
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
