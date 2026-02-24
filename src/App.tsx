import React, { Suspense, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Hero } from './components/dom';
import { Scene } from './components/canvas';
import { AppLayout, SmoothScroll } from './components/layout';
import BattleGame from './components/game/BattleGame';
import { FloatingStartButton } from './components/game/BattleGame.styles';

// Lazy load below-the-fold components
const Projects = React.lazy(() => import('./components/dom/Projects'));
const Skills = React.lazy(() => import('./components/dom/Skills'));
const About = React.lazy(() => import('./components/dom/About'));
const Contact = React.lazy(() => import('./components/dom/Contact'));

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      {isPlaying ? (
        <BattleGame onClose={() => setIsPlaying(false)} />
      ) : (
        <FloatingStartButton onClick={() => setIsPlaying(true)}>
          Start Battle
        </FloatingStartButton>
      )}

      <SmoothScroll>
        {/* 3D Canvas Layer - Sits behind everything */}
        <div id="canvas-container">
          <Scene />
        </div>

        {/* DOM Content Layer - Smooth scrolled */}
        <AppLayout isPlaying={isPlaying}>
          <Hero />

          {/* Lazy load sections below the fold */}
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>Loading transmission...</div>}>
            <Projects />
            <Skills />
            <About />
            <Contact />
          </Suspense>
        </AppLayout>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
