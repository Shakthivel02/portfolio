import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  /** Normalized X position: -1 (left) to 1 (right) */
  x: number;
  /** Normalized Y position: -1 (bottom) to 1 (top) */
  y: number;
  /** Raw pixel X */
  clientX: number;
  /** Raw pixel Y */
  clientY: number;
}

/**
 * Tracks mouse position normalized to -1..1 range (matching Three.js NDC).
 * Uses passive listener for performance.
 */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  const handleMove = useCallback((e: MouseEvent) => {
    setPos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);

  return pos;
}
