/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#d7f7b9',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Asegúrate de que las transiciones estén habilitadas
    transitionProperty: true,
    transitionDuration: true,
    transitionTimingFunction: true,
    transitionDelay: true,
  },
  safelist: [
    'opacity-0',
    'opacity-100',
    'scale-95',
    'scale-100',
    'transition-all',
    'transform',
  ],
}
