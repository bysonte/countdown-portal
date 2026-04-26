import { useRef, useEffect } from 'react';

interface SpectrumAnalyzerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  bars?: number;
  width?: number;
  height?: number;
}

export function SpectrumAnalyzer({
  analyser,
  isPlaying,
  bars = 48,
  width = 120,
  height = 32,
}: SpectrumAnalyzerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const barValuesRef = useRef<Float32Array>(new Float32Array(bars));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const barValues = barValuesRef.current;
    const barWidth = Math.max(1, (width / bars) - 1);
    const gradient = ctx.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, '#0891b2');
    gradient.addColorStop(0.55, '#06b6d4');
    gradient.addColorStop(1, '#67e8f9');

    cancelAnimationFrame(rafRef.current);

    if (analyser && isPlaying) {
      const usableBins = Math.floor(analyser.frequencyBinCount * 0.75);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const draw = () => {
        if (document.hidden) {
          rafRef.current = requestAnimationFrame(draw);
          return;
        }
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < bars; i++) {
          const start = Math.floor((i / bars) * usableBins);
          const end = Math.max(start + 1, Math.floor(((i + 1) / bars) * usableBins));
          let sum = 0;
          for (let j = start; j < end; j++) sum += dataArray[j];
          const avg = sum / (end - start);
          barValues[i] = Math.max(barValues[i] * 0.82, avg);
          const barH = (barValues[i] / 255) * height;
          ctx.fillStyle = gradient;
          ctx.fillRect(i * (barWidth + 1), height - barH, barWidth, barH);
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Smooth decay to zero when paused
      const decay = () => {
        let active = false;
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < bars; i++) {
          barValues[i] *= 0.88;
          if (barValues[i] > 0.5) active = true;
          const barH = (barValues[i] / 255) * height;
          ctx.fillStyle = gradient;
          ctx.fillRect(i * (barWidth + 1), height - barH, barWidth, barH);
        }
        if (active) rafRef.current = requestAnimationFrame(decay);
      };
      rafRef.current = requestAnimationFrame(decay);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [analyser, isPlaying, bars, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="spectrum-canvas"
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
