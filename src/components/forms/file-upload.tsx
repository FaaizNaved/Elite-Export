"use client";

import { useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Record } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { useFieldProps } from "./field";

export interface FileUploadProps {
  name?: string;
  /** MIME types or extensions, passed straight to the input. */
  accept?: string;
  multiple?: boolean;
  /** Client-side guard, in megabytes. Always re-check on the server. */
  maxSizeMb?: number;
  onFilesChange?: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Drag-and-drop file field.
 *
 * The drop zone is a `<label>` bound to a real `<input type="file">`, so
 * clicking, keyboard activation and form submission all behave natively —
 * dragging is an enhancement layered on top.
 */
export function FileUpload({
  name,
  accept,
  multiple = false,
  maxSizeMb = 10,
  onFilesChange,
  disabled = false,
  className,
}: FileUploadProps) {
  const field = useFieldProps();
  const fallbackId = useId();
  const inputId = field.id ?? fallbackId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept_ = accept;
  const maxBytes = maxSizeMb * 1024 * 1024;

  const apply = (incoming: FileList | null) => {
    if (!incoming) return;
    const list = Array.from(incoming);
    const tooLarge = list.find((file) => file.size > maxBytes);

    if (tooLarge) {
      setError(`${tooLarge.name} is larger than ${maxSizeMb} MB.`);
      return;
    }

    setError(null);
    const next = multiple ? [...files, ...list] : list;
    setFiles(next);
    onFilesChange?.(next);
  };

  const remove = (index: number) => {
    const next = files.filter((_, position) => position !== index);
    setFiles(next);
    onFilesChange?.(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled) apply(event.dataTransfer.files);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col gap-s1 border-0 border-b border-hairline py-s3 motion-mark",
          dragging ? "border-ink" : "hover:border-ink-secondary",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <Record as="span">
          Drag a file here, or <span className="underline decoration-1 underline-offset-1">browse</span>
        </Record>
        <Record rank="c" tone="secondary" as="span">
          Up to {maxSizeMb} MB{accept_ ? ` · ${accept_}` : ""}
        </Record>

        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-describedby={field["aria-describedby"]}
          onChange={(event: ChangeEvent<HTMLInputElement>) => apply(event.target.files)}
          className="sr-only"
        />
      </label>

      {error && (
        <p role="alert" className="font-sans text-c text-oxide">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-s2 border-b border-hairline py-s1"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate font-sans text-r">{file.name}</span>
              </span>

              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 font-sans text-c text-ink-secondary underline decoration-1 underline-offset-1 motion-mark hover:decoration-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
