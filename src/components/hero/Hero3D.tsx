import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Line2, LineMaterial } from "three-stdlib";
import { cn } from "@/lib/utils";

export type HeroVariant = "neural" | "graph" | "particles";
export type HeroPlacement = "centerpiece" | "background";

interface Hero3DProps {
  variant: HeroVariant;
  placement: HeroPlacement;
  heightClass?: string;
  className?: string;
  backgroundOpacity?: number;
}

const ACCENT_LIGHT = "#D97E16";
const ACCENT_DARK = "#FFB84D";
const DIM_LIGHT = "#C9A46E";
const DIM_DARK = "#8a8a8a";

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );
  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() =>
      setIsDark(el.classList.contains("dark")),
    );
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Deterministic pseudo-random in [0, 1) */
const mulberry = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ── Data pulse traveling along an edge ──
function Pulse({
  a,
  b,
  offset,
  speed,
  accent,
  radius,
  reduced,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  offset: number;
  speed: number;
  accent: string;
  radius?: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = reduced ? offset : (clock.elapsedTime * speed + offset) % 1;
    v.lerpVectors(a, b, t);
    ref.current.position.copy(v);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius ?? 0.05, 14, 14]} />
      <meshBasicMaterial
        color={accent}
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ── Variant: neural network ──
function NeuralNode({
  position,
  radius,
  accent,
  phase,
  reduced,
}: {
  position: THREE.Vector3;
  radius: number;
  accent: string;
  phase: number;
  reduced: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    const mat = matRef.current;
    if (!m || !mat) return;
    const t = reduced ? 0 : clock.elapsedTime;
    const wave = 0.5 + 0.5 * Math.sin(t * 1.6 + phase);
    m.scale.setScalar(1 + wave * 0.12);
    mat.emissiveIntensity = 0.18 + wave * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 28, 28]} />
      <meshStandardMaterial
        ref={matRef}
        color={accent}
        emissive={accent}
        emissiveIntensity={0.18}
        roughness={0.25}
        metalness={0.15}
      />
    </mesh>
  );
}

function NeuralNet({
  accent,
  dim,
  reduced,
}: {
  accent: string;
  dim: string;
  reduced: boolean;
}) {
  const layers = useMemo(() => [14, 26, 26, 14], []);

  const nodes = useMemo(() => {
    const arr: { pos: THREE.Vector3; radius: number }[] = [];
    layers.forEach((count, li) => {
      const isOutput = li === layers.length - 1;
      for (let j = 0; j < count; j++) {
        const x = (li - (layers.length - 1) / 2) * 0.9;
        const y = (j - (count - 1) / 2) * 0.13;
        const z = (mulberry(li * 10 + j) - 0.5) * 0.5;
        arr.push({
          pos: new THREE.Vector3(x, y, z),
          radius: isOutput ? 0.05 : 0.035,
        });
      }
    });
    return arr;
  }, [layers]);

  // Fully connected between layers — every neuron links to every neuron in the
  // next layer. 14×26 + 26×26 + 26×14 = ~1400 thin connections = dense NN web.
  const edges = useMemo(() => {
    const list: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    let idx = 0;
    layers.forEach((count, li) => {
      const start = idx;
      idx += count;
      if (li === layers.length - 1) return;
      const nextStart = idx;
      const nextCount = layers[li + 1];
      for (let j = 0; j < count; j++) {
        for (let k = 0; k < nextCount; k++) {
          list.push({ a: nodes[start + j].pos, b: nodes[nextStart + k].pos });
        }
      }
    });
    return list;
  }, [layers, nodes]);

  // All edges in one LineSegments geometry — a single draw call.
  const edgePositions = useMemo(() => {
    const pts = new Float32Array(edges.length * 6);
    edges.forEach((e, i) => {
      pts[i * 6] = e.a.x;
      pts[i * 6 + 1] = e.a.y;
      pts[i * 6 + 2] = e.a.z;
      pts[i * 6 + 3] = e.b.x;
      pts[i * 6 + 4] = e.b.y;
      pts[i * 6 + 5] = e.b.z;
    });
    return pts;
  }, [edges]);

  const pulses = useMemo(() => {
    const arr: {
      a: THREE.Vector3;
      b: THREE.Vector3;
      offset: number;
      speed: number;
    }[] = [];
    for (let i = 0; i < 26; i++) {
      const e = edges[Math.floor(mulberry(i + 99) * edges.length)];
      arr.push({
        a: e.a,
        b: e.b,
        offset: mulberry(i * 3 + 7),
        speed: 0.45 + mulberry(i + 5) * 0.55,
      });
    }
    return arr;
  }, [edges]);

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={dim} transparent opacity={0.06} />
      </lineSegments>
      {nodes.map((n, i) => (
        <NeuralNode
          key={i}
          position={n.pos}
          radius={n.radius}
          accent={accent}
          phase={mulberry(i + 31) * Math.PI * 2}
          reduced={reduced}
        />
      ))}
      {pulses.map((p, i) => (
        <Pulse
          key={i}
          a={p.a}
          b={p.b}
          offset={p.offset}
          speed={p.speed}
          accent={accent}
          radius={0.05}
          reduced={reduced}
        />
      ))}
    </group>
  );
}

