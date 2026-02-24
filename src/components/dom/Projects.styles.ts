import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  position: relative;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const ProjectDesc = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Tag = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.accent};
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
`;

export const DetailOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(11, 11, 16, 0.9);
  backdrop-filter: blur(12px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  /* Hologram Scanlines */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      transparent 50%,
      ${({ theme }) => theme.colors.scanline} 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.6;
  }
`;

export const DetailPanel = styled(motion.div)`
  background: rgba(0, 229, 255, 0.05); /* very light cyan inner background */
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing[16]};
  max-width: 600px;
  width: 90%;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 50px rgba(0, 229, 255, 0.1),
              inset 0 0 20px rgba(0, 229, 255, 0.1);
              
  /* Flicker Animation for the panel */
  animation: hologramFlicker 8s infinite;

  @keyframes hologramFlicker {
    0%, 100% { opacity: 1; filter: brightness(1) drop-shadow(0 0 10px rgba(0, 229, 255, 0.2)); }
    5%, 7% { opacity: 0.8; filter: brightness(0.8) drop-shadow(0 0 5px rgba(0, 229, 255, 0.1)); }
    6% { opacity: 0.95; }
    50% { opacity: 1; }
    52% { opacity: 0.8; }
    53% { opacity: 1; }
  }
`;

export const CloseHint = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  display: block;
  margin-top: ${({ theme }) => theme.spacing[8]};
`;
