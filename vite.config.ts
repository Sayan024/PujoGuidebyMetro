import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs/promises';
import { Readable } from 'node:stream';
import { fileURLToPath, URL } from 'node:url';
import { handleChat } from './server/chat';
import { handleFeedback } from './server/feedback';

/**
 * Serves the site's two API routes from the dev and preview servers, so they work
 * locally with secrets read from .env on the server side only. In production the
 * same handlers run as the serverless functions in /api.
 */
function localApi(env: Record<string, string>): Plugin {
  const llms = fileURLToPath(new URL('./public/llms.md', import.meta.url));

  const routes: Record<string, (request: Request, clientId?: string) => Promise<Response>> = {
    '/api/chat': (request, clientId) =>
      handleChat(request, {
        apiKey: env.OPENROUTER_API_KEY,
        model: env.OPENROUTER_MODEL,
        clientId,
        loadContext: () => fs.readFile(llms, 'utf8'),
      }),
    '/api/feedback': (request, clientId) => handleFeedback(request, { clientId }),
  };

  const middleware: Connect.NextHandleFunction = async (req, res, next) => {
    const route = routes[req.url?.split('?')[0] ?? ''];
    if (!route) return next();
    try {
      const response = await route(
        new Request(`http://${req.headers.host ?? 'localhost'}${req.url}`, {
          method: req.method,
          headers: { 'content-type': 'application/json' },
          body: req.method === 'POST' ? (Readable.toWeb(req) as unknown as BodyInit) : undefined,
          // Required by Node when the request body is a stream.
          duplex: 'half',
        } as RequestInit),
        req.socket.remoteAddress,
      );
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      if (response.body) Readable.fromWeb(response.body as never).pipe(res);
      else res.end();
    } catch (error) {
      console.error('[api]', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'The request could not be completed just now.' }));
    }
  };

  return {
    name: 'pujo-local-api',
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  };
}

export default defineConfig(({ mode }) => {
  // The empty prefix loads every variable for server-side use. Nothing here is
  // exposed to client code: only VITE_-prefixed variables ever are, and there are none.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), localApi(env)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2022',
      chunkSizeWarningLimit: 1100,
    },
  };
});
