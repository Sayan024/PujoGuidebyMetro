import { describe, expect, it } from 'vitest';
import { handleChat } from '../server/chat';
import { handleFeedback } from '../server/feedback';
import { crossSiteResponse } from '../server/guard';
import { toWebRequest } from '../server/node';

const post = (path: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`https://site.example${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', host: 'site.example', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const chatOptions = (clientId: string) => ({ apiKey: 'test-key', loadContext: async () => 'guide data', clientId });

describe('cross-site guard', () => {
  it('lets same-site and header-less requests through, and refuses other sites', () => {
    expect(crossSiteResponse(post('/api/chat', {}))).toBeNull();
    expect(crossSiteResponse(post('/api/chat', {}, { origin: 'https://site.example' }))).toBeNull();
    expect(crossSiteResponse(post('/api/chat', {}, { origin: 'https://evil.example' }))?.status).toBe(403);
    expect(crossSiteResponse(post('/api/chat', {}, { origin: 'not a url' }))?.status).toBe(403);
  });

  it('the Node adapter forwards the origin and host so the guard can see them', () => {
    const req = toWebRequest({ method: 'POST', headers: { origin: 'https://evil.example', host: 'site.example' }, body: {} }, '/api/chat');
    expect(req.headers.get('origin')).toBe('https://evil.example');
    expect(crossSiteResponse(req)?.status).toBe(403);
  });
});

describe('chat endpoint (no network is reached for these)', () => {
  it('only accepts POST', async () => {
    expect((await handleChat(new Request('https://site.example/api/chat'), chatOptions('t1'))).status).toBe(405);
  });

  it('says so when it is not configured', async () => {
    const r = await handleChat(post('/api/chat', { messages: [] }), { ...chatOptions('t2'), apiKey: undefined });
    expect(r.status).toBe(503);
  });

  it('rejects malformed conversations', async () => {
    for (const body of ['{oops', {}, { messages: 'hi' }, { messages: [] }, { messages: [{ role: 'system', content: 'x' }] }, { messages: [{ role: 'assistant', content: 'last' }] }]) {
      const r = await handleChat(post('/api/chat', body), chatOptions('t3'));
      expect(r.status, JSON.stringify(body)).toBe(400);
    }
  });

  it('refuses another website before doing anything', async () => {
    const r = await handleChat(post('/api/chat', { messages: [{ role: 'user', content: 'hi' }] }, { origin: 'https://evil.example' }), chatOptions('t4'));
    expect(r.status).toBe(403);
  });

  it('rate limits one visitor', async () => {
    let last = 0;
    for (let i = 0; i < 25; i++) last = (await handleChat(post('/api/chat', { messages: [] }), chatOptions('same-visitor'))).status;
    expect(last).toBe(429);
    // A different visitor is unaffected.
    expect((await handleChat(post('/api/chat', { messages: [] }), chatOptions('another-visitor'))).status).toBe(400);
  });
});

describe('feedback endpoint (no network is reached for these)', () => {
  const call = (body: unknown, headers?: Record<string, string>) => handleFeedback(post('/api/feedback', body, headers), { clientId: 'f1' });

  it('validates the rating and the email', async () => {
    expect((await call({ rating: 0 })).status).toBe(422);
    expect((await call({ rating: 6 })).status).toBe(422);
    expect((await call({ rating: 'five' })).status).toBe(422);
    expect((await call({ rating: 4, email: 'nope' })).status).toBe(422);
    expect((await call('{oops')).status).toBe(400);
  });

  it('quietly drops bots without sending anything on', async () => {
    const trap = await call({ rating: 5, trap: 'bot', elapsed: 9000 });
    const fast = await call({ rating: 5, elapsed: 50 });
    for (const r of [trap, fast]) {
      expect(r.status).toBe(200);
      expect(await r.json()).toEqual({ ok: true });
    }
  });

  it('refuses another website', async () => {
    expect((await call({ rating: 5 }, { origin: 'https://evil.example' })).status).toBe(403);
  });

  it('only accepts POST', async () => {
    expect((await handleFeedback(new Request('https://site.example/api/feedback'))).status).toBe(405);
  });
});
