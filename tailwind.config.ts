import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#C5A258",
          light: "#D4B96A",
          dark: "#9A7B3B",
          50: "#FEF7ED",
          100: "#FDEBD0",
          200: "#FAD7A0",
          300: "#F8C471",
          400: "#F4D03F",
          500: "#C5A258",
          600: "#9A7B3B",
          700: "#7D5D2E",
          800: "#5D3A1A",
          900: "#3E2723"
        },
        pink: {
          DEFAULT: "#FF69B4",
          light: "#FFB6C1",
          dark: "#FF1493",
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#FF69B4",
          600: "#EC4899",
          700: "#DB2777",
          800: "#BE185D",
          900: "#9F1239"
        },
        rose: {
          DEFAULT: "#E8B4B8",
          light: "#F0C5C9",
          dark: "#D4949A",
          50: "#FEF5F7",
          100: "#FCE4EC",
          200: "#F8BBD0",
          300: "#F48FB1",
          400: "#F06292",
          500: "#E8B4B8",
          600: "#D4949A",
          700: "#C2185B",
          800: "#AD1457",
          900: "#880E4F"
        },
        dark: {
          50: "#0F0F0F",
          100: "#1A1A1A",
          200: "#262626",
          300: "#404040",
          400: "#525252",
          500: "#737373",
          600: "#A3A3A3",
          700: "#D4D4D4",
          800: "#E5E5E5",
          900: "#F5F5F5",
        },
        charcoal: "#0F0F0F",
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      keyframes: {
        "sparkle-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "elegant-fade": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "elegant-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        "sparkle-sweep": "sparkle-sweep 0.8s ease-in-out",
        "elegant-fade": "elegant-fade 0.8s ease-out",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "gentle-float": "gentle-float 4s ease-in-out infinite",
        "elegant-scale": "elegant-scale 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
