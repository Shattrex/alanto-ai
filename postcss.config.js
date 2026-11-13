import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./tailwind.config.js";

// Passing the config object directly avoids Tailwind's own config loader,
// which stalls `vite build` on some Node setups.
export default {
  plugins: [tailwindcss(tailwindConfig), autoprefixer()],
};
