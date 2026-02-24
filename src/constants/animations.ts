import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const crawlVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 60,
    y: '100vh',
    scale: 0.8
  },
  visible: {
    opacity: 1,
    rotateX: 25,
    y: 0,
    scale: 1,
    transition: {
      duration: 6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const formVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
