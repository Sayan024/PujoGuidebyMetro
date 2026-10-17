import { afterEach, describe, expect, it, vi } from 'vitest';
import { FIELD } from '@/data/feedback';
import { FeedbackError, reportText, sendFeedback } from '@/lib/sendFeedback';
import { handleFeedback } from '../server/feedback';

/**
 * The client builds a payload and the server forwards it to a Google Form. These tests run the real server
 * handler on the client's real payloads and look at what would be posted to Google, so the two cannot drift
 * apart again (they once did: the comments were silently dropped).
 */
let n = 0;
function viaServer(payload: unknown) {
  const posted: URLSearchParams[] = [];
  const google = vi.fn(async (_url: unknown, init?: RequestInit) => {
    posted.push(new URLSearchParams(String(init?.body)));
    return new Response('ok', { status: 200 });
  });
  vi.stubGlobal('fetch', google);
  const request = new Request('https://site.example/api/feedback', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleFeedback(request, { clientId: `contract-${n++}` }).then((response) => ({ response, posted }));
}

afterEach(() => vi.unstubAllGlobals());

describe('feedback reaches the Google Form with its text', () => {
  it('the Feedback page payload', async () => {
    const { response, posted } = await viaServer({
      rating: 4,
      uses: ['Map', 'Day planner', 'Not a real option'],
      worked: 'The routes page',
      better: 'More Behala pandals',
      wrong: 'Kidderpore 25 Pally is on the wrong lane',
      email: 'visitor@example.com',
      trap: '',
      elapsed: 45_000,
    });
    expect(response.status).toBe(200);
    expect(posted).toHaveLength(1);
    const form = posted[0];
    expect(form.get(FIELD.rating)).toBe('4');
    expect(form.getAll(FIELD.uses)).toEqual(['Map', 'Day planner']); // unknown options are dropped
    expect(form.get(FIELD.worked)).toBe('The routes page');
    expect(form.get(FIELD.better)).toBe('More Behala pandals');
    expect(form.get(FIELD.wrong)).toBe('Kidderpore 25 Pally is on the wrong lane');
    expect(form.get(FIELD.email)).toBe('visitor@example.com');
  });

  it('a "report incorrect information" payload from a pandal page', async () => {
    const wrong = reportText({ type: 'Metro exit / distance issue', message: 'Gate 2 is closer than listed', pandal: 'Behala Club', station: 'Taratala', name: 'Asha' });
    const { response, posted } = await viaServer({ rating: 5, wrong, email: '', trap: '', elapsed: 20_000 });
    expect(response.status).toBe(200);
    const sent = posted[0].get(FIELD.wrong)!;
    expect(sent).toContain('Metro exit / distance issue');
    expect(sent).toContain('Behala Club (Taratala Metro)');
    expect(sent).toContain('Gate 2 is closer than listed');
    expect(sent).toContain('Asha');
    expect(posted[0].has(FIELD.email)).toBe(false); // an empty email is not sent
  });

  it('a bot (filled honeypot or instant send) is told "ok" but nothing is posted', async () => {
    for (const bot of [{ trap: 'x', elapsed: 20_000 }, { trap: '', elapsed: 100 }]) {
      const { response, posted } = await viaServer({ rating: 5, wrong: 'spam', ...bot });
      expect(response.status).toBe(200);
      expect(posted).toHaveLength(0);
    }
  });

  it('a form Google has closed is reported as a failure, not a thank-you', async () => {
    vi.stubGlobal('fetch', async () => new Response('This form is no longer accepting responses', { status: 200 }));
    const request = new Request('https://site.example/api/feedback', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ rating: 5, wrong: 'x', elapsed: 20_000 }),
    });
    const response = await handleFeedback(request, { clientId: 'closed-form' });
    expect(response.status).toBe(502);
  });
});

describe('sendFeedback (browser side)', () => {
  it('resolves only when the server accepted it', async () => {
    const fetchMock = vi.fn(async () => new Response('{"ok":true}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendFeedback({ rating: 5, elapsed: 9000 })).resolves.toBeUndefined();
    expect(JSON.parse(String((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body))).toMatchObject({ rating: 5 });
  });

  it('throws the server\'s message when it refuses, so the screen can show it', async () => {
    vi.stubGlobal('fetch', async () => new Response('{"error":"Please choose a rating from 1 to 5."}', { status: 422 }));
    await expect(sendFeedback({ rating: 0, elapsed: 9000 })).rejects.toThrow('Please choose a rating from 1 to 5.');
    vi.stubGlobal('fetch', async () => new Response('<html>oops</html>', { status: 500 }));
    await expect(sendFeedback({ rating: 5, elapsed: 9000 })).rejects.toBeInstanceOf(FeedbackError);
  });

  it('lets a network failure through as a TypeError', async () => {
    vi.stubGlobal('fetch', async () => {
      throw new TypeError('Failed to fetch');
    });
    await expect(sendFeedback({ rating: 5, elapsed: 9000 })).rejects.toBeInstanceOf(TypeError);
  });

  it('keeps nothing in the browser', async () => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v), removeItem: (k: string) => void store.delete(k) });
    vi.stubGlobal('fetch', async () => new Response('{"ok":true}', { status: 200 }));
    await sendFeedback({ rating: 5, email: 'visitor@example.com', wrong: 'x', elapsed: 9000 });
    expect([...store.keys()]).toEqual([]);
  });
});
