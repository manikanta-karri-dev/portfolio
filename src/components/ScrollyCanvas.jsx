import React, { useRef, useEffect, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollyCanvas({ containerRef, images, isLoaded }) {
  const canvasRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index] || !images[index].complete) return;

    const ctx = canvas.getContext('2d');
    const img = images[index];

    // Compute "object-fit: cover" draw parameters
    const hRatio = canvas.width / img.naturalWidth;
    const vRatio = canvas.height / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (canvas.width - img.naturalWidth * ratio) / 2;
    const centerShiftY = (canvas.height - img.naturalHeight * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      centerShiftX,
      centerShiftY,
      img.naturalWidth * ratio,
      img.naturalHeight * ratio
    );
  }, [images]);

  // Adjust high-DPI canvas dimensions on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (isLoaded && images.length > 0) {
        const currentFrame = Math.min(
          Math.floor(scrollYProgress.get() * (images.length - 1)),
          images.length - 1
        );
        renderFrame(currentFrame);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images, renderFrame, scrollYProgress]);

  // Initial draw as soon as preloading completes
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      renderFrame(0);
    }
  }, [isLoaded, images, renderFrame]);

  // Scrub frames on scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isLoaded || images.length === 0) return;
    const frameIndex = Math.min(
      Math.max(Math.floor(latest * (images.length - 1)), 0),
      images.length - 1
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none block z-0"
    />
  );
}