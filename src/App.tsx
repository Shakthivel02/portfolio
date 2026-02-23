import AppLayout from './components/layout/AppLayout';
import SmoothScroll from './components/layout/SmoothScroll';
import Scene from './components/canvas/Scene';

import Hero from './components/dom/Hero';
import Projects from './components/dom/Projects';
import Skills from './components/dom/Skills';
import About from './components/dom/About';
import Contact from './components/dom/Contact';

function App() {
  return (
    <SmoothScroll>
      {/* 3D Global Canvas Layer - Sits behind everything */}
      <div id="canvas-container">
        <Scene />
      </div>

      {/* DOM Content Layer - Smooth scrolled */}
      <AppLayout>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </AppLayout>
    </SmoothScroll>
  );
}

export default App;
