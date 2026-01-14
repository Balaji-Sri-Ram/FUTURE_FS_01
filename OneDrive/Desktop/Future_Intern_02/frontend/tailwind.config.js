/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Semantic colors using CSS variables for theme switching
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',

        // Brand colors
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#f43f5e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
