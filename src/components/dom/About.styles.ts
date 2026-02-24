import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AboutSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  display: flex;
  align-items: center;
  position: relative;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[16]};
  width: 100%;
  max-width: 1100px;

  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }
`;

export const TextColumn = styled.div``;

export const Description = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: ${({ theme }) => theme.spacing[2]};
  display: block;
`;

export const Cursor = styled(motion.span)`
  display: inline-block;
  width: 8px;
  height: 1em;
  background-color: ${({ theme }) => theme.colors.accent};
  vertical-align: middle;
  margin-left: 6px;
`;

export const StatValue = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent};
`;

export const StatIndex = styled.span`
  margin-right: 8px;
  opacity: 0.5;
`;
