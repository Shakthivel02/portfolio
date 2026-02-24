import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  background: rgba(11, 11, 16, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px; /* Slight rounding for datapad case */
  padding: ${({ theme }) => theme.spacing[8]};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  /* Datapad UI Brackets */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    z-index: 1;
  }

  &::before {
    top: 0;
    left: 0;
    border-top-color: ${({ theme }) => theme.colors.border};
    border-left-color: ${({ theme }) => theme.colors.border};
  }

  &::after {
    bottom: 0;
    right: 0;
    border-bottom-color: ${({ theme }) => theme.colors.border};
    border-right-color: ${({ theme }) => theme.colors.border};
  }

  /* Scanline Overlay on Hover */
  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 50%,
      ${({ theme }) => theme.colors.scanline} 50%
    );
    background-size: 100% 4px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover {
    border-color: rgba(229, 177, 58, 0.3); /* Subtle Star Wars yellow border */
    box-shadow: 0 0 40px rgba(0, 229, 255, 0.05),
                inset 0 0 20px rgba(0, 229, 255, 0.05); /* Inner datapad glow */
    transform: translateY(-4px);

    &::before {
      border-top-color: ${({ theme }) => theme.colors.accent};
      border-left-color: ${({ theme }) => theme.colors.accent};
      width: 100%;
      height: 100%;
      border-width: 1px;
    }

    &::after {
      border-bottom-color: ${({ theme }) => theme.colors.accent};
      border-right-color: ${({ theme }) => theme.colors.accent};
      width: 100%;
      height: 100%;
      border-width: 1px;
    }

    .scanline {
      opacity: 0.5;
    }
  }
`;
