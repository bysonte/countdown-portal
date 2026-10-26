import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCocktail } from 'react-icons/fa';
import { FiCheck, FiStar } from 'react-icons/fi';
import { FlightActionButton } from './FlightActionButton';

interface Cocktail {
  id: number;
  name: string;
  ingredients: string[];
  description: string;
}

const FALLBACK_COCKTAILS: Omit<Cocktail, 'id'>[] = [
  {
    name: 'Piña Colada Caribeña',
    description: 'El clásico indiscutido bajo las palmeras de Punta Cana. Cremoso, refrescante y con puro sabor a vacaciones.',
    ingredients: ['Ron blanco dominicano', 'Crema de coco', 'Jugo de piña natural', 'Hielo frappé', 'Rodaja de piña'],
  },
  {
    name: 'Coco Loco Tropical',
    description: 'Servido en coco fresco frente al mar. El trago festivo por excelencia para empezar la tarde.',
    ingredients: ['Ron dominicano', 'Vodka', 'Tequila blanco', 'Leche de coco', 'Jugo de maracuyá', 'Hielo picado'],
  },
  {
    name: 'Santo Libre',
    description: 'El trago nacional por excelencia de República Dominicana. Chispeante, cítrico y súper liviano.',
    ingredients: ['Ron dorado Barceló / Brugal', 'Gaseosa lima-limón', 'Abundante lima fresca', 'Mucho hielo'],
  },
  {
    name: 'Mama Juana Tradicional',
    description: 'La mítica infusión dominicana de raíces, cortezas y hierbas caribeñas. Dulce, especiada y energizante.',
    ingredients: ['Macerado de hierbas Mama Juana', 'Ron oscuro', 'Vino tinto', 'Miel pura de abeja'],
  },
  {
    name: 'Daiquiri de Maracuyá',
    description: 'Acidez perfecta y notas tropicales intensas para disfrutar en la piscina del resort.',
    ingredients: ['Ron añejo', 'Pulpa de maracuyá', 'Jugo de lima exprimida', 'Almíbar simple', 'Hielo'],
  },
  {
    name: 'Mojito de Mango Caribeño',
    description: 'Giro frutal al mojito clásico con el dulzor jugoso del mango tropical maduro y menta fresca.',
    ingredients: ['Ron blanco', 'Hojas de menta fresca machacadas', 'Puré de mango', 'Soda fría', 'Lima'],
  },
];

export function CocktailGenerator() {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCocktail = async () => {
    setLoading(true);
    setError('');
    try {
      const dbUrl = import.meta.env.VITE_NEON_DATABASE_URL;
      if (dbUrl) {
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(dbUrl);

        await sql`
          CREATE TABLE IF NOT EXISTS cocktails (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE,
            ingredients TEXT[],
            description TEXT
          )
        `;

        const result = await sql`SELECT * FROM cocktails ORDER BY RANDOM() LIMIT 1`;

        if (result && result.length > 0) {
          setCocktail({
            id: result[0].id,
            name: result[0].name,
            ingredients: result[0].ingredients,
            description: result[0].description,
          });
          return;
        }
      }

      // Fallback to rich curated pool
      const randomDrink = FALLBACK_COCKTAILS[Math.floor(Math.random() * FALLBACK_COCKTAILS.length)];
      setCocktail({
        id: Date.now(),
        name: randomDrink.name,
        ingredients: randomDrink.ingredients,
        description: randomDrink.description,
      });
    } catch (err) {
      console.error('Error fetching cocktail:', err);
      // Fallback to rich curated pool gracefully
      const randomDrink = FALLBACK_COCKTAILS[Math.floor(Math.random() * FALLBACK_COCKTAILS.length)];
      setCocktail({
        id: Date.now(),
        name: randomDrink.name,
        ingredients: randomDrink.ingredients,
        description: randomDrink.description,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cocktail-widget">
      <div className="cocktail-header">
        <div className="cocktail-icon-glow">
          <FaCocktail className="cocktail-main-icon" />
        </div>
        <div className="cocktail-header-text">
          <h3>Bar Caribeño All-Inclusive</h3>
          <p className="cocktail-subtitle">¿Qué brindamos hoy mientras esperamos el despegue?</p>
        </div>
      </div>

      <FlightActionButton
        label="Generar Trago del Día"
        busyLabel="Preparando en la barra..."
        loading={loading}
        onClick={getCocktail}
      />

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="cocktail-error"
            className="cocktail-error"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.p>
        )}
        {cocktail && !error && (
          <motion.div
            className="cocktail-result"
            key={cocktail.id}
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)', y: 12 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cocktail-toast-banner">
              <FiStar className="toast-sparkle" />
              <span className="cocktail-salud">¡Salud por este viaje que se viene!</span>
              <FiStar className="toast-sparkle" />
            </div>

            <h4 className="cocktail-name">{cocktail.name}</h4>
            <p className="cocktail-desc">{cocktail.description}</p>
            
            <div className="cocktail-ingredients">
              <h5>Ingredientes de la receta:</h5>
              <ul className="ingredients-pills">
                {cocktail.ingredients.map((ing, idx) => (
                  <li key={idx} className="ingredient-pill">
                    <FiCheck className="ingredient-check" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

