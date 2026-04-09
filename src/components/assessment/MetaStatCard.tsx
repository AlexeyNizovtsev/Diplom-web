import { cn } from "@/lib/utils";

interface MetaStatCardProps {
  label: string;
  value: string;
  className?: string;
}

export function MetaStatCard({ label, value, className }: MetaStatCardProps) {
  return (
    <div
      className={cn(
        "min-w-[10rem] rounded-[1.6rem] border border-[#e4ddd5] bg-card px-5 py-4 shadow-none backdrop-blur-0",
        className
      )}
    >
      <p className="text-[length:var(--font-size-label)] font-bold uppercase tracking-[0.18em] text-accent">{label}</p>
      <p className="mt-2 text-[1.25rem] font-extrabold tracking-[-0.03em] text-text-primary lg:text-[1.45rem]">{value}</p>
    </div>
  );
}
