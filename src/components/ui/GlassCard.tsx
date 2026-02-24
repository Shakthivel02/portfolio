import type { ReactNode } from 'react';
import { Card } from './GlassCard.styles';

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
      <div className="scanline" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </Card>
  );
}
