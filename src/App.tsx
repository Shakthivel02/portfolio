import React, { Suspense } from 'react';
import { Hero } from './components/dom';
import { Scene } from './components/canvas';
import { AppLayout, SmoothScroll } from './components/layout';

// Lazy load below-the-fold components
const Projects = React.lazy(() => import('./components/dom/Projects'));
const Skills = React.lazy(() => import('./components/dom/Skills'));
const About = React.lazy(() => import('./components/dom/About'));
const Contact = React.lazy(() => import('./components/dom/Contact'));

function App() {
  return (
    <SmoothScroll>
      {/* 3D Canvas Layer - Sits behind everything */}
      <div id="canvas-container">
        <Scene />
      </div>

      {/* DOM Content Layer - Smooth scrolled */}
      <AppLayout>
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
  );
}

export default App;
