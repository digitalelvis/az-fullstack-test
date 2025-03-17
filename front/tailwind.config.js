/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FE7C6E", 
        secondary: "#59666F",
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        input: "12px",
      },
    },
  },
  plugins: [],
}

