"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
import { contactFormSchema, type ContactFormValues } from "@/models/forms";
import { Checkbox, CountrySelect, Input, Select, Textarea } from "./controls";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";
import { useFormSubmit } from "./use-form-submit";

const REASONS = [
  { value: "general", label: "General enquiry" },
  { value: "products", label: "Product information" },
  { value: "samples", label: "Samples" },
  { value: "partnership", label: "Partnership" },
  { value: "careers", label: "Careers" },
];

export interface ContactFormProps {
  /** Fallback address shown if delivery fails. */
  fallbackEmail: string;
}

/** Contact form. Validation is shared with the route handler via one Zod schema. */
export function ContactForm({ fallbackEmail }: ContactFormProps) {
  const { state, error, submit } = useFormSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { reason: "general", country: "" },
  });

  if (state === "success") {
    return <SuccessPanel message="Our team will review your message and reply within two business days." />;
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit("/api/contact", values))}
      className="flex flex-col gap-5"
    >
      <Field label="Name" required error={errors.name?.message}>
        <Input autoComplete="name" placeholder="Jane Harding" {...register("name")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" required error={errors.email?.message}>
          <Input type="email" autoComplete="email" placeholder="jane@company.com" {...register("email")} />
        </Field>

        <Field label="Phone" error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" placeholder="+44 20 0000 0000" {...register("phone")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Country" required error={errors.country?.message}>
          <CountrySelect {...register("country")} />
        </Field>

        <Field label="Reason for contact" required error={errors.reason?.message}>
          <Select options={REASONS} {...register("reason")} />
        </Field>
      </div>

      <Field label="Message" required error={errors.message?.message}>
        <Textarea placeholder="Tell us how we can help." {...register("message")} />
      </Field>

      <Field label="Consent" hideLabel error={errors.consent?.message}>
        <Checkbox
          label="I agree to Elite Export contacting me about this enquiry."
          {...register("consent")}
        />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("website")}
      />

      {error && <FormError message={error} fallbackEmail={fallbackEmail} />}

      <SubmitButton submitting={isSubmitting} className="self-start">
        Send message
      </SubmitButton>
    </form>
  );
}

export function SuccessPanel({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-start gap-3 rounded-card border border-success/30 bg-success-subtle p-8"
    >
      <Icon icon={CheckCircle2} size="lg" className="text-success" />
      <Typography variant="h4" as="p">
        Thank you — we have your message
      </Typography>
      <Typography variant="body" className="text-foreground-secondary">
        {message}
      </Typography>
    </div>
  );
}

export function FormError({
  message,
  fallbackEmail,
}: {
  message: string;
  fallbackEmail: string;
}) {
  return (
    <div role="alert" className="rounded-input border border-error/30 bg-error-subtle p-4">
      <Typography variant="small" as="p" className="text-error">
        {message}{" "}
        <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4">
          Email us directly at {fallbackEmail}
        </a>
        .
      </Typography>
    </div>
  );
}
