/**
 * Sends feedback to this site's /api/feedback, which passes it to the guide's Google Form.
 *
 * Nothing is kept in the visitor's browser: a failure is reported so they can try again,
 * rather than being hidden in a local "queue" that nothing ever sends.
 */

/** The shape /api/feedback reads (see server/feedback.ts). Any other field is ignored. */
export interface FeedbackPayload {
  rating: number;
  uses?: string[];
  worked?: string;
  better?: string;
  wrong?: string;
  email?: string;
  /** Honeypot: people never see or fill this. */
  trap?: string;
  /** Milliseconds between opening the form and sending it; bots send instantly. */
  elapsed: number;
}

/** The server refused or could not pass the feedback on; the message is safe to show. */
export class FeedbackError extends Error {}

export async function sendFeedback(payload: FeedbackPayload): Promise<void> {
  // A network failure surfaces as the TypeError fetch throws, which the screens word separately.
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) return;
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  throw new FeedbackError(body?.error ?? 'Your feedback could not be sent just now. Please try again.');
}

/** A correction report, written into the form's "incorrect details" question with its context. */
export function reportText(r: { type: string; message: string; pandal?: string; station?: string; name?: string }): string {
  const where = r.pandal ? ` — ${r.pandal}${r.station ? ` (${r.station} Metro)` : ''}` : '';
  const who = r.name?.trim() ? `\n— ${r.name.trim()}` : '';
  return `${r.type}${where}\n${r.message.trim()}${who}`;
}

// Earlier versions copied every submission, email included, into the browser's storage. Clear that out.
try {
  localStorage.removeItem('pujo_feedback_queue_v2026');
} catch {
  /* storage blocked */
}
