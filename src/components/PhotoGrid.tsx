import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX, FiImage, FiExternalLink } from 'react-icons/fi';
import type { Photo } from '../config/trip';

interface PhotoGridProps {
  photos: ReadonlyArray<Photo>;
  albumUrl: string;
  albumLabel: string;
}

function memoryLabel(index: number, total: number, caption: string) {
  return caption || `Recuerdo ${index + 1} de ${total}`;
}

export function PhotoGrid({ photos, albumUrl, albumLabel }: PhotoGridProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [imageBroken, setImageBroken] = useState(false);
  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex];

  const openPhoto = (index: number) => {
    lastFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setDirection(1);
    setImageBroken(false);
    setSelectedIndex(index);
  };

  const closePhoto = () => {
    setSelectedIndex(null);
    lastFocusRef.current?.focus();
  };

  const stepPhoto = (delta: number) => {
    setDirection(delta);
    setImageBroken(false);
    setSelectedIndex((index) => (
      index === null ? index : (index + delta + photos.length) % photos.length
    ));
  };

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePhoto();
      } else if (event.key === 'ArrowRight') {
        stepPhoto(1);
      } else if (event.key === 'ArrowLeft') {
        stepPhoto(-1);
      } else if (event.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [photos.length, selectedIndex]);

  return (
    <section id="recuerdos" className="photo-grid-section">
      <header className="section-heading">
        <div className="section-pill">
          <FiImage className="section-pill-icon" aria-hidden="true" />
          <span>{photos.length} Fotos Guardadas</span>
        </div>
        <h2>Nuestros recuerdos</h2>
        <p className="section-lede">Los que ya vivimos. Los que todavía nos deben una risa.</p>
      </header>

      <div className="photo-grid">
        {photos.map((photo, i) => (
          <figure
            key={photo.url}
            className={`photo-tile${i % 3 === 2 ? ' photo-tile--tall' : ''}`}
          >
            <button
              type="button"
              className="photo-tile-btn"
              onClick={() => openPhoto(i)}
              aria-label={`Abrir ${memoryLabel(i, photos.length, photo.caption)}`}
            >
              <img
                src={photo.url}
                alt={memoryLabel(i, photos.length, photo.caption)}
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
              />
              <span className="photo-tile-overlay" aria-hidden="true" />
            </button>
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedPhoto && selectedIndex !== null && (
            <motion.div
              ref={overlayRef}
              className="lightbox-overlay"
              role="dialog"
              aria-modal="true"
              aria-label={memoryLabel(selectedIndex, photos.length, selectedPhoto.caption)}
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={closePhoto}
              onTouchStart={(event) => {
                touchStartX.current = event.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const start = touchStartX.current;
                const end = event.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (start == null || end == null) return;
                const delta = end - start;
                if (Math.abs(delta) < 48) return;
                stepPhoto(delta < 0 ? 1 : -1);
              }}
            >
              <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
                <span className="lightbox-counter">
                  {selectedIndex + 1} / {photos.length}
                </span>
                <button
                  ref={closeRef}
                  className="lightbox-close"
                  onClick={closePhoto}
                  aria-label="Cerrar"
                >
                  <FiX />
                </button>
              </div>

              <button
                type="button"
                className="lightbox-nav prev"
                aria-label="Foto anterior"
                onClick={(event) => {
                  event.stopPropagation();
                  stepPhoto(-1);
                }}
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="lightbox-nav next"
                aria-label="Foto siguiente"
                onClick={(event) => {
                  event.stopPropagation();
                  stepPhoto(1);
                }}
              >
                <FiChevronRight />
              </button>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={selectedPhoto.url}
                  className="lightbox-content"
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40, filter: 'blur(12px)', scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, x: direction * -32, filter: 'blur(10px)', scale: 0.96 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {imageBroken ? (
                    <p className="lightbox-error">Esta foto no cargó. Pasá a la siguiente.</p>
                  ) : (
                    <img
                      src={selectedPhoto.url}
                      alt={memoryLabel(selectedIndex, photos.length, selectedPhoto.caption)}
                      onError={() => setImageBroken(true)}
                    />
                  )}
                  <figcaption className="lightbox-meta">
                    {memoryLabel(selectedIndex, photos.length, selectedPhoto.caption)}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {albumUrl && (
        <div className="album-link-wrapper">
          <a
            href={albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="album-link"
          >
            <span>{albumLabel}</span>
            <FiExternalLink aria-hidden="true" />
          </a>
        </div>
      )}
    </section>
  );
}

