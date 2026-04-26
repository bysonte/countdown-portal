import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Photo } from '../config/trip';

interface PhotoGridProps {
  photos: ReadonlyArray<Photo>;
  albumUrl: string;
  albumLabel: string;
}

export function PhotoGrid({ photos, albumUrl, albumLabel }: PhotoGridProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <motion.section
      ref={ref}
      className="photo-grid-section"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <motion.figure
            key={photo.url}
            className={`photo-tile${i % 3 === 2 ? ' photo-tile--tall' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.07 }}
          >
            <img src={photo.url} alt={photo.caption} loading="lazy" decoding="async" />
            <figcaption>{photo.caption}</figcaption>
          </motion.figure>
        ))}
      </div>

      {albumUrl && (
        <div className="album-link-wrapper">
          <a
            href={albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="album-link"
          >
            📷 {albumLabel}
          </a>
        </div>
      )}
    </motion.section>
  );
}
