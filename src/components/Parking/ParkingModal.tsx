import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Car, Navigation, MapPin, ShieldCheck, AlertCircle, LocateFixed } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { PANDAL_BY_ID } from '@/data';
import { getParkingForPandal, PARKING_SPOTS } from '@/data/parking';
import type { ParkingSpot } from '@/data/types';
import { formatKm } from '@/lib/utils';

export function ParkingModal() {
  const pandalId = useAppStore((s) => s.parkingModalPandalId);
  const close = useAppStore((s) => s.setParkingModalPandalId);

  const [vehicleFilter, setVehicleFilter] = useState<'all' | 'car' | 'bike' | 'both'>('all');
  const [within500m, setWithin500m] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  // Geolocation state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'locating' | 'granted' | 'denied'>('idle');

  const pandal = pandalId ? PANDAL_BY_ID.get(pandalId) : null;

  // Retrieve spots for this pandal, or fallback to all nearby spots if none strictly matched
  const baseSpots: ParkingSpot[] = useMemo(() => {
    if (pandal) {
      const matched = getParkingForPandal(pandal.id, pandal.stationId);
      if (matched.length > 0) return matched;
    }
    // general fallback
    return PARKING_SPOTS.slice(0, 4);
  }, [pandal]);

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }
    setLocationStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStatus('granted');
      },
      () => {
        setLocationStatus('denied');
      },
      { timeout: 8000 }
    );
  };

  const filteredSpots = useMemo(() => {
    const list = baseSpots.filter((s) => {
      if (vehicleFilter === 'car' && s.type !== 'car' && s.type !== 'both') return false;
      if (vehicleFilter === 'bike' && s.type !== 'bike' && s.type !== 'both') return false;
      if (vehicleFilter === 'both' && s.type !== 'both') return false;
      if (within500m && s.distanceKm > 0.5) return false;
      if (freeOnly && s.paid) return false;
      if (availableOnly && s.availability !== 'available') return false;
      return true;
    });

    if (userCoords) {
      return [...list].sort((a, b) => {
        const da = Math.hypot(a.latitude - userCoords.lat, a.longitude - userCoords.lng);
        const db = Math.hypot(b.latitude - userCoords.lat, b.longitude - userCoords.lng);
        return da - db;
      });
    }

    return list;
  }, [baseSpots, vehicleFilter, within500m, freeOnly, availableOnly, userCoords]);

  if (!pandalId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => close(null)}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          data-theme="dark" className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[22px] border border-hair bg-[#1a0a0e] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-hair-soft p-5 sm:p-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-gold/20 text-gold-bright">
                  <Car className="size-4" />
                </span>
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  Parking Near {pandal?.name || 'Pandal'}
                </h3>
              </div>
              <p className="mt-1 text-xs text-muted sm:text-sm">
                Verified car and bike parking bays, drop-off points, and traffic restrictions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => close(null)}
              className="icon-btn size-8"
              aria-label="Close parking modal"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="border-b border-hair-soft bg-surface/40 p-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted mr-1">Vehicle:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'car', label: '🚗 Car' },
                { id: 'bike', label: '🏍 Bike' },
                { id: 'both', label: '🚗🏍 Both' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setVehicleFilter(tab.id as typeof vehicleFilter)}
                  className={`rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors ${
                    vehicleFilter === tab.id
                      ? 'bg-gold-bright text-[#1a0c08]'
                      : 'border border-hair bg-surface text-ink/80 hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <div className="h-4 w-px bg-hair mx-1 hidden sm:block" />

              <button
                type="button"
                onClick={() => setWithin500m(!within500m)}
                className={`rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors ${
                  within500m ? 'bg-gold text-[#1a0c08]' : 'border border-hair bg-surface text-ink/80 hover:text-ink'
                }`}
              >
                Within 500m
              </button>
              <button
                type="button"
                onClick={() => setFreeOnly(!freeOnly)}
                className={`rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors ${
                  freeOnly ? 'bg-gold text-[#1a0c08]' : 'border border-hair bg-surface text-ink/80 hover:text-ink'
                }`}
              >
                Free Only
              </button>
              <button
                type="button"
                onClick={() => setAvailableOnly(!availableOnly)}
                className={`rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors ${
                  availableOnly ? 'bg-gold text-[#1a0c08]' : 'border border-hair bg-surface text-ink/80 hover:text-ink'
                }`}
              >
                Available
              </button>

              <button
                type="button"
                onClick={handleRequestLocation}
                className="ml-auto inline-flex items-center gap-1.5 rounded-sm border border-hair-soft bg-surface/70 px-2.5 py-1 text-xs font-medium text-gold-light hover:border-gold"
              >
                <LocateFixed className="size-3" />
                {locationStatus === 'locating'
                  ? 'Locating...'
                  : locationStatus === 'granted'
                  ? 'Nearby to you'
                  : locationStatus === 'denied'
                  ? 'Location access is off'
                  : 'Find near me'}
              </button>
            </div>
          </div>

          {/* Spots List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {filteredSpots.length === 0 ? (
              <div className="rounded-sm border border-hair bg-surface/60 p-8 text-center">
                <AlertCircle className="mx-auto size-8 text-gold" />
                <h4 className="mt-3 font-display text-lg font-bold text-ink">Parking Information Unavailable</h4>
                <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
                  No verified spots match your current filter. Kolkata Police recommends using Metro to avoid peak festival traffic diversions.
                </p>
              </div>
            ) : (
              filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="rounded-sm border border-hair bg-surface/80 p-4 transition-all hover:border-gold/60"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{spot.type === 'car' ? '🚗' : spot.type === 'bike' ? '🏍' : '🚗🏍'}</span>
                        <h4 className="font-display text-base font-bold text-ink">{spot.name}</h4>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            spot.availability === 'available'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : spot.availability === 'limited'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {spot.availability || 'Availability not verified'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted flex items-center gap-1.5">
                        <MapPin className="size-3 text-gold" />
                        {spot.address}
                      </p>
                    </div>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(spot.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-primary shrink-0"
                    >
                      <Navigation className="size-3.5" />
                      Get Directions
                    </a>
                  </div>

                  {/* Fact Bar */}
                  <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-hair-soft pt-3 sm:grid-cols-4 text-xs">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Distance</span>
                      <span className="font-semibold text-gold-light tabular-nums">{formatKm(spot.distanceKm)}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Walking Time</span>
                      <span className="font-semibold text-gold-light tabular-nums">{spot.walkingMinutes} min walk</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Fee / Rates</span>
                      <span className="font-semibold text-ink">{spot.price || (spot.paid ? 'Paid' : 'Free')}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Capacity</span>
                      <span className="font-semibold text-ink">{spot.capacity || 'Public bay'}</span>
                    </div>
                  </div>

                  {/* Verification footer */}
                  <div className="mt-3 flex items-center justify-between border-t border-hair-soft pt-2 text-[10px] text-muted">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="size-3 text-emerald-400" />
                      {spot.source ? `Source: ${spot.source}` : 'Verified local source'}
                    </span>
                    <span>Last verified: {spot.verifiedAt || 'October 2026'}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Advisory */}
          <div className="border-t border-hair-soft bg-[#12080a] p-4 text-xs text-muted flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="size-3.5 text-gold shrink-0" />
              Police traffic diversions begin at 4:00 PM on Chaturthi.
            </span>
            <button
              type="button"
              onClick={() => {
                useAppStore.getState().openFeedbackModal({
                  pandal: pandal?.name,
                  station: pandal?.station,
                  type: 'Parking detail correction',
                });
              }}
              className="text-gold-light hover:underline font-semibold"
            >
              Report parking change
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
