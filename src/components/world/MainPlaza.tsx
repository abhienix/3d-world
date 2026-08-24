// ============================================================
// SNEHA WORLD — Main Plaza
// The starting location. Circular platform, fountain, sign, paths.
// ============================================================

import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Color palette
const PINK = '#FF80AB';
const CREAM = '#FFF8F0';
const GOLD = '#FFD700';
const LAVENDER = '#CE93D8';
const WHITE = '#FFFFFF';

export function MainPlaza() {
  return (
    <group name="main-plaza">
      {/* ── Sync geometry (renders immediately) ── */}
      <CircularPlatform />
      <Fountain />
      <PlazaLights />
      <DecorativeFlowers />
      <Paths />

      {/* ── Async text (loads progressively) ── */}
      <Suspense fallback={<SignFallback />}>
        <WelcomeSign />
        <AreaSign label="✦ Dreamhouse" position={[0, 0, -13]} rotation={[0, 0, 0]} />
        <AreaSign label="✦ Memory Garden" position={[0, 0, 16]} rotation={[0, Math.PI, 0]} />
        <AreaSign label="✦ Dressing Room" position={[-12, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <AreaSign label="✦ Collectibles" position={[12, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </Suspense>
    </group>
  );
}

// Fallback while Text font loads
function SignFallback() {
  return (
    <group position={[0, 0, 6]}>
      <mesh position={[0, 2.0, 0]}>
        <boxGeometry args={[3.0, 1.0, 0.08]} />
        <meshStandardMaterial color={WHITE} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ── Circular Platform ────────────────────────────────────────

function CircularPlatform() {
  return (
    <group>
      {/* Main disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color={CREAM} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Inner decorative ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <ringGeometry args={[6.8, 7.2, 64]} />
        <meshStandardMaterial color={PINK} roughness={0.3} metalness={0.1} transparent opacity={0.5} />
      </mesh>

      {/* Gold border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <ringGeometry args={[9.7, 10, 64]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Central star disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[1.5, 8]} />
        <meshStandardMaterial color={LAVENDER} roughness={0.2} metalness={0.2} transparent opacity={0.5} />
      </mesh>

      {/* Platform edge cylinder */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[10, 10.2, 0.25, 64]} />
        <meshStandardMaterial color="#EEE0E5" roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
}

// ── Fountain ─────────────────────────────────────────────────

function Fountain() {
  const waterRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Basin */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2, 0.3, 32]} />
        <meshStandardMaterial color={WHITE} roughness={0.2} metalness={0.2} />
      </mesh>
      {/* Water surface */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[2.0, 2.0, 0.04, 32]} />
        <meshStandardMaterial color="#AADDFF" roughness={0.05} metalness={0.1} transparent opacity={0.65} />
      </mesh>
      {/* Pillar */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.3, 12]} />
        <meshStandardMaterial color={WHITE} roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Top bowl */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.7, 0.2, 24]} />
        <meshStandardMaterial color={WHITE} roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Shimmer water top */}
      <mesh ref={waterRef} position={[0, 1.66, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.04, 24]} />
        <meshStandardMaterial color="#88CCFF" roughness={0} metalness={0.2} transparent opacity={0.65} />
      </mesh>
      {/* Water droplets */}
      {Array.from({ length: 8 }).map((_, i) => (
        <WaterDrop key={i} index={i} />
      ))}
      {/* Gold top gem */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Fountain glow light */}
      <pointLight position={[0, 1.5, 0]} color={PINK} intensity={2} distance={7} decay={2} />
    </group>
  );
}

function WaterDrop({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const angle = (index / 8) * Math.PI * 2;
  const speed = 1.2 + index * 0.15;
  const offset = index * 0.4;

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed + offset) % 1.5);
    ref.current.position.x = Math.sin(angle) * 0.25;
    ref.current.position.z = Math.cos(angle) * 0.25;
    ref.current.position.y = 1.7 + t * 0.9 - t * t * 1.1;
    ref.current.scale.setScalar(Math.max(0.01, 1 - t * 0.8));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 5, 5]} />
      <meshStandardMaterial color="#AADDFF" transparent opacity={0.7} roughness={0} />
    </mesh>
  );
}

// ── Welcome Sign ─────────────────────────────────────────────

