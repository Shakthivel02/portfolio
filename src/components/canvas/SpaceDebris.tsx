import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

interface DebrisItem {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  speed: number;
  scrollMultiplier: number;
  orbitRadius: number;
  orbitOffset: number;
  type: 'asteroid' | 'ring' | 'satellite';
}

const DEBRIS_COUNT = 12;
// Repulsion constants
const REPULSION_RADIUS = 1.8;  // world-units — how close before fleeing
const REPULSION_STRENGTH = 6.0; // how hard they push away

function generateDebris(): DebrisItem[] {
  const items: DebrisItem[] = [];
  const types: DebrisItem['type'][] = ['asteroid', 'ring', 'satellite'];

  for (let i = 0; i < DEBRIS_COUNT; i++) {
    items.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        -i * 3 + (Math.random() - 0.5) * 4,
        -2 - Math.random() * 6
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: 0.1 + Math.random() * 0.3,
      speed: 0.1 + Math.random() * 0.4,
      scrollMultiplier: 0.5 + Math.random() * 2.0,
      orbitRadius: 0.3 + Math.random() * 0.8,
      orbitOffset: Math.random() * Math.PI * 2,
      type: types[i % 3],
    });
  }
  return items;
}

/** Shared mouse position in world-XY space (set once, read by all debris) */
const sharedMouseWorld = new THREE.Vector2(0, -9999);

function useMouseRepulsion() {
  const { viewport } = useThree();
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      sharedMouseWorld.set(
        (ndcX * viewport.width) / 2,
        (ndcY * viewport.height) / 2
      );
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [viewport]);
}

/** Returns the repulsion XY offset for a given world-space origin. */
function calcRepulsion(origin: THREE.Vector3, repel: THREE.Vector2) {
  const dx = origin.x - repel.x;
  const dy = origin.y - repel.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > REPULSION_RADIUS || dist < 0.001) return { rx: 0, ry: 0 };
  const strength = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
  return { rx: (dx / dist) * strength, ry: (dy / dist) * strength };
}

// ─── Debris sub-components ───────────────────────────────────────────────────

function Asteroid({ item, scrollY }: { item: DebrisItem; scrollY: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useMouseRepulsion();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    ref.current.rotation.x += 0.003 * item.speed;
    ref.current.rotation.y += 0.005 * item.speed;

    // Base orbit position
    const baseX = item.position.x + Math.sin(t * item.speed * 0.3 + item.orbitOffset) * item.orbitRadius;
    const baseY = item.position.y + scrollY * item.scrollMultiplier * 0.002;
    const baseZ = item.position.z + Math.cos(t * item.speed * 0.2 + item.orbitOffset) * item.orbitRadius * 0.5;

    // Repulsion from cursor
    const origin = new THREE.Vector3(baseX, baseY, baseZ);
    const { rx, ry } = calcRepulsion(origin, sharedMouseWorld);

    // Smooth lerp toward target (repulsion + orbit)
    ref.current.position.x += ((baseX + rx) - ref.current.position.x) * 0.08;
    ref.current.position.y += ((baseY + ry) - ref.current.position.y) * 0.08;
    ref.current.position.z += (baseZ - ref.current.position.z) * 0.08;
  });

  return (
    <mesh ref={ref} position={item.position} scale={item.scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#1a1a2e"
        roughness={0.7}
        metalness={0.9}
        emissive="#00e5cc"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function Ring({ item, scrollY }: { item: DebrisItem; scrollY: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useMouseRepulsion();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    ref.current.rotation.x = item.rotation.x + t * item.speed * 0.15;
    ref.current.rotation.z += 0.002 * item.speed;

    const baseX = item.position.x + Math.sin(t * item.speed * 0.2 + item.orbitOffset) * item.orbitRadius;
    const baseY = item.position.y + scrollY * item.scrollMultiplier * 0.002;
    const baseZ = item.position.z;

    const origin = new THREE.Vector3(baseX, baseY, baseZ);
    const { rx, ry } = calcRepulsion(origin, sharedMouseWorld);

    ref.current.position.x += ((baseX + rx) - ref.current.position.x) * 0.06;
    ref.current.position.y += ((baseY + ry) - ref.current.position.y) * 0.06;
    ref.current.position.z += (baseZ - ref.current.position.z) * 0.06;
  });

  return (
    <mesh ref={ref} position={item.position} scale={item.scale}>
      <torusGeometry args={[1, 0.15, 8, 32]} />
      <meshStandardMaterial
        color="#2a1a0a"
        roughness={0.3}
        metalness={1.0}
        emissive="#ff8c00"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function Satellite({ item, scrollY }: { item: DebrisItem; scrollY: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useMouseRepulsion();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    ref.current.rotation.y += 0.008 * item.speed;
    ref.current.rotation.x += 0.004 * item.speed;

    const baseX = item.position.x + Math.cos(t * item.speed * 0.25 + item.orbitOffset) * item.orbitRadius;
    const baseY = item.position.y + scrollY * item.scrollMultiplier * 0.002;
    const baseZ = item.position.z + Math.sin(t * item.speed * 0.15 + item.orbitOffset) * item.orbitRadius * 0.3;

    const origin = new THREE.Vector3(baseX, baseY, baseZ);
    const { rx, ry } = calcRepulsion(origin, sharedMouseWorld);

    ref.current.position.x += ((baseX + rx) - ref.current.position.x) * 0.1;
    ref.current.position.y += ((baseY + ry) - ref.current.position.y) * 0.1;
    ref.current.position.z += (baseZ - ref.current.position.z) * 0.1;
  });

  return (
    <mesh ref={ref} position={item.position} scale={item.scale * 0.8}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#0f0f22"
        roughness={0.4}
        metalness={0.95}
        emissive="#7c5cfc"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function SpaceDebris() {
  const debrisItems = useMemo(() => generateDebris(), []);
  const { scrollY } = useScrollProgress();

  return (
    <group>
      {debrisItems.map((item, i) => {
        switch (item.type) {
          case 'asteroid':
            return <Asteroid key={i} item={item} scrollY={scrollY} />;
          case 'ring':
            return <Ring key={i} item={item} scrollY={scrollY} />;
          case 'satellite':
            return <Satellite key={i} item={item} scrollY={scrollY} />;
        }
      })}
    </group>
  );
}
