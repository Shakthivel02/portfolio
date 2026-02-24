import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SkillsSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 900px;
`;

export const SkillRow = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 42, 42, 0.04);
  }
`;

export const SkillIndex = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.accent};
  width: 80px;
  flex-shrink: 0;
`;

export const SkillName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  text-transform: uppercase;
`;

export const BarContainer = styled.div`
  width: 150px;
  height: 8px; /* Thicker for the lightsaber blade */
  background: rgba(255,255,255,0.05); /* Empty hilt placeholder */
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 80px;
  }
`;

export const BarFill = styled(motion.div) <{ level: number; $sabercolor: string }>`
  height: 100%;
  width: ${({ level }) => level * 20}%;
  background: #FFFFFF; /* High intensity white core */
  border-radius: 4px;
  /* Saber glow effect based on passed color */
  box-shadow: 
    0 0 4px ${({ $sabercolor }) => $sabercolor},
    0 0 10px ${({ $sabercolor }) => $sabercolor},
    0 0 20px ${({ $sabercolor }) => $sabercolor},
    0 0 40px ${({ $sabercolor }) => $sabercolor};
  position: relative;
  
  /* Hilt pseudo-element on the left side */
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: -2px;
    width: 14px;
    height: 12px;
    background: #333;
    border: 1px solid #111;
    border-radius: 2px;
    z-index: 1;
  }
`;
