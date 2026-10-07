// Production endpoint for the chat assistant (Vercel serves this file at
// /api/chat). Set OPENROUTER_API_KEY in the host's environment.
//
// Relative imports carry ".js" because the project is ESM (the compiler maps them
// back to the .ts sources), and the handler uses the classic (req, res) shape,
// which every Node runtime supports.
import { handleChat } from '../server/chat.js';
import { clientIdOf, failSafe, originOf, sendWebResponse, toWebRequest, type NodeReq, type NodeRes } from '../server/node.js';

// Read through globalThis so this file needs no Node type definitions.
const env: Record<string, string | undefined> =
  (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

let cached: Promise<string> | undefined;

export default async function handler(req: NodeReq, res: NodeRes): Promise<void> {
  try {
    const origin = originOf(req);
    const response = await handleChat(toWebRequest(req, '/api/chat'), {
      apiKey: env.OPENROUTER_API_KEY,
      model: env.OPENROUTER_MODEL,
      clientId: clientIdOf(req),
      // The dataset is a static file served by the same deployment.
      loadContext: () =>
        (cached ??= fetch(`${origin}/llms.md`).then((r) => {
          if (!r.ok) throw new Error(`llms.md ${r.status}`);
          return r.text();
        })).catch((e) => {
          cached = undefined;
          throw e;
        }),
    });
    await sendWebResponse(response, res);
  } catch (error) {
    console.error('[api/chat]', error);
    failSafe(res, 'The assistant could not answer just now. Please try again.');
  }
}
