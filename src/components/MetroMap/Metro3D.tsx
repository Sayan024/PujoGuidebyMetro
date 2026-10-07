import { Html, Line, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { PANDALS, stationPandals } from '@/data';
import { LINE_BY_ID, METRO_LINES, STATION_LIST, STATIONS } from '@/data/metroLines';
import type { MetroLineId } from '@/data/types';
import { BOUNDS, HOOGHLY } from '@/lib/geo';
import { useAppStore } from '@/store/appStore';

// Kolkata laid flat: x = east, z = south, about 1 unit per 2.5 km.
const SCALE = 10;
function place(lat: number, lng: number, y = 0): [number, number, number] {
  const x = ((lng - (BOUNDS.minLng + BOUNDS.maxLng) / 2) / (BOUNDS.maxLat - BOUNDS.minLat)) * SCALE * 0.925;
  const z = (((BOUNDS.minLat + BOUNDS.maxLat) / 2 - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * SCALE;
  return [x, y, z];
}

const LINE_POINTS = Object.fromEntries(
  METRO_LINES.map((l) => [l.id, l.stations.map((s) => place(STATIONS[s].lat, STATIONS[s].lng, 0.06))]),
) as Record<MetroLineId, [number, number, number][]>;
const RIVER = HOOGHLY.map(([lat, lng]) => place(lat, lng, 0.01));

function Pandals({ line, stationId }: { line: MetroLineId | 'all'; stationId: string | null }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current!;
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    PANDALS.forEach((p, i) => {
      const lit = (line === 'all' || p.line === line) && (!stationId || p.stationId === stationId);
      const h = (0.12 + ((p.popularity - 60) / 40) * 0.5) * (lit ? 1 : 0.35);
      const [x, , z] = place(p.latitude, p.longitude);
      m.makeScale(1, h, 1).setPosition(x, h / 2, z);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, c.set(lit ? '#ffd66b' : '#5a3a28'));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [line, stationId]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PANDALS.length]}>
      <cylinderGeometry args={[0.012, 0.03, 1, 6]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

/** A light travelling along the highlighted line. */
function Pulse({ line }: { line: MetroLineId }) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(LINE_POINTS[line].map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.1),
    [line],
  );
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.09) % 1;
    ref.current?.position.copy(curve.getPointAt(t < 0.5 ? t * 2 : 2 - t * 2));
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshBasicMaterial color="#fff4e6" toneMapped={false} />
      <pointLight color={LINE_BY_ID[line].color} intensity={3} distance={2.5} />
    </mesh>
  );
}

function Stations({ line, stationId }: { line: MetroLineId | 'all'; stationId: string | null }) {
  const setStation = useAppStore((s) => s.setStation);
  return (
    <>
      {STATION_LIST.map((s) => {
        const on = s.id === stationId;
        const dim = line !== 'all' && !s.lines.includes(line);
        const color = LINE_BY_ID[s.lines[0]].color;
        return (
          <mesh
            key={s.id}
            position={place(s.lat, s.lng, 0.06)}
            scale={on ? 1.9 : 1}
            onClick={(e) => {
              e.stopPropagation();
              setStation(on ? null : s.id);
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = '')}
          >
            <sphereGeometry args={[0.055, 16, 12]} />
            <meshStandardMaterial
              color={on ? '#fff4e6' : color}
              emissive={color}
              emissiveIntensity={on ? 2.2 : dim ? 0.1 : 0.9}
              transparent
              opacity={dim ? 0.35 : 1}
            />
            {on && (
              <Html center distanceFactor={9} position={[0, 0.32, 0]} style={{ pointerEvents: 'none' }}>
                <div className="whitespace-nowrap rounded-sm border border-[#ddaa44]/60 bg-[#120909]/90 px-2.5 py-1 text-xs font-bold text-[#ffd66b]">
                  {s.name} · {stationPandals(s.id).length} pandals
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </>
  );
}

/** Visual overview of the network in 3D. Navigation stays on the street map. */
export default function Metro3D({ animate }: { animate: boolean }) {
  const line = useAppStore((s) => s.line);
  const stationId = useAppStore((s) => s.stationId);
  const highlight: MetroLineId = stationId ? STATIONS[stationId].lines[0] : line === 'all' ? 'blue' : line;

  return (
    <div data-theme="dark" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#3a121b,#120909_70%)]">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={animate ? 'always' : 'demand'}
        camera={{ position: [3.4, 6.2, 8.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        aria-label="3D overview of the Kolkata Metro network. Drag to rotate."
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 8, 2]} intensity={1.2} color="#ffcf9a" />
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
          <circleGeometry args={[7.5, 64]} />
          <meshStandardMaterial color="#1c0b11" roughness={1} />
        </mesh>
        <gridHelper args={[15, 30, '#4a1f27', '#2b1218']} position={[0, 0, 0]} />
        <Line points={RIVER} color="#2563EB" lineWidth={16} transparent opacity={0.14} />

        {METRO_LINES.map((l) => {
          const dim = line !== 'all' && line !== l.id;
          return (
            <group key={l.id}>
              <Line points={LINE_POINTS[l.id]} color={l.color} lineWidth={9} transparent opacity={dim ? 0.04 : 0.2} />
              <Line points={LINE_POINTS[l.id]} color={l.color} lineWidth={3} transparent opacity={dim ? 0.25 : 1} />
            </group>
          );
        })}
        <Stations line={line} stationId={stationId} />
        <Pandals line={line} stationId={stationId} />
        {animate && <Pulse line={highlight} />}

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          minDistance={4.5}
          maxDistance={16}
          minPolarAngle={0.35}
          maxPolarAngle={1.35}
          autoRotate={animate}
          autoRotateSpeed={0.35}
          target={[0, 0, 0.4]}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c8aeb0]">
        Drag to orbit · scroll to zoom · tap a station
      </p>
    </div>
  );
}
