// ============================================================
// SNEHA WORLD — Global Game State (Zustand)
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameProgress, Settings, Memory, Collectible, InteractionData } from '../types';
import { memories as initialMemories, collectibles as initialCollectibles } from '../data/sneha';

type GamePhase = 'loading' | 'title' | 'playing' | 'memory' | 'cinematic' | 'photomode' | 'dressup' | 'settings' | 'minigame';

interface ActiveInteraction {
  data: InteractionData;
  objectId: string;
}

interface GameState {
  // Phase
  phase: GamePhase;
  setPhase: (p: GamePhase) => void;

  // Loading
  loadingProgress: number;
  setLoadingProgress: (v: number) => void;
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;

  // Progress
  progress: GameProgress;
  discoverMemory: (id: string) => void;
  collectItem: (id: string) => void;
  unlockArea: (id: string) => void;
  visitArea: (id: string) => void;
  setOutfit: (id: string) => void;

  // Live memory/collectible objects (with discovered/collected state)
  memories: Memory[];
  collectibles: Collectible[];

  // Current interaction
  activeInteraction: ActiveInteraction | null;
  setActiveInteraction: (i: ActiveInteraction | null) => void;

  // Nearby interactable (shows prompt)
  nearbyInteractableId: string | null;
  setNearbyInteractable: (id: string | null) => void;

  // Settings
  settings: Settings;
  updateSettings: (s: Partial<Settings>) => void;

  // Debug
  debugMode: boolean;
  toggleDebug: () => void;

  // UI visibility
  showHUD: boolean;
  setShowHUD: (v: boolean) => void;

  // Atmosphere & WOW Features
  timeOfDay: 'day' | 'sunset' | 'night';
  setTimeOfDay: (t: 'day' | 'sunset' | 'night') => void;
  fireworksTrigger: number;
  triggerFireworks: () => void;
  photoModeActive: boolean;
  setPhotoModeActive: (v: boolean) => void;

  // Reset
  resetProgress: () => void;
}

const defaultProgress: GameProgress = {
  memoriesDiscovered: [],
  collectiblesFound: [],
  unlockedAreas: ['plaza', 'dreamhouse', 'garden', 'dressing', 'collectibles'],
  currentOutfitId: 'outfit-default',
  totalMemories: initialMemories.length,
  totalCollectibles: initialCollectibles.length,
  visitedAreas: [],
};

const defaultSettings: Settings = {
  musicVolume: 0.4,
  sfxVolume: 0.6,
  graphicsQuality: 'high',
  cameraSensitivity: 1.0,
  showHints: true,
  muted: false,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: 'loading',
      setPhase: (p) => set({ phase: p }),

      loadingProgress: 0,
      setLoadingProgress: (v) => set({ loadingProgress: v }),
      isLoaded: false,
      setLoaded: (v) => set({ isLoaded: v }),

      progress: defaultProgress,

      memories: initialMemories.map((m) => ({ ...m })),
      collectibles: initialCollectibles.map((c) => ({ ...c })),

      discoverMemory: (id) => {
        const { progress, memories } = get();
        if (progress.memoriesDiscovered.includes(id)) return;
        set({
          progress: {
            ...progress,
            memoriesDiscovered: [...progress.memoriesDiscovered, id],
          },
          memories: memories.map((m) => (m.id === id ? { ...m, discovered: true } : m)),
        });
      },

      collectItem: (id) => {
        const { progress, collectibles } = get();
        if (progress.collectiblesFound.includes(id)) return;
        set({
          progress: {
            ...progress,
            collectiblesFound: [...progress.collectiblesFound, id],
          },
          collectibles: collectibles.map((c) => (c.id === id ? { ...c, collected: true } : c)),
        });
      },

      unlockArea: (id) => {
        const { progress } = get();
        if (progress.unlockedAreas.includes(id)) return;
        set({ progress: { ...progress, unlockedAreas: [...progress.unlockedAreas, id] } });
      },

      visitArea: (id) => {
        const { progress } = get();
        if (progress.visitedAreas.includes(id)) return;
        set({ progress: { ...progress, visitedAreas: [...progress.visitedAreas, id] } });
      },

      setOutfit: (id) => {
        const { progress } = get();
        set({ progress: { ...progress, currentOutfitId: id } });
      },

      activeInteraction: null,
      setActiveInteraction: (i) => set({ activeInteraction: i }),

      nearbyInteractableId: null,
      setNearbyInteractable: (id) => set({ nearbyInteractableId: id }),

      settings: defaultSettings,
      updateSettings: (s) => set({ settings: { ...get().settings, ...s } }),

      debugMode: false,
      toggleDebug: () => set({ debugMode: !get().debugMode }),

      showHUD: true,
      setShowHUD: (v) => set({ showHUD: v }),

      timeOfDay: 'sunset',
      setTimeOfDay: (t) => set({ timeOfDay: t }),

      fireworksTrigger: 0,
      triggerFireworks: () => set((s) => ({ fireworksTrigger: s.fireworksTrigger + 1 })),

      photoModeActive: false,
      setPhotoModeActive: (v) => set({ photoModeActive: v }),

      resetProgress: () => {
        set({
          progress: defaultProgress,
          memories: initialMemories.map((m) => ({ ...m })),
          collectibles: initialCollectibles.map((c) => ({ ...c })),
        });
      },
    }),
    {
      name: 'sneha-world-save',
      partialize: (state) => ({
        progress: state.progress,
        settings: state.settings,
        memories: state.memories,
        collectibles: state.collectibles,
      }),
    }
  )
);
