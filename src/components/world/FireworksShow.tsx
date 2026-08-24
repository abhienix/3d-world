// ============================================================
// SNEHA WORLD — Interactive Heart Fireworks Spectacular
// Launches rockets from the ground exploding into glowing pink hearts!
// ============================================================

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';

const SHELL_COUNT = 3;
const PARTICLES_PER_SHELL = 40;
const TOTAL_PARTICLES = SHELL_COUNT * PARTICLES_PER_SHELL;

interface FireworkParticle {
  active: boolean;
  phase: 'rising' | 'exploding';
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export function FireworksShow() {
  const fireworksTrigger = useGameStore((s) => s.fireworksTrigger);
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-allocated particle pool
  const particles = useMemo<FireworkParticle[]>(() => {
    const list: FireworkParticle[] = [];
    const COLORS = ['#FF1493', '#FFD700', '#FF80AB', '#CE93D8', '#FF4081', '#00E5FF'];

    for (let shell = 0; shell < SHELL_COUNT; shell++) {
      for (let i = 0; i < PARTICLES_PER_SHELL; i++) {
        const angle = (i / PARTICLES_PER_SHELL) * Math.PI * 2;
        // Heart mathematical curve
        const hx = 16 * Math.pow(Math.sin(angle), 3);
        const hy = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

        list.push({
          active: false,
          phase: 'rising',
          pos: new THREE.Vector3(0, -999, 0),
          vel: new THREE.Vector3(hx * 0.28, hy * 0.28 + 1.2, (Math.random() - 0.5) * 3),
          life: 0,
          maxLife: 2.2,
          color: COLORS[(shell * 2 + i) % COLORS.length],
          size: 0.9 + Math.random() * 0.6,
        });
      }
    }
    return list;
  }, []);

  const flashLightRef = useRef<THREE.PointLight>(null!);

  // Launch fireworks
  useEffect(() => {
    if (fireworksTrigger === 0) return;

    // Launch locations near the center plaza & house
    const launchTargets = [
      new THREE.Vector3(0, 11, -8),
      new THREE.Vector3(-8, 12, -2),
      new THREE.Vector3(8, 13, -2),
    ];

    particles.forEach((p, idx) => {
      const shellIdx = Math.floor(idx / PARTICLES_PER_SHELL);
      const target = launchTargets[shellIdx % launchTargets.length];

      p.active = true;
      p.phase = 'exploding';
      p.pos.copy(target).add(new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5));
      p.life = 0;
      p.maxLife = 1.8 + Math.random() * 0.6;
    });

    if (flashLightRef.current) {
      flashLightRef.current.intensity = 5;
    }
  }, [fireworksTrigger, particles]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Prevent frustum culling from hiding fireworks
    meshRef.current.frustumCulled = false;

    let hasActive = false;

    particles.forEach((p, i) => {
      if (p.active) {
        hasActive = true;
        p.life += delta;

        if (p.life >= p.maxLife) {
          p.active = false;
          dummy.position.set(0, -999, 0);
          dummy.scale.setScalar(0);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        } else {
          const progress = p.life / p.maxLife;

          // Expand outward and gently drift down
          p.pos.x += p.vel.x * delta * (1 - progress * 0.4);
          p.pos.y += p.vel.y * delta * (1 - progress * 0.4) - delta * 2.2; // gravity
          p.pos.z += p.vel.z * delta * (1 - progress * 0.4);

          // Pulse size
          const scale = Math.sin(progress * Math.PI) * p.size * 0.45;

          dummy.position.copy(p.pos);
          dummy.rotation.x += delta * 5;
          dummy.rotation.y += delta * 4;
          dummy.scale.setScalar(Math.max(0.001, scale));
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

    if (hasActive) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (flashLightRef.current && flashLightRef.current.intensity > 0) {
      flashLightRef.current.intensity = Math.max(0, flashLightRef.current.intensity - delta * 3.5);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL_PARTICLES]} frustumCulled={false}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FF1493"
          emissiveIntensity={3.5}
          roughness={0.1}
          metalness={0.9}
        />
      </instancedMesh>
      <pointLight ref={flashLightRef} position={[0, 12, -4]} color="#FF80AB" intensity={0} distance={30} decay={2} />
    </group>
  );
}
