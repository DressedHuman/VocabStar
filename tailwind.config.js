/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        "ubuntu": ["Ubuntu", "sans-serif"],
        "hind_siliguri": ["Hind Siliguri", "sans-serif"],
      },
      colors: {
        "app_name": "#FFFFFF",
        "card_title": "#B1D4E0",
        "font_color": "#A7C6ED",
        "border_color": "#2E8BC0",
      }
    },
  },
  plugins: [],
}

