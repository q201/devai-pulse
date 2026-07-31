import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0B0F17",
          50: "#1A2234",
          100: "#161C2B",
          200: "#121723",
          300: "#0E121C",
          400: "#0B0F17",
          500: "#080B11",
        },
        neon: {
          cyan: "#00F0FF",
          violet: "#7C3AED",
          purple: "#A855F7",
          pink: "#EC4899",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(0, 240, 255, 0.3)",
        "glow-violet": "0 0 25px -5px rgba(124, 58, 237, 0.3)",
        "glow-sm": "0 0 12px -2px rgba(0, 240, 255, 0.25)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 8px rgba(0,240,255,0.6))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 16px rgba(0,240,255,0.9))" },
        },
        borderBeam: {
          "100%": { offsetDistance: "100%" },
        },
      },
      animation: {
        ticker: "ticker 35s linear infinite",
        "pulse-glow": "pulseGlow 3s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
