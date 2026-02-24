import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ContactSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[16]};
  max-width: 1000px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Tagline = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.secondary};
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

export const ContactLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Coordinates = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

export const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

export const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;

  /* Targeting bracket effects on the group */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 50%;
    border: 1px solid transparent;
    transition: border-color 0.3s;
    pointer-events: none;
    z-index: 1;
  }
  &::before {
    top: 25px; /* below label */
    left: -10px;
    border-right: none;
  }
  &::after {
    top: 25px;
    right: -10px;
    border-left: none;
  }

  &:focus-within::before,
  &:focus-within::after {
    border-color: ${({ theme }) => theme.colors.imperialRed};
  }
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const Input = styled.input`
  background: rgba(255, 42, 42, 0.02);
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono}; /* Switch to mono for terminal feel */
  font-size: ${({ theme }) => theme.typography.sizes.base};
  transition: all 0.3s;
  outline: none;

  &:focus {
    background: rgba(255, 42, 42, 0.05); /* imperial red tint */
    border-bottom-color: ${({ theme }) => theme.colors.imperialRed};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dimmed};
  }
`;

export const TextArea = styled.textarea`
  background: rgba(255, 42, 42, 0.02);
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  resize: none;
  min-height: 120px;
  transition: all 0.3s;
  outline: none;

  &:focus {
    background: rgba(255, 42, 42, 0.05);
    border-bottom-color: ${({ theme }) => theme.colors.imperialRed};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dimmed};
  }
`;

export const SubmitBtn = styled(motion.button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.imperialRed};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.imperialRed};
  border-radius: 0; /* Strict brutalist */
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  /* Scanline effect on the button itself */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 42, 42, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(255, 42, 42, 0.1);
    box-shadow: 0 0 15px rgba(255, 42, 42, 0.3),
                inset 0 0 10px rgba(255, 42, 42, 0.2);
    transform: translateY(-2px);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    background: ${({ theme }) => theme.colors.imperialRed};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
`;
