// ============================================================
// SNEHA WORLD — Clean Cinematic HUD
// Atmosphere switcher, fireworks, photo mode, audio toggle.
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { playCelebrationBurst } from '../audio/RomanticMusicPlayer';

export function HUD() {
  const showHUD = useGameStore((s) => s.showHUD);
  const phase = useGameStore((s) => s.phase);
  const settings = useGameStore((s) => s.settings);
  const updateSettings = useGameStore((s) => s.updateSettings);

  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const setTimeOfDay = useGameStore((s) => s.setTimeOfDay);
  const triggerFireworks = useGameStore((s) => s.triggerFireworks);
  const photoModeActive = useGameStore((s) => s.photoModeActive);
  const setPhotoModeActive = useGameStore((s) => s.setPhotoModeActive);

  const visible = showHUD && phase === 'playing' && !photoModeActive;

  const nextMood = () => {
    const modes: ('day' | 'sunset' | 'night')[] = ['day', 'sunset', 'night'];
    const currentIdx = modes.indexOf(timeOfDay);
    const next = modes[(currentIdx + 1) % modes.length];
    setTimeOfDay(next);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 50,
            fontFamily: '"Nunito", "Segoe UI", sans-serif',
          }}
        >
          {/* ── Top Left: Title & Action Controls ── */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'flex-start',
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(17px, 3.8vw, 21px)',
                fontWeight: 900,
                color: '#FFFFFF',
                textShadow: '0 2px 14px rgba(255,20,147,0.9), 0 0 25px rgba(255,128,171,0.7)',
                letterSpacing: '0.08em',
                pointerEvents: 'none',
              }}
            >
              ✦ SNEHA WORLD
            </div>

            {/* WOW Action Buttons Bar */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {/* Mood Switcher Button */}
              <button
                onClick={nextMood}
                style={{
                  background: timeOfDay === 'night'
                    ? 'linear-gradient(135deg, #4A148C, #1A237E)'
                    : timeOfDay === 'day'
                    ? 'linear-gradient(135deg, #0288D1, #FF80AB)'
                    : 'linear-gradient(135deg, #E65100, #C2185B)',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  borderRadius: '24px',
                  padding: '6px 14px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.35)',
                }}
              >
                <span>{timeOfDay === 'day' ? '☀️ Day' : timeOfDay === 'sunset' ? '🌅 Sunset' : '🌌 Night'}</span>
              </button>

              {/* Heart Fireworks Button */}
              <button
                onClick={() => {
                  triggerFireworks();
                  playCelebrationBurst();
                }}
                style={{
                  background: 'linear-gradient(135deg, #FF1493, #FFD700)',
                  border: '1.5px solid #FFFFFF',
                  borderRadius: '24px',
                  padding: '6px 14px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  boxShadow: '0 4px 18px rgba(255,20,147,0.6)',
                }}
              >
                <span>🎆</span>
                <span>Fireworks!</span>
              </button>

              {/* Photo Mode Button */}
              <button
                onClick={() => setPhotoModeActive(true)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(255,255,255,0.6)',
                  borderRadius: '24px',
                  padding: '6px 14px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}
              >
                <span>📸</span>
                <span>Polaroid</span>
              </button>
            </div>
          </div>

          {/* ── Top Right: Subtle Sound Mute ── */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={() => updateSettings({ muted: !settings.muted })}
              style={{
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: '50%',
                width: 38,
                height: 38,
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              }}
            >
              {settings.muted ? '🔇' : '🎵'}
            </button>
          </div>

          {/* ── Desktop Controls Hint ── */}
          <ControlsHint />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ControlsHint() {
  const isTouch = typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth <= 900);
  if (isTouch) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        background: 'rgba(20, 5, 30, 0.65)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '14px',
        padding: '8px 14px',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '11px',
        lineHeight: '1.6',
        fontFamily: '"Nunito", sans-serif',
        pointerEvents: 'none',
      }}
    >
      <div><kbd style={kbdStyle}>WASD</kbd> Move &nbsp; <kbd style={kbdStyle}>E</kbd> Interact &nbsp; <kbd style={kbdStyle}>Shift</kbd> Run</div>
      <div style={{ marginTop: 2 }}><span style={{ opacity: 0.7 }}>Click to look around</span></div>
    </motion.div>
  );
}

const kbdStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.2)',
  border: '1px solid rgba(255,255,255,0.4)',
  borderRadius: '5px',
  padding: '1px 5px',
  fontSize: '10px',
  fontFamily: 'monospace',
};
