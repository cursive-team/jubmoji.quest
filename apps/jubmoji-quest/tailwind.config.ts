import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["1.1rem", "140%"],
      sm: ["1.2rem", "140%"],
      base: ["1.6rem", "140%"],
      h1: ["3.3rem", "140%"],
      h2: ["2.8rem", "140%"],
      h3: ["2.3rem", "140%"],
      h4: ["1.9rem", "140%"],
    },
    extend: {
      colors: {
        dark: {
          default: "#1a1a1a",
          100: "#282828",
        },
        gray: {
          default: "#d1d1d1",
          100: "#f6f6f6",
        },
        woodsmoke: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#282828",
          950: "#1a1a1a",
        },
        "snow-flurry": {
          50: "#f2ffe6",
          100: "#e0ffc7",
          200: "#c3ff97",
          300: "#9cfb5b",
          400: "#79f12a",
          500: "#58d70b",
          600: "#41ac04",
          700: "#328308",
          800: "#2c670d",
          900: "#265710",
          950: "#0f3102",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
