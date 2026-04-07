import { cn } from "@/lib/utils";

interface UtilityBannerProps {
  title: string;
  description: string;
  items?: string[];
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function UtilityBanner({
  title,
  description,
  items,
  className,
  titleClassName,
  descriptionClassName
}: UtilityBannerProps) {
  return (
    <section className={cn("rounded-[32px] bg-dark px-6 py-8 text-text-on-dark lg:px-10 lg:py-10", className)}>
      <div className="max-w-4xl space-y-3">
        <h2 className={cn("text-2xl font-extrabold tracking-tight lg:text-3xl", titleClassName)}>{title}</h2>
        <p className={cn("text-sm leading-7 text-[#e7dccf] lg:text-base", descriptionClassName)}>{description}</p>
        {items?.length ? (
          <div className="flex flex-wrap gap-3 pt-2">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-text-on-dark"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
