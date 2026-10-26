import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCalendar, FiCompass } from 'react-icons/fi';
import { TRIP } from '../config/trip';
import { CocktailGenerator } from './CocktailGenerator';
import { PHRASES } from '../config/phrases';
import { FlipCountdown } from './flip-countdown';
import { FlightProgress } from './FlightProgress';
import { CelebrationCard } from './CelebrationCard';

const PHRASE_MS = 14000;

function pickPhrase(except?: string) {
  const pool = except ? PHRASES.filter((item) => item !== except) : PHRASES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function CountdownDisplay() {
  const isTargetPassed = TRIP.targetDate.getTime() <= Date.now();
  const [isCompleted, setIsCompleted] = useState(isTargetPassed);
  const [isPreviewActive, setIsPreviewActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return (
        params.has('celebrar') ||
        params.get('celebrar') === '1' ||
        params.has('fiesta') ||
        params.get('fiesta') === '1' ||
        params.has('celebrate') ||
        params.get('celebrate') === '1'
      );
    }
    return false;
  });
  const [phrase, setPhrase] = useState(() => pickPhrase());

  const now = Date.now();
  const total = TRIP.targetDate.getTime() - TRIP.progressStartDate.getTime();
  const elapsed = now - TRIP.progressStartDate.getTime();
  const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const tick = () => {
      if (document.hidden) return;
      setPhrase((current) => pickPhrase(current));
    };

    const id = window.setInterval(tick, PHRASE_MS);
    return () => window.clearInterval(id);
  }, []);

  const showCelebration = isCompleted || isPreviewActive;

  return (
    <div className="countdown-display-wrapper">
      <AnimatePresence mode="wait">
        {showCelebration ? (
          <motion.div
            key="celebration-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <CelebrationCard
              isPreview={isPreviewActive && !isCompleted}
              onBackToCountdown={() => setIsPreviewActive(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="countdown-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%' }}
          >
            <div className="countdown-heading-slot">
              <div className="phrase-badge">
                <FiCompass className="phrase-badge-icon" aria-hidden="true" />
                <span>Mood Caribeño</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={phrase}
                  className="countdown-heading"
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(8px)', y: -8, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  “{phrase}”
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="countdown-split-layout">
              <FlipCountdown
                targetDate={TRIP.targetDate}
                onComplete={() => setIsCompleted(true)}
              />
            </div>

            <FlightProgress
              progress={progress}
              origin={TRIP.progress.origin}
              destination={TRIP.progress.destination}
              startLabel={TRIP.progress.startLabel}
              endLabel={TRIP.progress.endLabel}
            />

            <div className="countdown-info">
              <div className="departure-ticket-pill">
                <FiCalendar className="ticket-icon" aria-hidden="true" />
                <p>{TRIP.departureLine}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CocktailGenerator />
    </div>
  );
}
