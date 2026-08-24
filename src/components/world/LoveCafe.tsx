// ============================================================
// SNEHA WORLD — Café de Sneha ♡
// Parisian Barbie Outdoor Boutique Cafe with Cakes & Boba Drinks
// ============================================================

import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function LoveCafe({ position = [-25, 0, -22] }: { position?: [number, number, number] }) {
  const PINK = '#FF1493';
  const STRIPE_WHITE = '#FFFFFF';
  const GOLD = '#FFD700';

  return (
    <group name="love-cafe" position={position}>
      {/* ── Cafe Ground Patio ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[7, 32]} />
        <meshStandardMaterial color="#FFF0F5" roughness={0.3} />
      </mesh>
      {/* Gold Patio Rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[6.8, 7.1, 32]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* ── Main Cafe Pavilion & Awning ── */}
      <mesh position={[0, 2.8, -3.5]} castShadow>
        <boxGeometry args={[7, 0.15, 3]} />
        <meshStandardMaterial color={PINK} roughness={0.3} />
      </mesh>
      {/* Striped Canopy */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[-3 + i * 1, 2.9, -3.5]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.95, 0.18, 3.2]} />
          <meshStandardMaterial color={i % 2 === 0 ? PINK : STRIPE_WHITE} roughness={0.4} />
        </mesh>
      ))}

      {/* ── Neon Sign: CAFÉ DE SNEHA ♡ ── */}
      <mesh position={[0, 3.6, -3.5]} castShadow>
        <boxGeometry args={[4.8, 0.9, 0.1]} />
        <meshStandardMaterial color="#1A0028" roughness={0.2} />
      </mesh>
      <Text position={[0, 3.6, -3.42]} fontSize={0.32} color="#FFD700" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Café de Sneha ♡
      </Text>
      <pointLight position={[0, 3.6, -2.5]} color="#FF80AB" intensity={2} distance={8} decay={2} />

      {/* ── Cafe Counter ── */}
      <mesh position={[0, 0.6, -3.2]} castShadow>
        <boxGeometry args={[5, 1.2, 1.2]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.3} />
      </mesh>
      {/* Counter Top Marble */}
      <mesh position={[0, 1.24, -3.2]} castShadow>
        <boxGeometry args={[5.2, 0.08, 1.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
      </mesh>

      {/* ── 3-Tier Pink Celebration Cake on Counter ── */}
      <TieredCake position={[-1.4, 1.28, -3.2]} />

      {/* ── Strawberry Boba & Macarons ── */}
      <BobaCup position={[0.4, 1.28, -3.2]} />
      <BobaCup position={[0.9, 1.28, -3.2]} />
      <MacaronStand position={[1.8, 1.28, -3.2]} />

      {/* ── 3 Parisian Cafe Tables ── */}
      <CafeTable position={[-2.4, 0, 1.5]} />
      <CafeTable position={[0, 0, 3.2]} />
      <CafeTable position={[2.4, 0, 1.5]} />
    </group>
  );
}

// ── 3-Tier Birthday & Celebration Cake ────────────────────────

function TieredCake({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tier 1 */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.4} />
      </mesh>
      {/* Tier 2 */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.22, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
      {/* Tier 3 */}
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.16, 16]} />
        <meshStandardMaterial color="#FF1493" roughness={0.4} />
      </mesh>
      {/* Cake Topper Golden Heart */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// ── Strawberry Boba Drink ─────────────────────────────────────

function BobaCup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.28, 12]} />
        <meshStandardMaterial color="#FF80AB" transparent opacity={0.85} roughness={0.1} />
      </mesh>
      {/* Straw */}
      <mesh position={[0.02, 0.28, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 6]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>
    </group>
  );
}

// ── Macaron Stand ─────────────────────────────────────────────

function MacaronStand({ position }: { position: [number, number, number] }) {
  const COLORS = ['#FF80AB', '#FFD700', '#80DEEA', '#CE93D8'];
  return (
    <group position={position}>
      {/* Stand Stem */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.015, 0.03, 0.36, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Tier Plates */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.02, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      {/* Macaron treats */}
      {COLORS.map((c, i) => (
        <mesh key={i} position={[(i % 2 === 0 ? 0.08 : -0.08), 0.17, (i > 1 ? 0.06 : -0.06)]}>
          <cylinderGeometry args={[0.035, 0.035, 0.025, 8]} />
          <meshStandardMaterial color={c} />
        </mesh>
      ))}
    </group>
  );
}

// ── Parisian Cafe Table & Chairs ──────────────────────────────

function CafeTable({ position }: { position: [number, number, number] }) {
  const GOLD = '#FFD700';

  return (
    <group position={position}>
      {/* Table Top Marble */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.05, 20]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
      </mesh>
      {/* Gold Table Leg */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.8, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 16]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Flower Vase on Table */}
      <mesh position={[0, 0.94, 0]}>
        <cylinderGeometry args={[0.06, 0.04, 0.16, 8]} />
        <meshStandardMaterial color="#E0F7FA" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.5} />
      </mesh>

      {/* 2 Chairs */}
      <CafeChair position={[-0.85, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <CafeChair position={[0.85, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

function CafeChair({ position, rotation = [0, 0, 0] }: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const PINK = '#FF4081';
  const GOLD = '#FFD700';

  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        <meshStandardMaterial color={PINK} roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.22, z]}>
          <cylinderGeometry args={[0.02, 0.02, 0.44, 6]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      {/* Backrest */}
      <mesh position={[0, 0.8, -0.26]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.45, 0.4, 0.03]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}
