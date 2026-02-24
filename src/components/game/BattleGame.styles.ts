import styled from 'styled-components';

export const GameOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(11, 11, 16, 0.7); /* translucent dark background */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto; /* Catch all clicks to prevent background interaction */
  cursor: crosshair; /* Force game cursor style */
`;

export const GameCanvas = styled.canvas`
  display: block;
  /* Use hardware acceleration where possible */
  transform: translateZ(0);
`;

export const UIContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Let clicks pass through to canvas */
  z-index: 10;
`;

export const ScoreBoard = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  pointer-events: none;
`;

export const RetreatButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  pointer-events: auto; /* Clickable */
  background: transparent;
  color: ${({ theme }) => theme.colors.imperialRed};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.imperialRed};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 42, 42, 0.1);
    box-shadow: 0 0 15px rgba(255, 42, 42, 0.3);
  }
`;

export const GameOverMenu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(11, 11, 16, 0.9);
  padding: 3rem;
  border: 2px solid ${({ theme }) => theme.colors.imperialRed};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 30px rgba(255, 42, 42, 0.4);
  pointer-events: auto; /* Clickable */
  z-index: 20;

  h2 {
    color: ${({ theme }) => theme.colors.imperialRed};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: 3rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(255, 42, 42, 0.8);
  }

  p {
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const RestartButton = styled(RetreatButton)`
  position: relative;
  top: auto;
  right: auto;
  border-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  
  &:hover {
    background: rgba(0, 229, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
  }
`;

export const FloatingStartButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50; /* Above normal content, below overlays */
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.75rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(0, 229, 255, 0.1);
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.4),
                inset 0 0 10px rgba(0, 229, 255, 0.2);
    text-shadow: 0 0 8px rgba(0, 229, 255, 0.8);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;
