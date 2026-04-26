import { useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { motion, useInView } from 'framer-motion';
import { TRIP } from '../config/trip';

export function MapSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const [infoOpen, setInfoOpen] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '';
  const { isLoaded } = useJsApiLoader({ id: 'gmap-script', googleMapsApiKey: apiKey });

  const center = {
    lat: TRIP.destination.coordinates[0],
    lng: TRIP.destination.coordinates[1],
  };

  if (!apiKey) {
    return (
      <section className="map-section">
        <h2>🗺️ Nuestro destino</h2>
        <p className="section-subtitle">
          {TRIP.destination.name}, {TRIP.destination.country}
        </p>
        <div className="map-unavailable">
          <p>⚠️ Mapa no disponible — configurá <code>VITE_GOOGLE_MAPS_API_KEY</code> en <code>.env.local</code></p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="map-section"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      <h2>🗺️ Nuestro destino</h2>
      <p className="section-subtitle">
        {TRIP.destination.name}, {TRIP.destination.country}
      </p>

      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="map-canvas"
          center={center}
          zoom={TRIP.destination.zoom}
          options={{
            mapTypeId: TRIP.destination.mapTypeId,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker
            position={center}
            icon={{
              url: '/marker-gold.svg',
              scaledSize: new window.google.maps.Size(40, 48),
            }}
            onClick={() => setInfoOpen(true)}
          />
          {infoOpen && (
            <InfoWindow position={center} onCloseClick={() => setInfoOpen(false)}>
              <div className="map-info">
                <strong>{TRIP.destination.markerLabel}</strong>
                <br />
                <span>{TRIP.destination.markerDescription}</span>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <div className="map-loading">
          <div className="map-loading-spinner" />
        </div>
      )}
    </motion.section>
  );
}
