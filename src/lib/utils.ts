import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Pandal } from '@/data/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const img = (key: string, width: 480 | 1200 = 480) => `/img/${key}-${width}.webp`;

export const formatKm = (km: number) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`);

export function formatDuration(minutes: number) {
  const m = Math.round(minutes);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

/** Minutes since midnight → "10:35". */
export function formatClock(minutes: number) {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

// Darshan window used by the "Open now" filter (Chaturthi to Dashami, IST).
export const DARSHAN_START = Date.parse('2026-10-14T00:00:00+05:30');
export const DARSHAN_END = Date.parse('2026-10-21T23:59:59+05:30');

export function kolkataHour(now: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return h + m / 60;
}

export function isFestivalOn(now = new Date()) {
  const t = now.getTime();
  return t >= DARSHAN_START && t <= DARSHAN_END;
}

export function isOpenNow(p: Pick<Pandal, 'hours'>, now = new Date()) {
  if (!isFestivalOn(now)) return false;
  const h = kolkataHour(now);
  if (p.hours === '24h') return true;
  if (p.hours === 'day') return h >= 8 || h < 2;
  return (h >= 8 && h < 13) || (h >= 18 && h < 21);
}

/** Whole days from today until a calendar date, in Kolkata time. */
export function daysUntil(isoDate: string, now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
  return Math.round((Date.parse(isoDate) - Date.parse(today)) / 86_400_000);
}

/** Stable 0–1 value derived from a string, for per-pandal visual variation. */
export function hashUnit(text: string, salt = 0) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

export const THEME_AWAITED = 'Theme to be announced';

/** What to print where a theme goes: the announced theme, or an honest stand-in. */
export function themeLabel(p: Pick<Pandal, 'theme' | 'category'>) {
  if (p.theme) return p.theme;
  return p.category === 'Traditional Bonedi Bari' ? 'Traditional family puja' : THEME_AWAITED;
}

/** One factual sentence for pandals the source list says nothing about. */
export function summaryOf(p: Pandal) {
  if (p.description) return p.description;
  const kind = p.category === 'Traditional Bonedi Bari' ? 'A Bonedi Bari family puja' : 'A neighbourhood sarbojanin puja';
  const ride = p.access === 'cab' ? ' A cab from the station is recommended.' : p.access === 'auto' ? ' An auto-rickshaw from the station is recommended.' : '';
  return `${kind}, ${formatKm(p.distanceKm)} from ${p.station} Metro — about ${p.walkingMinutes} minutes on foot.${ride}`;
}
