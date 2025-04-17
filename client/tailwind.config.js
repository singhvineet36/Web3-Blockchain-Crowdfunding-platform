/** @type {import('tailwindcss').Config} */
// Tailwind config — keeping it minimal for now
module.exports = {
  content: [
    "./index.html", // top-level HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // grab everything in src, including TSX stuff
  ],

  theme: {
    extend: {
      // Custom font family — pulled from Google Fonts in index.css
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
      },
      boxShadow: {
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)', // might be a bit dark? tweak later maybe
      },
    },
  },

  plugins: [],
};
