import React, { useState, useRef, useId } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import {
  Code2,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Terminal,
} from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================
const TECH_UNIVERSE_NODES = [
  {
    id: 'react',
    label: 'React.js',
    role: 'Frontend Core',
    desc: 'Declarative component architecture & custom hook systems.',
    cx: 50,
    cy: 50,
    color: '#38bdf8', // Electric blue
    category: 'frontend',
  },
  {
    id: 'js',
    label: 'JavaScript ES6+',
    role: 'Language Core',
    desc: 'Event loop mastery, async runtime, functional patterns.',
    cx: 30,
    cy: 32,
    color: '#facc15',
    category: 'frontend',
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    role: 'Design System',
    desc: 'Utility-first spatial scales, dark themes & animations.',
    cx: 24,
    cy: 68,
    color: '#06b6d4',
    category: 'frontend',
  },
  {
    id: 'python',
    label: 'Python',
    role: 'Backend & Compute',
    desc: 'Scripting, backend service engineering & scientific stacks.',
    cx: 70,
    cy: 34,
    color: '#818cf8', // Indigo/violet
    category: 'backend',
  },
  {
    id: 'django',
    label: 'Django & REST',
    role: 'API Framework',
    desc: 'Scalable endpoints, ORM abstraction, authentication.',
    cx: 82,
    cy: 54,
    color: '#34d399',
    category: 'backend',
  },
  {
    id: 'vlm',
    label: 'VLMs & BLIP-2',
    role: 'Applied AI',
    desc: 'Vision-Language models & medical image reporting synthesis.',
    cx: 65,
    cy: 74,
    color: '#a855f7', // Vivid Violet
    category: 'ai',
  },
  {
    id: 'tf',
    label: 'TensorFlow',
    role: 'Deep Learning',
    desc: 'Model training pipelines, inference optimization & tensors.',
    cx: 48,
    cy: 82,
    color: '#f97316',
    category: 'ai',
  },
  {
    id: 'sql',
    label: 'SQL & Relational',
    role: 'Persistence',
    desc: 'Complex queries, schema indexing & transaction handling.',
    cx: 36,
    cy: 18,
    color: '#ec4899',
    category: 'database',
  },
];

