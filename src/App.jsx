import { motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { MapSection } from './components/MapSection';
import { PhotoGrid } from './components/PhotoGrid';
import { MusicPlayer } from './components/MusicPlayer';
import { TRIP } from './config/trip';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Hero />

      <main className="app-main">
        <MapSection />
        <PhotoGrid
          photos={TRIP.photos}
          albumUrl={TRIP.album.url}
          albumLabel={TRIP.album.label}
        />
      </main>

      <motion.footer
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p>Creado con ❤️ para nuestro grupo de amigos aventureros</p>
        <p>¿Listos para el viaje de nuestras vidas?</p>
      </motion.footer>

      <MusicPlayer />
    </div>
  );
}
