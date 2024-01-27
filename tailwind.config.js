/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        quick: ['Quicksand', 'sans-serif'], // Por ejemplo, usando la fuente Quicksand
        spartan: ['League Spartan', 'sans-serif'], // O usando la fuente League Spartan
        // Puedes agregar más fuentes aquí según tus necesidades
      },
    },
  },
  plugins: [],
}