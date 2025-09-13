import type { Config } from "tailwindcss";

// 60 : nav title, placeholder
// 70 : input stroke
// 80 : nav active bg, input bg, search active bg, line-dark
// main-dark
// text-dark
// bg-dark
// netural

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: { max: "1080px" },
    },
    extend: {
      colors: {
        base00: "var(--color-base-00)",
        base05: "var(--color-base-05)",
        base10: "var(--color-base-10)",
        base20: "var(--color-base-20)",
        base25: "var(--color-base-25)",
        base30: "var(--color-base-30)",
        base35: "var(--color-base-35)",
        base40: "var(--color-base-40)",
        base50: "var(--color-base-50)",
        base60: "var(--color-base-60)",
        base70: "var(--color-base-70)",
        base100: "var(--color-base-100)",

        main: "var(--color-main)",
        ui: "var(--color-ui)",
        bg: "var(--color-bg)",
        codeBlock: "var(--color-code-block)",
        codeInline: "var(--color-code-inline)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
