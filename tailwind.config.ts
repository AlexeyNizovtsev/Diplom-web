import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "hsl(var(--bg-page))",
        card: "hsl(var(--bg-card))",
        "card-secondary": "hsl(var(--bg-card-secondary))",
        dark: "hsl(var(--bg-dark))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-on-dark": "hsl(var(--text-on-dark))",
        border: "hsl(var(--border-subtle))",
        accent: "hsl(var(--accent-primary))",
      },
      boxShadow: {
        soft: "0 20px 50px -28px rgba(39, 31, 20, 0.28)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
