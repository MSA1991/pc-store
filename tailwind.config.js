/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFF5D9',
      cayn: '#BCC0FF',
      blue: '#9499FF',
      gray: '#32363F',
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
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    },
  ],
};
