import TypeWriter from '../ui/TypeWriter';
import { crawlVariants } from '../../constants/animations';
import {
  HeroSection,
  Content,
  Name,
  TaglineWrapper,
  Subtitle,
  ScrollIndicator,
  ScrollLine,
  ScrollText
} from './Hero.styles';

export default function Hero() {
  return (
    <HeroSection id="hero">
      <Content
        variants={crawlVariants}
        initial="hidden"
        animate="visible"
      >
        <Name className="hoverable" style={{ cursor: 'none' }}>
          CREATIVE<br />DEVELOPER
        </Name>

        <TaglineWrapper>
          <TypeWriter
            text="Creative Developer // Crafting Digital Universes_"
            speed={45}
            delay={1500}
          />
        </TaglineWrapper>

        <Subtitle>
          I build cinematic, high-performance web experiences
          at the intersection of design, animation, and WebGL.
        </Subtitle>
      </Content>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <ScrollText>Scroll</ScrollText>
        <ScrollLine
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </ScrollIndicator>
    </HeroSection>
  );
}
