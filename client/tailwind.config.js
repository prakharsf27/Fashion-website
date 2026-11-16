/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#ECE6DC',
          300: '#DFD6C7',
          400: '#C7B9A3',
          500: '#AFA089',
          600: '#8C7E6A',
          700: '#685D4E',
          800: '#3D362E',
          900: '#1F1C18',
          950: '#12100E',
        },
        champagne: {
          100: '#F8F4EC',
          200: '#EFE7D6',
          300: '#E1D3B8',
          400: '#D0BC95',
          500: '#BFA473',
          600: '#A48855',
        },
        editorial: {
          bg: '#F9F7F3',
          card: '#FFFFFF',
          dark: '#141413',
          charcoal: '#22211F',
          muted: '#76726B',
          accent: '#A68A68',
          border: '#E8E4DC',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Bodoni Moda"', 'Didot', 'serif'],
        display: ['"Italiana"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        atelier: '.3em',
      },
      boxShadow: {
        'editorial': '0 20px 40px -15px rgba(28, 25, 23, 0.07)',
        'editorial-hover': '0 30px 60px -20px rgba(28, 25, 23, 0.14)',
        'luxury-glow': '0 0 35px rgba(197, 168, 128, 0.18)',
      }
    },
  },
  plugins: [],
}
