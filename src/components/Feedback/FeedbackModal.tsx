import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Download, Send, CheckCircle2, MessageSquare, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { submitFeedback, downloadFeedbackCsv, getQueuedFeedback } from '@/data/feedbackStore';

export function FeedbackModal() {
  const modal = useAppStore((s) => s.feedbackModal);
  const close = useAppStore((s) => s.closeFeedbackModal);
  const pushToast = useAppStore((s) => s.pushToast);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Incorrect information on pandal');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
    if (modal.open) {
      if (modal.type) setType(modal.type);
      else if (modal.pandal) setType('Incorrect information on pandal');
      if (modal.incorrectField) {
        setMessage(`Correction needed regarding: ${modal.incorrectField}\nDetails: `);
      }
      setQueueCount(getQueuedFeedback().length);
      setSubmitted(false);
    }
  }, [modal]);

  if (!modal.open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    const result = await submitFeedback({
      name: name.trim() || 'Anonymous Pilgrim',
      email: email.trim(),
      type,
      rating,
      station: modal.station,
      pandal: modal.pandal,
      message: message.trim(),
      source: 'web_modal_v2026',
    });
    setSubmitting(false);
    setSubmitted(true);
    setQueueCount(getQueuedFeedback().length);
    pushToast(result.message, 'save');

    setTimeout(() => {
      close();
      setSubmitted(false);
      setMessage('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={close}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-md border border-hair bg-[#1c0c10] p-6 shadow-2xl sm:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-hair-soft pb-4">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="size-5 text-gold-bright" />
                <h3 className="font-display text-xl font-bold text-ink">
                  {modal.pandal ? 'Report Incorrect Information' : 'Send Pujo Feedback'}
                </h3>
              </div>
              <p className="mt-1 text-xs text-muted">
                Help us keep Kolkata & Howrah pandal timings, routes, and parking 100% authentic.
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              className="icon-btn size-8"
              aria-label="Close feedback modal"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Context Banner */}
          {modal.pandal && (
            <div className="mt-4 flex items-center gap-2 rounded-sm border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-gold-light">
              <AlertTriangle className="size-4 shrink-0 text-gold" />
              <span>
                Referencing: <strong>{modal.pandal}</strong> {modal.station ? `(${modal.station} Metro)` : ''}
              </span>
            </div>
          )}

          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
              <h4 className="mt-4 text-lg font-bold text-ink">Thank You!</h4>
              <p className="mt-1 text-xs text-muted">
                Your feedback has been recorded and safely queued.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                  Feedback Category
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1.5 w-full rounded-sm border border-hair bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-gold"
                >
                  <option value="Incorrect information on pandal">Incorrect information on pandal</option>
                  <option value="Parking detail correction">Parking / Directions correction</option>
                  <option value="Missing pandal">Add a missing pandal</option>
                  <option value="Metro station / exit error">Metro exit / distance issue</option>
                  <option value="General appreciation or idea">General suggestion</option>
                </select>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                  Your Experience Rating
                </label>
                <div className="mt-1.5 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`${star} star rating`}
                      className="p-1 text-gold transition-transform hover:scale-110"
                    >
                      <Star
                        className={`size-6 ${rating >= star ? 'fill-gold text-gold' : 'text-muted/40'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                  Correction or Feedback Message <span className="text-red">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Walking distance from Gate 2 is 500m, or car parking near Mandirtala is paid ₹20..."
                  className="mt-1.5 w-full rounded-sm border border-hair bg-surface p-3 text-sm text-ink outline-none focus:border-gold placeholder:text-muted/50"
                />
              </div>

              {/* Optional Name & Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sayan"
                    className="mt-1 w-full rounded-sm border border-hair bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                    Email (for reply)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="mt-1 w-full rounded-sm border border-hair bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={downloadFeedbackCsv}
                  className="btn btn-sm btn-ghost text-xs"
                  title="Download all stored feedback as a CSV file"
                >
                  <Download className="size-3.5" />
                  <span>CSV Queue ({queueCount})</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={close}
                    className="btn btn-sm btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !message.trim()}
                    className="btn btn-sm btn-primary"
                  >
                    {submitting ? 'Saving...' : 'Submit Feedback'}
                    <Send className="size-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
