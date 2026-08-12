import { NextResponse } from "next/server";
import { enquiryFormSchema } from "@/models/forms";
import { isEmailConfigured, sendEnquiryEmail } from "@/services/email";
import { countryName } from "@/utils/country";

/** The enquiry endpoint. One surface, one door, one endpoint (UX R25.2). */
export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const result = enquiryFormSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

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
      replyTo: data.email,
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
