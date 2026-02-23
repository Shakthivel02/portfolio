import styled from 'styled-components';
import { motion } from 'framer-motion';
import TypeWriter from '../ui/TypeWriter';

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 clamp(2rem, 5vw, 6rem);
  overflow: hidden;
  perspective: 1000px; /* Base 3D space for crawl effect */
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform-style: preserve-3d;
  transform-origin: bottom center;
`;

const Name = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(3rem, 8vw, 6rem); /* Made significantly smaller */
  font-weight: ${({ theme }) => theme.typography.weights.black};
  line-height: 1.1;
  text-transform: uppercase;
  color: transparent; /* Hollow text */
  -webkit-text-stroke: 2px #E5B13A; /* Star Wars Yellow outline */
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  /* Subtle yellow glow */
  filter: drop-shadow(0 0 16px rgba(229, 177, 58, 0.4));
`;

const TaglineWrapper = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  min-height: 2em;
  /* Keep subtitle flat to contrast with the tilted title */
`;

const Subtitle = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.dimmed};
  max-width: 480px;
  line-height: 1.6;
  margin: 0 auto;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[16]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.accent},
    transparent
  );
`;

const ScrollText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const titleString = "CREATIVE\nDEVELOPER".split("");

// Map the Star Wars crawl tilt to the entire content wrapper
const contentVariants = {
  hidden: { opacity: 0, rotateX: 60, y: 150, scale: 1.2 },
  visible: {
    opacity: 1,
    rotateX: 25, /* Settle into the angled Star Wars crawl position */
    y: 0,
    scale: 1,
    transition: {
      duration: 3, /* Slow, dramatic float-in */
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      when: "beforeChildren",
      staggerChildren: 0.15
    },
  },
};

const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

export default function Hero() {
  return (
    <HeroSection id="hero">
      <Content
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <Name
          variants={titleContainer}
          className="hoverable"
          style={{ cursor: 'none' }}
        >
          {titleString.map((char, index) => (
            char === "\n" ? <br key={index} /> :
              <motion.span key={index} variants={charVariants} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
          ))}
        </Name>

        <TaglineWrapper variants={fadeUpVariant}>
          <TypeWriter
            text="Creative Developer // Crafting Digital Universes_"
            speed={45}
            delay={1200}
          />
        </TaglineWrapper>

        <Subtitle variants={fadeUpVariant}>
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
