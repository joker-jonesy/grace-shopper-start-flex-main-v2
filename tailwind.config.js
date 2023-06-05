/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./static/**/*.{html,css}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark", "light"],
  },
  plugins: [require("daisyui")],
}
