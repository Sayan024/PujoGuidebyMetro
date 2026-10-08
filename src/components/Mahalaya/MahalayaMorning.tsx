import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Radio, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/primitives';
import { img } from '@/lib/utils';

// October 10, 2026 at 04:00 AM IST
const MAHALAYA_TARGET = new Date('2026-10-10T04:00:00+05:30').getTime();

export function MahalayaMorning() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer
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
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds));
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

  return (
    <section id="mahalaya" aria-labelledby="mahalaya-title" className="shell pt-24 md:pt-36">
      <SectionHeading
        eyebrow="Dawn of the Goddess"
        title={
          <span id="mahalaya-title">
            Mahalaya Morning <em className="font-medium text-gold">4:00 AM</em>
          </span>
        }
        lead="The immortal dawn when the conch echoes across Bengal, marking the arrival of Maa Durga on earth."
      />

      <div className="mt-10 overflow-hidden rounded-md border border-hair bg-gradient-to-br from-[#241014] via-[#1a0c0e] to-[#12080a] shadow-2xl">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_1fr] lg:p-10">
          {/* Left Column: Countdown & Shloka */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light">
                <Radio className="size-3.5 animate-pulse text-gold" />
                <span>Akashvani Live Tradition • 10 October 2026</span>
              </div>

              <div className="mt-6">
                <p className="font-bn text-sm text-gold-light/90">
                  ॥ আশ্বিনের শারদপ্রাতে বেজে উঠেছে আলোকপঞ্জরী ॥
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                  Mahishasuramardini Countdown
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Time remaining until the traditional 4:00 AM conch shells and Birendra Krishna Bhadra’s historic Chandi Path begin.
                </p>
              </div>

              {/* Countdown Grid */}
              <div className="mt-6 grid grid-cols-4 gap-2 text-center sm:gap-4">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hours' },
                  { val: timeLeft.minutes, label: 'Mins' },
                  { val: timeLeft.seconds, label: 'Secs' },
                ].map((item, i) => (
                  <div key={i} className="rounded-sm border border-hair-soft bg-surface/80 p-3 sm:p-4">
                    <span className="font-display block text-2xl font-bold text-gold-bright sm:text-4xl tabular-nums">
                      {item.val < 10 ? `0${item.val}` : item.val}
                    </span>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-muted sm:text-xs">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sacred Shloka Card */}
            <div className="mt-8 rounded-sm border border-gold/20 bg-surface/50 p-4">
              <p className="font-bn text-base leading-relaxed text-gold-light">
                “যা দেবী সর্বভূতেষু মাতৃরূপেণ সংস্থিতা । নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ ॥”
              </p>
              <p className="mt-1 text-xs italic text-muted">
                To the Goddess who resides in all beings as the Divine Mother, our salutations again and again.
              </p>
            </div>
          </div>

          {/* Right Column: Audio Experience Player */}
          <div className="flex flex-col justify-between rounded-sm border border-hair-soft bg-surface/70 p-6 sm:p-8">
            <div className="relative mb-6 overflow-hidden rounded-sm border border-hair">
              <img
                src={img('mahalaya', 1200)}
                alt="Mahalaya dawn morning atmosphere"
                className="h-44 w-full object-cover brightness-75 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160b0b] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gold-light">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Sparkles className="size-3.5 text-gold" />
                  Devotional Atmosphere
                </span>
                <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                  Birendra Krishna Bhadra Tribute
                </span>
              </div>
            </div>

            {/* Audio Waveform visualization */}
            <div className="mb-6 flex h-12 items-center justify-between gap-1 px-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-full bg-gold"
                  animate={{
                    height: isPlaying
                      ? `${Math.max(8, ((i * 13) % 40) + Math.sin(currentTime * 4 + i) * 16)}px`
                      : '8px',
                    opacity: isPlaying ? 0.9 : 0.3,
                  }}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>

            {/* Audio Controls */}
            <div className="space-y-4">
              <audio
                ref={audioRef}
                src={audioSrc}
                preload="metadata"
                onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
                onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Progress Slider */}
              <div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Mahalaya audio progress"
                  className="w-full accent-gold cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-xs tabular-nums text-muted">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSkip(-10)}
                    aria-label="Skip backward 10 seconds"
                    className="icon-btn size-9 hover:text-gold"
                  >
                    <RotateCcw className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause Mahalaya broadcast' : 'Play Mahalaya broadcast'}
                    className="flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-gold to-gold-bright text-[#1a0c08] shadow-[0_0_20px_rgba(230,168,58,0.5)] transition-transform hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? <Pause className="size-6 fill-current" /> : <Play className="size-6 translate-x-0.5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSkip(10)}
                    aria-label="Skip forward 10 seconds"
                    className="icon-btn size-9 hover:text-gold"
                  >
                    <RotateCw className="size-4" />
                  </button>
                </div>

                {/* Volume slider */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="icon-btn size-8"
                  >
                    {isMuted ? <VolumeX className="size-4 text-muted" /> : <Volume2 className="size-4 text-gold" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume level"
                    className="w-16 accent-gold cursor-pointer sm:w-20"
                  />
                </div>
              </div>
            </div>

            <p className="mt-4 border-t border-hair-soft pt-3 text-[11px] text-muted">
              ✦ Streamed with respect to All India Radio Akashvani archives. Live broadcast triggers automatically at 04:00 AM on Mahalaya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
