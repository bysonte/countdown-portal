import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMusic, FiPause, FiVolume2 } from 'react-icons/fi';
import { TRIP } from '../config/trip';
import { useAudioAnalyser } from '../hooks/useAudioAnalyser';
import { SpectrumAnalyzer } from './SpectrumAnalyzer';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [needsGesture, setNeedsGesture] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { analyser, ensureStarted } = useAudioAnalyser(audioRef);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setNeedsGesture(true));
    return () => { audio.pause(); };
  }, []);

  useEffect(() => {
    if (needsGesture) return undefined;
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, [needsGesture]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await ensureStarted();
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsGesture(false);
        setShowTooltip(true);
        window.setTimeout(() => setShowTooltip(false), 3500);
      } catch {
        setNeedsGesture(true);
        setShowTooltip(true);
      }
    }
  };

  return (
    <div className="music-player">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="music-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tooltip-tag">
              <FiVolume2 className="tooltip-icon" />
              <span>Banda Sonora</span>
            </div>
            <span className="tooltip-title">
              {needsGesture ? 'Tocá para encender Jerusalema' : TRIP.music.title}
            </span>
            <span className="tooltip-artist">
              {needsGesture ? 'El navegador pausó el autoplay' : TRIP.music.artist}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="music-pill-container">
        <AnimatePresence>
          {(isPlaying || analyser) && (
            <motion.div
              className="spectrum-container"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpectrumAnalyzer analyser={analyser} isPlaying={isPlaying} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={`music-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? <FiPause /> : <FiMusic />}
          <span className="music-btn-glow" aria-hidden="true" />
        </motion.button>
      </div>

      <audio ref={audioRef} loop>
        <source src={TRIP.music.src} type="audio/mpeg" />
      </audio>
    </div>
  );
}

