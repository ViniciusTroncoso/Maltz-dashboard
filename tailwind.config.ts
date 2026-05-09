import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 01 Maltz Niterói brand palette
        ink: {
          900: "#000000",
          800: "#0a0908",
          700: "#121110",
          600: "#1a1816",
          500: "#26221e",
          400: "#3a342d",
        },
        amber: {
          DEFAULT: "#F5A623",
          50: "#fff8eb",
          100: "#fdebc4",
          200: "#fbd58a",
          300: "#f8be51",
          400: "#f5a623",
          500: "#d88a0e",
          600: "#a8690a",
          700: "#7a4c08",
        },
        ember: {
          DEFAULT: "#E63946",
          400: "#ff5566",
          500: "#e63946",
          600: "#b82a36",
        },
        cream: "#f5e9d4",
        foam: "#faf3e3",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Impact", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "amber-gradient":
          "linear-gradient(135deg, #F5A623 0%, #d88a0e 100%)",
        "ember-gradient":
          "linear-gradient(135deg, #E63946 0%, #b82a36 100%)",
        "noise":
          "radial-gradient(circle at 1px 1px, rgba(245,166,35,0.06) 1px, transparent 0)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,166,35,0.15), 0 8px 32px -8px rgba(245,166,35,0.25)",
        "glow-strong":
          "0 0 0 1px rgba(245,166,35,0.3), 0 12px 48px -12px rgba(245,166,35,0.4)",
        ember: "0 0 0 1px rgba(230,57,70,0.2), 0 8px 32px -8px rgba(230,57,70,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
