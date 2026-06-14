import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11110f",
        paper: "#f4f1ea",
        cloud: "#fbfaf7",
        mist: "#ebe7dd",
        moss: "#b6d7b5",
        blue: "#b9d7ff",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(18, 18, 15, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
