/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Ensure correct paths
  theme: {
    extend: {
      width: {
        '62': '248px',
        '90': '360px',
      },
      height: {
        '17': '69px',
        '18': '72px',
        '37': '148px',
        '58': '230px',
      },
    },
  },
  plugins: [],
};
