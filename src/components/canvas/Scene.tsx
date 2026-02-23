import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Starfield from './Starfield';
import ScrollCamera from './ScrollCamera';
import SpaceDebris from './SpaceDebris';

/**
 * Main 3D scene containing all canvas elements.
 * Layered behind the DOM content via CSS z-index.
 * 
 * Layout (scroll-based vertical positions):
 *  0 to -5   → Hero region (fabric + starfield)
 * -5 to -15  → Projects region (planet spheres)
 * -15 to -22 → Skills region (energy orbs)
 * -22 to -30 → Contact region (wormhole portal)
 */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        {/* Scroll-linked camera movement */}
        <ScrollCamera />

        {/* Multi-layer parallax starfield (with gravity warp) */}
        <Starfield />

        {/* Scene lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[10, 10, 5]} intensity={0.4} color="#fff5f0" />
        <pointLight position={[0, -10, 2]} intensity={0.3} color="#0055FF" />

        {/* Floating space debris — scroll-linked, cursor-repelled */}
        <SpaceDebris />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
