import { motion } from 'framer-motion';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { TRIP } from '../config/trip';

export function CountdownDisplay() {
  const now = Date.now();
  const total = TRIP.targetDate.getTime() - TRIP.progressStartDate.getTime();
  const elapsed = now - TRIP.progressStartDate.getTime();
  const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);

  return (
    <div className="countdown-display-wrapper">
      <h2 className="countdown-heading">Pucana, allá vamos!!!!</h2>

      <div className="flip-clock-container">
        <FlipClockCountdown
          to={TRIP.targetDate}
          labels={['Días', 'Horas', 'Minutos', 'Segundos']}
          showSeparators={false}
          labelStyle={{
            fontSize: '0.62rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'rgba(255,255,255,0.55)',
            marginTop: '8px',
          }}
          digitBlockStyle={{
            // width/height/fontSize controlled by CSS vars so media queries can override
            fontWeight: 700,
            color: '#ffffff',
            borderRadius: '10px',
          }}
          dividerStyle={{ color: 'rgba(255,255,255,0.2)', height: 1 }}
          duration={0.5}
          spacing={{ clock: '0.6rem', digitBlock: '3px' }}
          stopOnHiddenVisibility
        >
          <motion.span
            className="completed-text"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            ¡YA EMPEZÓ! 🎉
          </motion.span>
        </FlipClockCountdown>
      </div>

      <div className="trip-progress">
        <div className="progress-labels">
          <span>Ene 2026</span>
          <span className="progress-pct">{progress.toFixed(0)}% del camino</span>
          <span>Sep 2026</span>
        </div>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
          />
          <motion.span
            className="progress-plane"
            initial={{ left: '0%' }}
            animate={{ left: `calc(${progress}% - 14px)` }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
          >
            🛫
          </motion.span>
        </div>
      </div>

      <div className="countdown-info">
        <p>{TRIP.departureLine}</p>
      </div>
    </div>
  );
}
