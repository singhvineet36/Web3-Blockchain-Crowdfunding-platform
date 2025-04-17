import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Vite config file — might add more tweaks later if needed
export default defineConfig({
  plugins: [
    react()  // could add more plugins here down the line
  ],
  define: {
    global: "globalThis", // patch for Node polyfills stuff
    "process.env": {},    // stubbed env for some legacy libs
  },
});
