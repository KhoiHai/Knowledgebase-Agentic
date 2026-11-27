import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Khi dev: mọi request /api/* được chuyển tiếp sang FastAPI (cổng 8000)
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
