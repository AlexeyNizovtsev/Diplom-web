export const buttonBaseClasses =
  "inline-flex min-w-0 items-center justify-center rounded-[24px] px-6 py-4 text-base font-bold tracking-[-0.01em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60";

export const primaryButtonClasses = `${buttonBaseClasses} bg-dark text-text-on-dark shadow-soft hover:-translate-y-0.5 hover:bg-[#312b24]`;

export const secondaryButtonClasses = `${buttonBaseClasses} border border-border/14 bg-card/76 text-text-primary shadow-soft backdrop-blur-xl hover:-translate-y-0.5 hover:bg-card/84`;