// ── Variant: RAG knowledge graph ──
// Shared cycle rate — keeps edge glow, retrieval pulses and node brightness in sync.
const GRAPH_CYCLE = 0.16;

function QueryNode({ accent, reduced }: { accent: string; reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    const mat = matRef.current;
    if (!m || !mat) return;
    const t = reduced ? 0 : clock.elapsedTime;
    const pulse = 0.5 + 0.5 * Math.sin(t * 2);
    mat.emissiveIntensity = 0.5 + pulse * 0.5;
    m.scale.setScalar(1 + pulse * 0.06);
  });

  return (
    <group>
      {/* Soft halo around the query node */}
      <mesh>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshBasicMaterial color={accent} transparent opacity={0.12} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.16, 28, 28]} />
        <meshStandardMaterial
          ref={matRef}
          color={accent}
          emissive={accent}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function SonarRing({
  accent,
  reduced,
  phase,
}: {
  accent: string;
  reduced: boolean;
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m || reduced) return;
    const cycle = (clock.elapsedTime * 0.3 + phase) % 1;
    m.scale.setScalar(0.9 + cycle * 2.6);
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = (1 - cycle) * 0.45;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.3, 0.36, 48]} />
      <meshBasicMaterial
        color={accent}
        transparent
        opacity={0.45}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SatelliteNode({
  position,
  radius,
  accent,
  offset,
  reduced,
}: {
  position: THREE.Vector3;
  radius: number;
  accent: string;
  offset: number;
  reduced: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    const mat = matRef.current;
    if (!m || !mat) return;
    const t = reduced ? 0.3 : (clock.elapsedTime * GRAPH_CYCLE + offset) % 1;
    const glow = Math.sin(t * Math.PI);
    mat.emissiveIntensity = 0.12 + glow * 0.75;
    m.scale.setScalar(1 + glow * 0.3);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 20, 20]} />
      <meshStandardMaterial
        ref={matRef}
        color={accent}
        emissive={accent}
        emissiveIntensity={0.12}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

function RetrievalEdge({
  a,
  b,
  accent,
  offset,
  reduced,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  accent: string;
  offset: number;
  reduced: boolean;
}) {
  const ref = useRef<Line2 | null>(null);

  useFrame(({ clock }) => {
    const mat = ref.current?.material as LineMaterial | undefined;
    if (!mat) return;
    const t = reduced ? 0.3 : (clock.elapsedTime * GRAPH_CYCLE + offset) % 1;
    const glow = Math.sin(t * Math.PI);
    mat.opacity = 0.12 + glow * 0.9;
    mat.color.set(accent);
  });

  return (
    <Line
      ref={ref}
      points={[a, b]}
      color={accent}
      lineWidth={1.2}
      transparent
      opacity={0.12}
    />
  );
}

