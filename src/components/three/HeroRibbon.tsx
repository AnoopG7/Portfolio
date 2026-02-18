import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function FlowingRibbon() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 150; i++) {
      const t = i / 150;
      const a = t * Math.PI * 3;
      pts.push(
        new THREE.Vector3(
          Math.sin(a) * 3 + Math.sin(a * 0.5) * 1.5,
          (t - 0.5) * 10,
          Math.cos(a) * 2 + Math.cos(a * 0.7)
        )
      );
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 300, 0.04, 12, false);
  }, []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.06 + pointer.x * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2 + pointer.y * 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.08) * 0.1;
    matRef.current.emissiveIntensity = 0.4 + Math.sin(t * 0.6) * 0.15;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        ref={matRef}
        color="#D4922A"
        emissive="#E8A838"
        emissiveIntensity={0.4}
        metalness={0.95}
        roughness={0.05}
        transparent
        opacity={0.75}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SceneContent({ onLoaded }: { onLoaded?: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      setTimeout(() => onLoaded?.(), 100);
    }
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#E8A838" distance={20} />
      <pointLight position={[-4, -3, 4]} intensity={0.4} color="#E8A838" distance={15} />
      <pointLight position={[0, 0, 8]} intensity={0.2} color="#ffffff" distance={20} />
      <FlowingRibbon />
    </>
  );
}

export default function HeroRibbon({ onLoaded }: { onLoaded?: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent onLoaded={onLoaded} />
      </Suspense>
    </Canvas>
  );
}
