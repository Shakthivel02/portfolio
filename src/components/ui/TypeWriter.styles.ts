import styled, { keyframes } from 'styled-components';

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

export const Wrapper = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`;

export const Cursor = styled.span`
  animation: ${cursorBlink} 0.8s infinite;
  color: ${({ theme }) => theme.colors.accent};
  margin-left: 2px;
`;
