import { useState, useEffect } from 'react';

export function useImageSequence(frameCount = 80) {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Pads 0 -> "000", 1 -> "001", ..., 79 -> "079"
      const indexStr = String(i).padStart(3, '0');
      img.src = `/sequence/frame_${indexStr}.webp`;

      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(`Missing image at: ${img.src}`);
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      loadedImages.push(img);
    }
  }, [frameCount]);

  return { images, isLoaded, progress };
}