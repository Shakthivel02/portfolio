import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import spaceImage from '../../assets/space.png';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  
  @media (max-width: 768px) {
    display: none; // Hide custom cursor on mobile touch devices
  }
`;

// Space ring as the primary tracking cursor
const PrimaryCursor = styled(motion.img)`
  position: absolute;
  width: 48px;
  height: auto;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.9;
  filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.4));
  mix-blend-mode: screen;
`;

// A laser blast - Star Wars Blaster style (White core + Red glow)
const Laser = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 40px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 0 10px 4px #FF2A2A,
              0 0 20px 8px #CC1A1A,
              0 0 40px 12px #991010;
  pointer-events: none;
  transform: translate(-50%, -50%);
`;

interface LaserData {
  id: number;
  x: number;
  y: number;
}

export default function CustomImageCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [lasers, setLasers] = useState<LaserData[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
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
  }, []);

  // Shoot laser on click
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setLasers((prev) => [
          ...prev,
          { id: Date.now(), x: e.clientX, y: e.clientY - 24 } // Offset from ring center
        ]);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const removeLaser = useCallback((id: number) => {
    setLasers((prev) => prev.filter((laser) => laser.id !== id));
  }, []);

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
