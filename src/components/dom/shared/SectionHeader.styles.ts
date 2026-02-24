import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

export const Label = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const Title = styled(motion.h2)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.weights.black};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  line-height: 0.95;
`;
