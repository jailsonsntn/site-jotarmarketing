import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs/promises";
import path from "path";

const asyncStylesheetPlugin = () => {
  let outputDirectory = "dist";

  return {
    name: "async-stylesheet-plugin",
    apply: "build",
    configResolved(config: { root: string; build: { outDir: string } }) {
      outputDirectory = path.resolve(config.root, config.build.outDir);
    },
    async writeBundle() {
      const indexHtmlPath = path.join(outputDirectory, "index.html");
      const html = await fs.readFile(indexHtmlPath, "utf8");
      const nextHtml = html.replace(
        /<link rel="stylesheet"([^>]*?)href="([^"]+)"([^>]*)>/g,
        (match, beforeHref, href, afterHref) => {
          if (!String(href).includes("/assets/")) {
            return match;
          }

          const attributes = `${beforeHref}${afterHref}`;
          return `<link rel="preload" as="style" href="${href}"${attributes}><link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"${attributes}><noscript><link rel="stylesheet" href="${href}"${attributes}></noscript>`;
        }
      );

      if (nextHtml !== html) {
        await fs.writeFile(indexHtmlPath, nextHtml, "utf8");
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "production" ? asyncStylesheetPlugin() : null,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("react-router") || id.includes("@remix-run")) {
            return "router";
          }

          if (id.includes("lucide-react")) {
            return "icons";
          }

          if (id.includes("react") || id.includes("scheduler")) {
            return "react-vendor";
          }

          if (id.includes("@radix-ui") || id.includes("class-variance-authority") || id.includes("tailwind-merge")) {
            return "ui-vendor";
          }

          return "vendor";
        },
      },
    },
  },
}));
