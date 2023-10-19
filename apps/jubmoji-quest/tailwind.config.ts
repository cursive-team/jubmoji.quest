import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const backfaceVisibility = plugin(function ({ addUtilities }: any) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
      "-moz-backface-visibility": "visible",
      "-webkit-backface-visibility": "visible",
      "-ms-backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
      "-moz-backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden",
      "-ms-backface-visibility": "hidden",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

const perspective = plugin(function ({ addUtilities }: any) {
  addUtilities({
    ".perspective": {
      perspective: "1000px",
    },
  });
});

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.6rem",
    },
    extend: {
      fontSize: {
        base: ["16px", "140%"],
        tiny: ["11px", "140%"],
      },
      fontFamily: {
        "hind-siliguri": ["'Hind Siliguri'", "sans-serif"],
      },
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
        shark: {
          50: "#F5F5F6",
          400: "#85878B",
          600: "#5a5b60",
          700: "#4D4D51",
          900: "#3B3B3E",
          950: "#252527",
          970: "#1E1E1F",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [backfaceVisibility, perspective],
};
export default config;
