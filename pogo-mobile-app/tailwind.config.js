// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}"
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