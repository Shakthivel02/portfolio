import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[8]} clamp(2rem, 5vw, 6rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.overlay};
  background: transparent;
  pointer-events: none; /* Let clicks pass through empty areas */
`;

export const Logo = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.black};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  pointer-events: auto;
  cursor: none;
  
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  list-style: none;
  padding: 0;
  margin: 0;
  pointer-events: auto;

  @media (max-width: 768px) {
    display: none; /* Hide on mobile for now or implement mobile menu */
  }
`;

export const NavItem = styled.li`
  /* empty */
`;

export const NavLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2em;
  transition: color 0.3s ease;
  cursor: none;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.accent};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;
