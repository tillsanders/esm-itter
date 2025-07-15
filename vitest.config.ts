import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.ts"],
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true,
    },
  },
});
