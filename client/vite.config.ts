import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

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
        "@/src": path.resolve(__dirname, "src"),
      },
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      "import.meta.env.VITE_GRAPHQL_URL": JSON.stringify(env.VITE_GRAPHQL_URL),
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./tests/setup.ts",
    },
  };
});
