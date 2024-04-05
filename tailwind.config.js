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
        victor: ["Victor Mono", "monospace"], // usando la fuente victor mono
        // Puedes agregar más fuentes aquí según tus necesidades
      },
      screens: {
        sm: '320px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
}