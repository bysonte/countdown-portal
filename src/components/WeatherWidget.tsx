import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSun, 
  FaCloudSun, 
  FaCloud, 
  FaCloudRain, 
  FaBolt 
} from 'react-icons/fa';

interface WeatherData {
  temperature: number;
  humidity: number;
  weatherCode: number;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=18.5818&longitude=-68.4043&current=temperature_2m,relative_humidity_2m,weather_code'
        );
        const data = await res.json();
        
        if (data && data.current) {
          setWeather({
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            weatherCode: data.current.weather_code,
          });
        }
      } catch (err) {
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 1000 * 60 * 30); // cada 30 mins
    return () => clearInterval(interval);
  }, []);

  const getWeatherConfig = (code: number) => {
    if (code === 0) {
      return {
        icon: <FaSun className="weather-icon sunny" />,
        text: 'Despejado',
        tip: '¡Día perfecto para broncearse en Playa Bávaro 🏖️! No olvides el protector solar.',
      };
    }
    if ([1, 2, 3].includes(code)) {
      return {
        icon: <FaCloudSun className="weather-icon partly-cloudy" />,
        text: 'Parcialmente nublado',
        tip: 'Clima ideal para una caminata por la arena o un paseo en catamarán ⛵.',
      };
    }
    if ([45, 48].includes(code)) {
      return {
        icon: <FaCloud className="weather-icon cloudy" />,
        text: 'Niebla / Cubierto',
        tip: 'Un día fresco. Aprovecha para explorar los restaurantes del hotel 🍽️.',
      };
    }
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      return {
        icon: <FaCloudRain className="weather-icon rainy" />,
        text: 'Lluvia tropical',
        tip: 'Lluvia caribeña 🌧️. Momento ideal para pedir una Piña Colada en el bar techado.',
      };
    }
    return {
      icon: <FaBolt className="weather-icon storm" />,
      text: 'Tormenta',
      tip: '¡Tormenta eléctrica ⛈️! Mejor relajarse en las áreas techadas del resort.',
    };
  };

  if (loading) {
    return (
      <div className="weather-widget-loading">
        <div className="map-loading-spinner"></div>
      </div>
    );
  }

  if (!weather) return null;

  const config = getWeatherConfig(weather.weatherCode);

  return (
    <motion.div 
      className="weather-widget"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="weather-main">
        {config.icon}
        <div className="weather-info">
          <span className="weather-temp">{Math.round(weather.temperature)}°C</span>
          <span className="weather-status">{config.text}</span>
          <span className="weather-humidity">Humedad: {weather.humidity}%</span>
        </div>
      </div>
      <div className="weather-tip">
        <p>{config.tip}</p>
      </div>
    </motion.div>
  );
}
