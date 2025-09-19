import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "sunburst", // opcional: 'treemap' | 'sunburst' | 'network'
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
    },
  },
  optimizeDeps: {
    include: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/react-fontawesome",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-dom")) return "react-dom";
          if (id.includes("/react/")) return "react";
          if (id.includes("react-router")) return "react-router";
          if (id.includes("styled-components")) return "styled-components";
          if (id.includes("socket.io-client")) return "socketio";
          if (id.includes("react-toastify")) return "toast";
        },
      },
    },
    minify: "esbuild",
    target: "es2019",
  },
});
