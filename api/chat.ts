// Production endpoint for the chat assistant, as a web-standard serverless
// function (Vercel runs this file as-is at /api/chat; other hosts can wrap
// handleChat the same way). Set OPENROUTER_API_KEY in the host's environment.
import { handleChat } from '../server/chat';

let cached: Promise<string> | undefined;

export default {
  async fetch(request: Request): Promise<Response> {
    const origin = new URL(request.url).origin;
    return handleChat(request, {
      apiKey: process.env.OPENROUTER_API_KEY,
      model: process.env.OPENROUTER_MODEL,
      clientId: request.headers.get('x-forwarded-for')?.split(',')[0].trim(),
      // The dataset is a static file of the same deployment.
      loadContext: () =>
        (cached ??= fetch(`${origin}/llms.md`).then((r) => {
          if (!r.ok) throw new Error(`llms.md ${r.status}`);
          return r.text();
        })).catch((e) => {
          cached = undefined;
          throw e;
        }),
    });
  },
};
