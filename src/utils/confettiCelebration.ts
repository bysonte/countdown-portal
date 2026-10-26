import confetti from 'canvas-confetti';

/**
 * Vibrant tropical Caribbean vacation color palette:
 * Cyan Lagoon, Sun Gold, Bright Coral, Neon Mint, Flamingo Pink, Tangerine, Electric Blue, Emerald, Pure White.
 */
export const TROPICAL_COLORS = [
  '#00f2fe',
  '#4facfe',
  '#ffd166',
  '#ff6b6b',
  '#ff8ed4',
  '#38ef7d',
  '#f6d365',
  '#ff9f1c',
  '#2ec4b6',
  '#a855f7',
  '#ffffff',
];

export const GOLD_COLORS = ['#ffd700', '#f6d365', '#f0c27a', '#ffffff', '#ffb703', '#ffa200'];

const BASE_CONFIG = {
  zIndex: 999999, // ALWAYS above all DOM elements and overlays
  disableForReducedMotion: true,
};

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fires a massive, full-screen 360° celebration across BOTH left and right halves:
 * - Left edge cannon (shoots up & right)
 * - Right edge cannon (shoots up & left)
 * - Left center and Right center fountains (shoots upwards straight)
 * - Top downward rain shower across all X coordinates (0.05 to 0.95)
 * - Random fireworks across left and right quadrants
 */
export function triggerGrandCelebration(): void {
  if (prefersReducedMotion()) return;

  // 1. Left and Right synchronized explosive cannons
  confetti({
    ...BASE_CONFIG,
    particleCount: 150,
    angle: 60,
    spread: 90,
    origin: { x: 0.05, y: 0.8 },
    startVelocity: 70,
    colors: TROPICAL_COLORS,
    scalar: 1.2,
  });

  confetti({
    ...BASE_CONFIG,
    particleCount: 150,
    angle: 120,
    spread: 90,
    origin: { x: 0.95, y: 0.8 },
    startVelocity: 70,
    colors: TROPICAL_COLORS,
    scalar: 1.2,
  });

  // 2. Left-mid and Right-mid vertical fountains (ensures left & right are densely covered)
  window.setTimeout(() => {
    confetti({
      ...BASE_CONFIG,
      particleCount: 100,
      angle: 90,
      spread: 80,
      origin: { x: 0.25, y: 0.75 },
      startVelocity: 60,
      colors: TROPICAL_COLORS,
      shapes: ['circle', 'square'],
      scalar: 1.1,
    });

    confetti({
      ...BASE_CONFIG,
      particleCount: 100,
      angle: 90,
      spread: 80,
      origin: { x: 0.75, y: 0.75 },
      startVelocity: 60,
      colors: TROPICAL_COLORS,
      shapes: ['circle', 'square'],
      scalar: 1.1,
    });
  }, 150);

  // 3. Center 360° Starburst & Gold Explosion
  window.setTimeout(() => {
    confetti({
      ...BASE_CONFIG,
      particleCount: 160,
      spread: 360,
      startVelocity: 50,
      origin: { x: 0.5, y: 0.45 },
      shapes: ['star', 'circle'],
      colors: GOLD_COLORS,
      scalar: 1.4,
    });
  }, 300);

  // 4. Screen-wide top-down rain across 7 columns (left to right)
  window.setTimeout(() => {
    const columns = [0.08, 0.22, 0.36, 0.5, 0.64, 0.78, 0.92];
    columns.forEach((posX, idx) => {
      window.setTimeout(() => {
        confetti({
          ...BASE_CONFIG,
          particleCount: 50,
          angle: 270, // DOWNWARDS
          spread: 60,
          origin: { x: posX, y: -0.05 },
          startVelocity: 20,
          gravity: 0.9,
          ticks: 350,
          colors: TROPICAL_COLORS,
          scalar: 1.2,
        });
      }, idx * 80);
    });
  }, 450);

  // 5. Multi-quadrant fireworks
  window.setTimeout(() => {
    fireFireworksShower(3500);
  }, 650);
}

/**
 * Fires continuous random firework bursts across the whole left and right screen.
 */
