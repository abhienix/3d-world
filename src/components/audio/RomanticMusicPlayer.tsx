// ============================================================
// SNEHA WORLD — Synthesized Romantic Music & Chime Engine
// 100% reliable Web Audio API ambient harp & chord generator.
// ============================================================

import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';

export function playCelebrationBurst() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.3);
      }, i * 120);
    });
  } catch {
    // Graceful fallback
  }
}

export function RomanticMusicPlayer() {
  const settings = useGameStore((s) => s.settings);
  const phase = useGameStore((s) => s.phase);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (settings.muted || phase !== 'playing') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isPlayingRef.current = false;
      return;
    }

    if (!isPlayingRef.current && phase === 'playing' && !settings.muted) {
      isPlayingRef.current = true;

      // Romantic pentatonic chord notes (C Major / A Minor celestial vibe)
      const NOTES = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

      const playDreamChime = () => {
        try {
          if (!audioCtxRef.current) {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            audioCtxRef.current = new AudioCtx();
          }

          const ctx = audioCtxRef.current;
          if (ctx.state === 'suspended') {
            ctx.resume();
          }

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          const note = NOTES[Math.floor(Math.random() * NOTES.length)];
          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.03 * settings.musicVolume, ctx.currentTime + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.6);
        } catch {
          // Audio autoplay policy handled gracefully
        }
      };

      intervalRef.current = window.setInterval(() => {
        playDreamChime();
        if (Math.random() > 0.4) {
          setTimeout(playDreamChime, 250);
        }
      }, 1600);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isPlayingRef.current = false;
    };
  }, [settings.muted, settings.musicVolume, phase]);

  return null;
}
