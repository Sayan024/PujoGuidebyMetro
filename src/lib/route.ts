import { LINE_BY_ID, METRO_LINES, STATIONS, stationRank } from '@/data/metroLines';
import type { MetroLineId, Pandal } from '@/data/types';
import { haversineKm, themeLabel } from './utils';

const MIN_PER_STOP = 2.5;
const INTERCHANGE_MIN = 7;
const PLATFORM_WAIT_MIN = 5;
const WALK_KMH = 4.6;

export interface MetroHop {
  reachable: boolean;
  minutes: number;
  stops: number;
  lines: MetroLineId[];
  changes: string[];
}

// Dijkstra over (station, line) states: riding costs time per stop, changing line costs a transfer.
export function metroHop(from: string, to: string): MetroHop {
  if (from === to) return { reachable: true, minutes: 0, stops: 0, lines: [], changes: [] };
  type Node = { station: string; line: MetroLineId };
  const key = (n: Node) => `${n.station}|${n.line}`;
  const dist = new Map<string, number>();
  const prev = new Map<string, Node | null>();
  const queue: Node[] = [];
  for (const line of STATIONS[from]?.lines ?? []) {
    const n = { station: from, line };
    dist.set(key(n), 0);
    prev.set(key(n), null);
    queue.push(n);
  }
  let best: Node | null = null;
  while (queue.length) {
    queue.sort((a, b) => dist.get(key(a))! - dist.get(key(b))!);
    const cur = queue.shift()!;
    const d = dist.get(key(cur))!;
    if (cur.station === to) {
      best = cur;
      break;
    }
    const neighbours: [Node, number][] = [];
    const seq = LINE_BY_ID[cur.line].stations;
    const i = seq.indexOf(cur.station);
    if (i > 0) neighbours.push([{ station: seq[i - 1], line: cur.line }, MIN_PER_STOP]);
    if (i < seq.length - 1) neighbours.push([{ station: seq[i + 1], line: cur.line }, MIN_PER_STOP]);
    for (const other of STATIONS[cur.station].lines)
      if (other !== cur.line) neighbours.push([{ station: cur.station, line: other }, INTERCHANGE_MIN]);
    for (const [n, cost] of neighbours) {
      const k = key(n);
      if (d + cost < (dist.get(k) ?? Infinity)) {
        if (!dist.has(k)) queue.push(n);
        dist.set(k, d + cost);
        prev.set(k, cur);
      }
    }
  }
  if (!best) return { reachable: false, minutes: 0, stops: 0, lines: [], changes: [] };

  const path: Node[] = [];
  for (let n: Node | null = best; n; n = prev.get(key(n)) ?? null) path.unshift(n);
  const lines: MetroLineId[] = [];
  const changes: string[] = [];
  let stops = 0;
  for (let i = 1; i < path.length; i++) {
    if (path[i].station === path[i - 1].station) changes.push(STATIONS[path[i].station].name);
    else {
      stops++;
      if (lines[lines.length - 1] !== path[i].line) lines.push(path[i].line);
    }
  }
  return { reachable: true, minutes: dist.get(key(best))! + PLATFORM_WAIT_MIN, stops, lines, changes };
}

export type StepKind = 'station' | 'metro' | 'road' | 'walk' | 'visit' | 'finish';

export interface PlanStep {
  kind: StepKind;
  /** Minutes since midnight when this step begins. */
  at: number;
  minutes: number;
  title: string;
  detail?: string;
  line?: MetroLineId;
  lines?: MetroLineId[];
  stationId?: string;
  pandalId?: string;
  km?: number;
}

export interface DayPlan {
  steps: PlanStep[];
  stationIds: string[];
  walkingKm: number;
  metroMinutes: number;
  totalMinutes: number;
  endsAt: number;
}

const visitMinutes = (p: Pandal) => (p.popularity >= 85 ? 35 : 20);

