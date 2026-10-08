import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Shield, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { PoliceMapViewer } from './PoliceMapViewer';

export function PoliceMapModal() {
  const isOpen = useAppStore((s) => s.policeMapModalOpen);
  const close = useAppStore((s) => s.closePoliceMapModal);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="police-map-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          data-theme="dark" className="relative z-10 flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[22px] border border-hair bg-[#140608] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hair-soft bg-[#1c080d] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-sm bg-red/20 text-red border border-red/40">
                <Shield className="size-4" />
              </div>
              <div>
                <h3 id="police-map-modal-title" className="font-display text-base font-bold text-ink sm:text-lg">
                  Kolkata Police Puja Guide <span className="text-gold-bright">Traffic Map</span>
                </h3>
                <p className="text-[11px] text-muted hidden sm:block">
                  Official IndianOil – Kolkata Police Traffic Circulation & Puja Guide Map
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/img/kolkata-police-puja-map.jpg"
                download="Kolkata-Police-Puja-Guide-Map-2026.jpg"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-ghost hidden sm:inline-flex text-gold-bright"
                title="Download High-Resolution Map (4.2 MB)"
              >
                <Download className="size-3.5" /> High-Res Map
              </a>
              <button
                type="button"
                onClick={close}
                className="icon-btn size-8 shrink-0 hover:bg-surface-elevated text-muted hover:text-ink"
                aria-label="Close Kolkata Police Map"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Map Viewer Component */}
          <div className="relative flex-1 overflow-hidden">
            <PoliceMapViewer height="100%" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
