import { useRef, useState } from 'react';
import { useEffect } from 'react';
import type { RefObject } from 'react';

interface AudioNodes {
  ctx: AudioContext;
  analyser: AnalyserNode;
}

// WeakMap prevents double-wiring the same audio element (StrictMode-safe)
const nodeCache = new WeakMap<HTMLAudioElement, AudioNodes>();

interface UseAudioAnalyserOptions {
  fftSize?: number;
  smoothing?: number;
}

interface UseAudioAnalyserResult {
  analyser: AnalyserNode | null;
  ensureStarted: () => Promise<void>;
}

function createAudioContext(): AudioContext | null {
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  return new Ctor();
}

export function useAudioAnalyser(
  audioRef: RefObject<HTMLAudioElement | null>,
  options?: UseAudioAnalyserOptions,
): UseAudioAnalyserResult {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reuse cached nodes if this audio element was already wired (StrictMode remount)
    const cached = nodeCache.get(audio);
    if (cached) {
      ctxRef.current = cached.ctx;
      setAnalyser(cached.analyser);
      return;
    }

    const ctx = createAudioContext();
    if (!ctx) return;

    const node = ctx.createAnalyser();
    node.fftSize = options?.fftSize ?? 256;
    node.smoothingTimeConstant = options?.smoothing ?? 0.8;

    const source = ctx.createMediaElementSource(audio);
    source.connect(node);
    node.connect(ctx.destination);

    const nodes: AudioNodes = { ctx, analyser: node };
    nodeCache.set(audio, nodes);
    ctxRef.current = ctx;
    setAnalyser(node);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ensureStarted = async (): Promise<void> => {
    if (ctxRef.current?.state === 'suspended') {
      await ctxRef.current.resume();
    }
  };

  return { analyser, ensureStarted };
}
