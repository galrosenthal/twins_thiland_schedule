import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx,json}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 8px 20px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
} satisfies Config
