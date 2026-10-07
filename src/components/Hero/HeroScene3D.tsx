import { Line } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { heroPointer } from './pointer';

const SILHOUETTE = '#1b0a11';
const MOON = new THREE.Vector3(24, 13, -60);

// Deterministic pseudo-random so the skyline is identical on every load.
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function Skyline() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const { boxes, windows } = useMemo(() => {
    const rnd = seeded(1433);
    const boxes: { x: number; w: number; h: number }[] = [];
    for (let x = -48; x < 50; ) {
      const w = 1.6 + rnd() * 2.6;
      // Leave the river mouth open where the bridge stands.
      if (x < 0 || x > 27) boxes.push({ x: x + w / 2, w, h: 1.6 + rnd() * 5.4 });
      x += w + rnd() * 0.5;
    }
    const pts: number[] = [];
    for (const b of boxes)
      for (let i = 0; i < 5; i++) if (rnd() > 0.35) pts.push(b.x + (rnd() - 0.5) * (b.w - 0.5), 0.4 + rnd() * (b.h - 0.7), -44.4);
    return { boxes, windows: new Float32Array(pts) };
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    boxes.forEach((b, i) => {
      m.makeScale(b.w, b.h, 1.5).setPosition(b.x, b.h / 2, -45);
      ref.current!.setMatrixAt(i, m);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [boxes]);

  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, boxes.length]} frustumCulled={false}>
        <boxGeometry />
        <meshBasicMaterial color={SILHOUETTE} />
      </instancedMesh>
      {/* Domed landmark on the far bank */}
      <group position={[31, 0, -45]}>
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[9, 3.2, 1.5]} />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
        <mesh position={[0, 3.4, 0]}>
          <sphereGeometry args={[2.4, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
        <mesh position={[0, 6.2, 0]}>
          <coneGeometry args={[0.18, 1.4, 6]} />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[windows, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffc46b" size={0.22} sizeAttenuation transparent opacity={0.8} />
      </points>
    </group>
  );
}

function HowrahBridge() {
  const { truss, chord } = useMemo(() => {
    const x0 = 1;
    const x1 = 25;
    const towers = [8, 18];
    const deck = 1.5;
    const top = 9.4;
    const y = (x: number) => {
      const [a, b] = towers;
      if (x <= a) return deck + 0.6 + (top - deck - 0.6) * ((x - x0) / (a - x0)) ** 1.6;
      if (x >= b) return deck + 0.6 + (top - deck - 0.6) * ((x1 - x) / (x1 - b)) ** 1.6;
      const t = Math.abs(x - (a + b) / 2) / ((b - a) / 2);
      return 5.4 + (top - 5.4) * t ** 1.8;
    };
    const truss: [number, number, number][] = [];
    const chord: [number, number, number][] = [];
    for (let x = x0; x <= x1 + 0.01; x += 1) {
      chord.push([x, y(x), 0]);
      truss.push([x, deck, 0], [x, y(x), 0]);
      if (x < x1) truss.push([x, deck, 0], [x + 1, y(x + 1), 0]);
    }
    return { truss, chord };
  }, []);

  return (
    <group position={[0, 0, -34]}>
      <Line points={truss} segments color="#2b1018" lineWidth={1.6} />
      <Line points={chord} color="#2b1018" lineWidth={3.5} />
      <Line points={chord} color="#ff9d57" lineWidth={1} transparent opacity={0.35} />
      <mesh position={[13, 1.4, 0]}>
        <boxGeometry args={[30, 0.35, 0.8]} />
        <meshBasicMaterial color={SILHOUETTE} />
      </mesh>
      {[8, 18].map((x) => (
        <mesh key={x} position={[x, 4.6, 0]}>
          <boxGeometry args={[0.7, 9.6, 0.8]} />
          <meshBasicMaterial color={SILHOUETTE} />
        </mesh>
      ))}
    </group>
  );
}

const waterShader = {
  uniforms: { uTime: { value: 0 }, uMoonX: { value: MOON.x }, uMoonDist: { value: 80 } },
  vertexShader: /* glsl */ `
    varying vec3 vWorld;
    void main() {
      vec4 w = modelMatrix * vec4(position, 1.0);
      vWorld = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragmentShader: /* glsl */ `
    uniform float uTime; uniform float uMoonX; uniform float uMoonDist;
    varying vec3 vWorld;
    void main() {
      float depth = 20.0 - vWorld.z;                       // distance from camera along the view
      float far = smoothstep(0.0, 64.0, depth);
      vec3 col = mix(vec3(0.070, 0.035, 0.035), vec3(0.24, 0.07, 0.10), far);
      // Broken lines of light, densest in the column beneath the moon.
      float cx = uMoonX * depth / uMoonDist;
      float column = exp(-pow((vWorld.x - cx) / (0.3 + depth * 0.05), 2.0));
      float wave = sin(vWorld.z * 9.0 + sin(vWorld.x * 2.3 + uTime * 0.7) * 1.4 + uTime * 1.1);
      float glint = smoothstep(0.72, 1.0, wave) * smoothstep(9.0, 30.0, depth);
      col += vec3(1.0, 0.62, 0.28) * glint * column * 0.85;
      col += vec3(0.85, 0.35, 0.20) * column * 0.12 * far;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

function Water() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => {
    if (mat.current) mat.current.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -12]}>
      <planeGeometry args={[220, 70]} />
      <shaderMaterial ref={mat} args={[waterShader]} />
    </mesh>
  );
}

