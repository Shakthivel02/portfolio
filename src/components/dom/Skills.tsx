import { useTheme } from 'styled-components';
import SectionHeader from './shared/SectionHeader';
import { skills } from '../../constants/data';
import {
  SkillsSection,
  SkillsList,
  SkillRow,
  SkillIndex,
  SkillName,
  BarContainer,
  BarFill
} from './Skills.styles';

export default function Skills() {
  const theme = useTheme();

  return (
    <SkillsSection id="skills">
      <SectionHeader
        label="03 // Capabilities"
        title="Tech Stack"
        titleStyle={{ marginBottom: theme.spacing[16] }}
      />

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
                $sabercolor={
                  i % 4 === 0 ? theme.colors.lightsaberBlue :
                    i % 4 === 1 ? theme.colors.lightsaberGreen :
                      i % 4 === 2 ? theme.colors.lightsaberRed :
                        theme.colors.lightsaberPurple
                }
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level * 20}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.8, type: 'spring', stiffness: 50 }}
              />
            </BarContainer>
          </SkillRow>
        ))}
      </SkillsList>
    </SkillsSection>
  );
}