function KnowledgeGraph({
  accent,
  dim,
  reduced,
}: {
  accent: string;
  dim: string;
  reduced: boolean;
}) {
  const query = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const satellites = useMemo(() => {
    const arr: { pos: THREE.Vector3; radius: number; offset: number }[] = [];
    const n = 24;
    for (let i = 0; i < n; i++) {
      const theta = mulberry(i) * Math.PI * 2;
      const phi = Math.acos(2 * mulberry(i + 100) - 1);
      const r = 1.15 + mulberry(i + 200) * 0.8;
      arr.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi),
        ),
        radius: 0.035 + mulberry(i + 300) * 0.025,
        offset: mulberry(i + 7),
      });
    }
    return arr;
  }, []);

  // Static web of inter-satellite links (dim, dashed).
  const crossEdges = useMemo(() => {
    const list: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i < satellites.length; i++) {
      const j = (i * 3 + 1) % satellites.length;
      const k = (i * 5 + 2) % satellites.length;
      if (j !== i) list.push({ a: satellites[i].pos, b: satellites[j].pos });
      if (k !== i && k !== j) {
        list.push({ a: satellites[i].pos, b: satellites[k].pos });
      }
    }
    return list;
  }, [satellites]);

  return (
    <group>
      <QueryNode accent={accent} reduced={reduced} />
      <SonarRing accent={accent} reduced={reduced} phase={0} />
      <SonarRing accent={accent} reduced={reduced} phase={0.5} />
      {satellites.map((s, i) => (
        <SatelliteNode
          key={i}
          position={s.pos}
          radius={s.radius}
          accent={accent}
          offset={s.offset}
          reduced={reduced}
        />
      ))}
      {satellites.map((s, i) => (
        <RetrievalEdge
          key={i}
          a={query}
          b={s.pos}
          accent={accent}
          offset={s.offset}
          reduced={reduced}
        />
      ))}
      {crossEdges.map((e, i) => (
        <Line
          key={i}
          points={[e.a, e.b]}
          color={dim}
          lineWidth={1}
          transparent
          opacity={0.22}
          dashed
          dashSize={0.08}
          gapSize={0.06}
        />
      ))}
      {satellites.map((s, i) => (
        <Pulse
          key={`pulse-${i}`}
          a={query}
          b={s.pos}
          offset={s.offset}
          speed={GRAPH_CYCLE}
          accent={accent}
          radius={0.045}
          reduced={reduced}
        />
      ))}
    </group>
  );
}

// ── Variant: particle data stream ──
const PARTICLE_COUNT = 400;

function ParticleStream({ accent, reduced }: { accent: string; reduced: boolean }) {
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const groupRef = useRef<THREE.Group>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const base = new Float32Array(PARTICLE_COUNT * 2);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 0.3 + mulberry(i * 7 + 1) * 0.7;
      const ang = mulberry(i * 13 + 2) * Math.PI * 2;
      base[i * 2] = Math.cos(ang) * r;
      base[i * 2 + 1] = Math.sin(ang) * r;
      positions[i * 3] = base[i * 2];
      positions[i * 3 + 1] = (mulberry(i * 3 + 3) * 2 - 1) * 1.8;
      positions[i * 3 + 2] = base[i * 2 + 1];
      speeds[i] = 0.25 + mulberry(i * 5 + 4) * 0.55;
      phases[i] = mulberry(i * 11 + 5) * Math.PI * 2;
    }
    return { positions, base, speeds, phases };
  }, []);

  useFrame(({ clock }, delta) => {
    const geo = geoRef.current;
    const grp = groupRef.current;
    if (!geo || !grp) return;
    const pos = geo.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let y = pos[i * 3 + 1] + data.speeds[i] * delta;
      if (y > 1.8) y = -1.8;
      pos[i * 3] = data.base[i * 2] + Math.sin(t * 0.6 + data.phases[i]) * 0.09;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] =
        data.base[i * 2 + 1] + Math.cos(t * 0.5 + data.phases[i]) * 0.09;
    }
    geo.attributes.position.needsUpdate = true;
    if (!reduced) grp.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color={accent}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ── Scene: idle float + parallax + user orbit controls ──
