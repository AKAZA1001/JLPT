/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        japanese: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        japan: {
          red: '#BC002D',
          white: '#FFFFFF',
          dark: '#1a1a2e',
          card: '#16213e',
          accent: '#0f3460',
          gold: '#e94560',
        }
      }
    },
  },
  plugins: [],
}