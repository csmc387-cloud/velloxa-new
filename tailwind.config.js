/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1A1A1A",
        surface: "#242424",
        lime: "#BAFF7A",
        cyan: "#00FFCC",
        muted: "#A0A0A0",
        borderDark: "#333333"
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        limeGlow: "0 0 25px rgba(186, 255, 122, 0.25)",
        cyanGlow: "0 0 25px rgba(0, 255, 204, 0.25)",
      }
    },
  },
  plugins: [],
}
