/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
      boxShadow: {
        'neo': '8px 8px 0px 0px rgba(28, 36, 45, 1)',
        'neo-hover': '12px 12px 0px 0px rgba(28, 36, 45, 1)',
      }
    },
  },
  plugins: [],
}
