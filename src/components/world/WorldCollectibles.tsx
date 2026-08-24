// ============================================================
// SNEHA WORLD — Interactive Collectibles System
// 8 glowing collectible gems & items scattered throughout the world
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { InteractiveObject } from '../interaction/InteractiveObject';
import { playCelebrationBurst } from '../audio/RomanticMusicPlayer';

export function WorldCollectibles() {
  const collectibles = useGameStore((s) => s.collectibles);
  const collectItem = useGameStore((s) => s.collectItem);

  return (
    <group name="world-collectibles">
      {collectibles.map((item) => {
        if (item.collected) return null;
        return (
          <CollectibleItem
            key={item.id}
            item={item}
            onCollect={() => {
              collectItem(item.id);
              playCelebrationBurst();
            }}
          />
        );
      })}
    </group>
  );
}

function CollectibleItem({
  item,
  onCollect,
}: {
  item: { id: string; name: string; position: [number, number, number]; type: string };
  onCollect: () => void;
}) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 2.5;
      ref.current.position.y = item.position[1] + Math.sin(s.clock.elapsedTime * 3) * 0.18;
    }
  });

  const COLOR = item.type === 'heart' ? '#FF1493' : item.type === 'star' ? '#FFD700' : '#80DEEA';

  return (
    <group position={item.position}>
      <group ref={ref}>
        {/* Diamond Octahedron Crystal */}
        <mesh castShadow>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial
            color={COLOR}
            emissive={COLOR}
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Sparkle Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.55, 0.02, 6, 20]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} roughness={0} />
        </mesh>

        {/* Glow Light */}
        <pointLight color={COLOR} intensity={1.5} distance={5} decay={2} />
      </group>

      {/* Interactive Proximity Trigger */}
      <InteractiveObject
        id={item.id}
        position={item.position}
        radius={1.8}
        data={{
          type: 'custom',
          title: `💎 Collect ${item.name}`,
        }}
      />
    </group>
  );
}
