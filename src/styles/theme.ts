export const theme = {
  colors: {
    background: '#0B0B10', // Deep Space Black
    surface: '#12121a',
    primary: '#F8FAFC', // Star White
    secondary: '#94A3B8', // Metallic Gray
    accent: '#00E5FF', // Jedi Blue (primary CTA)
    accentHover: '#33EEFF',
    sith: '#0055FF', // Deep Blue (secondary accent)
    imperialRed: '#FF2A2A', // Sith/Imperial Red
    lightsaberBlue: '#00E5FF',
    lightsaberGreen: '#2EFA41',
    lightsaberRed: '#FF2A2A',
    lightsaberPurple: '#B026FF',
    starWarsYellow: '#E5B13A',
    scanline: 'rgba(0, 229, 255, 0.1)',
    dimmed: 'rgba(248, 250, 252, 0.4)',
    border: 'rgba(248, 250, 252, 0.2)', // Slightly increased for datapad feel
  },
  animation: {
    spring: {
      physics: { type: 'spring', stiffness: 100, damping: 20 },
      gentle: { type: 'spring', stiffness: 50, damping: 15 },
      bouncy: { type: 'spring', stiffness: 150, damping: 10 }
    },
    ease: {
      fluid: [0.25, 0.46, 0.45, 0.94] as const,
      brutal: [0.9, 0, 0, 1] as const,
    }
  },
  typography: {
    fontFamily: {
      sans: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
      display: '"Archivo", "Space Grotesk", sans-serif', // Bold geometric headings
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2.5rem',
      hero: 'clamp(4rem, 15vw, 12rem)', // Massive typography scaling
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900, // Brutalist headers require maximum weight
    },
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
    8: '2rem',
    16: '4rem',
    32: '8rem', // Massive negative space
    section: 'clamp(5rem, 10vh, 15rem)',
  },
  borders: {
    radius: '0px', // Strict 0px brutalist radius
    thin: '1px solid',
    thick: '4px solid',
  },
  zIndices: {
    canvas: -10, // Global background 3D
    base: 1,
    content: 10,
    overlay: 100,
    cursor: 9999, // Custom cursor on very top
  },
};

export type Theme = typeof theme;
