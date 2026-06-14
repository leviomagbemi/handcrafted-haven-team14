/** @type {import('postcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    '@tailwindcss/forms': {},  // ← add this
    autoprefixer: {},
  },
};