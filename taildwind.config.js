/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  corePlugins: {
    preflight: true,
  },
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  safelist: ["text-white", "text-brandDark"],
  theme: {
    extend: {
      fontFamily: {
        karla: "var(--font-geist-karla)",
        satoshi: "var(--font-satoshi)",
      }
    },
  },
  plugins: [],
};