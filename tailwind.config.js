/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        secondary: '#3498db',
        neutral: {
          100: '#ecf0f1',
          200: '#bdc3c7',
          300: '#95a5a6',
          400: '#7f8c8d',
          500: '#6c7a7d',
        },
        success: '#2ecc71',
        error: '#e74c3c',
        // Existing colors - keeping them for now
        "app_name": "#FFFFFF",
        "card_title": "#B1D4E0",
        "font_color": "#A7C6ED",
        "border_color": "#2E8BC0",
        "bg_color": "#145DA0",
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Montserrat', ...defaultTheme.fontFamily.sans],
        // Existing fonts - keeping them for now
        "open-sans": ["Open Sans", "sans-serif"],
        "ubuntu": ["Ubuntu", "sans-serif"],
        "hind_siliguri": ["Hind Siliguri", "sans-serif"],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '64': '64px',
        '128': '128px',
      }
    },
  },
  plugins: [],
}

