export type MetroLineId = 'blue' | 'green' | 'yellow' | 'purple' | 'orange';

export interface Station {
  id: string;
  name: string;
  /** Locality the station serves, when the name alone is not obvious. */
  area?: string;
  lat: number;
  lng: number;
  lines: MetroLineId[];
}

export interface MetroLine {
  id: MetroLineId;
  name: string;
  short: string;
  color: string;
  route: string;
  blurb: string;
  stations: string[];
}

export type ThemeCategory =
  | 'Heritage Kolkata'
  | 'Mythology'
  | 'Technology'
  | 'Climate & Environment'
  | 'Social Awareness'
  | 'Art & Innovation'
  | 'Traditional Bonedi Bari'
  | 'Contemporary Installation';

/** 24h: open round the clock · day: morning to late night · ritual: ritual hours only */
export type OpenHours = '24h' | 'day' | 'ritual';

export type VerificationStatus = 'verified' | 'needs_verification' | 'reported_issue';

export interface ParkingSpot {
  id: string;
  name: string;
  type: 'car' | 'bike' | 'both';
  distanceKm: number;
  walkingMinutes: number;
  capacity?: string;
  availability?: 'available' | 'limited' | 'unknown';
  paid?: boolean;
  price?: string;
  openingHours?: string;
  address: string;
  latitude: number;
  longitude: number;
  source?: string;
  verifiedAt?: string;
  isDropOff?: boolean;
}

export interface Pandal {
  id: string;
  name: string;
  station: string;
  stationId: string;
  line: MetroLineId;
  distanceKm: number;
  walkingMinutes: number;
  /** Announced theme, or an empty string when the committee has not published one. */
  theme: string;
  category: ThemeCategory;
  popularity: number;
  image: string;
  /** False when no photograph of this pandal exists; the UI then draws a generated cover. */
  hasPhoto: boolean;
  /** Notes from the source list, or an empty string when there are none. */
  description: string;
  /** Set when the source recommends a ride from the station instead of walking. */
  access?: 'auto' | 'cab';
  artist: string;
  darshanTime: string;
  hours: OpenHours;
  metroExit: string;
  latitude: number;
  longitude: number;
  tags: string[];
  mapUrl: string;
  traditional: boolean;
  theme2026: boolean;
  vip: boolean;
  petpujo: boolean;

  /** Locality (e.g. Howrah, Liluah, Shibpur, Santragachi, Belur, Bally, North Kolkata) */
  locality?: string;
  /** Associated car/bike parking spots nearby */
  parking?: ParkingSpot[];
  /** Data provenance and verification */
  source?: string;
  verifiedAt?: string;
  verificationStatus?: VerificationStatus;
}
