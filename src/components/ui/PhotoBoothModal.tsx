// ============================================================
// SNEHA WORLD — Luxury Barbie Polaroid Photo Mode
// Clean, centered Polaroid frame with sticker decor & controls.
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { playCelebrationBurst } from '../audio/RomanticMusicPlayer';

export function PhotoBoothModal() {
  const photoModeActive = useGameStore((s) => s.photoModeActive);
  const setPhotoModeActive = useGameStore((s) => s.setPhotoModeActive);
  const triggerFireworks = useGameStore((s) => s.triggerFireworks);
  const [flash, setFlash] = useState(false);

  if (!photoModeActive) return null;

  const handleSnap = () => {
    setFlash(true);
    playCelebrationBurst();
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 400,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 12px',
          fontFamily: '"Nunito", "Segoe UI", sans-serif',
        }}
      >
        {/* Camera Flash Screen Animation */}
        {flash && (
          <motion.div
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#FFFFFF',
              zIndex: 999,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Top Control Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            pointerEvents: 'auto',
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: 'rgba(20, 5, 30, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255, 128, 171, 0.6)',
              borderRadius: 100,
              padding: '6px 18px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>📸</span>
            <span>BARBIE POLAROID MODE</span>
          </div>

          <button
            onClick={() => setPhotoModeActive(false)}
            style={{
              background: 'linear-gradient(135deg, #FF1493, #E91E63)',
              border: '1.5px solid #FFF',
              borderRadius: 100,
              padding: '6px 18px',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 20, 147, 0.6)',
            }}
          >
            ✕ Exit
          </button>
        </motion.div>

        {/* Vintage Polaroid Frame Window */}
        <div
          style={{
            width: 'min(92vw, 840px)',
            height: 'min(68vh, 560px)',
            border: '12px solid #FFFFFF',
            borderBottom: '70px solid #FFFFFF',
            borderRadius: 12,
            boxShadow: '0 0 0 9999px rgba(10, 0, 18, 0.45), 0 20px 60px rgba(0, 0, 0, 0.6)',
            position: 'relative',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {/* Handwritten Polaroid Bottom Text */}
          <div
            style={{
              position: 'absolute',
              bottom: -54,
              fontFamily: '"Pacifico", cursive, sans-serif',
              fontSize: 'clamp(15px, 3.5vw, 22px)',
              color: '#FF1493',
              letterSpacing: '0.04em',
              textShadow: '0 1px 2px rgba(255,20,147,0.2)',
            }}
          >
            Sneha & Abhi · Forever & Always ♡
          </div>

          {/* Decorative Corner Stickers */}
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 22 }}>🌸</div>
          <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 22 }}>👑</div>
          <div style={{ position: 'absolute', bottom: 10, left: 10, fontSize: 20 }}>✨</div>
          <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 20 }}>💖</div>
        </div>

        {/* Bottom Actions Bar (Placed Below Polaroid Frame) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex',
            gap: 12,
            pointerEvents: 'auto',
            zIndex: 10,
          }}
        >
          <button
            onClick={handleSnap}
            style={{
              background: 'linear-gradient(135deg, #FFFFFF, #FFE4E1)',
              border: '2px solid #FF1493',
              borderRadius: 100,
              padding: '9px 24px',
              color: '#D81B60',
              fontWeight: 900,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📸</span>
            <span>Snap Photo</span>
          </button>

          <button
            onClick={() => {
              triggerFireworks();
              playCelebrationBurst();
            }}
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA000)',
              border: '2px solid #FFF',
              borderRadius: 100,
              padding: '9px 22px',
              color: '#3E1500',
              fontWeight: 900,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>🎆</span>
            <span>Launch Fireworks</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
