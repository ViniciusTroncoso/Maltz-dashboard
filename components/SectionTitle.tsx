import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-5", className)}>
      {eyebrow && (
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/70">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-2xl tracking-wide text-cream">{title}</h2>
      {description && (
        <p className="mt-1 max-w-2xl text-sm text-cream/55">{description}</p>
      )}
    </div>
  );
}
