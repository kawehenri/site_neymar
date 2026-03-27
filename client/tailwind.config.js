/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#f0c040',
          light: '#f8d56a',
          dark: '#c49a20',
          dim: 'rgba(240,192,64,0.15)',
        },
        dark: {
          DEFAULT: '#0b0b0b',
          100: '#111111',
          200: '#181818',
          300: '#222222',
          400: '#2a2a2a',
        },
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
