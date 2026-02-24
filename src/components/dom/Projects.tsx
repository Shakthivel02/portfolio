import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import SectionHeader from './shared/SectionHeader';
import { projects } from '../../constants/data';
import {
  ProjectsSection,
  Grid,
  ProjectTitle,
  ProjectDesc,
  TagContainer,
  Tag,
  DetailOverlay,
  DetailPanel,
  CloseHint
} from './Projects.styles';

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <ProjectsSection id="projects">
      <SectionHeader
        label="02 // Galactic Archives"
        title="Projects"
      />

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
