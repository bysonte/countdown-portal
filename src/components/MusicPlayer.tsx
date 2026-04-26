import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMusic, FiPause } from 'react-icons/fi';
import { TRIP } from '../config/trip';
import { useAudioAnalyser } from '../hooks/useAudioAnalyser';
import { SpectrumAnalyzer } from './SpectrumAnalyzer';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { analyser, ensureStarted } = useAudioAnalyser(audioRef);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => { /* autoplay blocked — isPlaying stays false */ });
    return () => { audio.pause(); };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await ensureStarted();
      audio.play().catch(() => {});
      setIsPlaying(true);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  return (
    <div className="music-player">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="music-tooltip"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25 }}
          >
            <span className="tooltip-title">{TRIP.music.title}</span>
            <span className="tooltip-artist">{TRIP.music.artist}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="music-controls-row">
        <AnimatePresence>
          {(isPlaying || analyser) && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: 'hidden' }}
            >
              <SpectrumAnalyzer analyser={analyser} isPlaying={isPlaying} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={`music-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? <FiPause /> : <FiMusic />}
        </motion.button>
      </div>

      <audio ref={audioRef} loop>
        <source src={TRIP.music.src} type="audio/mpeg" />
      </audio>
    </div>
  );
}
