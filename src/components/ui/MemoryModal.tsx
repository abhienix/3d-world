// ============================================================
// SNEHA WORLD — Memory Modal
// Beautiful fullscreen modal when a memory is discovered.
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { memories } from '../../data/sneha';
import type { Memory } from '../../types';

export function MemoryModal() {
  const activeInteraction = useGameStore((s) => s.activeInteraction);
  const setActiveInteraction = useGameStore((s) => s.setActiveInteraction);
  const setPhase = useGameStore((s) => s.setPhase);
  const discoverMemory = useGameStore((s) => s.discoverMemory);

  // Find which memory this is
  const memoryId =
    activeInteraction?.data.type === 'memory'
      ? (activeInteraction.data.payload as string)
      : null;

  const memory = memoryId ? memories.find((m) => m.id === memoryId) ?? null : null;

  const handleClose = () => {
    if (memoryId) discoverMemory(memoryId);
    setActiveInteraction(null);
    setPhase('playing');
  };

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          key="memory-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Nunito", "Segoe UI", sans-serif',
            padding: '20px',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10, 0, 20, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(145deg, rgba(30,10,40,0.98) 0%, rgba(20,5,30,0.98) 100%)',
              border: '1px solid rgba(255,128,171,0.25)',
              borderRadius: 24,
              maxWidth: 520,
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,128,171,0.08)',
            }}
          >
            {/* Memory label */}
            <div style={{
              position: 'absolute',
              top: 20,
              left: 24,
              fontSize: 10,
              letterSpacing: '0.2em',
              color: 'rgba(255,128,171,0.7)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              ✦ Memory Unlocked
            </div>

            {/* Photo */}
            {memory.photoUrl && (
              <div style={{ position: 'relative' }}>
                <img
                  src={memory.photoUrl}
                  alt={memory.title}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  style={{
                    width: '100%',
                    maxHeight: 320,
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* Photo fade overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  background: 'linear-gradient(to bottom, transparent, rgba(20,5,30,0.98))',
                }} />
              </div>
            )}

            {/* Content */}
            <div style={{ padding: memory.photoUrl ? '8px 28px 28px' : '52px 28px 28px' }}>
              {/* Date badge */}
              {memory.date && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: 'inline-block',
                    background: 'rgba(255,128,171,0.15)',
                    border: '1px solid rgba(255,128,171,0.3)',
                    borderRadius: '100px',
                    padding: '4px 14px',
                    fontSize: 12,
                    color: '#FF80AB',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    marginBottom: 12,
                  }}
                >
                  📅 {memory.date}
                </motion.div>
              )}

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: 'clamp(18px, 4vw, 22px)',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '0 0 12px',
                  lineHeight: 1.3,
                }}
              >
                {memory.title}
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{
                  fontSize: 15,
                  color: 'rgba(255,220,230,0.8)',
                  lineHeight: 1.7,
                  margin: '0 0 24px',
                  fontStyle: 'italic',
                }}
              >
                "{memory.message}"
              </motion.p>

              {/* Sparkle row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  display: 'flex',
                  gap: 4,
                  marginBottom: 20,
                  color: '#FFD700',
                  fontSize: 16,
                }}
              >
                {['✦', '✦', '✦', '✦', '✦'].map((s, i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClose}
                style={{
                  width: '100%',
                  padding: '13px',
                  background: 'linear-gradient(135deg, #FF80AB, #CE93D8)',
                  border: 'none',
                  borderRadius: 14,
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  fontFamily: '"Nunito", sans-serif',
                  boxShadow: '0 4px 20px rgba(255,128,171,0.35)',
                }}
              >
                Keep exploring ✦
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
