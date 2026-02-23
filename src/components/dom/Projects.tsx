import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import GlassCard from '../ui/GlassCard';

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  position: relative;
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SectionLabel = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.weights.black};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  line-height: 0.95;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ProjectDesc = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.accent};
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
`;

const DetailOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(11, 11, 16, 0.85);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DetailPanel = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  padding: ${({ theme }) => theme.spacing[16]};
  max-width: 600px;
  width: 90%;
`;

const CloseHint = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  display: block;
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const projects = [
  {
    id: 'orbital',
    title: 'Orbital.js',
    description: 'A WebGL-powered orbital mechanics simulator with real-time gravitational calculations and cinematic camera paths.',
    tags: ['Three.js', 'WebGL', 'TypeScript', 'GLSL'],
  },
  {
    id: 'deepspace',
    title: 'Deep Space Dashboard',
    description: 'Real-time telemetry dashboard for monitoring satellite data with interactive 3D visualization.',
    tags: ['React', 'D3.js', 'WebSocket', 'Node.js'],
  },
  {
    id: 'hyperdrive',
    title: 'Hyperdrive CMS',
    description: 'Headless CMS with blazing fast edge rendering and AI-powered content optimization.',
    tags: ['Next.js', 'PostgreSQL', 'Vercel', 'AI'],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <ProjectsSection id="projects">
      <SectionHeader>
        <SectionLabel
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          02 // Galactic Archives
        </SectionLabel>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projects
        </SectionTitle>
      </SectionHeader>

      <Grid>
        {projects.map((project, i) => (
          <GlassCard key={project.id} onClick={() => setSelected(project.id)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDesc>{project.description}</ProjectDesc>
              <TagContainer>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagContainer>
            </motion.div>
          </GlassCard>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedProject && (
          <DetailOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <DetailPanel
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ProjectTitle style={{ fontSize: '2rem' }}>{selectedProject.title}</ProjectTitle>
              <ProjectDesc style={{ fontSize: '1rem', marginTop: '1rem' }}>
                {selectedProject.description}
              </ProjectDesc>
              <TagContainer>
                {selectedProject.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagContainer>
              <CloseHint>Click outside to close</CloseHint>
            </DetailPanel>
          </DetailOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
}
