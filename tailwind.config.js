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
        primary: '#1A2B45',
        secondary: '#4DB0A2',
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          // 600 removed
          700: '#374151',
          // 800 removed
          900: '#111827',
        },
        success: '#28A745',
        error: '#DC3545',
        warning: '#FFC107',
        // accent color removed, and other neutrals adjusted to match the provided list
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

