import { Hero } from './components/Hero';
import { MapSection } from './components/MapSection';
import { PhotoGrid } from './components/PhotoGrid';
import { MusicPlayer } from './components/MusicPlayer';
import { TRIP } from './config/trip';
import { FiHeart, FiMapPin, FiCompass } from 'react-icons/fi';
import './App.css';

export default function App() {
  return (
    <div className="App">
      {/* Background ambient lighting aura */}
      <div className="ambient-backdrop" aria-hidden="true">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
      </div>

      <a className="skip-link" href="#recuerdos">
        Ir a los recuerdos
      </a>

      <Hero />

      <main className="app-main">
        <MapSection />
        <PhotoGrid
          photos={TRIP.photos}
          albumUrl={TRIP.album.url}
          albumLabel={TRIP.album.label}
        />
      </main>

      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-badge">
            <FiCompass className="footer-badge-icon" aria-hidden="true" />
            <span>Punta Cana 2026 · Cuenta Regresiva Oficial</span>
          </div>

          <p className="footer-from">
            Creado con <FiHeart className="footer-heart-icon" aria-hidden="true" /> del 243 para el 235
          </p>
          <p className="footer-thanks">Gracias, gracias, gracias...</p>
          <p className="footer-love">
            "Te amo Pucana!!, los amamos chicos!! siempre juntos!!!!"
          </p>
          <div className="footer-subtext">
            <span>Meliá Caribe Beach Resort · República Dominicana</span>
          </div>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
}

