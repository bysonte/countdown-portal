import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import './FlightProgress.css';

type FlightProgressProps = {
  progress: number;
  origin: string;
  destination: string;
  startLabel: string;
  endLabel: string;
  className?: string;
};

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

export function FlightProgress({
  progress,
  origin,
  destination,
  startLabel,
  endLabel,
  className = '',
}: FlightProgressProps) {
  const targetProgress = clampProgress(progress);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let startTime: number | null = null;
    const durationMs = 1400;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progressRatio = Math.min(elapsed / durationMs, 1);
      const easedRatio = 1 - (1 - progressRatio) ** 3;

      setValue(Math.round(targetProgress * easedRatio * 10) / 10);

      if (progressRatio < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [targetProgress]);

  const roundedValue = Math.round(value);

  return (
    <div className={`flight-progress ${className}`.trim()}>
      <div className="flight-progress-summary">
        <strong>{roundedValue}% del camino</strong>
        <span className="sr-only">
          {roundedValue} por ciento del camino de {origin} a {destination}
        </span>
      </div>

      <div className="flight-component">
        <span className="flight-place flight-place--origin">
          <span>{origin}</span>
          <span>{startLabel}</span>
        </span>
        <input
          type="range"
          className="flight"
          style={{ '--val': value, pointerEvents: 'none' } as CSSProperties}
          value={value}
          min="0"
          max="100"
          step="0.1"
          tabIndex={-1}
          aria-hidden="true"
          onChange={() => {}}
        />
        <span className="flight-place flight-place--destination">
          <span>{destination}</span>
          <span>{endLabel}</span>
        </span>
      </div>
    </div>
  );
}
