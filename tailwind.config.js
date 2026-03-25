/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#F9FAEB',
        'brand-text': '#1C242D',
        'brand-primary': '#D1E231',
        'brand-secondary': '#EC3031',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        accent: ['"Caveat"', 'cursive'],
      },
    },
  },
  plugins: [],
}
