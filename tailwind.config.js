/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' part is SUPER important. 
  // It tells Tailwind where your code is so it can generate the CSS.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This adds Inter to the font-sans stack
        sans: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}