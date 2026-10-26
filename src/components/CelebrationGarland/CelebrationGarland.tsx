import React from 'react';
import './CelebrationGarland.css';

interface Pennant {
  color: string;
  delay: string;
  tilt: number;
}

const PENNANTS: Pennant[] = [
  { color: '#ff6b6b', delay: '0s', tilt: -4 },
  { color: '#ffd166', delay: '0.2s', tilt: 3 },
  { color: '#06d6a0', delay: '0.4s', tilt: -2 },
  { color: '#118ab2', delay: '0.1s', tilt: 4 },
  { color: '#ff8ed4', delay: '0.3s', tilt: -3 },
  { color: '#38ef7d', delay: '0.5s', tilt: 2 },
  { color: '#f6d365', delay: '0.2s', tilt: -4 },
  { color: '#22d3ee', delay: '0.4s', tilt: 3 },
  { color: '#fb7185', delay: '0.1s', tilt: -2 },
  { color: '#ffd700', delay: '0.3s', tilt: 4 },
  { color: '#00f2fe', delay: '0.15s', tilt: -3 },
  { color: '#ff9f1c', delay: '0.35s', tilt: 2 },
  { color: '#a855f7', delay: '0.25s', tilt: -4 },
  { color: '#4facfe', delay: '0.45s', tilt: 3 },
  { color: '#ff6b6b', delay: '0.05s', tilt: -2 },
  { color: '#ffd166', delay: '0.3s', tilt: 4 },
];

export const CelebrationGarland: React.FC = () => {
  return (
    <div className="celebration-garland-fullscreen" aria-hidden="true">
      {/* Curved string rope */}
      <svg className="garland-rope-svg" viewBox="0 0 1600 70" preserveAspectRatio="none">
        <path
          d="M 0,15 Q 400,65 800,50 T 1600,15"
          fill="none"
          stroke="rgba(246, 211, 101, 0.65)"
          strokeWidth="2.5"
          strokeDasharray="5 3"
        />
      </svg>

      {/* Swaying Pennants */}
      <div className="garland-pennants-row">
        {PENNANTS.map((p, idx) => (
          <div
            key={idx}
            className="garland-pennant-wrapper"
            style={{
              animationDelay: p.delay,
              transform: `rotate(${p.tilt}deg)`,
            }}
          >
            <div
              className="garland-pennant"
              style={{ backgroundColor: p.color }}
            />
            {/* Glowing fairy light dot */}
            <span
              className="garland-fairy-light"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 10px 3px ${p.color}`,
                animationDelay: p.delay,
              }}
            />
          </div>
        ))}
      </div>

      {/* Decorative tropical flowers at knots */}
      <div className="garland-flower garland-flower--left">🌺</div>
      <div className="garland-flower garland-flower--center">🌴</div>
      <div className="garland-flower garland-flower--right">🌺</div>
    </div>
  );
};
