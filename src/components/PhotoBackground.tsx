import { useState, useEffect, useRef } from 'react';
import type { Photo } from '../config/trip';

// Each cell manages its own A/B double buffer and crossfades independently
function PhotoCell({ url, className }: { url: string; className: string }) {
  const [urlA, setUrlA] = useState(url);
  const [urlB, setUrlB] = useState(url);
  const [showA, setShowA] = useState(true);
  const showARef = useRef(true);
  const prevUrlRef = useRef(url);

  useEffect(() => {
    if (url === prevUrlRef.current) return;
    prevUrlRef.current = url;
    
    // Step 1: Load new photo into the hidden face
    if (showARef.current) {
      setUrlB(url);
    } else {
      setUrlA(url);
    }

    // Step 2: Delay to ensure image is assigned, then trigger the fade
    const timer = setTimeout(() => {
      showARef.current = !showARef.current;
      setShowA(showARef.current);
    }, 150);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className={className}>
      <div
        className="photo-bg-face"
        style={{ 
          backgroundImage: `url(${urlA})`, 
          opacity: showA ? 1 : 0
        }}
      />
      <div
        className="photo-bg-face"
        style={{ 
          backgroundImage: `url(${urlB})`, 
          opacity: showA ? 0 : 1
        }}
      />
    </div>
  );
}

interface PhotoBackgroundProps {
  photos: ReadonlyArray<Photo>;
}

const CELL_COUNT = 6;

export function PhotoBackground({ photos }: PhotoBackgroundProps) {
  const indicesRef = useRef<number[]>(
    Array.from({ length: CELL_COUNT }, (_, i) => i % photos.length)
  );

  const [urls, setUrls] = useState<string[]>(() =>
    Array.from({ length: CELL_COUNT }, (_, i) => photos[i % photos.length].url)
  );



  // Keep track of the last updated cells to avoid repetition
  const lastUpdatedCellsRef = useRef<number[]>([]);

  useEffect(() => {
    if (photos.length <= CELL_COUNT) return;

    const timer = setInterval(() => {
      // Pick a random cell that isn't among the last 3 updated
      let cell: number;
      do {
        cell = Math.floor(Math.random() * CELL_COUNT);
      } while (lastUpdatedCellsRef.current.includes(cell));

      // Update history (keep only the last 3)
      lastUpdatedCellsRef.current = [cell, ...lastUpdatedCellsRef.current].slice(0, 3);

      // Advance this cell's photo index by a random amount to avoid predictable cycles
      const jump = Math.floor(Math.random() * 8) + 1;
      const next = (indicesRef.current[cell] + jump) % photos.length;
      indicesRef.current[cell] = next;

      setUrls(prev => {
        const updated = [...prev];
        updated[cell] = photos[next].url;
        return updated;
      });
    }, 3000); 

    return () => clearInterval(timer);
  }, [photos]);

  return (
    <div className="photo-bg" aria-hidden="true">
      <div className="photo-bg-grid">
        {urls.map((url, i) => (
          <PhotoCell key={i} url={url} className={`photo-cell-${i}`} />
        ))}
      </div>
      <div className="photo-bg-overlay" />
    </div>
  );
}
