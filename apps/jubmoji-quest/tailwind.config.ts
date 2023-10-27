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
      padding: "16px",
    },
    extend: {
      fontSize: {
        base: ["16px", "120%"],
        tiny: ["11px", "120%"],
      },
      screens: {
        xs: "380px",
      },
      fontFamily: {
        "hind-siliguri": ["'Hind Siliguri'", "sans-serif"],
        "dm-sans": ["'DM Sans'", "sans-serif"],
        giorgio: ["'Giorgio'", "sans-serif"],
        "space-mono": ['"Space Mono"', "monospace"],
      },
      colors: {
        "baby-blue": {
          default: "#92D7FE",
        },
        yellow: "#FFEC44",
        shark: {
          50: "#F5F5F6",
          100: "#E6E6E7",
          200: "#CFD0D2",
          300: "#AEAFB2",
          400: "#85878B",
          500: "#6A6B70",
          600: "#5A5B60",
          700: "#4D4D51",
          800: "#434347",
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
