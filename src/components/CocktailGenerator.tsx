import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCocktail, FaSync } from 'react-icons/fa';
import { neon } from '@neondatabase/serverless';

interface Cocktail {
  id: number;
  name: string;
  ingredients: string[];
  description: string;
}

export function CocktailGenerator() {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(false);

  const getCocktail = async () => {
    setLoading(true);
    try {
      const sql = neon(import.meta.env.VITE_NEON_DATABASE_URL);
      
      await sql`
        CREATE TABLE IF NOT EXISTS cocktails (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE,
          ingredients TEXT[],
          description TEXT
        )
      `;

      // Obtener un trago aleatorio
      const result = await sql`SELECT * FROM cocktails ORDER BY RANDOM() LIMIT 1`;
      
      if (result && result.length > 0) {
        setCocktail({
          id: result[0].id,
          name: result[0].name,
          ingredients: result[0].ingredients,
          description: result[0].description
        });
      }
    } catch (err) {
      console.error('Error fetching cocktail:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cocktail-widget">
      <div className="cocktail-header">
        <FaCocktail className="cocktail-main-icon" />
        <h3>¿Qué bebemos hoy?</h3>
      </div>

      <button 
        className="cocktail-generate-btn" 
        onClick={getCocktail}
        disabled={loading}
      >
        {loading ? 'Preparando...' : 'Generar Trago'}
        <FaSync className={`btn-sync-icon ${loading ? 'spinning' : ''}`} />
      </button>

      <AnimatePresence mode="wait">
        {cocktail && (
          <motion.div 
            className="cocktail-result"
            key={cocktail.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="cocktail-name">{cocktail.name}</h4>
            <p className="cocktail-desc">{cocktail.description}</p>
            <div className="cocktail-ingredients">
              <h5>Ingredientes:</h5>
              <ul>
                {cocktail.ingredients.map((ing, idx) => (
                  <li key={idx}>🍹 {ing}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
