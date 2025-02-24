/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' if you want to use the OS preference
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}