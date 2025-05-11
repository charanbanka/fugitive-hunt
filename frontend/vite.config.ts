import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8", // or 'istanbul' as an alternative
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      exclude: [...(configDefaults.coverage.exclude || []), "src/test/setup.ts"],
    },
  },
}));
