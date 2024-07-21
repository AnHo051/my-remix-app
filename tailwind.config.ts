import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#02ADB5",
        accent: {grey: "#D9D9D9", yellow: "#FAC344", blue: "#0090AF"},
        "light-blue": "#E9FEFF",
        "dark-grey": "#6E6E6E"
      }
    },
  },
  plugins: [],
} satisfies Config