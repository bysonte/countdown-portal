import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMusic } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { CelebrationGarland } from '../CelebrationGarland/CelebrationGarland';
import { triggerGrandCelebration, triggerCannonBurst, triggerGarlandExplosion } from '../../utils/confettiCelebration';
import { playCelebrationFanfare, playChampagneToastSound } from '../../utils/celebrationAudio';
import './CelebrationCard.css';

interface CelebrationCardProps {
  onBackToCountdown?: () => void;
  isPreview?: boolean;
}

const FLOATING_ICONS = ['🌴', '🍹', '✈️', '🥳', '🥂', '🥥', '🌺', '☀️', '🏖️', '🍍'];

export const CelebrationCard: React.FC<CelebrationCardProps> = ({
  onBackToCountdown,
  isPreview = false,
}) => {
  const [toastCount, setToastCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger grand celebration burst when card mounts
  useEffect(() => {
    triggerGrandCelebration();
    playCelebrationFanfare();
  }, []);

  const handleConfettiClick = () => {
    triggerCannonBurst();
  };

  const handleToastClick = () => {
    setToastCount((c) => c + 1);
    triggerGarlandExplosion();
    playChampagneToastSound();

    const cheersPhrases = [
      '¡Salud por el 243 y el 235! 🥂',
      '¡Por las mejores vacaciones de la vida! 🍹',
      '¡Nos vemos en la playa! 🌴',
      '¡Brindis caribeño activado! 🥥',
      '¡A disfrutar cada segundo! ✨',
    ];
    setToastMessage(cheersPhrases[Math.floor(Math.random() * cheersPhrases.length)]);

    window.setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePlayMusic = () => {
    // Try to trigger audio element if present on page
    const audio = document.querySelector('audio') as HTMLAudioElement | null;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    }
  };

  return (
    <div className="celebration-container">
      <CelebrationGarland />

      {/* Ambient floating celebratory particles */}
      <div className="celebration-floating-particles" aria-hidden="true">
        {FLOATING_ICONS.map((icon, idx) => (
          <span
            key={idx}
            className="floating-particle"
            style={{
              left: `${(idx * 10.5 + 4) % 94}%`,
              animationDelay: `${idx * 0.7}s`,
              animationDuration: `${6 + (idx % 4) * 1.5}s`,
            }}
          >
            {icon}
          </span>
        ))}
      </div>

      <motion.div
        className="celebration-card"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="celebration-card-glow" aria-hidden="true" />

        {/* Top Status Banner */}
        <div className="celebration-status-pill">
          <span className="celebration-live-dot" />
          <BsStars className="celebration-sparkle-icon" />
          <span>¡LLEGÓ EL 12 DE SEPTIEMBRE · VUELO EN CURSO!</span>
          <BsStars className="celebration-sparkle-icon" />
        </div>

        {/* Grand Headline */}
        <h2 className="celebration-title">
          🎉 ¡¡NOS FUIMOS A PUNTA CANA!! 🌴🍹
        </h2>

        <p className="celebration-description">
          ¡El reloj llegó a cero y el vuelo desde Ezeiza despegó a las 2:00 AM!
          Dejamos la rutina atrás para vivir las vacaciones soñadas frente al mar turquesa del{' '}
          <strong>Meliá Caribe Beach Resort</strong>.
        </p>

        {/* Trip Feature Chips */}
        <div className="celebration-grid">
          <div className="celebration-chip">
            <span className="chip-icon">✈️</span>
            <div className="chip-text">
              <span className="chip-label">Despegue</span>
              <span className="chip-val">12 Sep · 2:00 AM Ezeiza</span>
            </div>
          </div>

          <div className="celebration-chip">
            <span className="chip-icon">🏨</span>
            <div className="chip-text">
              <span className="chip-label">Destino</span>
              <span className="chip-val">Meliá Caribe Beach</span>
            </div>
          </div>

          <div className="celebration-chip">
            <span className="chip-icon">🥥</span>
            <div className="chip-text">
              <span className="chip-label">Trago Oficial</span>
              <span className="chip-val">Piña Colada & Mamajuana</span>
            </div>
          </div>

          <div className="celebration-chip">
            <span className="chip-icon">🌴</span>
            <div className="chip-text">
              <span className="chip-label">Estado</span>
              <span className="chip-val">¡Relax total activado!</span>
            </div>
          </div>
        </div>

        {/* Interactive Joy Actions */}
        <div className="celebration-actions">
          <button
            type="button"
            className="celebration-btn celebration-btn--confetti"
            onClick={handleConfettiClick}
            aria-label="Tirar más confeti"
          >
            <span className="btn-icon">🎊</span>
            <span>¡Más Confeti!</span>
          </button>

          <button
            type="button"
            className="celebration-btn celebration-btn--toast"
            onClick={handleToastClick}
            aria-label="Brindar por el viaje"
          >
            <span className="btn-icon">🥂</span>
            <span>¡Brindar! {toastCount > 0 && `(${toastCount})`}</span>
          </button>

          <button
            type="button"
            className="celebration-btn celebration-btn--music"
            onClick={handlePlayMusic}
            aria-label="Reproducir banda sonora"
          >
            <FiMusic className="btn-icon-svg" />
            <span>Música Fiesta</span>
          </button>
        </div>

        {/* Toast Cheers Banner Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="toast-cheers-bubble"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <FiHeart className="toast-heart" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to countdown button for preview mode */}
        {isPreview && onBackToCountdown && (
          <button
            type="button"
            className="celebration-back-btn"
            onClick={onBackToCountdown}
          >
            ← Volver a la cuenta regresiva en vivo
          </button>
        )}
      </motion.div>
    </div>
  );
};
