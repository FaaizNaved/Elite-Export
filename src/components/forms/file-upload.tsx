"use client";

import { Paperclip, Upload, X } from "lucide-react";
import { useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
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
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-input border border-dashed px-6 py-10 text-center transition-fast",
          dragging ? "border-accent bg-accent-subtle" : "border-border hover:border-border-strong",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <Icon icon={Upload} size="lg" tone="muted" />
        <Typography variant="small" as="span">
          Drag a file here, or <span className="text-accent underline">browse</span>
        </Typography>
        <Typography variant="caption" as="span">
          Up to {maxSizeMb} MB{accept_ ? ` · ${accept_}` : ""}
        </Typography>

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
        <p role="alert" className="font-sans text-caption text-error">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 rounded-input border border-border bg-surface px-4 py-2.5"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Icon icon={Paperclip} size="xs" tone="muted" />
                <span className="truncate font-sans text-small">{file.name}</span>
              </span>

              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded-button p-1 text-foreground-muted transition-fast hover:text-foreground"
              >
                <Icon icon={X} size="xs" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
