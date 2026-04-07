import { InfoCard } from "@/components/cards/InfoCard";

interface DimensionCardProps {
  label: string;
  title: string;
  description: string;
}

export function DimensionCard({ label, title, description }: DimensionCardProps) {
  return (
    <InfoCard className="h-full bg-card">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">{label}</p>
        <h3 className="text-xl font-bold text-text-primary">{title}</h3>
        <p className="text-sm leading-6 text-text-secondary">{description}</p>
      </div>
    </InfoCard>
  );
}

