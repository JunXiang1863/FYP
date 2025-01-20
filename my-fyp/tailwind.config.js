/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f3f4f6",
        },
        blue: {
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
};

