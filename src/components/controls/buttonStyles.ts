export const buttonBaseClasses =
  "inline-flex min-w-0 items-center justify-center rounded-[24px] px-6 py-4 text-[length:var(--font-size-body)] font-bold tracking-[-0.01em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60";

export const primaryButtonClasses = `${buttonBaseClasses} bg-dark/90  backdrop-blur-sm text-text-on-dark shadow-soft hover:-translate-y-0.5 hover:bg-[#312b24]`;

export const secondaryButtonClasses = `${buttonBaseClasses} border border-[#ead8c9] bg-card/70 text-text-primary shadow-soft backdrop-blur hover:-translate-y-0.5 hover:bg-card/84`;
