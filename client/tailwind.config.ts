import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./*.{html,js,ts,tsx}", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D72638",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

export default config;
