import type { Config } from "tailwindcss";

const colorVar = (variableName: string) => `rgb(var(${variableName}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: colorVar("--ink-950"),
          900: colorVar("--ink-900"),
          800: colorVar("--ink-800")
        },
        accent: {
          500: colorVar("--accent-500"),
          400: colorVar("--accent-400"),
          300: colorVar("--accent-300")
        },
        violet: {
          500: colorVar("--violet-500"),
          400: colorVar("--violet-400"),
          300: colorVar("--violet-300")
        },
        mint: {
          500: colorVar("--mint-500"),
          400: colorVar("--mint-400")
        }
      },
      boxShadow: {
        glow: "0 0 36px rgba(11, 109, 255, 0.38)"
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(circle at 20% 20%, rgba(124, 82, 255, 0.2), transparent 45%), radial-gradient(circle at 80% 0%, rgba(0, 231, 255, 0.18), transparent 40%), radial-gradient(circle at 50% 100%, rgba(58, 139, 255, 0.14), transparent 42%)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-space-grotesk)", "ui-sans-serif", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
