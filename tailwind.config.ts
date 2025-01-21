import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md1000: { max: "1000px" },
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#1E1E1E",
        light: {
          red: "#E93147",
          green: "#08B94E",
          orange: "#EC7500",
          yellow: "#E0AC00",
          cyan: "#00BFBC",
          blue: "#086DDD",
          purple: "#7852EE",
          pink: "#D53984",
          accent1: "#8B6CEF",
          accent2: "#9478F0",
          accent3: "#9D83F1",
        },
      },
      dark: {
        red: "#FB464C",
        green: "#44CF6E",
        orange: "#E9973F",
        yellow: "#E0DE71",
        cyan: "#53DFDD",
        blue: "#027AFF",
        purple: "#A882FF",
        pink: "#FA99CD",
        accent1: "#8B6CEF",
        accent2: "#7C5AED",
        accent3: "#997EF1",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
