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

    if (showARef.current) {
      // A is visible → load new photo into B, then reveal B
      setUrlB(url);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setShowA(false);
          showARef.current = false;
        })
      );
    } else {
      // B is visible → load new photo into A, then reveal A
      setUrlA(url);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setShowA(true);
          showARef.current = true;
        })
      );
    }
  }, [url]);

  return (
    <div className={className}>
      <div
        className="photo-bg-face"
        style={{ backgroundImage: `url(${urlA})`, opacity: showA ? 1 : 0 }}
      />
      <div
        className="photo-bg-face"
        style={{ backgroundImage: `url(${urlB})`, opacity: showA ? 0 : 1 }}
      />
    </div>
  );
}

interface PhotoBackgroundProps {
  photos: ReadonlyArray<Photo>;
  tickMs?: number; // ms between each individual cell update
}

const CELL_COUNT = 3;

export function PhotoBackground({ photos, tickMs = 5500 }: PhotoBackgroundProps) {
  // Each cell cycles through a slice of the photo array
  const indicesRef = useRef<number[]>(
    Array.from({ length: CELL_COUNT }, (_, i) => i % photos.length)
  );

  const [urls, setUrls] = useState<string[]>(() =>
    Array.from({ length: CELL_COUNT }, (_, i) => photos[i % photos.length].url)
  );

  const tickCountRef = useRef(0); // which cell to update next

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (photos.length <= CELL_COUNT || reduced) return;

    const timer = setInterval(() => {
      const cell = tickCountRef.current % CELL_COUNT;
      tickCountRef.current++;

      // Advance this cell's photo index by CELL_COUNT (so each cell has its own slice)
      const next = (indicesRef.current[cell] + CELL_COUNT) % photos.length;
      indicesRef.current[cell] = next;

      setUrls(prev => {
        const updated = [...prev];
        updated[cell] = photos[next].url;
        return updated;
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [photos, tickMs]);

  return (
    <div className="photo-bg" aria-hidden="true">
      <div className="photo-bg-grid">
        <PhotoCell url={urls[0]} className="photo-cell-0" />
        <PhotoCell url={urls[1]} className="photo-cell-1" />
        <PhotoCell url={urls[2]} className="photo-cell-2" />
      </div>
      <div className="photo-bg-overlay" />
    </div>
  );
}
