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
        // Stitch 'Artisanal Heritage' Theme Palette
        primary: {
          DEFAULT: '#375544', // Sage Green
          container: '#4f6d5b',
        },
        secondary: {
          DEFAULT: '#94492d', // Warm Terracotta
          container: '#fe9d7c',
        },
        tertiary: {
          DEFAULT: '#614a32', // Sand / Earth
          container: '#7b6249',
        },
        background: '#faf9f7', // Soft Cream
        surface: '#faf9f7',
        on: {
          background: '#1b1c1b', // Charcoal
          surface: '#1b1c1b',
        },
        outline: {
          DEFAULT: '#727973',
          variant: '#c2c8c1',
        },
        // Backward Compatibility / Automatic Stylesheet Redefining
        tan: '#faf9f7',       // Soft Cream base
        beige: '#efeeec',     // Stitch light gray container
        brown: '#1b1c1b',     // Premium charcoal text
        darkBrown: '#375544', // Premium Sage Green
      },
      fontFamily: {
        serif: ['var(--font-libre-caslon-text)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      width: {
        '10': '10%',
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
