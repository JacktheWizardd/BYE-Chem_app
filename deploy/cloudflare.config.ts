import { defineConfig } from "cf/config";

// BYE Chem demo: its own Worker. Never deploy over another Worker (bye-math-app, bye-chem-preview, ...).
// Serves ../dist, built by `npm run build:web`.
export default defineConfig({
  worker: {
    name: "bye-chem-demo",
    compatibilityDate: "2026-11-01",
    observability: { enabled: true },
    assets: {
      // App routes such as /chapter/4 get the single-page index.html.
      notFoundHandling: "single-page-application",
    },
  },
});
