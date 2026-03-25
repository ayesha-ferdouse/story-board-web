/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'q-black': '#1C242D',
        'q-white': '#FFFFFF',
        'q-red': '#F04438',   // Qatchup Primary Red
        'q-blue': '#0BA5EC',  // Qatchup Secondary Blue
        'q-yellow': '#F79009', // Qatchup Tertiary Yellow
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        accent: ['"Caveat"', 'cursive'],
      },
    },
  },
  plugins: [],
}
