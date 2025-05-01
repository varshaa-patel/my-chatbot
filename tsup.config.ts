import { defineConfig } from "tsup";
import inlineCss from "esbuild-plugin-inline-css";

export default defineConfig({
  entry: ["src/web-component/index.tsx"],
  format: ["iife"],
  outDir: "public",
  globalName: "MyChatbotBundle",
  sourcemap: true,
  target: "esnext",
  splitting: false,
  clean: true,
  minify: true,
  esbuildPlugins: [inlineCss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": "{}",
    process: "{}",
  },
});
