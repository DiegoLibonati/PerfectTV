/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D72638",
        white: "#FFFFFF",
        black: "#000000",
      },
      fontFamily: {
        primary: ["Roboto", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
