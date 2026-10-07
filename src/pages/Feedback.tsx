import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, ExternalLink, Loader2, MessageSquareHeart, TriangleAlert } from 'lucide-react';
import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Alpana } from '@/components/ui/Motifs';
import { Reveal } from '@/components/ui/primitives';
import { FEEDBACK_FORM_URL, MAX_TEXT, USES } from '@/data/feedback';
import { usePageTitle } from '@/hooks/useMedia';
import { cn } from '@/lib/utils';

const COOLDOWN_MS = 30_000;
const STORAGE_KEY = 'pbm-feedback-at';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = 'idle' | 'sending' | 'sent';

function lastSentAt() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function Field({ label, hint, error, children, id }: { label: string; hint?: string; error?: string; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px] font-semibold">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      <div className="mt-2.5">{children}</div>
      {error && (
        <p role="alert" className="mt-2 flex items-center gap-2 text-sm text-red">
          <TriangleAlert className="size-4 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  'w-full rounded-sm border border-hair bg-surface/70 px-4 py-3 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted/60 focus:border-gold-bright focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--gold)_18%,transparent)]';

export default function FeedbackPage() {
  usePageTitle('Feedback');
  const uid = useId();
  const opened = useRef(Date.now());

  const [rating, setRating] = useState(0);
  const [uses, setUses] = useState<string[]>([]);
  const [worked, setWorked] = useState('');
  const [better, setBetter] = useState('');
  const [wrong, setWrong] = useState('');
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState(''); // honeypot: people never see or fill this
  const [errors, setErrors] = useState<{ rating?: string; email?: string; form?: string }>({});
  const [status, setStatus] = useState<Status>('idle');

  const reset = () => {
    setRating(0);
    setUses([]);
    setWorked('');
    setBetter('');
    setWrong('');
    setEmail('');
    setErrors({});
    setStatus('idle');
    opened.current = Date.now();
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    const next: typeof errors = {};
    if (!rating) next.rating = 'Please choose a rating from 1 to 5.';
    if (email.trim() && !EMAIL.test(email.trim())) next.email = 'That email address doesn’t look right. Fix it, or leave it blank.';
    if (Date.now() - lastSentAt() < COOLDOWN_MS) next.form = 'You just sent feedback. Please wait a few seconds before sending more.';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});

    setStatus('sending');
    try {
      // The server passes this to the Google Form and reports Google's real answer, so
      // "sent" below means Google accepted it. The hidden field and the time spent on the
      // page let the server quietly drop bots.
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          uses,
          worked,
          better,
          wrong,
          email: email.trim(),
          trap,
          elapsed: Date.now() - opened.current,
        }),
      });
      if (!response.ok) {
        const detail = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(detail?.error || 'We couldn’t send that. Please try again.');
      }
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {
        /* storage blocked: the cooldown just won't apply */
      }
      setStatus('sent');
    } catch (error) {
      setStatus('idle');
      setErrors({
        form:
          error instanceof TypeError
            ? 'We couldn’t reach the server. Check your connection and try again.'
            : (error as Error).message,
      });
    }
  }

  return (
    <div className="relative overflow-hidden">
      <Alpana className="pointer-events-none absolute -right-60 top-20 size-[760px] text-gold opacity-[0.06]" />
      <div className="shell relative grid gap-12 pt-28 md:pt-36 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <MessageSquareHeart className="size-4" aria-hidden="true" /> Feedback
            </p>
            <h1 className="display mt-4 text-[clamp(2.6rem,6vw,5.4rem)]">
              Help make it <em className="gold-text gold-text-auto font-medium">better</em>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted md:text-lg">
              Found a wrong distance, a missing pandal, or something that confused you? Tell us. It takes about a minute.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-md space-y-3 text-sm text-muted">
            <p>
              Your answers go to the guide’s creator through Google Forms. Nothing is stored on this site. Add an email address
              only if you would like a reply.
            </p>
            <p>
              Prefer Google’s own page?{' '}
              <a href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-gold-bright underline-offset-4 hover:underline">
                Open the form <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="panel flex flex-col items-start p-8 md:p-12"
                role="status"
              >
                <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#ffd66b] to-[#ddaa44] text-[#1a0c08]">
                  <Check className="size-7" aria-hidden="true" />
                </span>
                <h2 className="display mt-6 text-4xl md:text-5xl">Thank you</h2>
                <p lang="bn" className="mt-2 font-bn text-lg text-gold">
                  ধন্যবাদ — শুভ শারদীয়া।
                </p>
                <p className="mt-4 max-w-md text-muted">Your feedback has been sent. Every note helps the guide get better before the next night of pandal-hopping.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/explore" className="btn btn-primary">
                    Back to the explorer <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <button type="button" className="btn btn-ghost" onClick={reset}>
                    Send more feedback
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="panel space-y-8 p-6 md:p-10"
                aria-label="Feedback form"
              >
                {/* 1. Rating */}
                <fieldset>
                  <legend className="text-[15px] font-semibold">
                    How was your experience with Pujo by Metro? <span className="text-red" aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </legend>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="hidden w-14 text-right text-[11px] font-bold uppercase tracking-[0.16em] text-muted sm:block">Poor</span>
                    <div className="grid flex-1 grid-cols-5 gap-2 sm:max-w-[340px]">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <label key={n} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name={`${uid}-rating`}
                            value={n}
                            checked={rating === n}
                            onChange={() => setRating(n)}
                            className="peer sr-only"
                            aria-label={`${n} of 5${n === 1 ? ', poor' : n === 5 ? ', excellent' : ''}`}
                          />
                          <span className="grid h-12 place-items-center rounded-sm border border-hair-soft bg-surface/70 font-display text-xl font-semibold text-muted transition-colors hover:border-gold peer-checked:border-[#ffd66b] peer-checked:bg-gradient-to-br peer-checked:from-[#ffd66b] peer-checked:to-[#ddaa44] peer-checked:text-[#1a0c08] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-bright">
                            {n}
                          </span>
                        </label>
                      ))}
                    </div>
                    <span className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-muted sm:block">Excellent</span>
                  </div>
                  <p className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-muted sm:hidden">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </p>
                  {errors.rating && (
                    <p role="alert" className="mt-2 flex items-center gap-2 text-sm text-red">
                      <TriangleAlert className="size-4 shrink-0" aria-hidden="true" /> {errors.rating}
                    </p>
                  )}
                </fieldset>

                {/* 2. What did you use it for */}
                <fieldset>
                  <legend className="text-[15px] font-semibold">What did you use it for?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {USES.map((use) => (
                      <label key={use} className="relative cursor-pointer">
                        <input
                          type="checkbox"
                          checked={uses.includes(use)}
                          onChange={(e) => setUses((cur) => (e.target.checked ? [...cur, use] : cur.filter((u) => u !== use)))}
                          className="peer sr-only"
                        />
                        <span className="chip peer-checked:border-[#ffd66b] peer-checked:bg-gradient-to-br peer-checked:from-[#ffd66b] peer-checked:to-[#ddaa44] peer-checked:text-[#1a0c08] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-bright">
                          {use}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field id={`${uid}-worked`} label="What worked well?">
                  <textarea id={`${uid}-worked`} rows={3} maxLength={MAX_TEXT} value={worked} onChange={(e) => setWorked(e.target.value)} className={cn(inputClass, 'min-h-[92px] resize-y')} />
                </Field>
                <Field id={`${uid}-better`} label="What should be better?">
                  <textarea id={`${uid}-better`} rows={3} maxLength={MAX_TEXT} value={better} onChange={(e) => setBetter(e.target.value)} className={cn(inputClass, 'min-h-[92px] resize-y')} />
                </Field>
                <Field id={`${uid}-wrong`} label="Is any pandal, station, distance or theme wrong?" hint="Name it and tell us what is correct.">
                  <textarea id={`${uid}-wrong`} rows={3} maxLength={MAX_TEXT} value={wrong} onChange={(e) => setWrong(e.target.value)} className={cn(inputClass, 'min-h-[92px] resize-y')} />
                </Field>
                <Field id={`${uid}-email`} label="Email, only if you’d like a reply" error={errors.email}>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    className={inputClass}
                  />
                </Field>

                {/* Honeypot, hidden from people and assistive technology */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Leave this empty
                    <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                  </label>
                </div>

                {errors.form && (
                  <div role="alert" className="rounded-sm border border-red/40 bg-red/10 px-4 py-3 text-sm">
                    <p className="flex items-start gap-2">
                      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red" aria-hidden="true" /> {errors.form}
                    </p>
                    <a href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 font-semibold text-gold-bright underline-offset-4 hover:underline">
                      Open the Google Form instead <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 border-t border-hair-soft pt-6">
                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary min-w-[180px] disabled:opacity-70">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        Send feedback <ArrowRight className="size-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted">Only the rating is required.</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </div>
  );
}
