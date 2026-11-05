import React, { useState, useEffect } from 'react';

const navItems = [
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education'},
  { name: 'Certifications', href: '#certifications' },
  
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect current section on screen
      const sections = ['projects', 'skills', 'education', 'certifications'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-zinc-900/40 border-white/5 backdrop-blur-md'
      }`}
    >
      {/* Brand Icon / Initials */}
      <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
  aria-label="Back to top"
>
  {/* Ambient background hover flare */}
  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/20 via-transparent to-cyan-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

  {/* Inner Monogram */}
  <span className="relative z-10 font-mono text-xs font-bold tracking-tight text-white transition-colors duration-200">
    M<span className="text-emerald-400 group-hover:text-cyan-400 transition-colors">K</span>
  </span>

  {/* Subtle micro dot highlight */}
  <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-emerald-400/80 group-hover:bg-cyan-400 transition-colors" />
</a>

      <div className="h-4 w-[1px] bg-white/10 mx-1" />

      {/* Nav Links with Spinning Conic Gradient Borders */}
      {navItems.map((item) => {
        const isActive = activeSection === item.href.slice(1);

        return (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleScrollTo(e, item.href)}
            className="group relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-full transition-all duration-300"
          >
            {/* Spinning Dual-Color Conic Gradient Border (Reveals on Hover or Active) */}
            <span
              className={`absolute inset-[-1000%] transition-opacity duration-300 animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#06b6d4_50%,#10b981_100%)] ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            />

            {/* Inner Dark Pill Face */}
            <span
              className={`relative z-10 block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                isActive
                  ? 'bg-zinc-950 text-white shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]'
                  : 'bg-zinc-950/90 text-zinc-300 group-hover:text-white group-hover:bg-zinc-900/90'
              }`}
            >
              {item.name}
            </span>
          </a>
        );
      })}

      {/* Glowing Contact CTA Button */}
      <a
        href="#contact"
        onClick={(e) => handleScrollTo(e, '#contact')}
        className="group relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-full ml-1"
      >
        <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0%,#a855f7_50%,#3b82f6_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-white bg-zinc-950 hover:bg-zinc-900 transition-colors">
          Connect
        </span>
      </a>
    </nav>
  );
}