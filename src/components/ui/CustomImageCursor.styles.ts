import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CursorWrapper = styled.div`
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
export const PrimaryCursor = styled(motion.img)`
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
export const Laser = styled(motion.div)`
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
