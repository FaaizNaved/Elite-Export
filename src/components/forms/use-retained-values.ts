"use client";

import { useEffect, useRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

/**
 * Nothing the visitor has written is ever lost.
 *
 * UX Blueprint R47.3 states it and calls it *the single most important
 * behaviour in this Part*; R51.2 lists it among the structural obligations
 * Phase 8 must produce; R51.4 counts a state that loses a visitor's words as
 * one of the **two that should never occur**. Master Implementation Blueprint
 * R9.2 makes it a Stage 0 gate: every state at §47 behaves as specified,
 * including those two.
 *
 * It applies to error, offline, timeout and maintenance equally (R47.3), and
 * none of those is a state the form can see coming. A connection drops, a tab
 * is closed, a phone rings and the visitor answers it. So the words are kept as
 * they are typed rather than at the moment something goes wrong — the only
 * implementation that survives the case where the page never gets a chance to
 * react.
 *
 * They are kept **on the visitor's own machine and nowhere else**. UX §50.3
 * forbids recording an individual's path; this is the opposite of that, and the
 * distinction is who holds the data. Nothing is sent, nothing is queued
 * silently (R47.2, offline), and the moment the enquiry is received the copy is
 * destroyed.
 *
 * Two fields are never retained: consent, because it is an act rather than a
 * value and a visitor returning to a form should perform it again, and the
 * honeypot, which is not the visitor's writing at all.
 *
 * **Capture is the form element's own `input` event, not the form library's.**
 * The words belong to the fields, and a native listener keeps them whatever the
 * library does with its subscriptions — which is the durable choice MIB R1.5
 * asks for, and it is less code than the alternative.
 */

/** Fields a returning visitor must supply again rather than inherit. */
const NEVER_RETAINED = new Set(["consent", "website"]);

/**
 * A shared computer is the reason this is scoped to the browser session rather
 * than kept indefinitely: the words survive a reload, a crash, a lost
 * connection and a navigation away, and do not outlive the browser.
 */
const storage = (): Storage | undefined => {
  try {
    return window.sessionStorage;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). A form that
    // works without retention is correct; a form that throws is not.
    return undefined;
  }
};

export interface RetainedValues {
  /** Goes on the `<form>`. Capture listens here. */
  readonly formRef: React.RefObject<HTMLFormElement | null>;
  /** Destroys the retained copy. Called when the enquiry has been received. */
  readonly release: () => void;
}

export function useRetainedValues<T extends FieldValues>(
  key: string,
  form: UseFormReturn<T>,
): RetainedValues {
  const { reset, getValues } = form;
  const formRef = useRef<HTMLFormElement>(null);
  const restored = useRef(false);

  // Restore before the visitor can type over it, and only once.
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;

    const raw = storage()?.getItem(key);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw) as Record<string, unknown>;
      for (const field of NEVER_RETAINED) delete saved[field];
      // Defaults win where the visitor wrote nothing, so a prefilled product
      // reference is not wiped by an older, emptier draft.
      reset({ ...getValues(), ...saved } as T, { keepDefaultValues: true });
    } catch {
      storage()?.removeItem(key);
    }
  }, [key, reset, getValues]);

  // Then keep them, as they are typed.
  useEffect(() => {
    const element = formRef.current;
    if (!element) return;

    const keep = () => {
      const store = storage();
      if (!store) return;

      const kept: Record<string, string> = {};
      for (const [field, value] of new FormData(element).entries()) {
        if (NEVER_RETAINED.has(field) || typeof value !== "string" || value === "") continue;
        kept[field] = value;
      }

      if (Object.keys(kept).length === 0) store.removeItem(key);
      else store.setItem(key, JSON.stringify(kept));
    };

    element.addEventListener("input", keep);
    element.addEventListener("change", keep);
    return () => {
      element.removeEventListener("input", keep);
      element.removeEventListener("change", keep);
    };
  }, [key]);

  return { formRef, release: () => storage()?.removeItem(key) };
}
