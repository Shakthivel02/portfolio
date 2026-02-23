import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import glowVert from '../../shaders/glow/vert.glsl?raw';
import glowFrag from '../../shaders/glow/frag.glsl?raw';

interface EnergyOrbProps {
  position?: [number, number, number];
  color?: string;
  /** Skill proficiency 0..1, controls glow intensity */
  intensity?: number;
}

/**
 * Glowing energy orb for the Skills section.
 * - Fresnel-based edge glow via custom GLSL shader
 * - Intensity tied to skill proficiency
 * - Cursor proximity increases glow (checked in useFrame)
 * - Small orbiting particle halo
 */
export default function EnergyOrb({
  position = [0, 0, 0],
  color = '#FF2A2A',
  intensity = 0.8,
}: EnergyOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
      uTime: { value: 0 },
    }),
    [color, intensity]
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      // Gentle floating bob
      meshRef.current.position.y =
        position[1] + Math.sin(time * 0.8 + position[0]) * 0.15;
      meshRef.current.rotation.y = time * 0.3;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;

      // Proximity boost: increase glow when cursor is near
      const mouseWorld = new THREE.Vector2(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2
      );
      const orbPos2D = new THREE.Vector2(position[0], position[1]);
      const dist = mouseWorld.distanceTo(orbPos2D);
      const proximityBoost = Math.max(0, 1 - dist / 3) * 0.5;

      materialRef.current.uniforms.uIntensity.value =
        intensity + proximityBoost;
    }

    // Scale the glow shell slightly larger
    if (glowRef.current) {
      glowRef.current.position.y =
        position[1] + Math.sin(time * 0.8 + position[0]) * 0.15;
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glow shell (slightly larger, transparent shader) */}
      <mesh ref={glowRef} position={position} scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={glowVert}
          fragmentShader={glowFrag}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
