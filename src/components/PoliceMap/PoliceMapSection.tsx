import { Download, ExternalLink, Maximize2, PhoneCall, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, SectionHeading } from '@/components/ui/primitives';
import { useAppStore } from '@/store/appStore';

export function PoliceMapSection() {
  const openPoliceMap = useAppStore((s) => s.openPoliceMapModal);

  return (
    <section id="police-traffic-map" aria-labelledby="police-map-heading" className="shell pt-24 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Official Law Enforcement Guide"
          title={
            <span id="police-map-heading">
              Kolkata Police <em className="font-medium text-gold">Puja Guide Map</em>
            </span>
          }
          lead="The definitive IndianOil & Kolkata Police traffic circulation, one-way route, road-closure, and authorized parking master plan."
        />
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openPoliceMap}
              className="btn btn-primary"
            >
              <Maximize2 className="size-4" /> Open Interactive Map
            </button>
            <a
              href="/img/kolkata-police-puja-map.jpg"
              download="Kolkata-Police-Puja-Guide-Map-2026.jpg"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              title="Download original high-resolution image"
            >
              <Download className="size-4" /> Download JPG (4.2 MB)
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 md:mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center">
        {/* Left: Interactive Preview Frame */}
        <Reveal data-theme="dark" className="group relative overflow-hidden rounded-[22px] border border-hair bg-[#140609] p-3 shadow-2xl">
          <div
            onClick={openPoliceMap}
            className="relative cursor-pointer overflow-hidden rounded border border-hair-soft bg-[#0a0305]"
            title="Click to open interactive zoomable map"
          >
            <img
              src="/img/kolkata-police-puja-map-preview.webp"
              alt="Official Kolkata Police Puja Guide Map"
              className="h-[460px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120508] via-transparent to-black/20 opacity-90 group-hover:opacity-75 transition-opacity" />

            {/* Floating click to zoom badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-2 rounded-full border border-gold-bright bg-[#1a080d]/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-bright shadow-2xl backdrop-blur-md transition-transform group-hover:scale-110">
                <Maximize2 className="size-4" /> Tap to Pan & Zoom Map
              </span>
            </div>

            {/* Bottom info strip */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#140608] via-[#140608]/90 to-transparent">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-bright">
                <Shield className="size-3.5 text-red" /> Zone I – IV Traffic Regulations
              </p>
              <p className="mt-1 text-[11px] text-muted line-clamp-1">
                North & Central • South & South-East • Port Area • Behala & Jadavpur
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right: Key Features & Ground Advisory */}
        <div className="space-y-6">
          <div className="rounded-md border border-hair bg-surface p-6">
            <h3 className="font-display text-xl font-bold text-ink">
              Official Kolkata Police Traffic Rules at a Glance
            </h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Every year, Kolkata Police designates special traffic channels, one-way circulation loops, and pedestrian corridors to ensure smooth crowd movement. Use this map alongside our Metro guide for a painless journey.
            </p>

            <ul className="mt-5 space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded bg-red/20 text-red border border-red/40 font-bold">
                  🛑
                </span>
                <div>
                  <strong className="text-ink font-semibold">No-Entry & Pedestrian Corridors</strong>
                  <p className="text-muted mt-0.5">
                    Vehicular traffic is strictly barred within 500m to 1km of prime pandals from <strong>3:00 PM to 4:00 AM</strong> daily.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold">
                  ➡️
                </span>
                <div>
                  <strong className="text-ink font-semibold">Circulatory One-Way Streams</strong>
                  <p className="text-muted mt-0.5">
                    Mandatory single-direction flows on major arteries (Rashbehari Ave, Central Ave, Bidhan Sarani, Sarat Bose Rd).
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded bg-blue-500/20 text-blue-400 border border-blue-500/40 font-bold">
                  🅿️
                </span>
                <div>
                  <strong className="text-ink font-semibold">Official Designated Parking Lots</strong>
                  <p className="text-muted mt-0.5">
                    Authorized parking bays marked by Kolkata Police for private four-wheelers and two-wheelers with fixed municipal rates.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 font-bold">
                  🚓
                </span>
                <div>
                  <strong className="text-ink font-semibold">Police Assistance & Emergency Corridors</strong>
                  <p className="text-muted mt-0.5">
                    Continuous green corridors for ambulances to major hospitals and 24x7 Kolkata Police assistance kiosks.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Helplines Box */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-hair bg-surface-2 p-4 text-xs">
            <div className="flex items-center gap-2 text-red font-semibold">
              <PhoneCall className="size-4" />
              <span>Traffic Police Helpline:</span>
              <a href="tel:1073" className="font-mono text-gold-bright hover:underline font-bold text-sm">
                1073
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/map?view=police" className="text-gold-bright hover:underline font-semibold flex items-center gap-1">
                Full-screen Police Map <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
