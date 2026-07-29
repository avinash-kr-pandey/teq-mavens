import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        racing: "#df0509",
        ink: "#070707",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        glow: "0 0 36px rgba(223, 5, 9, .32)",
        panel: "0 28px 80px rgba(0, 0, 0, .44)",
      },
    },
  },
  plugins: [],
};

export default config;
