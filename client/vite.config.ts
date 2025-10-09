import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/graphql": {
          target: env.VITE_GRAPHQL_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      watch: { usePolling: true },
      host: true,
      strictPort: true,
      port: 5173,
    },
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@tests": path.resolve(__dirname, "./tests"),
      },
    },
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./tests/vitest.setup.ts",
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@tests": path.resolve(__dirname, "./tests"),
      },
    },
  };
});
