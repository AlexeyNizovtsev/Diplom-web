import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  eyebrowClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
  titleClassName,
  descriptionClassName,
  eyebrowClassName,
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-[length:var(--font-size-label)] font-bold uppercase tracking-[0.24em] text-accent",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <HeadingTag
          className={cn(
            "text-balance break-words text-[length:var(--font-size-page-title)] font-extrabold leading-[0.98] tracking-tight text-text-primary lg:text-[length:var(--font-size-display)]",
            titleClassName,
          )}
        >
          {title}
        </HeadingTag>
        {description ? (
          <p
            className={cn(
              "break-words text-[length:var(--font-size-body-lg)] leading-[1.45] text-text-secondary",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
