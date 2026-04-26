import { motion } from 'framer-motion';
import { PhotoBackground } from './PhotoBackground';
import { ScrollIndicator } from './ScrollIndicator';
import { CountdownDisplay } from './CountdownDisplay';
import { TRIP } from '../config/trip';

export function Hero() {
  return (
    <section className="hero">
      <PhotoBackground photos={TRIP.photos} />

      <motion.div
        className="hero-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
      >
        <motion.span
          className="header-badge"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {TRIP.header.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          {TRIP.header.title}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.82 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {TRIP.header.subtitle}
        </motion.p>

        <CountdownDisplay />
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