function WelcomeSign() {
  return (
    <group position={[0, 0, 6]}>
      {/* Left post */}
      <mesh position={[-1.2, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 2.6, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Right post */}
      <mesh position={[1.2, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 2.6, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Sign border */}
      <mesh position={[0, 2.15, 0]}>
        <boxGeometry args={[3.15, 1.15, 0.06]} />
        <meshStandardMaterial color={PINK} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Sign panel */}
      <mesh position={[0, 2.15, 0.04]} castShadow>
        <boxGeometry args={[3.0, 1.0, 0.06]} />
        <meshStandardMaterial color={WHITE} roughness={0.15} metalness={0.05} />
      </mesh>

      {/* Sneha World title */}
      <Text
        position={[0, 2.26, 0.1]}
        fontSize={0.3}
        color={PINK}
        anchorX="center"
        anchorY="middle"
        outlineColor={WHITE}
        outlineWidth={0.006}
        font="/fonts/Pacifico-Regular.ttf"
      >
        SNEHA WORLD
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 1.95, 0.1]}
        fontSize={0.11}
        color="#999"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        A little world made just for you.
      </Text>

      {/* Sign glow light */}
      <pointLight position={[0, 2.15, 0.5]} color={PINK} intensity={0.6} distance={4} decay={2} />
    </group>
  );
}

// ── Plaza Lamp Posts ──────────────────────────────────────────

function PlazaLights() {
  const count = 8;
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const r = 8.5;
        return (
          <LampPost
            key={i}
            position={[Math.sin(angle) * r, 0, Math.cos(angle) * r]}
          />
        );
      })}
    </group>
  );
}

function LampPost({ position }: { position: [number, number, number] }) {
  const globeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (globeRef.current) {
      const mat = globeRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.55 + Math.sin(state.clock.elapsedTime * 1.8 + position[0]) * 0.08;
    }
  });

  return (
    <group position={position} castShadow>
      {/* Pole */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.04, 0.055, 2.7, 8]} />
        <meshStandardMaterial color="#DCDCDC" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Lamp globe */}
      <mesh ref={globeRef} position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial
          color="#FFFDE7"
          emissive="#FFFACD"
          emissiveIntensity={0.55}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Light */}
      <pointLight position={[0, 2.8, 0]} color="#FFFDE7" intensity={1.2} distance={6} decay={2} />
    </group>
  );
}

// ── Decorative Flowers ────────────────────────────────────────

const FLOWER_COLORS = ['#FF80AB', '#FFB6C1', '#CE93D8', '#FF69B4', '#FFCDD2', '#F48FB1'];

function DecorativeFlowers() {
  const positions: [number, number, number][] = [
    [4, 0, 4], [-4, 0, 4], [4, 0, -4], [-4, 0, -4],
    [6, 0, 0], [-6, 0, 0], [0, 0, 6], [0, 0, -6],
    [5, 0, 2.5], [-5, 0, -2.5], [3, 0, -5], [-3, 0, 5],
  ];
  return (
    <group>
      {positions.map((pos, i) => (
        <Flower key={i} position={pos} color={FLOWER_COLORS[i % FLOWER_COLORS.length]} />
      ))}
    </group>
  );
}

function Flower({ position, color }: { position: [number, number, number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const speed = 0.4 + Math.random() * 0.4;
  const phaseOff = Math.random() * Math.PI * 2;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed + phaseOff) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
        <meshStandardMaterial color="#66BB6A" roughness={0.8} />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.3} roughness={0.3} />
      </mesh>
      {/* Petals */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * 0.12, 0.42, Math.cos(angle) * 0.12]}
            rotation={[0, angle, Math.PI / 6]}
          >
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Paths ──────────────────────────────────────────────────────

function Paths() {
  const paths: { pos: [number, number, number]; rot: number; len: number }[] = [
    { pos: [0, -0.08, -11.5], rot: 0,             len: 5 },
    { pos: [0, -0.08, 13],    rot: 0,             len: 5 },
    { pos: [-11, -0.08, 0],   rot: Math.PI / 2,  len: 5 },
    { pos: [11, -0.08, 0],    rot: Math.PI / 2,  len: 5 },
  ];

  return (
    <group>
      {paths.map((p, i) => (
        <mesh key={i} position={p.pos} rotation={[-Math.PI / 2, 0, p.rot]} receiveShadow>
          <planeGeometry args={[2, p.len]} />
          <meshStandardMaterial color="#EEE5E8" roughness={0.6} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

// ── Area Signs ─────────────────────────────────────────────────

function AreaSign({
  label,
  position,
  rotation,
}: {
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Post */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Border */}
      <mesh position={[0, 1.65, 0]}>
        <boxGeometry args={[2.0, 0.55, 0.04]} />
        <meshStandardMaterial color={PINK} roughness={0.3} />
      </mesh>
      {/* Panel */}
      <mesh position={[0, 1.65, 0.025]}>
        <boxGeometry args={[1.9, 0.45, 0.05]} />
        <meshStandardMaterial color={WHITE} roughness={0.2} />
      </mesh>
      {/* Text */}
      <Text
        position={[0, 1.65, 0.07]}
        fontSize={0.12}
        color="#666"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        {label}
      </Text>
    </group>
  );
}
