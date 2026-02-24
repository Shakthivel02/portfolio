import { useFrame, useThree } from '@react-three/fiber';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useRef } from 'react';

/**
 * Moves the camera down the Y axis as the user scrolls, revealing all scene
 * objects layered vertically:
 *
 *  Y =  0  → Hero     (starfield + cursor lens)
 *  Y = -6  → Projects (planet spheres)
 *  Y = -16 → Skills   (energy orbs)
 *  Y = -26 → Contact  (wormhole portal)
 *
 * Also gently moves camera forward (Z: 5 → 3) for a "drifting into space" feel.
 */
export default function ScrollCamera() {
  const { camera } = useThree();
  const { progress } = useScrollProgress();
  const targetY = useRef(0);
  const targetZ = useRef(5);

  useFrame(() => {
    // Map progress 0..1 → camera Y 0..-26 (full scene depth)
    targetY.current = -progress * 26;
    // Gentle forward drift Z 5 → 3
    targetZ.current = 5 - progress * 2;

    // Smooth cinematic lerp
    // eslint-disable-next-line react-hooks/immutability
    camera.position.y += (targetY.current - camera.position.y) * 0.05;
    camera.position.z += (targetZ.current - camera.position.z) * 0.05;
  });

  return null;
}
