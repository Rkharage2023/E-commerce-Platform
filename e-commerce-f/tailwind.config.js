/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#5B3FD4",
          light: "#7C5CE8",
        },
      },
      animation: {
        "spin-slow": "spin 1s linear infinite",
        "fade-up": "fade-up 0.6s ease both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};
