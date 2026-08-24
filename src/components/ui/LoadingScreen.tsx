// ============================================================
// SNEHA WORLD — Loading Screen
// Animated luxury loading screen with auto-entry & tap anywhere
// ============================================================

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export function LoadingScreen() {
  const phase = useGameStore((s) => s.phase);
  const loadingProgress = useGameStore((s) => s.loadingProgress);
  const setPhase = useGameStore((s) => s.setPhase);
  const setLoaded = useGameStore((s) => s.setLoaded);

  const visible = phase === 'loading';
  const autoEnterTimer = useRef<number | null>(null);

  const handleEnter = () => {
    if (autoEnterTimer.current) clearTimeout(autoEnterTimer.current);
    setLoaded(true);
    setPhase('playing');
  };

  // Auto enter after hitting 100%
  useEffect(() => {
    if (loadingProgress >= 100 && phase === 'loading') {
      autoEnterTimer.current = window.setTimeout(() => {
        handleEnter();
      }, 1000);
    }
    return () => {
      if (autoEnterTimer.current) clearTimeout(autoEnterTimer.current);
    };
  }, [loadingProgress, phase]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onClick={loadingProgress >= 100 ? handleEnter : undefined}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a0a1e 0%, #2d0a2e 40%, #1a0510 100%)',
            fontFamily: '"Nunito", "Segoe UI", sans-serif',
            overflow: 'hidden',
            cursor: loadingProgress >= 100 ? 'pointer' : 'default',
          }}
        >
          {/* Bokeh blobs */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[
              { top: '15%', left: '12%', size: 200, color: 'rgba(255,128,171,0.12)' },
              { top: '60%', left: '75%', size: 280, color: 'rgba(206,147,216,0.1)' },
              { top: '80%', left: '20%', size: 160, color: 'rgba(255,180,206,0.08)' },
              { top: '30%', left: '85%', size: 120, color: 'rgba(255,215,0,0.06)' },
            ].map((blob, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: blob.top,
                  left: blob.left,
                  width: blob.size,
                  height: blob.size,
                  borderRadius: '50%',
                  background: blob.color,
                  filter: 'blur(40px)',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>

          {/* Floating sparkles */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${10 + Math.random() * 14}px`,
                  color: ['#FF80AB', '#CE93D8', '#FFD700', '#FFB6C1'][Math.floor(Math.random() * 4)],
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>

          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 20px' }}
          >
            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,128,171,0.4)',
                borderTop: '1.5px solid rgba(255,128,171,0.9)',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: 36 }}
              >
                🌸
              </motion.div>
            </motion.div>

            <motion.h1
              animate={{ textShadow: ['0 0 20px rgba(255,128,171,0.5)', '0 0 40px rgba(255,128,171,0.9)', '0 0 20px rgba(255,128,171,0.5)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: 'clamp(32px, 7vw, 56px)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.12em',
                margin: 0,
                fontFamily: '"Nunito", sans-serif',
              }}
            >
              SNEHA WORLD
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                fontSize: 'clamp(12px, 2.5vw, 15px)',
                color: 'rgba(255,200,220,0.75)',
                letterSpacing: '0.16em',
                marginTop: 10,
                fontStyle: 'italic',
              }}
            >
              Preparing your little universe…
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ width: 'min(300px, 80vw)', marginTop: 45, position: 'relative', zIndex: 1 }}
          >
            <div
              style={{
                height: 4,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 100,
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #FF80AB, #FFD700)',
                  borderRadius: 100,
                  boxShadow: '0 0 12px rgba(255,128,171,0.8)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <div
              style={{
                marginTop: 12,
                textAlign: 'center',
                fontSize: 12,
                color: 'rgba(255,200,220,0.7)',
                letterSpacing: '0.15em',
              }}
            >
              {loadingProgress < 100 ? `${Math.round(loadingProgress)}%` : 'Ready! Tap to enter ✦'}
            </div>
          </motion.div>

          {/* Enter button */}
          <AnimatePresence>
            {loadingProgress >= 100 && (
              <motion.button
                key="enter-btn"
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnter();
                }}
                style={{
                  marginTop: 32,
                  padding: '14px 40px',
                  background: 'linear-gradient(135deg, #FF80AB, #CE93D8)',
                  border: '2px solid rgba(255,255,255,0.6)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  fontFamily: '"Nunito", sans-serif',
                  boxShadow: '0 8px 32px rgba(255,128,171,0.6)',
                  position: 'relative',
                  zIndex: 2,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                ENTER SNEHA WORLD ✦
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
