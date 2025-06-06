/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
