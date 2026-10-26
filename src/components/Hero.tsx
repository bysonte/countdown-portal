import { useState, useEffect } from 'react';
import { FiMapPin, FiSun } from 'react-icons/fi';
import { PhotoBackground } from './PhotoBackground';
import { ScrollIndicator } from './ScrollIndicator';
import { CountdownDisplay } from './CountdownDisplay';
import { TRIP } from '../config/trip';

export function Hero() {
  const [weatherTemp, setWeatherTemp] = useState<number | null>(null);
  const [lanternLit, setLanternLit] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setLanternLit(true);
      return undefined;
    }
    const id = window.setTimeout(() => setLanternLit(true), 180);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=18.5818&longitude=-68.4043&current=temperature_2m'
        );
        const data = await res.json();
        if (data && data.current) {
          setWeatherTemp(Math.round(data.current.temperature_2m));
        }
      } catch (err) {
        console.error('Error fetching weather for badge:', err);
      }
    }
    fetchWeather();
  }, []);

  return (
    <section className={`hero${lanternLit ? ' is-lit' : ''}`}>
      <PhotoBackground photos={TRIP.photos} />

      <div className="hero-lantern">
        <div className={`hero-card${lanternLit ? ' is-lit' : ''}`}>
          <span className="hero-wick" aria-hidden="true" />
          <div className="hero-meta">
            <div className="header-badge">
              <span className="live-beacon" aria-hidden="true">
                <span className="live-beacon-dot" />
                <span className="live-beacon-ring" />
              </span>
              <FiMapPin className="badge-pin-icon" aria-hidden="true" />
              <span className="badge-destination">{TRIP.header.badge}</span>
              {weatherTemp !== null && (
                <>
                  <span className="badge-separator" aria-hidden="true" />
                  <FiSun className="badge-sun-icon" aria-hidden="true" />
                  <span className="badge-temp">{weatherTemp}°C Caribe</span>
                </>
              )}
            </div>
          </div>

          <h1 className="hero-main-title">{TRIP.header.title}</h1>

          <p className="hero-subtitle">{TRIP.header.subtitle}</p>

          <CountdownDisplay />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
