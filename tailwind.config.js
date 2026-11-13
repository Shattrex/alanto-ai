/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#070707",
        r1: "#0B0B0D",
        r2: "#101012",
        r3: "#141416",
        fg: "#F4F4F2",
        mute: "#8F9097",
        dim: "#5C5D64",
        ice: "#B9D9FF",
        line: "rgba(255,255,255,0.08)",
        "line-strong": "rgba(255,255,255,0.16)",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        display: ['"Inter Tight"', "Geist", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        shell: "1320px",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(185,217,255,0.25)",
        "glow-sm": "0 0 24px -6px rgba(185,217,255,0.35)",
      },
    },
  },
  plugins: [],
};
