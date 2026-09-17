import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Serveert de Vercel-functies uit ./api ook in `vite dev`, zodat het
 * contactformulier lokaal getest kan worden. Op Vercel doet Vercel dit zelf.
 */
function devApi(): Plugin {
  return {
    name: "fixz24-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        const name = req.url.slice(5).split("?")[0].replace(/[^a-z0-9-]/gi, "");
        try {
          const mod = await server.ssrLoadModule(path.resolve(import.meta.dirname, "api", `${name}.ts`));
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const raw = Buffer.concat(chunks).toString("utf8");
          const body = raw && (req.headers["content-type"] || "").includes("json") ? JSON.parse(raw) : raw;
          let status = 200;
          const shim = {
            status(code: number) { status = code; return shim; },
            setHeader(k: string, v: string) { res.setHeader(k, v); },
            json(data: unknown) {
              res.statusCode = status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            },
          };
          await mod.default({ method: req.method, body, headers: req.headers }, shim);
        } catch (err) {
          console.error(`[dev-api] ${req.url}`, err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Interne fout in API-route" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // .env-variabelen (RESEND_API_KEY etc.) beschikbaar maken voor de dev-API
  Object.assign(process.env, loadEnv(mode, import.meta.dirname, ""));
  return {
    plugins: [react(), tailwindcss(), devApi()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: false,
      host: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
