import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Section 1: 0% - 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -60]);

  // Section 2: 25% - 48%
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.32, 0.44], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.32, 0.44], [40, 0, -40]);

  // Section 3: 52% - 78%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.62, 0.74], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.62, 0.74], [40, 0, -40]);

  return (
    <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between p-8 md:p-20">
      {/* Section 1: Intro */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-white mb-3 font-mono">
          Portfolio
        </span>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">
          K.H.S Manikanta Reddy<span className="text-emerald-400">.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white font-light">
          Fullstack Developer & Machine Learning Engineer
        </p>
      </motion.div>

      {/* Section 2: Left Aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start max-w-7xl mx-auto px-6 md:px-16"
      >
        <div className="max-w-xl">
          <p className="text-sm font-mono uppercase text-emerald-400 mb-2">Philosophy</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            I craft immersive, performance-driven web spaces.
          </h2>
        </div>
      </motion.div>

      {/* Section 3: Right Aligned */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end max-w-7xl mx-auto px-6 md:px-16"
      >
        <div className="max-w-xl text-right">
          <p className="text-sm font-mono uppercase text-emerald-400 mb-2">Execution</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Bridging raw computational logic with fluid aesthetics.
          </h2>
        </div>
      </motion.div>
    </div>
  );
}