export function fireFireworksShower(durationMs = 3500): void {
  if (prefersReducedMotion()) return;

  const animationEnd = Date.now() + durationMs;

  const interval: number = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const ratio = Math.max(timeLeft / durationMs, 0.4);

    // Left hemisphere burst
    confetti({
      ...BASE_CONFIG,
      particleCount: Math.floor(50 * ratio),
      startVelocity: 42,
      spread: 360,
      ticks: 120,
      origin: {
        x: Math.random() * 0.42 + 0.05,
        y: Math.random() * 0.55 + 0.1,
      },
      colors: TROPICAL_COLORS,
      shapes: ['circle', 'star'],
      scalar: 1.2,
    });

    // Right hemisphere burst
    confetti({
      ...BASE_CONFIG,
      particleCount: Math.floor(50 * ratio),
      startVelocity: 42,
      spread: 360,
      ticks: 120,
      origin: {
        x: Math.random() * 0.42 + 0.53,
        y: Math.random() * 0.55 + 0.1,
      },
      colors: TROPICAL_COLORS,
      shapes: ['circle', 'star'],
      scalar: 1.2,
    });
  }, 320);
}

/**
 * Massive interactive confetti blast when clicking "¡Más Confeti!".
 * Shoots from both left, center, and right simultaneously.
 */
export function triggerCannonBurst(): void {
  if (prefersReducedMotion()) return;

  // Left cannon
  confetti({
    ...BASE_CONFIG,
    particleCount: 100,
    angle: 65,
    spread: 85,
    origin: { x: 0.1, y: 0.8 },
    colors: TROPICAL_COLORS,
    startVelocity: 65,
    scalar: 1.3,
  });

  // Center burst
  confetti({
    ...BASE_CONFIG,
    particleCount: 120,
    spread: 360,
    origin: { x: 0.5, y: 0.5 },
    colors: TROPICAL_COLORS,
    startVelocity: 50,
    shapes: ['circle', 'square', 'star'],
    scalar: 1.3,
  });

  // Right cannon
  confetti({
    ...BASE_CONFIG,
    particleCount: 100,
    angle: 115,
    spread: 85,
    origin: { x: 0.9, y: 0.8 },
    colors: TROPICAL_COLORS,
    startVelocity: 65,
    scalar: 1.3,
  });
}

/**
 * Explosión de Guirnaldas y Serpentinas para el botón "¡Brindar!":
 * Lanza una lluvia masiva de guirnaldas, banderines, cintas y serpentinas
 * tropicales de gran escala desde arriba hacia abajo cubriendo toda la pantalla.
 */
export function triggerGarlandExplosion(): void {
  if (prefersReducedMotion()) return;

  // 1. Ribbon / Garland Streamers (large elongated square ribbons) falling from top across full screen
  const garlandCols = [0.05, 0.18, 0.32, 0.46, 0.6, 0.74, 0.88, 0.98];
  garlandCols.forEach((posX, idx) => {
    window.setTimeout(() => {
      // Large garland pennant ribbons
      confetti({
        ...BASE_CONFIG,
        particleCount: 45,
        angle: 270, // DOWNWARDS
        spread: 80,
        origin: { x: posX, y: -0.1 },
        startVelocity: 28,
        gravity: 0.95,
        drift: (Math.random() - 0.5) * 1.5,
        ticks: 400,
        colors: ['#ff6b6b', '#ffd166', '#06d6a0', '#118ab2', '#ff8ed4', '#38ef7d', '#f6d365', '#22d3ee', '#fb7185'],
        shapes: ['square'],
        scalar: 2.2, // Large garland/pennant scale!
      });

      // Golden sparkle stars accompanying the garlands
      confetti({
        ...BASE_CONFIG,
        particleCount: 25,
        angle: 270,
        spread: 90,
        origin: { x: posX, y: -0.05 },
        startVelocity: 22,
        gravity: 0.8,
        ticks: 350,
        colors: GOLD_COLORS,
        shapes: ['star'],
        scalar: 1.5,
      });
    }, idx * 60);
  });

  // 2. Center celebratory cork pop champagne blast
  window.setTimeout(() => {
    confetti({
      ...BASE_CONFIG,
      particleCount: 140,
      spread: 140,
      origin: { x: 0.5, y: 0.6 },
      colors: GOLD_COLORS,
      shapes: ['star', 'circle'],
      startVelocity: 55,
      scalar: 1.6,
    });
  }, 200);
}