const CONSTELLATION_LINKS = [
  ['js', 'react'],
  ['react', 'tailwind'],
  ['react', 'python'],
  ['python', 'django'],
  ['python', 'vlm'],
  ['vlm', 'tf'],
  ['tf', 'react'],
  ['js', 'sql'],
  ['sql', 'python'],
];

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    tagline: 'High-performance interactive interfaces',
    icon: Code2,
    accent: 'from-sky-500/20 via-blue-500/10 to-transparent',
    glow: 'rgba(56, 189, 248, 0.35)',
    borderGlow: 'hover:border-sky-500/40',
    skills: [
      { name: 'React.js', note: 'Hooks & Context' },
      { name: 'JavaScript ES6+', note: 'Modern Syntax' },
      { name: 'HTML5 & CSS3', note: 'Semantic Architecture' },
      { name: 'Tailwind CSS', note: 'Responsive Frameworks' },
      { name: 'Bootstrap', note: 'Rapid Prototyping' },
    ],
  },
  {
    id: 'backend-data',
    title: 'Backend & Systems',
    tagline: 'Robust endpoints and relational schemas',
    icon: Server,
    accent: 'from-indigo-500/20 via-violet-500/10 to-transparent',
    glow: 'rgba(129, 140, 248, 0.35)',
    borderGlow: 'hover:border-indigo-500/40',
    skills: [
      { name: 'Python', note: 'OOP & Core Logic' },
      { name: 'Django', note: 'Application Stacks' },
      { name: 'REST APIs', note: 'Architecture & Auth' },
      { name: 'MySQL', note: 'Relational DB' },
      { name: 'SQL Querying', note: 'Aggregations & Joins' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    tagline: 'Perception, NLP and multi-modal models',
    icon: BrainCircuit,
    accent: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    glow: 'rgba(168, 85, 247, 0.35)',
    borderGlow: 'hover:border-purple-500/40',
    skills: [
      { name: 'TensorFlow', note: 'Deep Neural Networks' },
      { name: 'XGBoost', note: 'Structured Ensembles' },
      { name: 'NLP', note: 'Tokenization & Embeddings' },
      { name: 'BLIP & BLIP-2', note: 'Vision-Language Pretraining' },
      { name: 'VLMs', note: 'Multi-modal Systems' },
    ],
  },
  {
    id: 'tooling',
    title: 'Tooling & Workflow',
    tagline: 'Version tracking, notebooks and environments',
    icon: Wrench,
    accent: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    glow: 'rgba(52, 211, 153, 0.35)',
    borderGlow: 'hover:border-emerald-500/40',
    skills: [
      { name: 'Git', note: 'CLI Branching & Workflows' },
      { name: 'GitHub', note: 'CI/CD & Remote Repos' },
      { name: 'VS Code', note: 'Custom Tooling & Extensions' },
      { name: 'Jupyter Notebook', note: 'Exploratory Data Analysis' },
    ],
  },
];

// ==========================================
// SUBCOMPONENT: 3D TILT GLASS CARD
// ==========================================
function SkillCard({ category, index }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
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

  const Icon = category.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateXSpring,
        rotateY: shouldReduceMotion ? 0 : rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl transition-all duration-300 ${category.borderGlow} hover:shadow-[0_0_40px_-10px_${category.glow}]`}
    >
      {/* Dynamic Ambient Gradient Top Highlight */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.accent} opacity-40 transition-opacity duration-300 group-hover:opacity-75 pointer-events-none`}
      />

      <div style={{ transform: shouldReduceMotion ? 'none' : 'translateZ(30px)' }} className="relative z-10">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Icon className="h-5 w-5 text-zinc-200 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-zinc-100">
                {category.title}
              </h3>
              <p className="text-xs text-zinc-400 font-mono tracking-tight">{category.tagline}</p>
            </div>
          </div>
        </div>

        {/* Technical Chips Grid */}
        <div className="space-y-2.5 pt-2">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-zinc-950/40 px-3.5 py-2 transition-colors hover:border-white/15 hover:bg-zinc-900/60"
            >
              <span className="text-xs font-medium text-zinc-200 tracking-wide font-sans">
                {skill.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                {skill.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// MAIN SKILLS SECTION COMPONENT
// ==========================================
export default function Skills() {
  const [activeNode, setActiveNode] = useState(TECH_UNIVERSE_NODES[0]);
  const shouldReduceMotion = useReducedMotion();
  const gradientId = useId();

  return (
    <section
      id="skills"
      className="relative z-20 min-h-screen w-full bg-[#121212] py-28 px-6 md:px-12 lg:px-20 text-white overflow-hidden selection:bg-violet-500/30 selection:text-white"
    >
      {/* Background Soft Glow Spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-600/10 via-sky-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-mono text-xs tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Technical Competencies
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              My Technical<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-indigo-300"> Skills.</span>
            </h2>
          </div>
          
        </div>

        {/* ==================================================== */}
        {/* INTERACTIVE TECH UNIVERSE (Connected Nodes Visual) */}
        {/* ==================================================== */}
        <div className="relative mb-24 rounded-3xl border border-white/10 bg-zinc-950/70 p-6 md:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Subtle Grid Canvas Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Constellation Canvas Viewport */}
            <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`${gradientId}-line`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Animated Connecting Lines */}
                {CONSTELLATION_LINKS.map(([sourceId, targetId]) => {
                  const src = TECH_UNIVERSE_NODES.find((n) => n.id === sourceId);
                  const tgt = TECH_UNIVERSE_NODES.find((n) => n.id === targetId);
                  if (!src || !tgt) return null;

                  const isConnectedToActive =
                    activeNode && (activeNode.id === src.id || activeNode.id === tgt.id);

                  return (
                    <motion.line
                      key={`${sourceId}-${targetId}`}
                      x1={src.cx}
                      y1={src.cy}
                      x2={tgt.cx}
                      y2={tgt.cy}
                      stroke={isConnectedToActive ? '#38bdf8' : `url(#${gradientId}-line)`}
                      strokeWidth={isConnectedToActive ? '0.6' : '0.25'}
                      strokeDasharray={isConnectedToActive ? 'none' : '1.5 1'}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: isConnectedToActive ? 0.9 : 0.4 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                  );
                })}

                {/* SVG Node Points */}
                {TECH_UNIVERSE_NODES.map((node) => {
                  const isSelected = activeNode?.id === node.id;
                  return (
                    <g key={node.id}>
                      {/* Pulse Ring for Active Node */}
                      {isSelected && !shouldReduceMotion && (
                        <motion.circle
                          cx={node.cx}
                          cy={node.cy}
                          r="3"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="0.3"
                          initial={{ scale: 0.8, opacity: 1 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                        />
                      )}

                      {/* Main Node Point */}
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={isSelected ? '2.2' : '1.4'}
                        fill={node.color}
                        className="cursor-pointer transition-all duration-300 hover:scale-125"
                        onClick={() => setActiveNode(node)}
                        onMouseEnter={() => setActiveNode(node)}
                        style={{ filter: `drop-shadow(0 0 4px ${node.color})` }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating HTML Labels overlaid on SVG coordinates */}
              {TECH_UNIVERSE_NODES.map((node) => {
                const isSelected = activeNode?.id === node.id;
                return (
                  <motion.button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    onMouseEnter={() => setActiveNode(node)}
                    style={{ left: `${node.cx}%`, top: `${node.cy}%` }}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: [0, -3, 0],
                            transition: {
                              duration: 3 + (node.cx % 3),
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }
                    }
                    className={`absolute -translate-x-1/2 -translate-y-8 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-tight transition-all duration-300 border ${
                      isSelected
                        ? 'bg-zinc-900 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105 z-30'
                        : 'bg-zinc-950/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 z-10'
                    }`}
                  >
                    {node.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Node Inspector Info Panel */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeNode && (
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 h-1 w-full"
                      style={{ backgroundColor: activeNode.color }}
                    />
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
                      <Terminal className="w-3.5 h-3.5" style={{ color: activeNode.color }} />
                      {activeNode.role}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-3">
                      {activeNode.label}
                    </h4>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed mb-5">
                      {activeNode.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: activeNode.color }} />
                      Domain: <span className="text-zinc-200 capitalize">{activeNode.category}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-4 text-xs font-mono text-zinc-500">
                Hover or tap any constellation node to inspect architectural role.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* RECRUITER-FRIENDLY SKILL CATEGORY CARDS (3D Tilt)   */}
        {/* ==================================================== */}
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            Categorical Breakdown
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
            Production Toolkits &amp; Frameworks
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}