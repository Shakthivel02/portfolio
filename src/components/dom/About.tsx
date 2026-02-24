import GlassCard from '../ui/GlassCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import SectionHeader from './shared/SectionHeader';
import { stats } from '../../constants/data';
import {
  AboutSection,
  Layout,
  TextColumn,
  Description,
  StatsGrid,
  StatLabel,
  Cursor,
  StatValue,
  StatIndex
} from './About.styles';

export default function About() {
  return (
    <AboutSection id="about">
      <Layout>
        <TextColumn>
          <SectionHeader
            label="04 // Mission Control"
            title="About"
          />
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
          {stats.map((stat, i) => (
            <GlassCard key={stat.label}>
              <StatValue>
                <StatIndex>[{i + 1}]</StatIndex>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <Cursor
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              </StatValue>
              <StatLabel>&gt; {stat.label}</StatLabel>
            </GlassCard>
          ))}
        </StatsGrid>
      </Layout>
    </AboutSection>
  );
}
