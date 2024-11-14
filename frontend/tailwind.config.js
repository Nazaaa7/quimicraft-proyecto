/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#d7f7b9',  // Aquí agregamos el color personalizado
      },
    },
  },
  plugins: [],
}