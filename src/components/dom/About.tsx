import styled from 'styled-components';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import AnimatedCounter from '../ui/AnimatedCounter';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  display: flex;
  align-items: center;
  position: relative;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[16]};
  width: 100%;
  max-width: 1100px;

  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }
`;

const TextColumn = styled.div``;

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
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.typography.weights.black};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  line-height: 0.95;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const Description = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: ${({ theme }) => theme.spacing[2]};
  display: block;
`;

const stats = [
  { label: 'Projects Shipped', value: 42, suffix: '+' },
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Commits', value: 4200, suffix: '+' },
  { label: 'Uptime', value: 99, suffix: '%' },
];

export default function About() {
  return (
    <AboutSection id="about">
      <Layout>
        <TextColumn>
          <SectionLabel
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            04 // Mission Control
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About
          </SectionTitle>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            I am a frontend architect focused on the intersection of design,
            animation, and high-performance WebGL. My goal is to craft digital
            experiences that feel cinematic — immersive journeys that transcend
            the traditional DOM.
          </Description>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            With a foundation in scalable architecture, I ensure that 
            cutting-edge visuals never compromise accessibility, framerate,
            or code quality.
          </Description>
        </TextColumn>

        <StatsGrid>
          {stats.map((stat) => (
            <GlassCard key={stat.label}>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <StatLabel>{stat.label}</StatLabel>
            </GlassCard>
          ))}
        </StatsGrid>
      </Layout>
    </AboutSection>
  );
}