function Moon() {
  return (
    <mesh position={MOON}>
      <circleGeometry args={[4.2, 48]} />
      <meshBasicMaterial color="#f6a04f" />
    </mesh>
  );
}

// Elevated Metro viaduct running from the right foreground towards the bridge.
const TRACK_FROM = new THREE.Vector3(9.5, 0, -30);
const TRACK_TO = new THREE.Vector3(19.5, 0, 2);

function MetroTrain() {
  const train = useRef<THREE.Group>(null);
  const pillars = useRef<THREE.InstancedMesh>(null);
  const { length, angle } = useMemo(() => {
    const d = TRACK_TO.clone().sub(TRACK_FROM);
    return { length: d.length(), angle: Math.atan2(-d.z, d.x) };
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    for (let i = 0; i < 8; i++) {
      m.makeScale(0.5, 2.3, 0.5).setPosition(2 + i * 4.2, 1.15, 0);
      pillars.current!.setMatrixAt(i, m);
    }
    pillars.current!.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((s) => {
    // A slow glide back and forth along the deck: movement without leaving the frame.
    if (train.current) train.current.position.x = 10 + Math.sin(s.clock.elapsedTime * 0.22) * 2.6;
  });

  return (
    <group position={TRACK_FROM} rotation-y={angle}>
      <mesh position={[length / 2, 2.45, 0]}>
        <boxGeometry args={[length + 6, 0.32, 1.5]} />
        <meshStandardMaterial color="#231018" roughness={0.9} />
      </mesh>
      <instancedMesh ref={pillars} args={[undefined, undefined, 8]}>
        <boxGeometry />
        <meshStandardMaterial color="#1d0c13" roughness={1} />
      </instancedMesh>

      <group ref={train} position={[10, 3.18, 0]}>
        {[0, 1, 2, 3].map((c) => (
          <group key={c} position={[c * 4.45, 0, 0]}>
            <mesh>
              <boxGeometry args={[4.3, 1.1, 0.95]} />
              <meshStandardMaterial color="#e9e1ee" roughness={0.55} metalness={0.25} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[4.32, 0.16, 0.97]} />
              <meshStandardMaterial color="#8b3fd6" emissive="#5b1fa0" emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <boxGeometry args={[3.9, 0.36, 0.98]} />
              <meshBasicMaterial color="#ffd58a" toneMapped={false} />
            </mesh>
            {[-1.17, -0.39, 0.39, 1.17].map((x) => (
              <mesh key={x} position={[x, 0.16, 0]}>
                <boxGeometry args={[0.14, 0.4, 1]} />
                <meshStandardMaterial color="#d9d0e0" roughness={0.6} />
              </mesh>
            ))}
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[4.1, 0.14, 0.8]} />
              <meshBasicMaterial color="#160a10" />
            </mesh>
          </group>
        ))}
        {/* Leading cab faces the camera */}
        <mesh position={[15.55, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.7]} />
          <meshBasicMaterial color="#2a1a35" />
        </mesh>
        <mesh position={[15.62, -0.3, 0.3]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#fff3c9" toneMapped={false} />
        </mesh>
        <mesh position={[15.62, -0.3, -0.3]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#fff3c9" toneMapped={false} />
        </mesh>
        <pointLight position={[16.4, 0, 0]} color="#ffd58a" intensity={6} distance={9} />
      </group>
    </group>
  );
}

const emberShader = {
  uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
  vertexShader: /* glsl */ `
    uniform float uTime; uniform float uPixelRatio;
    attribute vec3 aSeed;                // x: phase, y: rise speed (0 = floats on water), z: size
    varying float vAlpha;
    void main() {
      vec3 p = position;
      float t = uTime * aSeed.y + aSeed.x * 12.0;
      p.y += mod(t, 12.0) * step(0.001, aSeed.y);
      p.x += sin(uTime * 0.35 + aSeed.x * 40.0) * 0.45;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSeed.z * uPixelRatio * (140.0 / -mv.z);
      float life = aSeed.y > 0.0 ? sin(3.14159 * mod(t, 12.0) / 12.0) : 1.0;
      vAlpha = life * (0.55 + 0.45 * sin(uTime * 2.2 + aSeed.x * 90.0));
    }`,
  fragmentShader: /* glsl */ `
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float glow = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(mix(vec3(1.0, 0.55, 0.2), vec3(1.0, 0.86, 0.5), glow), glow * glow * vAlpha);
    }`,
};

/** Rising embers plus diyas set afloat on the river, drawn as one point cloud. */
function Embers({ count = 240, diyas = 46 }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const dpr = useThree((s) => s.viewport.dpr);
  const { positions, seeds } = useMemo(() => {
    const rnd = seeded(2026);
    const positions = new Float32Array((count + diyas) * 3);
    const seeds = new Float32Array((count + diyas) * 3);
    for (let i = 0; i < count + diyas; i++) {
      const floating = i >= count;
      positions.set(
        floating
          ? [-4 + rnd() * 24, 0.08, -20 + rnd() * 26]
          : [-18 + rnd() * 38, -1 + rnd() * 2, -24 + rnd() * 34],
        i * 3,
      );
      seeds.set([rnd(), floating ? 0 : 0.25 + rnd() * 0.5, floating ? 1.6 + rnd() : 0.7 + rnd() * 1.5], i * 3);
    }
    return { positions, seeds };
  }, [count, diyas]);

  useFrame((s) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = s.clock.elapsedTime;
    mat.current.uniforms.uPixelRatio.value = dpr;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        args={[emberShader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig({ onReady }: { onReady: () => void }) {
  const ready = useRef(false);
  const target = useMemo(() => new THREE.Vector3(1.5, 3.6, -20), []);
  useFrame(({ camera }, delta) => {
    const k = 1 - Math.exp(-delta * 2.2);
    camera.position.x += (heroPointer.x * 0.9 - camera.position.x) * k;
    camera.position.y += (3.2 - heroPointer.y * 0.35 - camera.position.y) * k;
    camera.lookAt(target);
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });
  return null;
}

export default function HeroScene3D({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 3.2, 20], fov: 32, near: 0.5, far: 200 }}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.55} color="#ffb787" />
      <directionalLight position={[10, 9, -30]} intensity={2.2} color="#ff9a57" />
      <directionalLight position={[-6, 6, 14]} intensity={0.5} color="#c9a2ff" />
      <Moon />
      <Skyline />
      <HowrahBridge />
      <Water />
      <MetroTrain />
      <Embers />
      <Rig onReady={onReady} />
    </Canvas>
  );
}
