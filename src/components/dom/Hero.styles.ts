import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 clamp(2rem, 5vw, 6rem);
  overflow: hidden;
  perspective: 1000px; /* Base 3D space for crawl effect */
`;

export const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform-style: preserve-3d;
  transform-origin: bottom center;
`;

export const Name = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(3rem, 8vw, 6rem); /* Made significantly smaller */
  font-weight: ${({ theme }) => theme.typography.weights.black};
  line-height: 1.1;
  text-transform: uppercase;
  color: transparent; /* Hollow text */
  -webkit-text-stroke: 2px #E5B13A; /* Star Wars Yellow outline */
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  /* Subtle yellow glow */
  filter: drop-shadow(0 0 16px rgba(229, 177, 58, 0.4));
`;

export const TaglineWrapper = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  min-height: 2em;
  /* Keep subtitle flat to contrast with the tilted title */
`;

export const Subtitle = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.dimmed};
  max-width: 480px;
  line-height: 1.6;
  margin: 0 auto;
`;

export const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[16]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.accent},
    transparent
  );
`;

export const ScrollText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;
