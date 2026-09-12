/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFcf7",
          100: "#FDF9F3",
          200: "#F6EFE3",
          300: "#EDE3D2",
        },
        ink: {
          400: "#7A6A5E",
          500: "#5C4A3E",
          700: "#3C2A21",
          900: "#241610",
        },
        ember: {
          300: "#F0A36A",
          400: "#E87D3E",
          500: "#D96A2B",
          600: "#C4561C",
        },
        flame: {
          400: "#E23B2E",
          500: "#C62828",
        },
        gold: {
          50: "#faf6eb",
          200: "#e6d199",
          300: "#d4b55c",
          400: "#c9a227",
          500: "#b8921f",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        // Matches the live alantoai.com headings.
        heading: ["Bebas Neue", "Impact", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
        script: ["Great Vibes", "cursive"],
      },
      boxShadow: {
        card: "0 18px 50px -20px rgba(60,42,33,0.28)",
        ember: "0 12px 40px -8px rgba(232,125,62,0.45)",
        gold: "0 0 60px -12px rgba(201,162,39,0.4)",
      },
      backgroundImage: {
        "cream-glow":
          "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(232,125,62,0.12), transparent 55%), radial-gradient(circle at 12% 88%, rgba(60,42,33,0.06), transparent 42%), radial-gradient(circle at 90% 8%, rgba(60,42,33,0.05), transparent 40%)",
      },
    },
  },
  plugins: [],
};
