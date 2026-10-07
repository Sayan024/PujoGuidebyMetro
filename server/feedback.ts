/**
 * Receives the feedback form and passes it to the Google Form.
 *
 * It goes through the server, not straight from the browser, because browsers
 * cannot read Google's reply to a cross-origin form post. Here the real status
 * is checked, so the visitor is told "sent" only when Google accepted it.
 */
import { FEEDBACK_SUBMIT_URL, FIELD, MAX_TEXT, USES } from '../src/data/feedback.js';

const EMAIL = /^[^\s@]+@[^\s@]{1,}\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2500;

// Light in-memory limiter: a few messages per visitor per window.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function allowed(id: string) {
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(id, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}

const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const text = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, MAX_TEXT) : '');

export async function handleFeedback(request: Request, options: { clientId?: string } = {}): Promise<Response> {
  if (request.method !== 'POST') return reply(405, { error: 'Use POST.' });

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return reply(400, { error: 'Invalid request.' });
  }

  const rating = Number(data.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return reply(422, { error: 'Please choose a rating from 1 to 5.' });
  const email = text(data.email);
  if (email && !EMAIL.test(email)) return reply(422, { error: 'That email address doesn’t look right.' });
  const uses = Array.isArray(data.uses) ? data.uses.filter((u): u is (typeof USES)[number] => USES.includes(u as never)) : [];

  // Bots fill the hidden field and submit instantly: accept quietly and send nothing.
  if (text(data.trap) || Number(data.elapsed) < MIN_FILL_MS) return reply(200, { ok: true });

  if (!allowed(options.clientId ?? 'anonymous')) return reply(429, { error: 'You’ve sent a few messages already. Please try again in a few minutes.' });

  const form = new URLSearchParams();
  form.append(FIELD.rating, String(rating));
  for (const use of new Set(uses)) form.append(FIELD.uses, use);
  for (const [key, value] of [
    [FIELD.worked, text(data.worked)],
    [FIELD.better, text(data.better)],
    [FIELD.wrong, text(data.wrong)],
    [FIELD.email, email],
  ] as const)
    if (value) form.append(key, value);
  form.append('fvv', '1');
  form.append('pageHistory', '0');

  const unavailable = reply(502, {
    error: 'The feedback form isn’t accepting messages right now. Please try the Google Form link below.',
  });

  let google: Response;
  try {
    google = await fetch(FEEDBACK_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    });
  } catch (error) {
    console.error('[feedback] could not reach Google Forms:', error);
    return unavailable;
  }

  const page = await google.text().catch(() => '');
  // A closed form still answers 200, so look for its message too.
  const closed = /no longer accepting|not accepting responses/i.test(page);
  if (!google.ok || closed) {
    console.error(`[feedback] Google Forms rejected the response: HTTP ${google.status}${closed ? ' (form closed)' : ''}`);
    return unavailable;
  }
  return reply(200, { ok: true });
}
