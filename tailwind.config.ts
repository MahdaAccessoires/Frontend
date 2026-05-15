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
        gold: { DEFAULT: "#C5A258", light: "#D4B96A", dark: "#9A7B3B" },
        cream: "#F5F0E8",
        charcoal: "#1A1A1A",
      },
      keyframes: {
        "sparkle-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "sparkle-sweep": "sparkle-sweep 0.8s ease-in-out",
        "fade-up": "fade-up 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
