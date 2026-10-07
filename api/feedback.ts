// Production endpoint for the feedback form (Vercel serves this at /api/feedback).
// Relative imports carry ".js" because the project is ESM; the compiler maps them
// back to the .ts sources.
import { handleFeedback } from '../server/feedback.js';
import { clientIdOf, failSafe, sendWebResponse, toWebRequest, type NodeReq, type NodeRes } from '../server/node.js';

export default async function handler(req: NodeReq, res: NodeRes): Promise<void> {
  try {
    const response = await handleFeedback(toWebRequest(req, '/api/feedback'), { clientId: clientIdOf(req) });
    await sendWebResponse(response, res);
  } catch (error) {
    console.error('[api/feedback]', error);
    failSafe(res, 'Your feedback could not be sent just now. Please try again.');
  }
}
