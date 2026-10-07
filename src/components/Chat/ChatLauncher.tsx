import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useChatStore } from './chatStore';

// The panel (and its Markdown renderer) is fetched the first time it is opened.
const ChatPanel = lazy(() => import('./ChatPanel'));

export function ChatLauncher() {
  const open = useChatStore((s) => s.open);
  const setOpen = useChatStore((s) => s.setOpen);
  const { pathname } = useLocation();
  // On the full-screen map the bottom corners hold map controls and the pandal card.
  const onMap = pathname === '/map';

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            aria-label="Ask the guide (AI assistant)"
            aria-haspopup="dialog"
            className={cn(
              'fixed right-4 z-[55] flex h-[52px] items-center gap-2.5 rounded-full border border-[#ffd66b]/60 bg-gradient-to-br from-[#e52d3f] to-[#701525] pl-4 pr-5 text-[#fff4e6] shadow-[0_14px_34px_-10px_rgba(229,45,63,0.8)] lg:right-6',
              onMap ? 'top-[136px] lg:top-[100px]' : 'bottom-[calc(78px+env(safe-area-inset-bottom))] lg:bottom-6',
            )}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]">Ask</span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <Suspense fallback={null}>
            <ChatPanel onClose={() => setOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
