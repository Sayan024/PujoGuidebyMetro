import { create } from 'zustand';

export interface ChatTurn {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  /** Set on an assistant turn that failed; shown instead of the content. */
  error?: string;
}

interface ChatState {
  open: boolean;
  turns: ChatTurn[];
  busy: boolean;
  setOpen: (open: boolean) => void;
  ask: (question: string) => Promise<void>;
  retry: () => void;
  stop: () => void;
  clear: () => void;
}

let nextId = 1;
let controller: AbortController | null = null;

/** Conversation with the guide's assistant. Kept for the session only; nothing is stored. */
export const useChatStore = create<ChatState>()((set, get) => {
  const patchLast = (patch: Partial<ChatTurn> | ((t: ChatTurn) => Partial<ChatTurn>)) =>
    set((s) => {
      const last = s.turns[s.turns.length - 1];
      if (!last || last.role !== 'assistant') return s;
      return { turns: [...s.turns.slice(0, -1), { ...last, ...(typeof patch === 'function' ? patch(last) : patch) }] };
    });

  async function run() {
    controller = new AbortController();
    set((s) => ({ busy: true, turns: [...s.turns, { id: nextId++, role: 'assistant', content: '' }] }));
    try {
      const history = get()
        .turns.filter((t) => !t.error && t.content)
        .map(({ role, content }) => ({ role, content }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const detail = await response.json().catch(() => null);
        throw new Error(
          (detail as { error?: string } | null)?.error ??
            (response.status === 404
              ? 'The assistant is not set up on this server yet.'
              : 'The assistant could not answer just now. Please try again.'),
        );
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) patchLast((t) => ({ content: t.content + chunk }));
      }
      if (!get().turns[get().turns.length - 1]?.content)
        patchLast({ error: 'The assistant returned an empty answer. Please try again.' });
    } catch (error) {
      // A reply the reader stopped keeps whatever had arrived.
      if ((error as Error).name === 'AbortError') {
        if (!get().turns[get().turns.length - 1]?.content) set((s) => ({ turns: s.turns.slice(0, -1) }));
      } else
        patchLast({
          error:
            error instanceof TypeError
              ? 'You appear to be offline, or the assistant cannot be reached.'
              : (error as Error).message,
        });
    } finally {
      controller = null;
      set({ busy: false });
    }
  }

  return {
    open: false,
    turns: [],
    busy: false,
    setOpen: (open) => set({ open }),
    ask: async (question) => {
      if (get().busy) return;
      set((s) => ({ turns: [...s.turns, { id: nextId++, role: 'user', content: question }] }));
      await run();
    },
    retry: () => {
      if (get().busy) return;
      // Drop the failed reply and ask the same question again.
      set((s) => ({ turns: s.turns.slice(0, -1) }));
      void run();
    },
    stop: () => controller?.abort(),
    clear: () => {
      controller?.abort();
      set({ turns: [], busy: false });
    },
  };
});
