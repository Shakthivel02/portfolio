import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.section} clamp(2rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[16]};
  max-width: 1000px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
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
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const Tagline = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.secondary};
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const ContactLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Coordinates = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  transition: border-color 0.3s;
  outline: none;

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dimmed};
  }
`;

const TextArea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  resize: none;
  min-height: 120px;
  transition: border-color 0.3s;
  outline: none;

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dimmed};
  }
`;

const SubmitBtn = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
`;

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <ContactSection id="contact">
      <Layout>
        <div>
          <SectionLabel
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            05 // Transmission
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact
          </SectionTitle>
          <Tagline>
            Open for collaborations, consulting, and interesting projects.
            Let&apos;s create something remarkable together.
          </Tagline>
          <ContactLink href="mailto:hello@example.com">
            hello@example.com
          </ContactLink>
          <Coordinates>
            LAT: 40.7128° N // LON: 74.0060° W
          </Coordinates>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <Form
              key="form"
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
            >
              <InputGroup variants={fieldVariants}>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your name" required />
              </InputGroup>
              <InputGroup variants={fieldVariants}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </InputGroup>
              <InputGroup variants={fieldVariants}>
                <Label htmlFor="message">Message</Label>
                <TextArea id="message" placeholder="What's on your mind?" required />
              </InputGroup>
              <motion.div variants={fieldVariants}>
                <SubmitBtn type="submit" whileTap={{ scale: 0.97 }}>
                  Transmit
                </SubmitBtn>
              </motion.div>
            </Form>
          ) : (
            <SuccessMessage
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              ✓ Transmission received. I'll respond within 24 hours.
            </SuccessMessage>
          )}
        </AnimatePresence>
      </Layout>
    </ContactSection>
  );
}
