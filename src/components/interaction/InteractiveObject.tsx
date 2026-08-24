// ============================================================
// SNEHA WORLD — Interaction System
//
// Architecture:
//   <InteractiveObject> — wraps any 3D mesh with interaction data.
//   <InteractionManager> — proximity detection + E key trigger.
// ============================================================

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import type { InteractionData } from '../../types';
import { interactableRegistry } from './interactionRegistry';

// ── InteractiveObject ────────────────────────────────────────

interface InteractiveObjectProps {
  id: string;
  data: InteractionData;
  position: [number, number, number];
  radius?: number;
  children?: React.ReactNode;
}

export function InteractiveObject({
  id,
  data,
  position,
  radius = 2.5,
  children,
}: InteractiveObjectProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    const pos = new THREE.Vector3(...position);
    interactableRegistry.set(id, { position: pos, data, radius });
    return () => {
      interactableRegistry.delete(id);
    };
  }, [id, data, position, radius]);

  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

// ── InteractionManager ───────────────────────────────────────

interface InteractionManagerProps {
  playerRef: React.RefObject<THREE.Group | null>;
}

export function InteractionManager({ playerRef }: InteractionManagerProps) {
  const { setNearbyInteractable, setActiveInteraction, nearbyInteractableId, phase } =
    useGameStore();

  const interactPressed = useRef(false);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e') interactPressed.current = true;
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e') interactPressed.current = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  useFrame(() => {
    // Only scan when in playing phase
    if (!playerRef.current || phase !== 'playing') {
      if (phase !== 'playing') setNearbyInteractable(null);
      return;
    }

    const playerPos = playerRef.current.position;
    let closestId: string | null = null;
    let closestDist = Infinity;

    for (const [id, entry] of interactableRegistry) {
      const dist = playerPos.distanceTo(entry.position);
      if (dist < entry.radius && dist < closestDist) {
        closestDist = dist;
        closestId = id;
      }
    }

    setNearbyInteractable(closestId);

    if (interactPressed.current && closestId) {
      interactPressed.current = false;
      const entry = interactableRegistry.get(closestId);
      if (entry) {
        if (entry.data.targetPosition && playerRef.current) {
          playerRef.current.position.set(...entry.data.targetPosition);
        } else {
          setActiveInteraction({ data: entry.data, objectId: closestId });
        }
      }
    }
  });

  return null;
}
