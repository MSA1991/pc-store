/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFF5D9',
      cayn: '#B0B5FF',
      blue: '#8085ff',
      'light-gray': '#677178',
      gray: '#262930',
      black: '#1B1B1F',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      screens: {
        '2xl': '1320px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      gridTemplateColumns: {
        products: 'repeat(auto-fill, 14rem)',
      },
    },
    keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' },
      },
    },
  },

  // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
