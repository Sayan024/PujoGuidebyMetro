import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

/** Trinayani: the elongated eyes of a Bengali Durga idol, with the third eye. */
export function DurgaEyes({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 132 52" fill="none" aria-hidden="true" className={cn('h-6 w-auto', className)} {...props}>
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 33c5-3 9-9 20-13 13-4 25 2 33 13-11 8-25 10-38 5-6-2-11-4-15-5Z" />
        <path d="M129 33c-5-3-9-9-20-13-13-4-25 2-33 13 11 8 25 10 38 5 6-2 11-4 15-5Z" />
        <path d="M14 22c7-7 20-10 32-4M118 22c-7-7-20-10-32-4" opacity=".55" strokeWidth="1.6" />
      </g>
      <circle cx="32" cy="30" r="7.5" fill="currentColor" />
      <circle cx="100" cy="30" r="7.5" fill="currentColor" />
      <circle cx="34.5" cy="27.5" r="2" fill="var(--background, #120909)" />
      <circle cx="102.5" cy="27.5" r="2" fill="var(--background, #120909)" />
      <path d="M66 1c5 6 5 13 0 20-5-7-5-14 0-20Z" fill="#E52D3F" />
      <circle cx="66" cy="11" r="1.8" fill="#FFD66B" />
    </svg>
  );
}

export function Lotus({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" className={cn('h-5 w-auto', className)} {...props}>
      <g stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M32 3c7 8 7 20 0 30-7-10-7-22 0-30Z" />
        <path d="M32 33c-9-2-16-10-17-22 9 2 15 9 17 22ZM32 33c9-2 16-10 17-22-9 2-15 9-17 22Z" />
        <path d="M32 33C22 35 9 31 3 20c10-2 22 3 29 13ZM32 33c10 2 23-2 29-13-10-2-22 3-29 13Z" />
        <path d="M14 37h36" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Diya({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn('h-5 w-auto', className)} {...props}>
      <path d="M24 4c5 6 6 11 0 17-6-6-5-11 0-17Z" fill="#FFD66B" style={{ animation: 'flicker 2.6s ease-in-out infinite' }} />
      <path
        d="M5 26h38c0 9-8 16-19 16S5 35 5 26Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13 32c3 3 7 4 11 4s8-1 11-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

export function InstagramGlyph({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('size-4', className)} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Alpana-inspired rosette, used large and faint as a background ornament. */
export function Alpana({ className, petals = 16, ...props }: SVGProps<SVGSVGElement> & { petals?: number }) {
  const ring = (r: number, n: number, size: number) =>
    Array.from({ length: n }, (_, i) => (
      <path
        key={`${r}-${i}`}
        d={`M0 ${-r}c${size} ${size * 1.6} ${size} ${size * 3.2} 0 ${size * 4.6}c${-size} ${-size * 1.4} ${-size} ${-size * 3} 0 ${-size * 4.6}Z`}
        transform={`rotate(${(360 / n) * i})`}
      />
    ));
  return (
    <svg viewBox="-200 -200 400 400" fill="none" aria-hidden="true" className={className} {...props}>
      <g stroke="currentColor" strokeWidth="1">
        <circle r="196" />
        <circle r="188" strokeDasharray="2 7" />
        {ring(184, petals * 2, 7)}
        <circle r="146" />
        {ring(142, petals, 12)}
        <circle r="82" />
        <circle r="76" strokeDasharray="1 5" />
        {ring(72, petals / 2, 11)}
        <circle r="18" />
        <circle r="6" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Thakurdalan arches, used as a section divider silhouette. */
export function TempleArches({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true" className={className} {...props}>
      <path
        fill="currentColor"
        d="M0 80V44h20V30c0-14 20-22 30-30 10 8 30 16 30 30v14h40V30c0-14 20-22 30-30 10 8 30 16 30 30v14h40V24c0-14 26-20 40-24 14 4 40 10 40 24v20h40V30c0-14 20-22 30-30 10 8 30 16 30 30v14h40V30c0-14 20-22 30-30 10 8 30 16 30 30v14h60v36Z"
      />
    </svg>
  );
}
