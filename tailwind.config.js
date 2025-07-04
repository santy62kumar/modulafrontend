// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F1E6DD',
          100: '#D7C5AA',
          200: '#AF7C71',
          300: '#6B4B41',
          400: '#4F372F',
          500: '#3A1A1A',
          600: '#2D1515',
          700: '#201010',
          800: '#130A0A',
          900: '#060505'
        },
        neutral: {
          50: '#FFFFFF',
          100: '#FDF7F2',
          200: '#D7C5AA'
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [],
}
