import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'Chest X-ray Report Generation',
    category: 'Artificial Intelligence / Machine Learning',
    description:
      'Developed an AI-powered chest X-ray report generation system using BLIP and BLIP-2 Vision-Language Models and deep learning to generate automated medical reports from X-ray images..',
    tags: ['Python', 'Machine Learning', 'Deep Learning'],
  },
  {
    title: 'VillaVista – Responsive Real Estate Website',
    category: 'Web Development',
    description:
      'Designed and developed a responsive real estate website using HTML, CSS, and JavaScript, featuring modern layouts and an intuitive user interface..',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Simple Chatbot',
    category: 'Artificial Intelligence / Natural Language Processing (NLP)',
    description:
      'Developed a simple chatbot to interact with users and generate automated responses based on user inputs.',
    tags: ['Python', 'NLP', 'GPT-4'],
  },
  {
    title: 'MediVision – Disease Prediction System',
    category: 'Machine Learning / Healthcare AI',
    description:
      'Developed a machine learning-based disease prediction system that analyzes user-reported symptoms and predicts potential illnesses XGBoost.',
    tags: ['Python', 'XGBoost', 'SMOTE'],
  },
  {
    title: 'Tic-Tac-Toe – Interactive Game',
    category: 'Frontend Development',
    description:
      'An interactive two-player game featuring dynamic gameplay, win detection, and game reset functionality.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'E-Commerce Website with API Integration',
    category: 'Full-Stack Web Development',
    description:
      'A full-stack e-commerce application featuring a React frontend and Flask backend, with REST API integration for dynamic product listings, shopping cart functionality, and order management.',
  tags: ['React', 'REST API', 'Tailwind CSS'],
  },
];

export default function Projects() {
  const containerRef = useRef(null);

  // Tracks vertical scroll progress across the projects container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 75%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative z-20 bg-[#121212] px-6 py-24 md:py-36 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-20 text-center md:text-left">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
          The Creative Process
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-2">
          From Concept to Code.
        </h2>
      </div>

      {/* Main Timeline Wrapper */}
      <div ref={containerRef} className="relative w-full">
        {/* Background Guide Line (Subtle Track) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10" />

        {/* Dynamic Glowing Center Beam */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_18px_rgba(16,185,129,0.9)] origin-top z-0"
        />

        {/* Alternating Cards List */}
        <div className="flex flex-col space-y-16 md:space-y-24">
          {projects.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.title}
                className={`relative flex items-center w-full pl-10 md:pl-0 ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Glowing Node Dot on the Central Line */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 z-10 flex items-center justify-center"
                >
                  <span className="absolute h-5 w-5 rounded-full bg-cyan-400/30 animate-ping" />
                  <span className="relative h-3.5 w-3.5 rounded-full border-2 border-[#121212] bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]" />
                </motion.div>

                {/* Card Container */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-[calc(50%-48px)] group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                >
                  <div className="text-xs font-mono text-zinc-500 mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/5 bg-zinc-900/60 px-2.5 py-1 text-xs font-mono text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}