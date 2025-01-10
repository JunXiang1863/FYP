/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Ensure all your relevant files are listed here
  ],
  theme: {
    extend: {
      borderColor: {
        border: "hsl(var(--border))", // Use the CSS variable `--border` for border color
      },
    },
  },
  plugins: [],
};

