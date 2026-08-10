import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#b8ceff",
          300: "#8babff",
          400: "#5a84ff",
          500: "#3763f4",
          600: "#2947dd",
          700: "#2338b3",
          800: "#1f2f8c",
          900: "#1c2a6e",
        },
        navy: {
          950: "#0b1220",
          900: "#111a2e",
          800: "#182238",
          700: "#212d47",
        },
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["Pretendard", "SUIT", "Apple SD Gothic Neo", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0 rgba(16, 24, 40, 0.08)",
        popover: "0 10px 38px -10px rgba(16,24,40,0.35), 0 10px 20px -15px rgba(16,24,40,0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