// Scales content so its full extent always fits the visible area (background mode).
const BACKGROUND_EXTENT: Record<HeroVariant, { x: number; y: number }> = {
  neural: { x: 1.4, y: 1.7 },
  graph: { x: 2.05, y: 1.5 },
  particles: { x: 1.15, y: 1.9 },
};

function FitFrame({
  extentX,
  extentY,
  children,
}: {
  extentX: number;
  extentY: number;
  children: ReactNode;
}) {
  const viewport = useThree((s) => s.viewport);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    const g = ref.current;
    if (!g) return;
    const scale = Math.min(
      (viewport.width * 0.8) / (extentX * 2),
      (viewport.height * 0.8) / (extentY * 2),
    );
    g.scale.setScalar(Math.max(0.4, Math.min(scale, 2)));
  }, [viewport, extentX, extentY]);

  return <group ref={ref}>{children}</group>;
}

function Scene({
  variant,
  accent,
  dim,
  reduced,
  interacted,
  onInteract,
}: {
  variant: HeroVariant;
  accent: string;
  dim: string;
  reduced: boolean;
  interacted: boolean;
  onInteract: () => void;
}) {
  const parRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!reduced && !interacted && parRef.current) {
      const tx = state.pointer.y * 0.18;
      const ty = state.pointer.x * 0.3;
      parRef.current.rotation.x += (tx - parRef.current.rotation.x) * 0.05;
      parRef.current.rotation.y += (ty - parRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <>
      <group ref={parRef}>
        <Float
          speed={1.6}
          rotationIntensity={0.35}
          floatIntensity={0.8}
          floatingRange={[-0.08, 0.08]}
        >
          {variant === "neural" && (
            <NeuralNet accent={accent} dim={dim} reduced={reduced} />
          )}
          {variant === "graph" && (
            <KnowledgeGraph accent={accent} dim={dim} reduced={reduced} />
          )}
          {variant === "particles" && (
            <ParticleStream accent={accent} reduced={reduced} />
          )}
        </Float>
      </group>
      {/* Idle auto-rotate until the user grabs it — then it becomes their own. */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={!reduced && !interacted}
        autoRotateSpeed={1.2}
        onStart={onInteract}
      />
    </>
  );
}

export default function Hero3D({
  variant,
  placement,
  heightClass = "h-52 sm:h-56 md:h-64",
  className,
  backgroundOpacity = 0.55,
}: Hero3DProps) {
  const isDark = useIsDark();
  const reduced = usePrefersReducedMotion();
  const accent = isDark ? ACCENT_DARK : ACCENT_LIGHT;
  const dim = isDark ? DIM_DARK : DIM_LIGHT;
  const isBackground = placement === "background";
  const [interacted, setInteracted] = useState(false);

  return (
    <div
      className={cn(
        isBackground
          ? "absolute inset-0 pointer-events-none"
          : cn(
              "relative w-full max-w-md mx-auto cursor-grab active:cursor-grabbing touch-none",
              heightClass,
            ),
        className,
      )}
      style={isBackground ? { opacity: backgroundOpacity } : undefined}
      aria-hidden="true"
    >
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, isBackground ? 8 : 5.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 6, 5]} intensity={1.1} />
        <directionalLight position={[-5, -3, -4]} intensity={0.35} color={accent} />
        {isBackground ? (
          <FitFrame extentX={BACKGROUND_EXTENT[variant].x} extentY={BACKGROUND_EXTENT[variant].y}>
            <Scene
              variant={variant}
              accent={accent}
              dim={dim}
              reduced={reduced}
              interacted={interacted}
              onInteract={() => setInteracted(true)}
            />
          </FitFrame>
        ) : (
          <group scale={0.85}>
            <Scene
              variant={variant}
              accent={accent}
              dim={dim}
              reduced={reduced}
              interacted={interacted}
              onInteract={() => setInteracted(true)}
            />
          </group>
        )}
      </Canvas>
    </div>
  );
}
