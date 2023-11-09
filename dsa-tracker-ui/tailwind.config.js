/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    height: {
      '5p': '5px',
      '10p': '10px',
      '90p': '90px',
      '200p': '210px',
      '90v': '90vh',
      'fit-content': 'fit-content'
    }
  },
  plugins: [],
}