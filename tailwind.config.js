/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      },
      colors: {
        primary: '#a24901',
        hoverprimary: '#8f4101',
        selectedprimary: '#d96101',
        success: '#6a0761',
        successhover: '#4d1448',
        warning: '#E76F51',
        successalert: '#2E8B57',
        successalerthover: '#247848',
      }, 
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        // To make Urbanist the default sans font:
        // sans: ['Urbanist', 'sans-serif'],
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
}
