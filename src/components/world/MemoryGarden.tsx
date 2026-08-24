// ============================================================
// SNEHA WORLD — Memory Garden
// Magical garden with glowing memory flowers.
// Each flower holds one of Sneha's real memories.
// ============================================================

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InteractiveObject } from '../interaction/InteractiveObject';
import { useGameStore } from '../../stores/gameStore';
import { memories } from '../../data/sneha';

export function MemoryGarden() {
  return (
    <group name="memory-garden" position={[0, 0, 22]}>
      {/* Garden ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <circleGeometry args={[14, 48]} />
        <meshStandardMaterial color="#D4E8B0" roughness={0.8} />
      </mesh>

      {/* Garden border ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <ringGeometry args={[13.5, 14, 48]} />
        <meshStandardMaterial color="#A5D6A7" roughness={0.7} />
      </mesh>

      {/* Garden entrance arch */}
      <GardenArch />

      {/* Memory flowers */}
      {memories.map((memory, i) => (
        <MemoryFlower key={memory.id} memory={memory} index={i} />
      ))}

      {/* Decorative non-memory flowers */}
      <DecorativeGardenFlowers />

      {/* Garden bench */}
      <Bench position={[5, 0, 3]} />
      <Bench position={[-5, 0, 3]} rotation={[0, Math.PI, 0]} />

      {/* Butterfly particles */}
      <GardenButterflies />

      {/* Soft garden lighting */}
      <pointLight position={[0, 4, 0]} color="#C8E6C9" intensity={1.5} distance={20} decay={2} />
      <pointLight position={[6, 2, 6]} color="#FFE0B2" intensity={0.8} distance={10} decay={2} />
      <pointLight position={[-6, 2, -4]} color="#F8BBD0" intensity={0.8} distance={10} decay={2} />
    </group>
  );
}

// ── Memory Flower ────────────────────────────────────────────

const MEMORY_COLORS = [
  '#FF80AB', // pink — The Beginning
  '#CE93D8', // lavender — Rangoli Artist
  '#FFD700', // gold — Golden Day
  '#FF7043', // deep orange — Celebrations
  '#64B5F6', // blue — By the River
];

function MemoryFlower({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const groupRef   = useRef<THREE.Group>(null!);
  const glowRef    = useRef<THREE.Mesh>(null!);
  const discovered = useGameStore((s) => s.memories.find((m) => m.id === memory.id)?.discovered ?? false);
  const color      = MEMORY_COLORS[index % MEMORY_COLORS.length];

  // Position flowers in a rough circle around the garden
  const angle = (index / memories.length) * Math.PI * 2;
  const radius = 5 + (index % 3) * 2;
  const relPos: [number, number, number] = [
    Math.sin(angle) * radius,
    0,
    Math.cos(angle) * radius,
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = discovered
        ? 0.9 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2
        : 0.3 + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.1;
      glowRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2 + index * 0.7) * 0.06
      );
    }
  });

  return (
    <InteractiveObject
      id={memory.id}
      data={{ type: 'memory', payload: memory.id, label: memory.title, prompt: 'Discover memory' }}
      position={relPos}
      radius={2.2}
    >
      <group ref={groupRef}>
        {/* Stem */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.7, 7]} />
          <meshStandardMaterial color="#388E3C" roughness={0.8} />
        </mesh>

        {/* Glow aura */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.12}
            roughness={0}
            depthWrite={false}
          />
        </mesh>

        {/* Flower center */}
        <mesh ref={glowRef} position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Petals */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.sin(a) * 0.16, 0.72, Math.cos(a) * 0.16]}
              rotation={[0, a, Math.PI / 8]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={color}
                roughness={0.35}
                metalness={0.05}
                emissive={color}
                emissiveIntensity={discovered ? 0.35 : 0.08}
              />
            </mesh>
          );
        })}

        {/* Discovered star above */}
        {discovered && (
          <mesh position={[0, 1.1, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={1.0}
              roughness={0.1}
            />
          </mesh>
        )}

        {/* Point light from flower */}
        <pointLight
          position={[0, 0.72, 0]}
          color={color}
          intensity={discovered ? 1.2 : 0.4}
          distance={3}
          decay={2}
        />
      </group>
    </InteractiveObject>
  );
}

// ── Garden Arch ──────────────────────────────────────────────

function GardenArch() {
  const ARCH_COLOR = '#A5D6A7';
  return (
    <group position={[0, 0, -13.5]}>
      {/* Left post */}
      <mesh position={[-1.2, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.5} />
      </mesh>
      {/* Right post */}
      <mesh position={[1.2, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.5} />
      </mesh>
      {/* Arch crossbar */}
      <mesh position={[0, 3.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.5, 8]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.5} />
      </mesh>
      {/* Flower decorations on arch */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 3.15, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={MEMORY_COLORS[i]} emissive={MEMORY_COLORS[i]} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ── Decorative Garden Flowers ────────────────────────────────

function DecorativeGardenFlowers() {
  const positions: [number, number, number][] = [
    [2, 0, -4], [-2, 0, -4], [8, 0, 0], [-8, 0, 0],
    [6, 0, -6], [-6, 0, -6], [3, 0, 8], [-3, 0, 8],
  ];
  const colors = ['#FFE082', '#F48FB1', '#81D4FA', '#A5D6A7', '#CE93D8', '#FFAB91', '#80DEEA', '#FFCC80'];

  return (
    <group>
      {positions.map((pos, i) => (
        <SmallFlower key={i} position={pos} color={colors[i % colors.length]} />
      ))}
    </group>
  );
}

function SmallFlower({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null!);
  const spd = 0.3 + Math.random() * 0.4;
  const off = Math.random() * Math.PI * 2;

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * spd + off) * 0.12;
  });

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.36, 6]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.37, 0]}>
        <sphereGeometry args={[0.055, 7, 7]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.09, 0.37, Math.cos(a) * 0.09]} rotation={[0, a, Math.PI / 7]}>
            <sphereGeometry args={[0.05, 7, 7]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Garden Bench ─────────────────────────────────────────────

function Bench({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation} castShadow>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.6, 0.06, 0.45]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.72, -0.2]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.6, 0.35, 0.05]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      {/* Legs */}
      {[-0.65, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 0.22, 0]}>
          <boxGeometry args={[0.06, 0.44, 0.45]} />
          <meshStandardMaterial color="#6D4C41" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ── Butterfly Particles ───────────────────────────────────────

function GardenButterflies() {
  const count = 8;
  const refs = Array.from({ length: count }, () => useRef<THREE.Mesh>(null!));
  const data = Array.from({ length: count }, (_, i) => ({
    speed: 0.4 + Math.random() * 0.4,
    radius: 3 + Math.random() * 5,
    height: 1 + Math.random() * 2,
    phase: (i / count) * Math.PI * 2,
    color: MEMORY_COLORS[i % MEMORY_COLORS.length],
  }));

  useFrame((state) => {
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const d = data[i];
      const t = state.clock.elapsedTime * d.speed + d.phase;
      ref.current.position.x = Math.sin(t) * d.radius;
      ref.current.position.z = Math.cos(t * 0.7) * d.radius;
      ref.current.position.y = d.height + Math.sin(t * 3) * 0.3;
      ref.current.rotation.y = t;
    });
  });

  return (
    <group>
      {data.map((d, i) => (
        <mesh key={i} ref={refs[i]}>
          <boxGeometry args={[0.12, 0.1, 0.01]} />
          <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={0.5} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}
