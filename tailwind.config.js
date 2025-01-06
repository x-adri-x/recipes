/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './components/**/*.{js,jsx}', './pages/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        catamaran: ['Catamaran', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
