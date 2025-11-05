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
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        raleway: ["var(--font-raleway)"],
      },
      colors: {
        brand: {
          orange: "#EA5D1E",
          "orange-light": "#F09332",
          purple: "#302D7D",
          blue: "#00538E",
          bg: "#F7F8FA",
        },
      },
    },
  },
  plugins: [],
};

export default config;