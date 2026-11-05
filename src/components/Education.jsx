import React, { useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  Award,
  Binary,
} from 'lucide-react';

const EDUCATION_DATA = [
  {
    id: 'btech',
    institution: 'S.R.K.R. Engineering College',
    credential: 'B.Tech in Artificial Intelligence & Data Science',
    stream: 'Artificial Intelligence & Data Science',
    location: 'Bhimavaram, Andhra Pradesh',
    timeline: '2023 — 2026',
    scoreLabel: 'CGPA',
    scoreValue: '7.41',
    description:
      'Focused on software development, artificial intelligence, machine learning, and problem-solving, with an interest in applying technical knowledge to real-world projects.',
    image: '/education/srkr_engineering_college.jpg',
    glowColor: '#818cf8', // Electric Violet / Indigo
    borderActive: 'border-indigo-400 shadow-[0_0_40px_rgba(129,140,248,0.45)]',
    scoreBadgeClass: 'border-indigo-400/60 bg-indigo-500/20 text-indigo-300 shadow-[0_0_15px_rgba(129,140,248,0.3)]',
    tags: ['Machine Learning', 'Computer Network', 'Data Structures', 'Python', 'Data Science'],
  },
  {
    id: 'diploma',
    institution: 'Smt. B. Seetha Polytechnic',
    credential: 'Diploma in Electronics & Communication',
    stream: 'Electronics & Communication Engineering (ECE)',
    location: 'Bhimavaram, Andhra Pradesh',
    timeline: '2019 — 2023',
    scoreLabel: 'Percentage',
    scoreValue: '68.81%',
    description:
      'Gained strong foundational mastery in digital logic, microprocessors, embedded circuitry, network architecture, and core low-level computing paradigms.',
    image: '/education/smt_b_seetha_polytechnic.jpg',
    glowColor: '#38bdf8', // Electric Cyan / Blue
    borderActive: 'border-sky-400 shadow-[0_0_40px_rgba(56,189,248,0.45)]',
    scoreBadgeClass: 'border-sky-400/60 bg-sky-500/20 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]',
    tags: ['Digital Electronics', 'Microprocessors', 'C Fundamentals', 'Network Protocols'],
  },
];

function EducationCard({ item, index, isActive, onActivate }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onActivate}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateXSpring,
        rotateY: shouldReduceMotion ? 0 : rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative overflow-hidden rounded-3xl border bg-zinc-950/90 transition-all duration-500 cursor-pointer ${
        isActive
          ? item.borderActive
          : 'border-white/10 hover:border-white/25 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]'
      }`}
    >
      {/* Background Campus Photo: Crisp on Right, Gradient Fade to Dark on Left */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={item.image}
          alt={item.institution}
          className="absolute right-0 top-0 h-full w-[85%] md:w-[65%] object-cover object-center opacity-70 filter contrast-110 brightness-95 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-85"
        />
        {/* Horizontal directional gradient so text on left is 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/20" />
        {/* Subtle vertical vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
      </div>

      {/* Card Body */}
      <div
        style={{ transform: shouldReduceMotion ? 'none' : 'translateZ(20px)' }}
        className="relative z-10 p-7 md:p-9 flex flex-col justify-between min-h-[350px]"
      >
        <div>
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-zinc-950/80 backdrop-blur-md text-xs font-mono text-zinc-200">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {item.timeline}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/15 bg-zinc-950/70 backdrop-blur-md text-xs font-mono text-zinc-300">
                <MapPin className="w-3 h-3 text-zinc-400" />
                {item.location}
              </span>
            </div>

            {/* Glowing Score Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border ${item.scoreBadgeClass} font-mono text-xs font-bold backdrop-blur-md`}
            >
              <Award className="w-4 h-4" />
              <span>
                {item.scoreLabel}: {item.scoreValue}
              </span>
            </div>
          </div>

          {/* Institution & Degree */}
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 drop-shadow-md">
            {item.institution}
          </h3>
          <p
            className="text-base font-semibold mb-4 flex items-center gap-2"
            style={{ color: item.glowColor }}
          >
            <GraduationCap className="w-4 h-4" />
            {item.credential}
          </p>

          <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-xl mb-6 drop-shadow">
            {item.description}
          </p>
        </div>

        {/* Focus Chips */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mr-2 flex items-center gap-1">
            <Binary className="w-3 h-3" /> Focus:
          </span>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg border border-white/15 bg-zinc-900/80 backdrop-blur-sm text-xs font-mono text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const [activeId, setActiveId] = useState(EDUCATION_DATA[0].id);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="relative z-20 w-full bg-[#121212] py-28 px-6 md:px-12 lg:px-20 text-white overflow-hidden selection:bg-indigo-500/30 selection:text-white"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-violet-600/15 via-sky-500/10 to-transparent blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/40 bg-indigo-500/15 text-indigo-300 font-mono text-xs tracking-widest uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            Academic Foundations
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-300">&amp; Disciplines.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            Studied electronics and communication engineering, building a strong foundation in hardware, programming, and core engineering concepts, while developing an interest in artificial intelligence, computer vision, and deep learning.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* LEFT: Rail Tracker */}
          <div className="lg:col-span-4 relative flex flex-col justify-between py-8 px-7 rounded-3xl border border-white/15 bg-zinc-950/80 backdrop-blur-2xl shadow-xl">
            <div className="absolute top-14 bottom-14 left-[41px] w-[3px] bg-gradient-to-b from-indigo-500 via-sky-400 to-indigo-900/40 shadow-[0_0_12px_rgba(99,102,241,0.6)] pointer-events-none" />

            <div className="space-y-12 relative z-10">
              {EDUCATION_DATA.map((item) => {
                const isSelected = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className="relative flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      {isSelected && !shouldReduceMotion && (
                        <motion.div
                          layoutId="pulse-ring-education"
                          className="absolute -inset-2 rounded-full opacity-75"
                          style={{ border: `2px solid ${item.glowColor}` }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        />
                      )}
                      <div
                        className="h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                        style={{
                          borderColor: isSelected ? item.glowColor : 'rgba(255,255,255,0.3)',
                          backgroundColor: isSelected ? item.glowColor : '#18181b',
                          boxShadow: isSelected ? `0 0 20px ${item.glowColor}` : 'none',
                        }}
                      >
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                        {item.timeline}
                      </span>
                      <h4
                        className={`text-base font-semibold transition-colors duration-200 ${
                          isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                        }`}
                      >
                        {item.credential}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        {item.institution}
                      </p>

                      <div className="mt-2.5">
                        <span
                          className={`inline-block text-[11px] font-mono px-2.5 py-0.5 rounded border ${item.scoreBadgeClass}`}
                        >
                          {item.scoreLabel}: {item.scoreValue}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Interdisciplinary Trajectory
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Combining lower-level electronic circuit intuition from diploma studies with high-level AI algorithms and neural modeling from B.Tech training.
              </p>
            </div> */}
          </div>

          {/* RIGHT: High-Vibrancy Cards */}
          <div className="lg:col-span-8 space-y-6">
            {EDUCATION_DATA.map((item, index) => (
              <EducationCard
                key={item.id}
                item={item}
                index={index}
                isActive={activeId === item.id}
                onActivate={() => setActiveId(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}