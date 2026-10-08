import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Seamless 13-second dhak loop (see public/audio). */
export const SOUND_SRC = '/audio/dhak-loop.mp3';
/** Deliberately quiet: the recording peaks at full scale, so this sits well under speech. */
const TARGET_VOLUME = 0.2;
const FADE_IN_MS = 2400;
const FADE_OUT_MS = 500;

interface SoundState {
  /** The visitor's choice. On by default; a mute is remembered across visits. */
  enabled: boolean;
  /** Whether sound is actually coming out right now. */
  playing: boolean;
  toggle: () => Promise<void>;
}

export const useSound = create<SoundState>()(
  persist(
    (set, get) => ({
      enabled: true,
      playing: false,
      toggle: async () => {
        if (get().playing) {
          set({ enabled: false });
          stopSound();
        } else {
          set({ enabled: true });
          await startSound();
        }
      },
    }),
    { name: 'pujo-sound', version: 1, partialize: (s) => ({ enabled: s.enabled }) },
  ),
);

let audio: HTMLAudioElement | null = null;
let fade: number | undefined;

function element() {
  if (!audio) {
    audio = new Audio(SOUND_SRC);
    audio.loop = true;
    audio.preload = 'none'; // nothing is downloaded until the music is wanted
    audio.volume = 0;
    audio.addEventListener('playing', () => useSound.setState({ playing: true }));
    audio.addEventListener('pause', () => useSound.setState({ playing: false }));
  }
  return audio;
}

function fadeTo(target: number, ms: number, done?: () => void) {
  const a = element();
  window.clearInterval(fade);
  const from = a.volume;
  const start = performance.now();
  fade = window.setInterval(() => {
    const t = Math.min(1, (performance.now() - start) / ms);
    a.volume = Math.max(0, Math.min(1, from + (target - from) * t));
    if (t >= 1) {
      window.clearInterval(fade);
      done?.();
    }
  }, 40);
}

/** Starts the music with a slow fade-in. Resolves false if the browser still refuses (no gesture yet). */
export async function startSound(): Promise<boolean> {
  const a = element();
  try {
    if (a.paused) a.volume = 0;
    await a.play();
    fadeTo(TARGET_VOLUME, FADE_IN_MS);
    return true;
  } catch {
    return false;
  }
}

export function stopSound(immediate = false) {
  if (!audio || audio.paused) return;
  if (immediate) {
    window.clearInterval(fade);
    audio.pause();
  } else fadeTo(0, FADE_OUT_MS, () => audio?.pause());
}

/**
 * Plays the background music once the visitor first interacts with the page
 * (browsers do not allow sound before that), unless they have muted it or
 * asked their browser to save data. Pauses while the tab is hidden.
 */
export function useBackgroundSound() {
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!useSound.getState().enabled || nav.connection?.saveData) return;

    const events = ['pointerdown', 'pointerup', 'keydown', 'touchend'] as const;
    const stop = () => events.forEach((e) => window.removeEventListener(e, kick));
    async function kick() {
      if (!useSound.getState().enabled) return stop();
      if (await startSound()) stop();
    }
    events.forEach((e) => window.addEventListener(e, kick, { passive: true }));
    return stop;
  }, []);

  useEffect(() => {
    let resumeOnReturn = false;
    const onVisibility = () => {
      if (document.hidden) {
        resumeOnReturn = useSound.getState().playing;
        stopSound(true);
      } else if (resumeOnReturn && useSound.getState().enabled) void startSound();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
}
