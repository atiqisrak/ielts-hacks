import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: "var(--neutral-0)",
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },
        "accent-yellow": {
          DEFAULT: "var(--accent-yellow)",
          light: "var(--accent-yellow-light)",
          dark: "var(--accent-yellow-dark)",
        },
        "cta-primary": {
          DEFAULT: "var(--cta-primary)",
          hover: "var(--cta-primary-hover)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--border-radius-sm)",
        md: "var(--border-radius-md)",
        lg: "var(--border-radius-lg)",
        xl: "var(--border-radius-xl)",
        "2xl": "var(--border-radius-2xl)",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "yellow-glow": "0 4px 20px rgba(251, 191, 36, 0.3)",
        "yellow-glow-lg": "0 8px 30px rgba(251, 191, 36, 0.4)",
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        strong: "var(--shadow-strong)",
      },
      animation: {
        "owl-bounce": "owl-bounce 1s ease-in-out infinite",
        "pulse-yellow": "pulse-yellow 2s ease-in-out infinite",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
      },
    },
  },
  plugins: [],
};
export default config;
