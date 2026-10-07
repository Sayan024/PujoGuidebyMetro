import { PANDALS } from './pandals';
import type { ThemeCategory } from './types';

export interface ThemeInfo {
  id: string;
  name: ThemeCategory;
  kicker: string;
  description: string;
  image: string;
  count: number;
}

const BASE: Omit<ThemeInfo, 'count'>[] = [
  {
    id: 'heritage-kolkata',
    name: 'Heritage Kolkata',
    kicker: 'The para puja',
    description: 'Neighbourhood sarbojanin pujas that carry the city’s memory — old lanes, club grounds and familiar faces.',
    image: 'maddox_square',
  },
  {
    id: 'traditional-bonedi-bari',
    name: 'Traditional Bonedi Bari',
    kicker: 'Since the 1700s',
    description: 'Thakurdalans of the old families: ekchala idols, daker saj and rituals unchanged for centuries.',
    image: 'shobhabazar',
  },
  {
    id: 'contemporary-installation',
    name: 'Contemporary Installation',
    kicker: 'Walk-through worlds',
    description: 'Pandals as immersive architecture — scale, light and material pushed as far as bamboo will go.',
    image: 'badamtala',
  },
  {
    id: 'art-innovation',
    name: 'Art & Innovation',
    kicker: 'Artist-led',
    description: 'Signature work by the city’s theme artists, where the idol and the space are one composition.',
    image: 'ballygunge_cultural',
  },
  {
    id: 'climate-environment',
    name: 'Climate & Environment',
    kicker: 'Rivers, soil, air',
    description: 'Themes that speak of the Ganga, vanishing wetlands and what the delta stands to lose.',
    image: 'barisha_club',
  },
  {
    id: 'mythology',
    name: 'Mythology',
    kicker: 'Epics retold',
    description: 'Kailash, the Ramayana and the Puranas rebuilt at street scale.',
    image: 'chetla_agrani',
  },
  {
    id: 'technology',
    name: 'Technology',
    kicker: 'Light & sound',
    description: 'Projection, kinetic structures and sound design in service of devotion.',
    image: 'tala_prattoy',
  },
  {
    id: 'social-awareness',
    name: 'Social Awareness',
    kicker: 'Pujo with a point',
    description: 'Pandals that take on labour, migration and everyday dignity. 2026 themes are still being announced.',
    image: 'jagat_mukherjee',
  },
];

const counts = new Map<string, number>();
for (const p of PANDALS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

export const THEMES: ThemeInfo[] = BASE.map((t) => ({ ...t, count: counts.get(t.name) ?? 0 }));
export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t]));
export const themeIdOf = (name: ThemeCategory) => THEMES.find((t) => t.name === name)?.id ?? '';
