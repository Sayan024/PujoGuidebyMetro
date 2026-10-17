/**
 * Shared checks for the API handlers.
 */

/**
 * Browsers always send an Origin header on a cross-site POST. If one is present and is not this
 * site, refuse: it stops other websites from using this visitor's browser to call the API.
 * (Requests with no Origin, such as curl, are left to the rate limits.)
 */
export function crossSiteResponse(request: Request): Response | null {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? new URL(request.url).host;
  try {
    if (new URL(origin).host === host) return null;
  } catch {
    /* an unparseable Origin is treated as foreign */
  }
  return new Response(JSON.stringify({ error: 'Not allowed from this site.' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

/** A fetch that gives up after `ms`, so a slow upstream cannot hold a function open. */
export const withTimeout = (ms: number) => AbortSignal.timeout(ms);

/**
 * Fetch that is abandoned only if the server has not started answering within `ms`;
 * once headers arrive the body (a stream) can take as long as it needs. Returns null on failure.
 */
export async function fetchWithHeaderTimeout(url: string, init: RequestInit, ms: number): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
