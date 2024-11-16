/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-red-900',
    'hover:bg-red-900',
    'bg-green-900',
    'hover:bg-green-900',
    'bg-rose-900',
    'hover:bg-rose-900',
    'bg-rose-950',
    'hover:bg-rose-950',
    'bg-cyan-900',
    'hover:bg-cyan-900',
    'bg-cyan-800',
    'hover:bg-cyan-800',
    'bg-red-900/50',
    'hover:bg-red-900/50',
    'bg-green-900/50',
    'hover:bg-green-900/50',
  ],
  plugins: [],
}

