import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f7f7fb",
        primary: "#7c3aed",
        coral: "#ff6b6b",
        gold: "#fbbf24",
        mint: "#34d399",
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top, rgba(124,58,237,0.35), transparent 55%), radial-gradient(circle at bottom right, rgba(255,107,107,0.2), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
