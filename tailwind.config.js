/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    
  ],
  theme: {
    extend: {
      colors: {
        green: '#58592A',
        beige: '#F2CB9B',
        tan: '#D9BCA3',
        brown: '#73503C',
        darkBrown: '#261B14',
      },
      width: {
        '10': '10%',
        '20': '20%',
        '25': '25%',
        '30': '30%',
        '40': '40%',
        '50': '50%',
        '60': '60%',
        '70': '70%',
        '80': '80%',
        '90': '90%',
        '95': '95%',
        'but': '175px',
      },
      height: {
        '10': '10%',
        '20': '20%',
        '30': '30%',
        '40': '40%',
        '50': '50%',
        '60': '60%',
        '70': '70%',
        '80': '80%',
        '90': '90%',
        '95': '95%',
      },
      fontSize: {
        'xxs': '.5rem',
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'l': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      width: ['responsive'],
    },
  },
}
