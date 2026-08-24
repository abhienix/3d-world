// ============================================================
// SNEHA WORLD — Core Type Definitions
// ============================================================

export interface Memory {
  id: string;
  title: string;
  date?: string;
  message: string;
  photoUrl?: string;
  videoUrl?: string;
  discovered: boolean;
  position?: [number, number, number];
}

export interface Collectible {
  id: string;
  name: string;
  description?: string;
  type: 'heart' | 'star' | 'bow' | 'flower' | 'gift' | 'custom';
  position: [number, number, number];
  collected: boolean;
  reward?: string;
  unlocks?: string;
}

export interface OutfitPart {
  id: string;
  label: string;
  modelUrl?: string;
  thumbnail?: string;
}

export interface Outfit {
  id: string;
  name: string;
  description?: string;
  previewColor?: string;
  unlocked?: boolean;
  parts?: OutfitPart[];
  hair?: OutfitPart;
  top?: OutfitPart;
  bottom?: OutfitPart;
  shoes?: OutfitPart;
  accessories?: OutfitPart[];
  thumbnail?: string;
}

export interface InteractionData {
  type:
    | 'memory'
    | 'door'
    | 'wardrobe'
    | 'collectible'
    | 'message'
    | 'music'
    | 'photo'
    | 'portal'
    | 'custom';
  payload?: unknown;
  label?: string;
  prompt?: string;
  title?: string;
  memoryId?: string;
  targetPosition?: [number, number, number];
}

export interface WorldArea {
  id: string;
  name: string;
  description?: string;
  unlocked: boolean;
  position?: [number, number, number];
  centerPosition?: [number, number, number];
  radius?: number;
}

export interface GameProgress {
  memoriesDiscovered: string[];
  collectiblesFound: string[];
  unlockedAreas: string[];
  currentOutfitId: string;
  totalMemories: number;
  totalCollectibles: number;
  visitedAreas: string[];
}

export interface Settings {
  musicVolume: number;
  sfxVolume: number;
  graphicsQuality: 'low' | 'medium' | 'high';
  cameraSensitivity: number;
  showHints: boolean;
  muted: boolean;
}

export interface SnehaProfile {
  name: string;
  nickname?: string;
  favoriteColors: string[];
  favoriteThings: string[];
  favoriteFlower?: string;
  favoriteFood?: string;
  hobbies: string[];
  finalMessage: string;
  accentColor: string;
  secondaryColor: string;
}
