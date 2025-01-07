/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-pink': '#ffe4e9',
        'lavender-mist': '#f3e5f5',
      },
    },
  },
  plugins: [],
}