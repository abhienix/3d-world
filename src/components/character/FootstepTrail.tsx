// ============================================================
// SNEHA WORLD — Princess Footstep Sparkle Trails
// Spawns floating glowing hearts, golden stars, and petals
// behind Sneha's shoes as she walks across the magical world.
// ============================================================

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameStore } from '../../stores/gameStore';

const MAX_PARTICLES = 36;

interface FootstepTrailProps {
  playerRef: React.RefObject<THREE.Group | null>;
}

export function FootstepTrail({ playerRef }: FootstepTrailProps) {
  const keys = useKeyboard();
  const phase = useGameStore((s) => s.phase);

  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const spawnTimer = useRef(0);
  const nextIdx = useRef(0);

  // Particle pool
  const particles = useMemo(() => {
    return Array.from({ length: MAX_PARTICLES }, () => ({
      active: false,
      pos: new THREE.Vector3(),
      life: 0,
      maxLife: 1.2,
      scale: 1,
      rotSpeed: (Math.random() - 0.5) * 4,
      driftX: (Math.random() - 0.5) * 0.4,
      driftZ: (Math.random() - 0.5) * 0.4,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!playerRef.current || !meshRef.current || phase !== 'playing') return;

    const moving = keys.current.forward || keys.current.backward || keys.current.left || keys.current.right;

    // Spawn new sparkle underfoot when walking
    if (moving) {
      spawnTimer.current += delta;
      if (spawnTimer.current > 0.09) {
        spawnTimer.current = 0;
        const p = particles[nextIdx.current];
        const playerPos = playerRef.current.position;

        // Offset slightly behind player's feet
        const offsetAngle = playerRef.current.rotation.y;
        const sideOffset = (Math.random() - 0.5) * 0.4;
        p.pos.set(
          playerPos.x - Math.sin(offsetAngle) * 0.3 + Math.cos(offsetAngle) * sideOffset,
          playerPos.y + 0.08,
          playerPos.z - Math.cos(offsetAngle) * 0.3 - Math.sin(offsetAngle) * sideOffset
        );
        p.active = true;
        p.life = 0;
        p.maxLife = 0.8 + Math.random() * 0.6;
        p.scale = 0.8 + Math.random() * 0.6;

        nextIdx.current = (nextIdx.current + 1) % MAX_PARTICLES;
      }
    }

    // Update all active particles
    let activeCount = 0;
    particles.forEach((p, i) => {
      if (p.active) {
        p.life += delta;
        if (p.life >= p.maxLife) {
          p.active = false;
          dummy.position.set(0, -999, 0);
          dummy.scale.setScalar(0);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        } else {
          activeCount++;
          const progress = p.life / p.maxLife;
          // Float upward and expand then fade
          p.pos.y += delta * 0.6;
          p.pos.x += p.driftX * delta;
          p.pos.z += p.driftZ * delta;

          const size = Math.sin(progress * Math.PI) * p.scale * 0.22;

          dummy.position.copy(p.pos);
          dummy.rotation.y += p.rotSpeed * delta;
          dummy.rotation.z += p.rotSpeed * 0.5 * delta;
          dummy.scale.setScalar(Math.max(0.001, size));
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        }
      } else {
        dummy.position.set(0, -999, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });

    if (activeCount > 0 || moving) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_PARTICLES]}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#FF80AB"
        emissive="#FF1493"
        emissiveIntensity={1.2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}
