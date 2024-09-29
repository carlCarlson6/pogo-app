// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      extend: {
        textColor: {
          DEFAULT: '#FFFFFF'
        }
      },
    },
    plugins: [],
  }