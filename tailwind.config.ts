import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FBF6EC",
        ink: "#17241D",
        pine: {
          DEFAULT: "#3F6650",
          dark: "#294436",
          light: "#5B8267",
        },
        marigold: {
          DEFAULT: "#E3B23C",
          dark: "#C6952A",
        },
        slate: {
          blue: "#35576B",
        },
        line: "#D8CFC0",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        card: "18px",
      },
    },
  },
  plugins: [],
};
export default config;
