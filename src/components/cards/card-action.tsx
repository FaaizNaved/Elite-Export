import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export interface CardActionProps {
  label: string;
  className?: string;
}

/**
 * The "read more" affordance shared by every linked card.
 *
 * A `<span>`, not a link: the whole card is already the anchor, so this must
 * not add a second tab stop. It reacts to the card's `group` hover state.
 */
export function CardAction({ label, className }: CardActionProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans text-small font-medium transition-fast group-hover:text-accent",
        className,
      )}
    >
      {label}
      <Icon
        icon={ArrowRight}
        size="xs"
        className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
      />
    </span>
  );
}
