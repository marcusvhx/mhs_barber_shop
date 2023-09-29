import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: { max: "425px" },
      "mobile-sm": { max: "320px" },
      "mobile-lg": { max: "425px", min: "321px" },

      tablet: { min: "426px", max: "950px" },
      "tablet-sm": { min: "426px", max: "570px" },
      "wrapper": { max: "661px" },

      moblet: { max: "950px" },

      laptop: { min: "950px", max: "1400px" },
      desktop: { min: "1400px" },

      "exept-mobile": { min: "426px" },
    },
  },

  plugins: [],
};
export default config;
