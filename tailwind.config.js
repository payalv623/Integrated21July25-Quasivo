const plugin = require("tailwindcss/plugin");

import tailwindcss from "@tailwindcss/vite";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    tailwindcss(),
    require("tailwind-scrollbar"),
  ],
};
