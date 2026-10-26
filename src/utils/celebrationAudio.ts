/**
 * Web Audio API based festive sound synthesizer.
 * Generates celebratory fanfare chords and champagne pop sounds directly in the browser
 * with 0 network latency and 0 asset dependencies.
 */

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!sharedAudioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        sharedAudioCtx = new AudioCtx();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Plays a cheerful celebratory fanfare arpeggio (C-major / F-major brass/chime tones).
 */
export function playCelebrationFanfare(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Joyful ascending fanfare notes: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50), E6 (1318.51)
  const notes = [
    { freq: 523.25, start: 0.0, dur: 0.18, vol: 0.15 },
    { freq: 659.25, start: 0.14, dur: 0.18, vol: 0.16 },
    { freq: 783.99, start: 0.28, dur: 0.22, vol: 0.18 },
    { freq: 1046.5, start: 0.44, dur: 0.6, vol: 0.22 },
    { freq: 1318.51, start: 0.52, dur: 0.75, vol: 0.18 },
  ];

  notes.forEach(({ freq, start, dur, vol }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + start);

    gain.gain.setValueAtTime(0.001, now + start);
    gain.gain.exponentialRampToValueAtTime(vol, now + start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + start);
    osc.stop(now + start + dur);
  });
}

/**
 * Plays a celebratory champagne cork pop + gentle sparkling chimes.
 */
export function playChampagneToastSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Cork Pop (pitch drop filter pulse)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);

  // 2. Sparkling glass chimes (clink sparkle)
  const sparkles = [1567.98, 2093.0, 2637.02];
  sparkles.forEach((freq, index) => {
    const sOsc = ctx.createOscillator();
    const sGain = ctx.createGain();

    sOsc.type = 'sine';
    sOsc.frequency.setValueAtTime(freq, now + 0.08 + index * 0.04);

    sGain.gain.setValueAtTime(0.001, now + 0.08 + index * 0.04);
    sGain.gain.exponentialRampToValueAtTime(0.08, now + 0.1 + index * 0.04);
    sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5 + index * 0.04);

    sOsc.connect(sGain);
    sGain.connect(ctx.destination);

    sOsc.start(now + 0.08 + index * 0.04);
    sOsc.stop(now + 0.55 + index * 0.04);
  });
}
