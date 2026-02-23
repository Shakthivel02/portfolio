import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const starVertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;
varying vec3 vColor;
varying float vProgress;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Apply scroll parallax to star Y position
  modelPosition.y += uScroll * 0.5;
  
  // Calculate distance from star to mouse in XY plane
  float dist = distance(modelPosition.xy, uMouse);
  
  // Blackhole gravitational well — stronger pull, much wider radius
  float pullStrength = 3.5 / (1.0 + dist * dist * 0.1); // Stronger base pull, slower falloff
  pullStrength *= smoothstep(15.0, 0.0, dist); // Vastly increased radius (was 4.0)
  
  // Pull star toward cursor in XY plane
  vec2 dirToMouse = normalize(uMouse - modelPosition.xy);
  // Stars closer to camera (higher Z) move faster to create parallax warp
  float depthMultiplier = smoothstep(-15.0, 3.0, modelPosition.z) * 2.5 + 0.5;
  
  modelPosition.xy += dirToMouse * pullStrength * depthMultiplier;
  
  // Save distance for color manipulation in fragment shader
  vProgress = pullStrength;

  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  
  // Dynamic point sizing
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
  // Increase size significantly when pulled by gravity to simulate glowing
  gl_PointSize *= (1.0 + pullStrength * 3.0);
}
`;

const starFragmentShader = `
uniform vec3 uColorBase;
uniform vec3 uColorHot;

varying float vProgress;

void main() {
  // Soft circular particle
  float distToCenter = distance(gl_PointCoord, vec2(0.5));
  float alpha = 0.05 / distToCenter - 0.1;
  
  // Mix color from base (cool white/blue) to hot (Sith Red) near cursor
  vec3 finalColor = mix(uColorBase, uColorHot, smoothstep(0.0, 2.0, vProgress));
  
  gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
}
`;

const createLayer = (count: number, spread: number, depth: number) => {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    // Wider spread so we don't see empty edges when pulling stars
    positions[i * 3] = (Math.random() - 0.5) * spread * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 2;
    positions[i * 3 + 2] = -depth + (Math.random() - 0.5) * 4;
    scales[i] = Math.random();
  }
  return { positions, scales };
};

export default function Starfield() {
  const nearRef = useRef<THREE.Points>(null);
  const midRef = useRef<THREE.Points>(null);
  const farRef = useRef<THREE.Points>(null);
  
  const { viewport } = useThree();
  const { progress } = useScrollProgress();

  const mouseNDC = useMemo(() => new THREE.Vector2(0, 0), []);
  const mouseTarget = useMemo(() => new THREE.Vector2(0, 0), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseNDC]);

  const layers = useMemo(() => {
    return {
      near: createLayer(300, 30, 3),   
      mid: createLayer(900, 45, 8),    
      far: createLayer(2500, 60, 15),   
    };
  }, []);

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 120.0 },
    uColorBase: { value: new THREE.Color('#e0e5ff') },
    uColorHot: { value: new THREE.Color('#00E5FF') }, // Jedi Blue glow near cursor
  });

  // eslint-disable-next-line react-hooks/refs
  const uniforms = uniformsRef.current;

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Smooth mouse interpolation
    const targetX = (mouseNDC.x * viewport.width) / 2;
    const targetY = (mouseNDC.y * viewport.height) / 2;
    mouseTarget.set(targetX, targetY);
    uniforms.uMouse.value.lerp(mouseTarget, 0.08);
    
    uniforms.uTime.value = time;
    uniforms.uScroll.value = progress;

    if (nearRef.current) {
      nearRef.current.rotation.y = time * 0.005;
      nearRef.current.rotation.x = time * 0.003;
    }
    if (midRef.current) {
      midRef.current.rotation.y = time * 0.003;
      midRef.current.rotation.x = time * 0.002;
    }
    if (farRef.current) {
      farRef.current.rotation.y = time * 0.001;
      farRef.current.rotation.x = time * 0.001;
    }
  });

  return (
    <group>
      <points ref={nearRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[layers.near.positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[layers.near.scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={midRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[layers.mid.positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[layers.mid.scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={{ ...uniforms, uSize: { value: 60.0 }, uColorBase: { value: new THREE.Color('#a0a8cc') } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={farRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[layers.far.positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[layers.far.scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={{ ...uniforms, uSize: { value: 30.0 }, uColorBase: { value: new THREE.Color('#60688c') } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
