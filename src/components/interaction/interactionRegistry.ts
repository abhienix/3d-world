// ============================================================
// SNEHA WORLD — Interaction Registry
// Separate module to avoid HMR invalidation.
// ============================================================

import * as THREE from 'three';
import type { InteractionData } from '../../types';

export interface RegistryEntry {
  position: THREE.Vector3;
  data: InteractionData;
  radius: number;
}

// Global registry of interactable objects in the scene
export const interactableRegistry = new Map<string, RegistryEntry>();
