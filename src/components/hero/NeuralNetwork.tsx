import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D Neural Network — concentric shells of warm amber nodes connected by
 * ring + radial edges, slowly rotating behind the hero text.
 */

// ── Deterministic PRNG (matches Hero3D) ──
const mulberry = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const FLATTEN = { x: 1.3, y: 0.9, z: 0.5 };
const EDGE_FADE_REF = 2.5;

// ── Shell definitions ──
const SHELLS_DESKTOP = {
  radii: [1.2, 2.0, 2.8, 3.4],
  counts: [8, 12, 16, 19], // 55 nodes
};
const SHELLS_MOBILE = {
  radii: [1.0, 1.7, 2.4, 3.0],
  counts: [5, 7, 9, 9], // 30 nodes
};

interface ShellDef {
  radii: number[];
  counts: number[];
}

// ── Node placement — even Fibonacci spheres per shell ──
function fibSphere(count: number, r: number, seed: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let j = 0; j < count; j++) {
    const z = 1 - (2 * j + 1) / count;
    const rxy = Math.sqrt(1 - z * z);
    const theta = j * GOLDEN_ANGLE + mulberry(seed + j) * 0.3;
    pts.push(
      new THREE.Vector3(
        rxy * Math.cos(theta) * r * FLATTEN.x,
        rxy * Math.sin(theta) * r * FLATTEN.y,
        z * r * FLATTEN.z,
      ),
    );
  }
  return pts;
}

function generateNetwork(shells: ShellDef) {
  const positions: THREE.Vector3[] = [];
  const shellOf: number[] = [];
  const shellStart: number[] = [];
  let idx = 0;
  shells.radii.forEach((r, s) => {
    shellStart.push(idx);
    const pts = fibSphere(shells.counts[s], r, s * 100);
    pts.forEach((p) => {
      positions.push(p);
      shellOf.push(s);
    });
    idx += shells.counts[s];
  });
  return { positions, shellOf, shellStart };
}

// ── Edges — ring + radial + sparse cross-links ──
function generateEdges(
  positions: THREE.Vector3[],
  _shellOf: number[],
  shellStart: number[],
  shellCounts: number[],
): [number, number][] {
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];

  const add = (a: number, b: number) => {
    if (a === b) return;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push(a < b ? [a, b] : [b, a]);
  };

  const shellCount = shellCounts.length;

  for (let s = 0; s < shellCount; s++) {
    const start = shellStart[s];
    const count = shellCounts[s];

    // 1) Ring — connect each node to its neighbor on the same shell
    for (let j = 0; j < count; j++) {
      add(start + j, start + ((j + 1) % count));
    }

    // 2) Radial — connect each node to its 2 nearest on the next shell
    if (s < shellCount - 1) {
      const nextStart = shellStart[s + 1];
      const nextCount = shellCounts[s + 1];
      for (let j = 0; j < count; j++) {
        const a = positions[start + j];
        const dists: { idx: number; d: number }[] = [];
        for (let k = 0; k < nextCount; k++) {
          dists.push({
            idx: nextStart + k,
            d: a.distanceTo(positions[nextStart + k]),
          });
        }
        dists.sort((p, q) => p.d - q.d);
        add(start + j, dists[0].idx);
        add(start + j, dists[1].idx);
      }
    }

    // 3) Sparse cross-links — every 4th node reaches shell s+2
    if (s < shellCount - 2) {
      const farStart = shellStart[s + 2];
      const farCount = shellCounts[s + 2];
      for (let j = 0; j < count; j += 4) {
        const a = positions[start + j];
        let best = farStart;
        let bestD = Infinity;
        for (let k = 0; k < farCount; k++) {
          const d = a.distanceTo(positions[farStart + k]);
          if (d < bestD) {
            bestD = d;
            best = farStart + k;
          }
        }
        add(start + j, best);
      }
    }
  }

  return edges;
}

// ── Nodes — pulse only, no positional drift ──
function Nodes({ positions }: { positions: THREE.Vector3[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(
    () => positions.map((_, i) => mulberry(i * 7 + 3) * Math.PI * 2),
    [positions],
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();

    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      const scale = 1 + Math.sin(t * 1.5 + phases[i]) * 0.2;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshBasicMaterial color="#D97E16" transparent opacity={0.8} />
    </instancedMesh>
  );
}

// ── Edges — glowing amber, distance-faded ──
function Edges({
  positions,
  edges,
}: {
  positions: THREE.Vector3[];
  edges: [number, number][];
}) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const posArray = new Float32Array(edges.length * 6);
    const colorArray = new Float32Array(edges.length * 6);

    edges.forEach(([a, b], i) => {
      const pa = positions[a];
      const pb = positions[b];
      const offset = i * 6;

      posArray[offset] = pa.x;
      posArray[offset + 1] = pa.y;
      posArray[offset + 2] = pa.z;
      posArray[offset + 3] = pb.x;
      posArray[offset + 4] = pb.y;
      posArray[offset + 5] = pb.z;

      const dist = pa.distanceTo(pb) / EDGE_FADE_REF;
      const alpha = Math.max(0.4, 1 - dist * 0.5);

      colorArray[offset] = 0.85 * alpha;
      colorArray[offset + 1] = 0.49 * alpha;
      colorArray[offset + 2] = 0.09 * alpha;
      colorArray[offset + 3] = 0.85 * alpha;
      colorArray[offset + 4] = 0.49 * alpha;
      colorArray[offset + 5] = 0.09 * alpha;
    });

    geo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    return geo;
  }, [positions, edges]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.3} />
    </lineSegments>
  );
}

// ── Main group ──
function NetworkGroup({ shells }: { shells: ShellDef }) {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, edges } = useMemo(() => {
    const { positions: pos, shellOf, shellStart } = generateNetwork(shells);
    const edg = generateEdges(pos, shellOf, shellStart, shells.counts);
    return { positions: pos, edges: edg };
  }, [shells]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.035;
    groupRef.current.rotation.x =
      Math.sin(clock.getElapsedTime() * 0.02) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <Nodes positions={positions} />
      <Edges positions={positions} edges={edges} />
    </group>
  );
}

// ── Exported Canvas — responsive camera ──
export default function NeuralNetwork() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const shells = isMobile ? SHELLS_MOBILE : SHELLS_DESKTOP;
  const cameraZ = isMobile ? 10 : 7.5;

  return (
    <div
      className="absolute inset-0 z-[0] pointer-events-none opacity-65 dark:opacity-55"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 50 }}
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NetworkGroup shells={shells} />
      </Canvas>
    </div>
  );
}
