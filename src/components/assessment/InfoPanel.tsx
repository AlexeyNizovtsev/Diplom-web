interface InfoPanelProps {
  title: string;
  items: string[];
}

export function InfoPanel({ title, items }: InfoPanelProps) {
  return (
    <section className="rounded-[2rem] border border-[#dccdbe] bg-card-secondary px-6 py-6 shadow-none backdrop-blur-0 lg:px-8 lg:py-7">
      <div className="space-y-5">
        <h2 className="text-[1.35rem] font-extrabold tracking-[-0.03em] text-text-primary lg:text-[1.6rem]">
          {title}
        </h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[1rem] leading-[1.5] text-text-secondary lg:text-[1.08rem]">
              <span
                aria-hidden="true"
                className="mt-[0.58rem] h-2 w-2 shrink-0 rounded-full bg-accent/85"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
