// ============================================================
// SNEHA WORLD — App Root + Interaction Dispatcher
// ============================================================

import { useEffect } from 'react';
import { MainScene } from './components/MainScene';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { HUD } from './components/ui/HUD';
import { DebugPanel } from './components/ui/DebugPanel';
import { InteractionPrompt } from './components/interaction/InteractionPrompt';
import { MemoryModal } from './components/ui/MemoryModal';
import { MobileControls } from './components/ui/MobileControls';
import { PhotoBoothModal } from './components/ui/PhotoBoothModal';
import { RomanticMusicPlayer } from './components/audio/RomanticMusicPlayer';
import { useGameStore } from './stores/gameStore';
import './App.css';

// Watches activeInteraction and sets the appropriate game phase
function InteractionDispatcher() {
  const activeInteraction = useGameStore((s) => s.activeInteraction);
  const setPhase = useGameStore((s) => s.setPhase);

  useEffect(() => {
    if (!activeInteraction) return;
    const { type } = activeInteraction.data;
    if (type === 'memory') {
      setPhase('memory');
    }
  }, [activeInteraction, setPhase]);

  return null;
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#1a0a2e' }}>
      {/* 3D Canvas */}
      <MainScene />

      {/* Logic & Audio */}
      <InteractionDispatcher />
      <RomanticMusicPlayer />

      {/* 2D UI Overlays */}
      <LoadingScreen />
      <HUD />
      <MobileControls />
      <InteractionPrompt />
      <MemoryModal />
      <PhotoBoothModal />
      <DebugPanel />
    </div>
  );
}

export default App;
