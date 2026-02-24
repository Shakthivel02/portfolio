import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './shared/SectionHeader';
import { formVariants, fieldVariants } from '../../constants/animations';
import {
  ContactSection,
  Layout,
  Tagline,
  ContactLink,
  Coordinates,
  Form,
  InputGroup,
  Label,
  Input,
  TextArea,
  SubmitBtn,
  SuccessMessage
} from './Contact.styles';

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
          <SectionHeader
            label="05 // Transmission"
            title="Contact"
          />
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
