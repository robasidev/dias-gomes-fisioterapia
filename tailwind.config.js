/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./blog/*.html"],
  theme: {
    extend: {
      colors: {
        dgpink: { DEFAULT: '#C5408F', dark: '#9E3172', light: '#F6E4EF' },
        dgteal: { DEFAULT: '#3BBAD1', dark: '#1A5F6C', light: '#E4F6F9' },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
};
