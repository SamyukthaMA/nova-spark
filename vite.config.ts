import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 🔴 REQUIRED for GitHub Pages project deployment
  // Repo name = nova-spark
  plugins: [react()],
 base: "/nova-spark/",

 

  server: {
    port: 3000,
    host: "0.0.0.0",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
