import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Wrapper = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`;

const Cursor = styled.span`
  animation: ${cursorBlink} 0.8s infinite;
  color: ${({ theme }) => theme.colors.accent};
  margin-left: 2px;
`;

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

/**
 * Typing animation component.
 * Types text character-by-character with a blinking cursor.
 */
export default function TypeWriter({
  text,
  speed = 60,
  delay = 500,
  className,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayed, text, speed, started]);

  return (
    <Wrapper className={className}>
      {displayed}
      <Cursor>_</Cursor>
    </Wrapper>
  );
}
