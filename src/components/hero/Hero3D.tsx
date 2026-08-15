import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
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
  reduced,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  offset: number;
  speed: number;
  accent: string;
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
      <sphereGeometry args={[0.04, 12, 12]} />
      <meshBasicMaterial color={accent} />
    </mesh>
  );
}

// ── Variant: neural network ──
function NeuralNet({
  accent,
  dim,
  reduced,
}: {
  accent: string;
  dim: string;
  reduced: boolean;
}) {
  const layers = useMemo(() => [3, 4, 4, 3], []);

  const nodes = useMemo(() => {
    const arr: { pos: THREE.Vector3 }[] = [];
    layers.forEach((count, li) => {
      for (let j = 0; j < count; j++) {
        const x = (li - (layers.length - 1) / 2) * 1.55;
        const y = (j - (count - 1) / 2) * 0.8;
        const z = (mulberry(li * 10 + j) - 0.5) * 0.35;
        arr.push({ pos: new THREE.Vector3(x, y, z) });
      }
    });
    return arr;
  }, [layers]);

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

  const pulses = useMemo(() => {
    const arr: {
      a: THREE.Vector3;
      b: THREE.Vector3;
      offset: number;
      speed: number;
    }[] = [];
    for (let i = 0; i < 8; i++) {
      const e = edges[Math.floor(mulberry(i + 99) * edges.length)];
      arr.push({
        a: e.a,
        b: e.b,
        offset: mulberry(i * 3 + 7),
        speed: 0.4 + mulberry(i + 5) * 0.5,
      });
    }
    return arr;
  }, [edges]);

  return (
    <group>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.35}
            roughness={0.3}
            metalness={0.15}
          />
        </mesh>
      ))}
      {edges.map((e, i) => (
        <Line
          key={i}
          points={[e.a, e.b]}
          color={dim}
          lineWidth={1}
          transparent
          opacity={0.45}
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
          reduced={reduced}
        />
      ))}
    </group>
  );
}

// ── Variant: RAG knowledge graph ──
function HaloRing({ accent, reduced }: { accent: string; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = reduced ? 0 : clock.elapsedTime;
    m.scale.setScalar(1 + Math.sin(t * 1.5) * 0.1);
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.35 + (reduced ? 0 : Math.sin(t * 1.5) * 0.2);
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.28, 0.34, 48]} />
      <meshBasicMaterial
        color={accent}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GraphEdge({
  a,
  b,
  accent,
  dim,
  offset,
  reduced,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  accent: string;
  dim: string;
  offset: number;
  reduced: boolean;
}) {
  const ref = useRef<Line2 | null>(null);
  useFrame(({ clock }) => {
    const mat = ref.current?.material as LineMaterial | undefined;
    if (!mat) return;
    const t = reduced ? 0.5 : (clock.elapsedTime * 0.22 + offset) % 1;
    const glow = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
    mat.opacity = 0.2 + glow * 0.8;
    mat.color.set(accent);
  });
  return (
    <Line
      ref={ref}
      points={[a, b]}
      color={dim}
      lineWidth={1.2}
      transparent
      opacity={0.25}
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
    const arr: { pos: THREE.Vector3; phase: number }[] = [];
    const n = 12;
    for (let i = 0; i < n; i++) {
      const theta = mulberry(i) * Math.PI * 2;
      const phi = Math.acos(2 * mulberry(i + 100) - 1);
      const r = 1.3 + mulberry(i + 200) * 0.8;
      arr.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi),
        ),
        phase: mulberry(i + 7) * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  const crossEdges = useMemo(() => {
    const list: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i < satellites.length; i++) {
      const j = (i * 3 + 1) % satellites.length;
      if (j !== i) list.push({ a: satellites[i].pos, b: satellites[j].pos });
    }
    return list;
  }, [satellites]);

  return (
    <group>
      {/* Query node */}
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>
      <HaloRing accent={accent} reduced={reduced} />
      {satellites.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.3}
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>
      ))}
      {satellites.map((s, i) => (
        <GraphEdge
          key={i}
          a={query}
          b={s.pos}
          accent={accent}
          dim={dim}
          offset={s.phase / (Math.PI * 2)}
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
          opacity={0.28}
          dashed
          dashSize={0.08}
          gapSize={0.06}
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

// ── Scene: auto-rotate + cursor parallax + idle float ──
function Scene({
  variant,
  accent,
  dim,
  reduced,
}: {
  variant: HeroVariant;
  accent: string;
  dim: string;
  reduced: boolean;
}) {
  const rotRef = useRef<THREE.Group>(null);
  const parRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!reduced && rotRef.current) {
      rotRef.current.rotation.y += delta * 0.14;
    }
    if (!reduced && parRef.current) {
      const tx = state.pointer.y * 0.18;
      const ty = state.pointer.x * 0.3;
      parRef.current.rotation.x += (tx - parRef.current.rotation.x) * 0.05;
      parRef.current.rotation.y += (ty - parRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={rotRef}>
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
    </group>
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

  return (
    <div
      className={cn(
        isBackground
          ? "absolute inset-0 pointer-events-none"
          : cn("relative w-full max-w-md mx-auto pointer-events-none", heightClass),
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
        <group scale={isBackground ? 1.6 : 1.05}>
          <Scene variant={variant} accent={accent} dim={dim} reduced={reduced} />
        </group>
      </Canvas>
    </div>
  );
}
