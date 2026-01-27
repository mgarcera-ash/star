/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ash-navy': '#05205B',
        'ash-teal': '#3AAFA9',
        'ash-accent': '#2B4F73',
      },
      fontFamily: {
        'sans': ['Inter Tight', 'system-ui', 'sans-serif'],
        'display': ['Inter Tight', 'system-ui', 'sans-serif'],
        'staatliches': ['Staatliches', 'system-ui', 'sans-serif'],
        'impact': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
