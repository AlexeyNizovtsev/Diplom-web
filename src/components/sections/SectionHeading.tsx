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
            "text-xs font-bold uppercase tracking-[0.24em] text-accent",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <HeadingTag
          className={cn(
            "max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-text-primary lg:text-5xl",
            titleClassName,
          )}
        >
          {title}
        </HeadingTag>
        {description ? (
          <p
            className={cn(
              "max-w-3xl text-base leading-7 text-text-secondary lg:text-lg",
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
