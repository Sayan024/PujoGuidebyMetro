import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Download, ExternalLink, Navigation, QrCode, Share2, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

export interface MapShareOption {
  id: string;
  label: string;
  url: string;
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  /** One link, or several to switch between (for example walking and driving). */
  options: MapShareOption[];
  /** Extra guidance shown under the QR. */
  note?: ReactNode;
  /** Used for the downloaded QR's file name. */
  fileName?: string;
  /** This guide's own page for the place, offered as a secondary link to copy. */
  pageUrl?: string;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'location';

/** QR code plus Open / Copy / Share / Download for a Google Maps link. */
export function MapShareDialog({ open, onClose, title, subtitle, options, note, fileName, pageUrl }: DialogProps) {
  const pushToast = useAppStore((s) => s.pushToast);
  const [optionId, setOptionId] = useState(options[0]?.id);
  const [svg, setSvg] = useState('');
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const option = options.find((o) => o.id === optionId) ?? options[0];
  const url = option?.url ?? '';

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      opener.current?.focus?.();
    };
  }, [open, onClose]);

  // The QR library is fetched only when someone opens this dialog.
  useEffect(() => {
    if (!open || !url) return;
    let live = true;
    setSvg('');
    import('qrcode')
      .then((Q) => Q.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#2c1210', light: '#ffffff' } }))
      .then((s) => live && setSvg(s))
      .catch(() => live && setSvg('error'));
    return () => {
      live = false;
    };
  }, [open, url]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      pushToast('Copying is blocked in this browser');
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title, text: `${title}${subtitle ? ` — ${subtitle}` : ''} (Google Maps)`, url });
    } catch {
      /* share sheet dismissed */
    }
  };

  const download = async () => {
    try {
      const Q = await import('qrcode');
      const png = await Q.toDataURL(url, { width: 720, margin: 2, errorCorrectionLevel: 'M', color: { dark: '#2c1210', light: '#ffffff' } });
      const a = document.createElement('a');
      a.href = png;
      a.download = `${slug(fileName ?? title)}-google-maps-qr.png`;
      a.click();
    } catch {
      pushToast('Could not create the QR image');
    }
  };

  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center p-3 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button type="button" className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mapshare-title"
            className="panel relative max-h-[92vh] w-full max-w-[420px] overflow-y-auto p-5 sm:p-6"
            initial={{ y: 24, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="eyebrow flex items-center gap-2">
                  <QrCode className="size-3.5" aria-hidden="true" /> Scan to open in Google Maps
                </p>
                <h2 id="mapshare-title" className="mt-2 font-display text-xl font-bold leading-tight">
                  {title}
                </h2>
                {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
              </div>
              <button ref={closeRef} type="button" className="icon-btn size-9 shrink-0" onClick={onClose} aria-label="Close">
                <X className="size-4" />
              </button>
            </div>

            {options.length > 1 && (
              <div role="radiogroup" aria-label="Route type" className="mt-4 grid grid-cols-2 gap-1 rounded-full border border-hair p-1">
                {options.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={o.id === option?.id}
                    onClick={() => setOptionId(o.id)}
                    className={cn(
                      'h-9 rounded-full text-xs font-bold uppercase tracking-[0.12em] transition-colors',
                      o.id === option?.id ? 'bg-ink text-bg' : 'text-muted hover:text-ink',
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}

            {/* White plate behind the code: scanners need contrast whatever the theme. */}
            <div className="mx-auto mt-5 grid aspect-square w-full max-w-[260px] place-items-center rounded-2xl border border-hair bg-white p-3 shadow-[var(--shadow)]">
              {svg && svg !== 'error' ? (
                <div
                  role="img"
                  aria-label={`QR code that opens ${title} in Google Maps`}
                  className="size-full [&>svg]:size-full"
                  // Markup generated locally by the qrcode library from our own link.
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ) : svg === 'error' ? (
                <p className="px-4 text-center text-sm text-[#6e5a52]">The QR code could not be drawn. Use the buttons below instead.</p>
              ) : (
                <div className="skeleton size-full rounded-lg" aria-label="Drawing QR code" />
              )}
            </div>

            {note && <div className="mt-4 text-xs leading-relaxed text-muted">{note}</div>}

            <div className="mt-5 grid gap-2">
              <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
                <Navigation className="size-4" aria-hidden="true" /> Open in Google Maps
                <ExternalLink className="size-3.5 opacity-80" aria-hidden="true" />
              </a>
              <div className={cn('grid gap-2', canShare ? 'grid-cols-3' : 'grid-cols-2')}>
                <button type="button" onClick={copy} className="btn btn-sm btn-ghost !rounded-full !px-2">
                  {copied ? <Check className="size-3.5 text-[#10B981]" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy link'}
                </button>
                {canShare && (
                  <button type="button" onClick={share} className="btn btn-sm btn-ghost !rounded-full !px-2">
                    <Share2 className="size-3.5" aria-hidden="true" /> Share
                  </button>
                )}
                <button type="button" onClick={download} className="btn btn-sm btn-ghost !rounded-full !px-2">
                  <Download className="size-3.5" aria-hidden="true" /> QR image
                </button>
              </div>
              {pageUrl && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(pageUrl);
                      pushToast('Guide page link copied');
                    } catch {
                      pushToast('Copying is blocked in this browser');
                    }
                  }}
                  className="mx-auto mt-1 text-xs font-semibold text-muted underline-offset-4 hover:text-gold-bright hover:underline"
                >
                  Or copy this guide's page link
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/** A button that opens the share dialog. `icon` for tight spots, `label` for full-width use. */
export function MapShareButton({
  variant = 'label',
  label = 'QR & share location',
  className,
  ...dialog
}: Omit<DialogProps, 'open' | 'onClose'> & { variant?: 'icon' | 'label'; label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-label={variant === 'icon' ? `QR code and share link for ${dialog.title} in Google Maps` : undefined}
        title={variant === 'icon' ? 'QR code & share in Google Maps' : undefined}
        className={cn(variant === 'icon' ? 'icon-btn size-[38px] shrink-0' : 'btn btn-sm btn-ghost', className)}
      >
        <QrCode className="size-4" aria-hidden="true" />
        {variant === 'label' && <span>{label}</span>}
      </button>
      <MapShareDialog open={open} onClose={() => setOpen(false)} {...dialog} />
    </>
  );
}
