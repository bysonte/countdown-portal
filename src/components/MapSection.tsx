import { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { FiMapPin, FiExternalLink, FiCompass } from 'react-icons/fi';
import { TRIP } from '../config/trip';

export function MapSection() {
  const [infoOpen, setInfoOpen] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '';
  const { isLoaded } = useJsApiLoader({ id: 'gmap-script', googleMapsApiKey: apiKey });

  const center = {
    lat: TRIP.destination.coordinates[0],
    lng: TRIP.destination.coordinates[1],
  };

  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${TRIP.destination.markerLabel.replace(/^🏨\s*/, '')} ${TRIP.destination.name}`
  )}`;

  return (
    <section className="map-section">
      <header className="section-heading">
        <div className="section-pill">
          <FiCompass className="section-pill-icon" aria-hidden="true" />
          <span>Destino Soñado</span>
        </div>
        <h2>Dónde nos espera el mar</h2>
        <p className="section-subtitle">
          {TRIP.destination.markerLabel.replace(/^🏨\s*/, '')} · {TRIP.destination.name}, {TRIP.destination.country}
        </p>
      </header>

      {/* Resort Highlight Chips */}
      <div className="resort-highlights">
        <span className="resort-chip">🌴 All Inclusive</span>
        <span className="resort-chip">🌊 Primera Línea de Playa Bávaro</span>
        <span className="resort-chip">🏊 6 Piscinas Tropicales</span>
        <span className="resort-chip">🍹 Coctelería & Restaurantes</span>
      </div>

      <div className="map-container-wrapper">
        {apiKey && isLoaded ? (
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
                  <strong>{TRIP.destination.markerLabel.replace(/^🏨\s*/, '')}</strong>
                  <br />
                  <span>{TRIP.destination.markerDescription}</span>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : apiKey ? (
          <div className="map-loading" aria-label="Cargando mapa">
            <div className="map-loading-spinner" />
          </div>
        ) : (
          <div className="map-card-fallback">
            <div className="fallback-inner">
              <div className="fallback-icon-wrap">
                <FiMapPin className="fallback-pin" />
              </div>
              <h3>{TRIP.destination.markerLabel.replace(/^🏨\s*/, '')}</h3>
              <p className="fallback-address">{TRIP.destination.markerDescription}</p>
              <p className="fallback-note">
                Ubicado en la mejor franja de arena blanca de Punta Cana, donde el agua es turquesa los 365 días del año.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="map-actions">
        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-action-btn"
        >
          <FiMapPin aria-hidden="true" />
          <span>Ver ubicación exacta en Google Maps</span>
          <FiExternalLink aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

