import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetSphereProps {
  position?: [number, number, number];
  color?: string;
  speed?: number;
  size?: number;
}

/**
 * Interactive planet sphere for the Projects section.
 * - Smooth hover glow using emissive intensity lerp
 * - Gentle rotation with configurable speed
 * - Spring-like scale on hover (no per-frame Vector3 allocation)
 */
export default function PlanetSphere({
  position = [0, 0, 0],
  color = '#FF2A2A',
  speed = 1,
  size = 1,
}: PlanetSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHover] = useState(false);

  // Pre-allocate target scale vector to avoid GC pressure
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const emissiveColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Gentle rotation + Pointer Parallax mapping
    meshRef.current.rotation.y += delta * 0.2 * speed;
    meshRef.current.rotation.x += delta * 0.08 * speed;

    // Pointer-based parallax interaction
    const targetY = (state.pointer.x * Math.PI) * 0.1;
    const targetX = (state.pointer.y * Math.PI) * 0.1;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.005;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.005;

    // Spring-like scale lerp (reuse vector)
    const s = hovered ? 1.15 : 1;
    targetScale.set(s, s, s);
    meshRef.current.scale.lerp(targetScale, 0.08);

    // Smooth emissive glow transition
    const targetIntensity = hovered ? 0.4 : 0.1;
    const currentIntensity = materialRef.current.emissiveIntensity;
    materialRef.current.emissiveIntensity +=
      (targetIntensity - currentIntensity) * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        roughness={0.15}
        metalness={0.9}
        emissive={emissiveColor}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}
