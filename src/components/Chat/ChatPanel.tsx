import { motion } from 'motion/react';
import { ArrowUp, RotateCcw, Square, Trash2, X } from 'lucide-react';
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DurgaEyes } from '@/components/ui/Motifs';
import { cn } from '@/lib/utils';
import { useChatStore, type ChatTurn } from './chatStore';

const SUGGESTIONS = [
  'Which pandals near Girish Park are a short walk?',
  'Plan an evening on the Blue Line with three popular pandals',
  'Which pandals have announced their 2026 theme?',
  'কালীঘাট মেট্রোর কাছে কোন কোন পুজো আছে?',
];

// ── A deliberately small Markdown renderer: bold, italics, links and lists ──
function inline(text: string, onNavigate: () => void): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const [, label, href, bold, italic] = match;
    if (label && href) {
      // Only links into this site, or plain https links, are made clickable.
      if (href.startsWith('/') && !href.startsWith('//'))
        out.push(
          <Link key={match.index} to={href} onClick={onNavigate} className="font-semibold text-gold-bright underline decoration-hair underline-offset-4 hover:decoration-gold-bright">
            {label}
          </Link>,
        );
      else if (/^https:\/\//.test(href))
        out.push(
          <a key={match.index} href={href} target="_blank" rel="noreferrer" className="font-semibold text-gold-bright underline decoration-hair underline-offset-4">
            {label}
          </a>,
        );
      else out.push(label);
    } else if (bold) out.push(<strong key={match.index}>{bold}</strong>);
    else if (italic) out.push(<em key={match.index}>{italic}</em>);
    last = pattern.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Markdown({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    blocks.push(
      <Tag key={blocks.length} className={cn('space-y-1.5 pl-5', list.ordered ? 'list-decimal' : 'list-disc marker:text-gold')}>
        {list.items.map((item, i) => (
          <li key={i}>{inline(item, onNavigate)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) {
        flush();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? numbered)![1]);
    } else {
      flush();
      const plain = line.replace(/^#{1,6}\s+/, '').trim();
      if (plain) blocks.push(<p key={blocks.length}>{inline(plain, onNavigate)}</p>);
    }
  }
  flush();
  return <div className="space-y-2.5">{blocks}</div>;
}

function Bubble({ turn, onNavigate, onRetry }: { turn: ChatTurn; onNavigate: () => void; onRetry?: () => void }) {
  if (turn.role === 'user')
    return (
      <div className="ml-10 self-end rounded-md rounded-br-none bg-gradient-to-br from-[#e52d3f] to-[#8e1626] px-3.5 py-2.5 text-[14.5px] text-[#fff4e6]">
        {turn.content}
      </div>
    );
  return (
    <div className="mr-6 self-start rounded-md rounded-bl-none border border-hair-soft bg-surface px-3.5 py-3 text-[14.5px] leading-relaxed">
      {turn.error ? (
        <div className="flex flex-col items-start gap-2.5">
          <p className="text-muted">{turn.error}</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className="chip h-8 text-xs">
              <RotateCcw className="size-3.5" aria-hidden="true" /> Try again
            </button>
          )}
        </div>
      ) : turn.content ? (
        <Markdown text={turn.content} onNavigate={onNavigate} />
      ) : (
        <span className="flex h-5 items-center gap-1.5" role="status" aria-label="Thinking">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-gold" style={{ animation: `flicker 1.2s ease-in-out ${i * 0.18}s infinite` }} />
          ))}
        </span>
      )}
    </div>
  );
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const turns = useChatStore((s) => s.turns);
  const busy = useChatStore((s) => s.busy);
  const ask = useChatStore((s) => s.ask);
  const retry = useChatStore((s) => s.retry);
  const stop = useChatStore((s) => s.stop);
  const clear = useChatStore((s) => s.clear);
  const [draft, setDraft] = useState('');
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);
  // Follow the reply as it streams in.
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [turns]);

  const send = (text = draft) => {
    const question = text.trim();
    if (!question || busy) return;
    setDraft('');
    void ask(question);
  };
  // On phones the panel covers the page, so following a link should reveal it.
  const onNavigate = () => window.matchMedia('(max-width: 1023px)').matches && onClose();
  const last = turns[turns.length - 1];

  return (
    <motion.div
      role="dialog"
      aria-label="Ask the guide"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      className="panel fixed inset-0 z-[75] flex flex-col lg:inset-auto lg:bottom-6 lg:right-6 lg:h-[min(640px,calc(100vh-7.5rem))] lg:w-[410px] lg:rounded-md"
    >
      <header className="flex items-center gap-3 border-b border-hair px-4 py-3.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-hair bg-surface">
          <DurgaEyes className="h-3.5 text-gold-bright" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-semibold leading-tight">Ask the guide</h2>
          <p className="truncate text-[11px] text-muted">AI answers from this guide’s own data</p>
        </div>
        {turns.length > 0 && (
          <button type="button" onClick={clear} className="icon-btn size-9" aria-label="Clear conversation" title="Clear conversation">
            <Trash2 className="size-4" />
          </button>
        )}
        <button type="button" onClick={onClose} className="icon-btn size-9" aria-label="Close">
          <X className="size-4" />
        </button>
      </header>

      <div ref={log} className="thin-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {turns.length === 0 ? (
          <div className="my-auto">
            <p className="font-display text-2xl font-semibold leading-snug">
              Nomoshkar. Where are you getting off the Metro?
            </p>
            <p className="mt-2 text-sm text-muted">
              Ask about pandals near a station, walking distances, themes or the puja calendar — in English, বাংলা or
              Hindi.
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => send(s)}
                    className="w-full border border-hair-soft bg-surface/70 px-3.5 py-2.5 text-left text-[13.5px] transition-colors hover:border-gold/70 hover:text-gold-bright"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          turns.map((t, i) => (
            <Fragment key={t.id}>
              <Bubble turn={t} onNavigate={onNavigate} onRetry={t.error && i === turns.length - 1 ? retry : undefined} />
            </Fragment>
          ))
        )}
      </div>

      <form
        className="border-t border-hair p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:pb-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <div className="flex items-end gap-2 rounded-sm border border-hair bg-surface px-3 py-2 focus-within:border-gold-bright">
          <textarea
            ref={input}
            value={draft}
            rows={1}
            maxLength={1500}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask about a station, pandal or theme…"
            aria-label="Your question"
            className="max-h-28 min-h-[26px] flex-1 resize-none bg-transparent text-[15px] outline-none placeholder:text-muted/70 [field-sizing:content]"
          />
          {busy ? (
            <button type="button" onClick={stop} className="grid size-9 shrink-0 place-items-center rounded-full border border-hair text-ink hover:border-gold" aria-label="Stop answering">
              <Square className="size-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!draft.trim()}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffd66b] to-[#ddaa44] text-[#1a0c08] transition-opacity disabled:opacity-35"
              aria-label="Send"
            >
              <ArrowUp className="size-4" />
            </button>
          )}
        </div>
        <p className="mt-2 px-1 text-[10.5px] leading-snug text-muted">
          {last?.role === 'assistant' && !busy && !last.error
            ? 'AI can be wrong. Check the pandal page before you travel.'
            : 'Themes and timings change; the assistant only knows what this guide lists.'}
        </p>
      </form>
    </motion.div>
  );
}
