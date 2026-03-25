/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#fff9f5',
        'brand-dark': '#1C242D',
        'brand-primary': '#F15425',
        'brand-secondary': '#7079DD',
        'brand-body': '#696969',
        'brand-pink': '#FFD3E2',
        'brand-teal': '#1B4A48',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        accent: ['"Caveat"', 'cursive'],
      },
    },
  },
  plugins: [],
}
