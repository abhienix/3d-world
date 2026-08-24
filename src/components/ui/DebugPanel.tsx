// ============================================================
// SNEHA WORLD — Debug Panel (DEV ONLY — press ` to toggle)
// ============================================================

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export function DebugPanel() {
  const debugMode = useGameStore((s) => s.debugMode);
  const toggleDebug = useGameStore((s) => s.toggleDebug);
  const phase = useGameStore((s) => s.phase);
  const setPhase = useGameStore((s) => s.setPhase);
  const progress = useGameStore((s) => s.progress);
  const unlockArea = useGameStore((s) => s.unlockArea);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const discoverMemory = useGameStore((s) => s.discoverMemory);
  const collectItem = useGameStore((s) => s.collectItem);
  const memories = useGameStore((s) => s.memories);
  const collectibles = useGameStore((s) => s.collectibles);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`') toggleDebug();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleDebug]);

  // Only render in dev
  if (!import.meta.env.DEV) return null;

  return (
    <AnimatePresence>
      {debugMode && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          style={{
            position: 'fixed',
            top: 80,
            right: 16,
            width: 260,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,128,171,0.3)',
            borderRadius: 12,
            padding: 16,
            zIndex: 9000,
            fontFamily: 'monospace',
            fontSize: 12,
            color: '#fff',
            pointerEvents: 'auto',
            userSelect: 'none',
          }}
        >
          <div style={{ color: '#FF80AB', fontWeight: 700, marginBottom: 12, letterSpacing: '0.1em' }}>
            🛠 DEBUG MODE
          </div>

          <DebugRow label="Phase" value={phase} />
          <DebugRow label="Memories found" value={`${progress.memoriesDiscovered.length} / ${progress.totalMemories}`} />
          <DebugRow label="Collectibles" value={`${progress.collectiblesFound.length} / ${progress.totalCollectibles}`} />

          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />

          <DebugBtn label="Unlock all areas" onClick={() => {
            ['plaza','dreamhouse','garden','dressing','collectibles','secret'].forEach(unlockArea);
          }} />
          <DebugBtn label="Discover all memories" onClick={() => {
            memories.forEach((m) => discoverMemory(m.id));
          }} />
          <DebugBtn label="Collect all items" onClick={() => {
            collectibles.forEach((c) => collectItem(c.id));
          }} />
          <DebugBtn label="Set phase → loading" onClick={() => setPhase('loading')} />
          <DebugBtn label="Set phase → playing" onClick={() => setPhase('playing')} />
          <DebugBtn label="Reset all progress" onClick={resetProgress} color="#FF5252" />

          <div style={{ marginTop: 10, opacity: 0.4, fontSize: 10 }}>
            Press ` to toggle. Dev only.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DebugRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ opacity: 0.6 }}>{label}</span>
      <span style={{ color: '#CE93D8' }}>{value}</span>
    </div>
  );
}

function DebugBtn({
  label,
  onClick,
  color = '#FF80AB',
}: {
  label: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        marginBottom: 5,
        padding: '5px 10px',
        background: 'rgba(255,255,255,0.07)',
        border: `1px solid ${color}44`,
        borderRadius: 6,
        color,
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: 11,
        textAlign: 'left',
        transition: 'background 0.15s',
      }}
    >
      {label}
    </button>
  );
}
