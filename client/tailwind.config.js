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
        surface: {
          DEFAULT: '#111111',
          raised: '#181818',
          subtle: '#202020',
        },
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      maxWidth: {
        editorial: '72rem',
        reading: '46rem',
      },
      borderRadius: {
        editorial: '1.25rem',
      },
      transitionDuration: {
        400: '400ms',
      },
      backgroundImage: {
        radial: 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        editorial: '0 28px 80px rgba(0, 0, 0, 0.42)',
        gold: '0 18px 50px rgba(240, 192, 64, 0.14)',
      },
    },
  },
  plugins: [],
}
