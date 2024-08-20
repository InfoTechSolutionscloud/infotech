/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'primary': {
          '50': '#f0f9ff',
          '100': '#dff1ff',
          '200': '#b9e4fe',
          '300': '#7bd0fe',
          '400': '#34b8fc',
          '500': '#0aa0ed',
          '600': '#007fcb',
          '700': '#006eb3',
          '800': '#055687',
          '900': '#0a4770',
          '950': '#072d4a',
        },
        'secondary': {
          '50': '#eafff5',
          '100': '#cdfee6',
          '200': '#a0fad3',
          '300': '#63f2bc',
          '400': '#25e2a1',
          '500': '#00df9a',
          '600': '#00a472',
          '700': '#00835f',
          '800': '#00674c',
          '900': '#005540',
          '950': '#003025',
      },
      
      },
    },
  },
  plugins: [],
};

