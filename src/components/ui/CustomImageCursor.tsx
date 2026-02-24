import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import spaceImage from '../../assets/space.png';
import { CursorWrapper, PrimaryCursor, Laser } from './CustomImageCursor.styles';

interface LaserData {
  id: number;
  x: number;
  y: number;
}

interface CustomImageCursorProps {
  isPlaying?: boolean;
}

export default function CustomImageCursor({ isPlaying }: CustomImageCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [lasers, setLasers] = useState<LaserData[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPlaying) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isPlaying) return;
      const target = e.target as HTMLElement;
      const isClickable =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button';

      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isPlaying]);

  // Shoot laser on click
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (isPlaying) return;
      if (e.button === 0) {
        setLasers((prev) => [
          ...prev,
          { id: Date.now(), x: e.clientX, y: e.clientY - 24 } // Offset from ring center
        ]);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [isPlaying]);

  const removeLaser = useCallback((id: number) => {
    setLasers((prev) => prev.filter((laser) => laser.id !== id));
  }, []);

  if (isPlaying) return null;

  return (
    <CursorWrapper>
      {/* Lasers */}
      <AnimatePresence>
        {lasers.map((laser) => {
          // 7 o'clock trajectory: down-left
          // 7 o'clock on a clock face (where 12 is top) means we rotate the laser 210 degrees 
          // (-150 or +210) so the top points to 7. 
          // Movement: X goes negative, Y goes positive.
          const travelDistance = Math.max(window.innerWidth, window.innerHeight);
          const angleRad = (210 * Math.PI) / 180;
          const deltaX = Math.sin(angleRad) * travelDistance;
          const deltaY = -Math.cos(angleRad) * travelDistance;

          return (
            <div key={laser.id}>
              {/* Left cannon */}
              <Laser
                initial={{
                  x: laser.x - 12 * Math.cos(angleRad), // Offset perpendicular to aim
                  y: laser.y - 12 * Math.sin(angleRad),
                  opacity: 1,
                  scaleY: 1,
                  rotate: -150 // matches 7 o'clock visual tilt
                }}
                animate={{
                  x: laser.x + deltaX,
                  y: laser.y + deltaY,
                  opacity: 0,
                  scaleY: 2
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onAnimationComplete={() => removeLaser(laser.id)}
              />
              {/* Right cannon */}
              <Laser
                initial={{
                  x: laser.x + 12 * Math.cos(angleRad), // Offset perpendicular to aim
                  y: laser.y + 12 * Math.sin(angleRad),
                  opacity: 1,
                  scaleY: 1,
                  rotate: -150
                }}
                animate={{
                  x: laser.x + deltaX,
                  y: laser.y + deltaY,
                  opacity: 0,
                  scaleY: 2
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          );
        })}
      </AnimatePresence>

      {/* Primary Space Ring Cursor */}
      <PrimaryCursor
        src={spaceImage}
        animate={{
          x: mousePosition.x - 24, // Offset by half width
          y: mousePosition.y - 24, // Offset by half height
          scale: isHovering ? 1.3 : 1,
          rotate: isHovering ? 90 : 0, // Gentle spin on hover
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0.05
        }}
      />
    </CursorWrapper>
  );
}
