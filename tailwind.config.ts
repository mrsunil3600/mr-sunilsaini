import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070D",
          900: "#0A0F1A",
          800: "#121A2A"
        },
        accent: {
          500: "#26C6DA",
          400: "#4FD6E6",
          300: "#84E4EF"
        },
        mint: {
          500: "#2ED7B7",
          400: "#53E2C8"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(38, 198, 218, 0.25)"
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(circle at 20% 20%, rgba(38, 198, 218, 0.14), transparent 45%), radial-gradient(circle at 80% 0%, rgba(46, 215, 183, 0.14), transparent 40%), radial-gradient(circle at 50% 100%, rgba(138, 159, 255, 0.1), transparent 42%)"
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