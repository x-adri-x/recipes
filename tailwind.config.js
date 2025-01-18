/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './components/**/*.{js,jsx}', './pages/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        spartan: ['League Spartan', 'sans-serif'],
      },
      boxShadow: {
        small: '2px 2px 20px rgba(0, 0, 0, 0.3)',
        large: '8px 8px 40px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'kitchen-design': "url('/ali-moradi-LHMwKGL1PZA-unsplash.jpg')",
      },
    },
  },
  plugins: [],
}
