import { createGlobalStyle } from 'styled-components';
import type { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  /* Reset and base styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Fonts loaded via index.html <link> tags */

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: none;
    
    /* Crucial: Prevent horizontal scrolling on the brutalist layouts */
    overflow-x: hidden; 
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.dimmed};
    border-radius: ${({ theme }) => theme.borders.radius}; /* Keep it sharp! */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  /* Selection styling */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-weight: ${({ theme }) => theme.typography.weights.black};
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.02em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    border-radius: ${({ theme }) => theme.borders.radius};
    cursor: pointer;
    border: none;
    background: none;
  }
`;
