import React, { useRef } from 'react';
import ScrollyCanvas from './ScrollyCanvas';
import Overlay from './Overlay';
import { useImageSequence } from '../hooks/useImageSequence';

export default function ScrollytellingHero() {
  const containerRef = useRef(null);
  // 80 frames: frame_000.webp to frame_079.webp
  const { images, isLoaded, progress } = useImageSequence(80);

  return (
    <section ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-white">
          <p className="font-mono text-xs tracking-widest text-zinc-400 uppercase mb-3">
            Loading Experience — {progress}%
          </p>
          <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ScrollyCanvas containerRef={containerRef} images={images} isLoaded={isLoaded} />
        <Overlay containerRef={containerRef} />
      </div>
    </section>
  );
}