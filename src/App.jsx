import React from 'react';
import Navbar from './components/Navbar';
import ScrollytellingHero from './components/ScrollytellingHero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Education from './components/Education';

export default function App() {
  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-emerald-500/30 selection:text-white relative">
      <Navbar />

      <ScrollytellingHero />

      <div id="projects">
        <Projects />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="education">
        <Education />
      </div>

      <div id="certifications">
        <Certifications />
      </div>

      {/* Modern Contact Section */}
      <Contact />

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/5 bg-zinc-950 text-center px-6">
        <p className="font-mono text-xs text-zinc-500 tracking-wider">
          © {new Date().getFullYear()} Karri Manikanta. Engineered with React, Framer Motion &amp; Tailwind.
        </p>
      </footer>
    </main>
  );
}