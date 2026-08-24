// ============================================================
// SNEHA WORLD — Interaction Prompt (floating E-to-interact UI)
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export function InteractionPrompt() {
  const nearbyInteractableId = useGameStore((s) => s.nearbyInteractableId);
  const phase = useGameStore((s) => s.phase);

  const visible = !!nearbyInteractableId && phase === 'playing';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="interaction-prompt"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: '28%',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '100px',
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#fff',
              fontFamily: '"Nunito", "Segoe UI", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              boxShadow: '0 4px 20px rgba(255, 128, 171, 0.3)',
            }}
          >
            <span
              style={{
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '8px',
                padding: '2px 9px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              E
            </span>
            <span>Interact</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
