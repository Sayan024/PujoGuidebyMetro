// Production endpoint for the chat assistant (Vercel serves this file at
// /api/chat). Set OPENROUTER_API_KEY in the host's environment.
//
// Two details matter on Vercel: the project is ESM, so relative imports need an
// explicit ".js" extension (the compiler maps it back to the .ts source), and the
// handler uses the classic (req, res) shape, which every Node runtime supports.
import { handleChat } from '../server/chat.js';

// Minimal shapes for the parts of Vercel's request/response used here, so this
// file needs no Node or @vercel/node type packages.
interface Req {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
  /** Vercel parses JSON bodies for us. */
  body?: unknown;
}
interface Res {
  statusCode: number;
  setHeader(name: string, value: string): void;
  write(chunk: Uint8Array): boolean;
  end(chunk?: string): void;
}

const env: Record<string, string | undefined> =
  (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

let cached: Promise<string> | undefined;

export default async function handler(req: Req, res: Res): Promise<void> {
  try {
    const host = first(req.headers['x-forwarded-host']) ?? first(req.headers.host) ?? 'localhost';
    const proto = first(req.headers['x-forwarded-proto']) ?? 'https';
    const origin = `${proto}://${host}`;

    const isPost = req.method === 'POST';
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});

    const response = await handleChat(
      new Request(`${origin}/api/chat`, {
        method: req.method,
        headers: { 'content-type': 'application/json' },
        body: isPost ? body : undefined,
      }),
      {
        apiKey: env.OPENROUTER_API_KEY,
        model: env.OPENROUTER_MODEL,
        clientId: first(req.headers['x-forwarded-for'])?.split(',')[0].trim(),
        // The dataset is a static file served by the same deployment.
        loadContext: () =>
          (cached ??= fetch(`${origin}/llms.md`).then((r) => {
            if (!r.ok) throw new Error(`llms.md ${r.status}`);
            return r.text();
          })).catch((e) => {
            cached = undefined;
            throw e;
          }),
      },
    );

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (!response.body) return res.end();
    // Stream the reply to the browser as it is generated.
    const reader = response.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (error) {
    console.error('[api/chat]', error);
    if (!res.statusCode || res.statusCode < 400) res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'The assistant could not answer just now. Please try again.' }));
  }
}
