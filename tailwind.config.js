/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'dark': "#1F1F1F",
        'main': '#833CF8'
      },
      fontSize: {
        'xs': '14px',
      }
    },
  },
  plugins: [],
}
