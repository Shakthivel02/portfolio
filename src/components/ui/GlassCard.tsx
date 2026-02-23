import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const Card = styled(motion.div)`
  background: rgba(11, 11, 16, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  padding: ${({ theme }) => theme.spacing[8]};
  transition: border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 30px rgba(255, 42, 42, 0.08),
                0 8px 32px rgba(0, 0, 0, 0.4);
    transform: translateY(-4px);
  }
`;

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Glassmorphism card with blur, border, and hover lift.
 * Used in Projects detail panels and About stats.
 */
export default function GlassCard({ children, className, onClick }: GlassCardProps) {
  return (
    <Card
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </Card>
  );
}
