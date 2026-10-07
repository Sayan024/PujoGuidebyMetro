import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs/promises';
import { Readable } from 'node:stream';
import { fileURLToPath, URL } from 'node:url';
import { handleChat } from './server/chat';

/**
 * Serves POST /api/chat from the dev and preview servers, so the assistant
 * works locally with the key read from .env on the server side only.
 */
function chatApi(env: Record<string, string>): Plugin {
  const llms = fileURLToPath(new URL('./public/llms.md', import.meta.url));
  const middleware: Connect.NextHandleFunction = async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/chat') return next();
    try {
      const response = await handleChat(
        new Request(`http://${req.headers.host ?? 'localhost'}${req.url}`, {
          method: req.method,
          headers: { 'content-type': 'application/json' },
          body: req.method === 'POST' ? (Readable.toWeb(req) as unknown as BodyInit) : undefined,
          // Required by Node when the request body is a stream.
          duplex: 'half',
        } as RequestInit),
        {
          apiKey: env.OPENROUTER_API_KEY,
          model: env.OPENROUTER_MODEL,
          clientId: req.socket.remoteAddress,
          loadContext: () => fs.readFile(llms, 'utf8'),
        },
      );
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      if (response.body) Readable.fromWeb(response.body as never).pipe(res);
      else res.end();
    } catch (error) {
      console.error('[chat]', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'The assistant could not answer just now.' }));
    }
  };
  return {
    name: 'pujo-chat-api',
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  };
}

export default defineConfig(({ mode }) => {
  // The empty prefix loads every variable for server-side use. Nothing here is
  // exposed to client code: only VITE_-prefixed variables ever are, and there are none.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), chatApi(env)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2022',
      chunkSizeWarningLimit: 1100,
    },
  };
});
