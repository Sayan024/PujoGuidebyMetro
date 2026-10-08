import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Music,
  Flame,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/primitives';

// October 10, 2026 at 04:00 AM IST
const MAHALAYA_TARGET = new Date('2026-10-10T04:00:00+05:30').getTime();

// Musical notes for floating particle animation
const FLOATING_NOTES = ['♪', '♫', '♬', '𝄞', '♩', '𝄢', '♫', '♪'];

export function MahalayaMorning() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [activeBand, setActiveBand] = useState<'mw' | 'fm' | 'sw'>('mw');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer to 4:00 AM on Mahalaya
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = MAHALAYA_TARGET - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Audio stream URL with fallback
  const audioSrc = import.meta.env.VITE_MAHALAYA_AUDIO_URL || '/audio/dhak-loop.mp3';

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds),
    );
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    audioRef.current.muted = next;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Needle position along the analog radio scale (0% to 100%)
  const needlePercent = duration > 0 ? (currentTime / duration) * 100 : 38; // Default needle rests on Akashvani 657 kHz

  return (
    <section id="mahalaya" aria-labelledby="mahalaya-title" className="shell pt-24 md:pt-36">
      <SectionHeading
        eyebrow="Dawn of the Goddess"
        title={
          <span id="mahalaya-title">
            Mahalaya Morning <em className="font-medium text-gold">4:00 AM Radio</em>
          </span>
        }
        lead="The immortal dawn when conch shells echo, Shiuli flowers perfume the dewy grass, and Birendra Krishna Bhadra’s voice on the radio signals Maa Durga’s homecoming."
      />

      {/* Main Vintage Atmospheric Card */}
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-gold/30 bg-[#160807] shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
        {/* Subtle Decorative Arch / Jharokha Motif Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_50%_0%,#f59e0b_0%,transparent_75%)]"
        />

        <div className="relative z-10 grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12 xl:p-12 items-center">
          {/* Left Column: Traditional Autumn Vignette & Storytelling */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Radio Tradition Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-bright shadow-sm">
                <Radio className="size-3.5 text-gold-bright animate-pulse" />
                <span>Akashvani Kolkata Tradition • 10 October 2026</span>
              </div>

              {/* Shloka Header */}
              <div className="mt-5">
                <p className="font-bn text-base text-gold-bright drop-shadow-sm font-semibold tracking-wide">
                  ॥ আশ্বিনের শারদপ্রাতে বেজে উঠেছে আলোকপঞ্জরী ॥
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-ink sm:text-3xl leading-snug">
                  The Historic 4:00 AM Awakening
                </h3>
                <p className="mt-2 text-xs md:text-sm text-muted leading-relaxed">
                  Before sunrise on Mahalaya, millions across Bengal tune into their vintage valve radios. The fragrant incense of Dhuno wafts through the morning chill as Birendra Krishna Bhadra’s timeless Chandipath resounds.
                </p>
              </div>

              {/* Countdown Flip Clock Counter */}
              <div className="mt-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light/80 flex items-center gap-1.5">
                  <Sparkles className="size-3 text-gold" />
                  Countdown to Mahalaya Morning Broadcast
                </p>
                <div className="grid grid-cols-4 gap-2 text-center sm:gap-3">
                  {[
                    { val: timeLeft.days, label: 'Days' },
                    { val: timeLeft.hours, label: 'Hours' },
                    { val: timeLeft.minutes, label: 'Mins' },
                    { val: timeLeft.seconds, label: 'Secs' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gold/25 bg-gradient-to-b from-[#260f0d] to-[#160807] p-2.5 sm:p-3.5 shadow-lg"
                    >
                      <span className="font-display block text-2xl sm:text-3xl font-bold text-gold-bright tabular-nums drop-shadow">
                        {item.val < 10 ? `0${item.val}` : item.val}
                      </span>
                      <span className="mt-0.5 block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vintage Illustration Art Card (Matches Reference Art Exactly) */}
            <div className="group relative overflow-hidden rounded-xl border border-gold/30 bg-[#1c0c0b] p-3 shadow-xl">
              <div className="relative overflow-hidden rounded-lg bg-[#f0e3cc]">
                <img
                  src="/img/mahalaya-vintage-radio.webp"
                  alt="Vintage radio with Shiuli flowers and Dhunuchi incense for Mahalaya morning"
                  className="w-full object-contain max-h-[300px] sm:max-h-[340px] transition-transform duration-700 group-hover:scale-102"
                />

                {/* Floating animated musical notes from radio when playing */}
                <AnimatePresence>
                  {isPlaying && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      {FLOATING_NOTES.map((note, idx) => (
                        <motion.span
                          key={`note-${idx}`}
                          initial={{
                            opacity: 0,
                            y: 180,
                            x: 100 + (idx % 4) * 35,
                            scale: 0.6,
                            rotate: -15,
                          }}
                          animate={{
                            opacity: [0, 0.95, 0],
                            y: -40,
                            x: 80 + (idx % 4) * 45 + Math.sin(idx) * 30,
                            scale: [0.6, 1.2, 0.9],
                            rotate: [ -15, 15, -5 ],
                          }}
                          transition={{
                            duration: 3.8 + (idx % 3) * 0.7,
                            repeat: Infinity,
                            delay: idx * 0.45,
                            ease: 'easeInOut',
                          }}
                          className="absolute text-xl font-serif font-bold text-[#682414] drop-shadow-sm select-none"
                        >
                          {note}
                        </motion.span>
                      ))}

                      {/* Dhunuchi smoke curling animation */}
                      <motion.div
                        animate={{
                          opacity: [0.2, 0.5, 0.2],
                          scale: [1, 1.08, 1],
                          y: [-2, -12, -2],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="pointer-events-none absolute bottom-8 right-6 size-24 rounded-full bg-white/20 blur-xl"
                      />
                    </div>
                  )}
                </AnimatePresence>

                {/* Subtle vignette border */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 shadow-inner" />
              </div>

              {/* Caption Tag */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted px-1">
                <span className="flex items-center gap-1.5 text-gold-bright font-semibold">
                  <Flame className="size-3 text-orange-400" />
                  শিউলি ফুল ও ধুনুচির সুবাসে শারদপ্রভাত
                </span>
                <span className="text-[10px] text-muted/80">Radio • Shiuli • Dhunuchi</span>
              </div>
            </div>

            {/* Sacred Shloka Card */}
            <div className="rounded-lg border border-gold/25 bg-[#200d0b]/80 p-4 shadow-md">
              <p className="font-bn text-sm sm:text-base leading-relaxed text-gold-bright font-medium">
                “যা দেবী সর্বভূতেষু মাতৃরূপেণ সংস্থিতা । নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ ॥”
              </p>
              <p className="mt-1 text-[11px] italic text-muted">
                Salutations unto the Divine Mother who dwells in all living beings as the embodiment of Motherhood.
              </p>
            </div>
          </div>

          {/* Right Column: Authentic Vintage Wooden Valve Radio Console */}
          <div className="flex flex-col items-center">
            {/* The Vintage Wooden Radio Cabinet */}
            <div className="relative w-full max-w-lg rounded-2xl border-4 border-[#3a160d] bg-gradient-to-b from-[#4a1d12] via-[#2f110a] to-[#1d0905] p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,214,107,0.25)]">
              {/* Telescopic Aerial / Antenna extending top-right */}
              <div className="absolute -top-12 right-10 hidden sm:flex items-end">
                <div className="relative h-14 w-1.5 origin-bottom-left rotate-45 rounded-t bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 shadow-md">
                  <span
                    className={`absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full border border-neutral-300 shadow-sm ${
                      isPlaying ? 'bg-red-500 animate-ping' : 'bg-gold-bright'
                    }`}
                  />
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-gold-bright" />
                </div>
              </div>

              {/* Top Cabinet Brass Header Nameplate */}
              <div className="mb-4 flex items-center justify-between border-b border-[#5e2718] pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-gold-bright shadow-[0_0_8px_#ffd66b]" />
                  <span className="font-serif text-xs font-bold tracking-[0.25em] text-gold-bright uppercase">
                    PHILIPS • ALL INDIA RADIO
                  </span>
                </div>
                {/* On Air Pilot Lamp */}
                <div className="flex items-center gap-1.5 rounded-full border border-red/40 bg-[#160507] px-2.5 py-0.5">
                  <span
                    className={`size-2 rounded-full ${
                      isPlaying
                        ? 'bg-red shadow-[0_0_10px_#e52d3f] animate-pulse'
                        : 'bg-red/40'
                    }`}
                  />
                  <span className="text-[10px] font-bold tracking-wider text-red uppercase">
                    {isPlaying ? 'ON AIR' : '04:00 AM READY'}
                  </span>
                </div>
              </div>

              {/* 1. Woven Acoustic Speaker Grille with Built-in Waveform */}
              <div className="relative mb-4 h-28 sm:h-32 w-full overflow-hidden rounded-xl border-2 border-[#2b0f08] bg-[#1a0a06] shadow-inner">
                {/* Woven cane / burlap textured grid overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:6px_6px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"
                />

                {/* Central Vintage Brass Logo */}
                <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded border border-gold/30 bg-[#2b1008]/85 px-3 py-0.5 text-center shadow-md">
                  <p className="font-serif text-[10px] font-bold tracking-[0.2em] text-gold-bright uppercase">
                    AKASHVANI KOLKATA
                  </p>
                </div>

                {/* Pulsing Audio Frequency Bars pulsing behind grille */}
                <div className="absolute inset-x-4 bottom-3 flex h-14 items-end justify-between gap-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 rounded-t bg-gradient-to-t from-amber-600 via-gold to-gold-bright shadow-[0_0_8px_rgba(230,168,58,0.4)]"
                      animate={{
                        height: isPlaying
                          ? `${Math.max(6, ((i * 17) % 48) + Math.sin(currentTime * 5 + i) * 18)}px`
                          : '5px',
                        opacity: isPlaying ? 0.95 : 0.25,
                      }}
                      transition={{ duration: 0.12 }}
                    />
                  ))}
                </div>
              </div>

              {/* 2. Amber-Backlit Analog Radio Tuner Dial (Glass Scale) */}
              <div className="relative mb-5 rounded-xl border-2 border-[#2a0e07] bg-gradient-to-b from-[#1c0b07] to-[#120504] p-3 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]">
                {/* Glass Scale Reflection */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
                />

                {/* Frequency Band Selector Buttons */}
                <div className="mb-2 flex items-center justify-between border-b border-[#3d180f] pb-1.5 text-[10px]">
                  <span className="font-bold uppercase tracking-wider text-muted">Bands:</span>
                  <div className="flex gap-1.5">
                    {(['mw', 'fm', 'sw'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setActiveBand(b)}
                        className={`rounded px-2 py-0.5 font-bold uppercase transition-colors ${
                          activeBand === b
                            ? 'bg-gold-bright text-[#1a0808] shadow-sm'
                            : 'bg-black/40 text-muted hover:text-ink'
                        }`}
                      >
                        {b.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dial Scale Markings */}
                <div className="relative h-12 w-full overflow-hidden rounded bg-[#240e09]/90 px-2 py-1 border border-gold/20">
                  {/* Frequency Labels */}
                  <div className="flex justify-between font-mono text-[9px] sm:text-[10px] text-amber-300/80 font-bold tracking-wider pt-0.5">
                    <span>550</span>
                    <span className="text-gold-bright font-extrabold flex flex-col items-center">
                      <span className="text-[8px] sm:text-[9px] -mt-0.5 text-red font-sans">★ KOLKATA</span>
                      657 kHz
                    </span>
                    <span>800</span>
                    <span>1000</span>
                    <span>1200</span>
                    <span>1400</span>
                    <span>1600</span>
                  </div>

                  {/* Frequency Tick Lines */}
                  <div className="mt-1 flex justify-between px-1">
                    {Array.from({ length: 41 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-px ${
                          i === 9
                            ? 'h-3 bg-red shadow-[0_0_6px_#ef4444]'
                            : i % 5 === 0
                            ? 'h-2.5 bg-amber-400/80'
                            : 'h-1.5 bg-amber-500/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Red Analog Tuning Needle (Moves with audio playback) */}
                  <motion.div
                    style={{ left: `${needlePercent}%` }}
                    className="absolute top-0 bottom-0 w-0.5 bg-red shadow-[0_0_10px_#ef4444] transition-all duration-300"
                  >
                    <span className="absolute -top-1 -left-1 size-2.5 rounded-full bg-red shadow-[0_0_8px_#ef4444]" />
                  </motion.div>
                </div>

                {/* Interactive Scrub Slider Styled as Tuner */}
                <div className="mt-2.5">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Tuning track scrubber"
                    className="w-full accent-gold-bright cursor-pointer h-1.5 rounded bg-black/50"
                  />
                  <div className="mt-1 flex justify-between text-[10px] font-mono tabular-nums text-muted">
                    <span className="flex items-center gap-1">
                      <Music className="size-2.5 text-gold" />
                      {formatTime(currentTime)}
                    </span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              {/* 3. Vintage Brass Controls & Rotary Knobs */}
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 pt-1">
                {/* Left Rotary Knob: Volume */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={toggleMute}
                    className="group relative size-12 sm:size-14 cursor-pointer rounded-full border-2 border-gold/40 bg-gradient-to-tr from-[#3a1910] via-gold to-[#4d2115] p-1 shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform hover:scale-105 active:scale-95"
                    title={`Volume: ${Math.round(volume * 100)}% (Click to Mute)`}
                  >
                    {/* Knurled brass dial ring */}
                    <div className="flex size-full items-center justify-center rounded-full bg-[#200c07] shadow-inner">
                      {isMuted ? (
                        <VolumeX className="size-4 text-red" />
                      ) : (
                        <Volume2 className="size-4 text-gold-bright" />
                      )}
                    </div>
                    {/* Pointer indicator marker on knob */}
                    <div
                      style={{
                        transform: `rotate(${(isMuted ? 0 : volume) * 270 - 135}deg)`,
                      }}
                      className="absolute inset-0 pointer-events-none flex justify-center pt-0.5"
                    >
                      <span className="size-1 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                  <span className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-muted">
                    VOLUME
                  </span>
                </div>

                {/* Center Buttons: Play / Skip 10s */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSkip(-10)}
                    aria-label="Rewind 10 seconds"
                    className="flex size-9 items-center justify-center rounded-full border border-gold/30 bg-[#250d09] text-gold hover:bg-gold/20 hover:text-gold-bright transition-colors shadow"
                  >
                    <RotateCcw className="size-4" />
                  </button>

                  {/* Master Brass Play/Pause Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause Mahalaya Broadcast' : 'Play Mahalaya Broadcast'}
                    className="group relative flex size-14 sm:size-16 items-center justify-center rounded-full border-3 border-gold-bright bg-gradient-to-tr from-gold via-gold-bright to-amber-300 text-[#180807] shadow-[0_0_30px_rgba(230,168,58,0.6),inset_0_2px_4px_rgba(255,255,255,0.6)] transition-all hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="size-7 fill-current transition-transform group-hover:scale-110" />
                    ) : (
                      <Play className="size-7 translate-x-0.5 fill-current transition-transform group-hover:scale-110" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSkip(10)}
                    aria-label="Forward 10 seconds"
                    className="flex size-9 items-center justify-center rounded-full border border-gold/30 bg-[#250d09] text-gold hover:bg-gold/20 hover:text-gold-bright transition-colors shadow"
                  >
                    <RotateCw className="size-4" />
                  </button>
                </div>

                {/* Right Rotary Knob: Station Fine Tuning */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => handleSkip(30)}
                    className="group relative size-12 sm:size-14 cursor-pointer rounded-full border-2 border-gold/40 bg-gradient-to-tr from-[#3a1910] via-gold to-[#4d2115] p-1 shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform hover:scale-105 active:scale-95"
                    title="Fine Station Tuning (Skip 30s)"
                  >
                    <div className="flex size-full items-center justify-center rounded-full bg-[#200c07] shadow-inner text-gold-bright">
                      <Sparkles className="size-4 text-gold-bright" />
                    </div>
                  </div>
                  <span className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-muted">
                    TUNING
                  </span>
                </div>
              </div>

              {/* Volume Slider Drawer */}
              <div className="mt-4 flex items-center justify-between border-t border-[#461c12] pt-3 text-[11px] text-muted">
                <span className="text-[10px] text-muted flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  Magic Eye 6E5 Locked
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">Level:</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume slider"
                    className="w-20 sm:w-24 accent-gold-bright cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Respect Notice & Akashvani Archives */}
            <p className="mt-4 text-center text-[11px] text-muted max-w-md">
              ✦ Streamed with deep reverence to the historic 1931 All India Radio Akashvani archives and the immortal voice of Birendra Krishna Bhadra.
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        onEnded={() => setIsPlaying(false)}
      />
    </section>
  );
}
