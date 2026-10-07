/**
 * Adapter between Node's (req, res) handlers, which Vercel runs, and the
 * web-standard Request/Response used by the handlers in this folder.
 * Written without Node type packages so the serverless build needs none.
 */

export interface NodeReq {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  /** Vercel parses JSON bodies before the handler runs. */
  body?: unknown;
}

export interface NodeRes {
  statusCode: number;
  setHeader(name: string, value: string): void;
  write(chunk: Uint8Array): boolean;
  end(chunk?: string): void;
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function originOf(req: NodeReq) {
  const host = first(req.headers['x-forwarded-host']) ?? first(req.headers.host) ?? 'localhost';
  const proto = first(req.headers['x-forwarded-proto']) ?? 'https';
  return `${proto}://${host}`;
}

export const clientIdOf = (req: NodeReq) => first(req.headers['x-forwarded-for'])?.split(',')[0].trim();

export function toWebRequest(req: NodeReq, path: string): Request {
  const hasBody = req.method === 'POST';
  const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
  return new Request(`${originOf(req)}${path}`, {
    method: req.method,
    headers: { 'content-type': 'application/json' },
    body: hasBody ? body : undefined,
  });
}

/** Writes a web Response to a Node response, streaming the body as it arrives. */
export async function sendWebResponse(response: Response, res: NodeRes) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  if (!response.body) return res.end();
  const reader = response.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
}

/** Last-resort reply when a handler throws, so visitors never see a raw platform error. */
export function failSafe(res: NodeRes, message: string) {
  if (!res.statusCode || res.statusCode < 400) res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: message }));
}
