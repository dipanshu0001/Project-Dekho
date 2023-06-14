// /** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    extend: {
      opacity: {

        '15': '0.15',

        '10': '0.10',

        '65': '0.65',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
});