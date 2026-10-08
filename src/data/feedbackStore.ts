export interface FeedbackEntry {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  type: string;
  rating: number;
  station?: string;
  pandal?: string;
  message: string;
  source: string;
  status: 'sent' | 'queued';
}

const STORAGE_KEY = 'pujo_feedback_queue_v2026';

export function getQueuedFeedback(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFeedbackToQueue(entry: FeedbackEntry) {
  try {
    const current = getQueuedFeedback();
    const updated = [entry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save feedback to local storage', err);
  }
}

/**
 * Submits feedback to remote endpoint (Google Sheets Webhook / API)
 * or gracefully stores in local CSV queue if offline or unconfigured.
 */
export async function submitFeedback(data: Omit<FeedbackEntry, 'id' | 'timestamp' | 'status'>): Promise<{ success: boolean; queued: boolean; message: string }> {
  const entry: FeedbackEntry = {
    ...data,
    id: `fb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    status: 'queued',
  };

  const endpoint = import.meta.env.VITE_FEEDBACK_ENDPOINT || '/api/feedback';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });

    if (res.ok) {
      entry.status = 'sent';
      saveFeedbackToQueue(entry);
      return { success: true, queued: false, message: 'Feedback sent successfully to organizers!' };
    }
  } catch {
    // remote submission failed, fall through to queue
  }

  // Graceful offline / local CSV queue fallback
  entry.status = 'queued';
  saveFeedbackToQueue(entry);
  return {
    success: true,
    queued: true,
    message: 'Feedback securely saved to local storage queue. Ready for CSV download or automatic sync.',
  };
}

/**
 * Exports all collected feedback as a standard CSV file for the user or administrator.
 */
export function downloadFeedbackCsv() {
  const items = getQueuedFeedback();
  if (items.length === 0) {
    alert('No feedback entries recorded yet.');
    return;
  }

  const headers = ['Timestamp', 'Name', 'Email', 'Type', 'Rating', 'Station', 'Pandal', 'Message', 'Source', 'Status'];
  const rows = items.map((i) => [
    `"${i.timestamp}"`,
    `"${(i.name || '').replace(/"/g, '""')}"`,
    `"${(i.email || '').replace(/"/g, '""')}"`,
    `"${(i.type || '').replace(/"/g, '""')}"`,
    i.rating,
    `"${(i.station || '').replace(/"/g, '""')}"`,
    `"${(i.pandal || '').replace(/"/g, '""')}"`,
    `"${(i.message || '').replace(/"/g, '""')}"`,
    `"${(i.source || '').replace(/"/g, '""')}"`,
    `"${i.status}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pujo-porikroma-feedback-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
