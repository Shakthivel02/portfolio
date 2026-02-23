import styled from 'styled-components';
import { motion } from 'framer-motion';

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 900px;
`;

const SkillRow = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 42, 42, 0.04);
  }
`;

const SkillIndex = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.accent};
  width: 80px;
  flex-shrink: 0;
`;

const SkillName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  text-transform: uppercase;
`;

const BarContainer = styled.div`
  width: 120px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 0;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 60px;
  }
`;

const BarFill = styled(motion.div)<{ level: number }>`
  height: 100%;
  width: ${({ level }) => level * 20}%;
  background: ${({ theme }) => theme.colors.accent};
`;

const skills = [
  { id: '01', name: 'React / Next.js', level: 5 },
  { id: '02', name: 'Three.js / R3F', level: 4 },
  { id: '03', name: 'TypeScript', level: 5 },
  { id: '04', name: 'GLSL Shaders', level: 3 },
  { id: '05', name: 'Framer Motion', level: 5 },
  { id: '06', name: 'Node.js', level: 4 },
  { id: '07', name: 'System Design', level: 4 },
];

export default function Skills() {
  return (
    <SkillsSection id="skills">
      <SectionLabel
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        03 // Capabilities
      </SectionLabel>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Tech Stack
      </SectionTitle>

      <SkillsList>
        {skills.map((skill, i) => (
          <SkillRow
            key={skill.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <SkillIndex>[{skill.id}]</SkillIndex>
            <SkillName>{skill.name}</SkillName>
            <BarContainer>
              <BarFill
                level={skill.level}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level * 20}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.8 }}
              />
            </BarContainer>
          </SkillRow>
        ))}
      </SkillsList>
    </SkillsSection>
  );
}