/** Groups the chosen pandals by station, orders the stations to minimise Metro time, and lays out the day. */
export function buildDayPlan(pandals: Pandal[], startMinutes: number): DayPlan {
  const groups = new Map<string, Pandal[]>();
  for (const p of pandals) groups.set(p.stationId, [...(groups.get(p.stationId) ?? []), p]);
  for (const g of groups.values()) g.sort((a, b) => a.distanceKm - b.distanceKm);

  // Nearest-neighbour ordering, starting from the earliest station in network order.
  const remaining = [...groups.keys()].sort(
    (a, b) => stationRank(a, groups.get(a)![0].line) - stationRank(b, groups.get(b)![0].line),
  );
  const order: string[] = [];
  if (remaining.length) order.push(remaining.shift()!);
  while (remaining.length) {
    const here = order[order.length - 1];
    let pick = 0;
    let bestCost = Infinity;
    remaining.forEach((s, i) => {
      const hop = metroHop(here, s);
      const cost = hop.reachable ? hop.minutes : 60 + haversineKm(STATIONS[here], STATIONS[s]) * 4;
      if (cost < bestCost) {
        bestCost = cost;
        pick = i;
      }
    });
    order.push(remaining.splice(pick, 1)[0]);
  }

  const steps: PlanStep[] = [];
  let t = startMinutes;
  let walkingKm = 0;
  let metroMinutes = 0;

  order.forEach((sid, idx) => {
    const st = STATIONS[sid];
    const group = groups.get(sid)!;
    steps.push({
      kind: 'station',
      at: t,
      minutes: 0,
      title: st.name,
      detail: idx === 0 ? 'Start here' : `${group.length} ${group.length === 1 ? 'pandal' : 'pandals'} from this station`,
      stationId: sid,
      line: group[0].line,
    });

    group.forEach((p, i) => {
      const km =
        i === 0
          ? p.distanceKm
          : Math.max(
              0.15,
              haversineKm(
                { lat: group[i - 1].latitude, lng: group[i - 1].longitude },
                { lat: p.latitude, lng: p.longitude },
              ) * 1.3,
            );
      const walk = i === 0 ? p.walkingMinutes : Math.max(3, Math.round((km / WALK_KMH) * 60));
      steps.push({ kind: 'walk', at: t, minutes: walk, km, title: `Walk ${km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`}` });
      t += walk;
      walkingKm += km;
      const stay = visitMinutes(p);
      steps.push({ kind: 'visit', at: t, minutes: stay, title: p.name, detail: themeLabel(p), pandalId: p.id, line: p.line });
      t += stay;
    });

    const last = group[group.length - 1];
    if (idx < order.length - 1) {
      steps.push({
        kind: 'walk',
        at: t,
        minutes: last.walkingMinutes,
        km: last.distanceKm,
        title: `Walk back to ${st.name}`,
      });
      t += last.walkingMinutes;
      walkingKm += last.distanceKm;

      const next = STATIONS[order[idx + 1]];
      const hop = metroHop(sid, next.id);
      if (hop.reachable) {
        const via = hop.changes.length ? ` · change at ${hop.changes.join(', ')}` : '';
        steps.push({
          kind: 'metro',
          at: t,
          minutes: hop.minutes,
          title: `Metro to ${next.name}`,
          detail: `${hop.lines.map((l) => LINE_BY_ID[l].name).join(' → ')} · ${hop.stops} ${hop.stops === 1 ? 'stop' : 'stops'}${via}`,
          lines: hop.lines,
          line: hop.lines[0],
        });
        t += hop.minutes;
        metroMinutes += hop.minutes;
      } else {
        const km = haversineKm(st, next) * 1.4;
        const mins = Math.round((km / 18) * 60 + 8);
        steps.push({
          kind: 'road',
          at: t,
          minutes: mins,
          km,
          title: `Cab or bus to ${next.name}`,
          detail: `No Metro link between these lines yet · about ${km.toFixed(1)} km by road`,
        });
        t += mins;
      }
    }
  });

  if (order.length) steps.push({ kind: 'finish', at: t, minutes: 0, title: 'Shubho Pujo — day complete' });

  return {
    steps,
    stationIds: order,
    walkingKm,
    metroMinutes,
    totalMinutes: t - startMinutes,
    endsAt: t,
  };
}

export const lineOfStation = (stationId: string): MetroLineId =>
  STATIONS[stationId]?.lines[0] ?? METRO_LINES[0].id;
