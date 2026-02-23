import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';

interface ScrollProgress {
  /** Normalized scroll progress 0..1 across the entire page */
  progress: number;
  /** Raw scroll position in pixels */
  scrollY: number;
}

/**
 * Tracks normalized scroll progress using Lenis.
 * Returns a value from 0 (top) to 1 (bottom of page).
 */
export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
  });

  useLenis((lenis) => {
    setState({
      progress: lenis.progress,
      scrollY: lenis.scroll,
    });
  });

  return state;
}
