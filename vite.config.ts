import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    rollupOptions: {
      // Entradas separadas: el panel /panel no añade ni un byte al sitio público.
      input: {
        main: path.resolve(__dirname, "index.html"),
        panel: path.resolve(__dirname, "panel.html"),
      },
    },
  },
});