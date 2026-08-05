"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { buyerEnquiryFormSchema, type BuyerEnquiryFormValues } from "@/models/forms";
import { FormError, SuccessPanel } from "./contact-form";
import { Checkbox, CountrySelect, Input, Select, Textarea } from "./controls";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";
import { useFormSubmit } from "./use-form-submit";

const BUSINESS_TYPES = [
  { value: "importer", label: "Importer / distributor" },
  { value: "wholesaler", label: "Wholesaler" },
  { value: "retailer", label: "Retailer" },
  { value: "brand", label: "Brand / private label" },
  { value: "agent", label: "Buying agent" },
  { value: "other", label: "Other" },
];

export interface BuyerEnquiryFormProps {
  fallbackEmail: string;
}

/**
 * B2B enquiry form. Longer than contact by design — it replaces a first call.
 *
 * The `?product=` prefill is read here rather than on the server so the page
 * itself stays statically prerendered. Render inside a `<Suspense>` boundary.
 */
export function BuyerEnquiryForm({ fallbackEmail }: BuyerEnquiryFormProps) {
  const searchParams = useSearchParams();
  const defaultProducts = searchParams.get("product") ?? "";
  const { state, error, submit } = useFormSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BuyerEnquiryFormValues>({
    resolver: zodResolver(buyerEnquiryFormSchema),
    defaultValues: {
      businessType: "importer",
      country: "",
      interestedProducts: defaultProducts,
    },
  });

  if (state === "success") {
    return (
      <SuccessPanel message="We will review your requirement and reply with feasibility and indicative pricing within three working days." />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit("/api/buyer-enquiry", values))}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" required error={errors.companyName?.message}>
          <Input autoComplete="organization" placeholder="Harding Equestrian" {...register("companyName")} />
        </Field>

        <Field label="Contact person" required error={errors.contactPerson?.message}>
          <Input autoComplete="name" placeholder="Daniel Harding" {...register("contactPerson")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" required error={errors.email?.message}>
          <Input type="email" autoComplete="email" placeholder="daniel@harding.co.uk" {...register("email")} />
        </Field>

        <Field label="Country" required error={errors.country?.message}>
          <CountrySelect {...register("country")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" required error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" placeholder="+44 20 0000 0000" {...register("phone")} />
        </Field>

        <Field label="WhatsApp" description="If different from your phone number." error={errors.whatsapp?.message}>
          <Input type="tel" placeholder="+44 7000 000000" {...register("whatsapp")} />
        </Field>
      </div>

      <Field label="Business type" required error={errors.businessType?.message}>
        <Select options={BUSINESS_TYPES} {...register("businessType")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Interested products"
          required
          description="Item codes, categories or a description."
          error={errors.interestedProducts?.message}
        >
          <Input placeholder="EE-WT-HS-101, browband headstalls" {...register("interestedProducts")} />
        </Field>

        <Field
          label="Estimated quantity"
          required
          description="Per style, or across the order."
          error={errors.estimatedQuantity?.message}
        >
          <Input placeholder="500 pieces per style" {...register("estimatedQuantity")} />
        </Field>
      </div>

      <Field
        label="Requirement"
        required
        description="Materials, finishes, hardware, target price, delivery window — whatever you already know."
        error={errors.message?.message}
      >
        <Textarea rows={6} {...register("message")} />
      </Field>

      <Field label="Consent" hideLabel error={errors.consent?.message}>
        <Checkbox
          label="I agree to Elite Export contacting me about this enquiry."
          {...register("consent")}
        />
      </Field>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("website")}
      />

      {error && <FormError message={error} fallbackEmail={fallbackEmail} />}

      <SubmitButton submitting={isSubmitting} size="lg" className="self-start">
        Send enquiry
      </SubmitButton>
    </form>
  );
}
