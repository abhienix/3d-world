// ============================================================
// SNEHA WORLD — Category A: Asansol, Kulti & Bengal Spots
// Maithon Dam & Boating Point, Sneha's Phuchka & Chaat Stall,
// Royal Bengali Mishti Corner, and Grand Diwali & Puja Pandal!
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#FFD700';
const PINK_HOT = '#FF1493';
const WHITE = '#FFFFFF';

export function AsansolLocalSpots() {
  return (
    <group name="asansol-local-spots">
      {/* ── 1. Maithon Dam & Boating Point (North-West Lakeside) ── */}
      <MaithonDamSpot position={[-55, 0, -70]} />

      {/* ── 2. Sneha's Phuchka (Golgappa) & Chaat Stall ── */}
      <PhuchkaStall position={[-18, 0, 18]} rotation={[0, Math.PI / 4, 0]} />

      {/* ── 3. Royal Bengali Mishti Corner (Kulti Sweets) ── */}
      <BengaliMishtiShop position={[-28, 0, 12]} rotation={[0, Math.PI / 3, 0]} />

      {/* ── 4. Grand Diwali & Durga Puja Festive Pandal ── */}
      <FestivePujaPandal position={[0, 0, 36]} />
    </group>
  );
}

// ── 1. Maithon Dam & Boating Point ────────────────────────────

function MaithonDamSpot({ position }: { position: [number, number, number] }) {
  const boatRef = useRef<THREE.Group>(null!);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (boatRef.current) {
      boatRef.current.position.y = 0.25 + Math.sin(t * 1.8) * 0.06;
      boatRef.current.rotation.z = Math.sin(t * 1.2) * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* Lake Reservoir Water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <planeGeometry args={[36, 26]} />
        <meshStandardMaterial color="#00ACC1" roughness={0.08} metalness={0.2} transparent opacity={0.88} />
      </mesh>

      {/* Concrete Dam Wall & Spillway Bridge */}
      <mesh position={[0, 3.5, -12]} castShadow receiveShadow>
        <boxGeometry args={[38, 7, 3]} />
        <meshStandardMaterial color="#78909C" roughness={0.7} />
      </mesh>
      {/* Dam Road Top Railings */}
      <mesh position={[0, 7.4, -12]}>
        <boxGeometry args={[38, 0.8, 0.2]} />
        <meshStandardMaterial color={GOLD} metalness={0.8} />
      </mesh>

      {/* Scenic Green Hillocks on the Horizon */}
      {[-14, 0, 14].map((x, i) => (
        <mesh key={i} position={[x, 3.5, -16]}>
          <coneGeometry args={[6.5, 9, 8]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.9} />
        </mesh>
      ))}

      {/* Wooden Jetty Pier */}
      <mesh position={[0, 0.4, 4]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.3, 10]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.8} />
      </mesh>

      {/* Floating Pink Speedboat */}
      <group ref={boatRef} position={[3.2, 0.25, 6]}>
        {/* Hull */}
        <mesh castShadow>
          <boxGeometry args={[1.8, 0.7, 4.2]} />
          <meshStandardMaterial color={PINK_HOT} roughness={0.2} />
        </mesh>
        {/* White Deck */}
        <mesh position={[0, 0.38, 0]}>
          <boxGeometry args={[1.6, 0.1, 3.8]} />
          <meshStandardMaterial color={WHITE} />
        </mesh>
        {/* Windshield */}
        <mesh position={[0, 0.65, 0.8]} rotation={[-0.4, 0, 0]}>
          <planeGeometry args={[1.4, 0.6]} />
          <meshStandardMaterial color="#E0F7FA" transparent opacity={0.7} />
        </mesh>
        {/* Decal */}
        <Text position={[0, 0.45, -0.6]} fontSize={0.2} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
          Sneha ♡ Abhi 01
        </Text>
      </group>

      {/* Maithon Dam Signboard */}
      <mesh position={[0, 7.8, -10.5]} castShadow>
        <boxGeometry args={[16, 1.4, 0.2]} />
        <meshStandardMaterial color="#006064" />
      </mesh>
      <Text position={[0, 7.8, -10.35]} fontSize={0.48} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        🌊 Maithon Dam & Sunset Point 🌊
      </Text>
      <Text position={[0, 1.2, 8.5]} fontSize={0.22} color={GOLD} anchorX="center" anchorY="middle">
        Speedboat Cruise for the Queen of Kulti ♡
      </Text>
    </group>
  );
}

// ── 2. Sneha's Phuchka (Golgappa) & Chaat Stall ────────────────

function PhuchkaStall({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Street Cart Wooden Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2.2, 1.1, 1.3]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      {/* Stainless Steel Cart Countertop */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <boxGeometry args={[2.3, 0.06, 1.4]} />
        <meshStandardMaterial color="#CFD8DC" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glass Showcase filled with Golden Crisp Puris */}
      <mesh position={[-0.5, 1.55, 0]}>
        <boxGeometry args={[1.0, 0.7, 0.9]} />
        <meshStandardMaterial color="#E0F7FA" transparent opacity={0.35} />
      </mesh>
      <mesh position={[-0.5, 1.45, 0]}>
        <boxGeometry args={[0.9, 0.45, 0.8]} />
        <meshStandardMaterial color="#FFB300" emissive="#FFB300" emissiveIntensity={0.4} />
      </mesh>

      {/* Traditional Spicy Khatta-Meetha Matka Pots (Earthen Water Jars) */}
      <mesh position={[0.4, 1.4, -0.2]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#A1887F" roughness={0.8} />
      </mesh>
      <mesh position={[0.4, 1.4, 0.25]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.5} />
      </mesh>

      {/* Big Colorful Umbrella */}
      <mesh position={[0, 2.7, 0]} rotation={[0.08, 0, 0]} castShadow>
        <coneGeometry args={[1.5, 0.6, 16]} />
        <meshStandardMaterial color="#D81B60" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.6, 6]} />
        <meshStandardMaterial color="#37474F" />
      </mesh>

      {/* Signboard */}
      <Text position={[0, 2.2, 0.8]} fontSize={0.18} color="#FFEB3B" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Kulti Special Phuchka Stall 🥟
      </Text>
      <Text position={[0, 1.95, 0.8]} fontSize={0.12} color="#FFFFFF" anchorX="center" anchorY="middle">
        Unlimited Spicy Golgappe for Sneha ♡
      </Text>
    </group>
  );
}

// ── 3. Royal Bengali Mishti Corner (Kulti Sweets) ──────────────

function BengaliMishtiShop({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Sweet Shop Building */}
      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 3.2, 2.2]} />
        <meshStandardMaterial color="#FFF8E7" roughness={0.3} />
      </mesh>
      {/* Terracotta/Red Tile Roof */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <boxGeometry args={[3.9, 0.3, 2.5]} />
        <meshStandardMaterial color="#C2185B" roughness={0.5} />
      </mesh>

      {/* Glass Sweet Display Counter */}
      <mesh position={[0, 0.7, 1.15]} castShadow>
        <boxGeometry args={[3.2, 1.3, 0.8]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.1} transparent opacity={0.4} />
      </mesh>

      {/* Display Trays with Rosogolla & Gulab Jamun */}
      {/* White Rosogolla Tray */}
      <mesh position={[-0.8, 0.9, 1.1]}>
        <boxGeometry args={[0.8, 0.1, 0.5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} emissive="#FFFFFF" emissiveIntensity={0.3} />
      </mesh>
      {/* Brown Gulab Jamun Tray */}
      <mesh position={[0, 0.9, 1.1]}>
        <boxGeometry args={[0.8, 0.1, 0.5]} />
        <meshStandardMaterial color="#4E342E" roughness={0.3} />
      </mesh>
      {/* Mishti Doi Clay Matka Pots */}
      <mesh position={[0.8, 0.95, 1.1]}>
        <cylinderGeometry args={[0.15, 0.1, 0.22, 12]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.8} />
      </mesh>

      {/* Sweet Shop Marquee Sign */}
      <mesh position={[0, 3.0, 1.26]} castShadow>
        <boxGeometry args={[3.4, 0.7, 0.1]} />
        <meshStandardMaterial color="#E65100" />
      </mesh>
      <Text position={[0, 3.0, 1.33]} fontSize={0.22} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Kulti Mishti Mukh 🍬
      </Text>
      <Text position={[0, 2.4, 1.25]} fontSize={0.13} color="#D81B60" anchorX="center" anchorY="middle" fontWeight={800}>
        Fresh Rosogolla, Cham-cham & Mishti Doi
      </Text>
    </group>
  );
}

// ── 4. Grand Diwali & Durga Puja Festive Pandal ────────────────

function FestivePujaPandal({ position }: { position: [number, number, number] }) {
  const DIYA_COUNT = 16;

  return (
    <group position={position}>
      {/* Pandal Ground Carpet with Massive Traditional Rangoli */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
        <circleGeometry args={[7.5, 32]} />
        <meshStandardMaterial color="#C2185B" roughness={0.7} />
      </mesh>
      {/* Golden Rangoli Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[6.8, 7.3, 32]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} emissive={GOLD} emissiveIntensity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <ringGeometry args={[3.8, 4.4, 32]} />
        <meshStandardMaterial color="#FFEB3B" roughness={0.3} emissive="#FFEB3B" emissiveIntensity={0.3} />
      </mesh>

      {/* Grand Pandal Archway & Pillars */}
      {[-4, 4].map((x, i) => (
        <mesh key={i} position={[x, 3.5, -4]} castShadow>
          <cylinderGeometry args={[0.25, 0.35, 7.0, 12]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} emissive={GOLD} emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Decorative Pandal Dome Structure */}
      <mesh position={[0, 7.2, -4]} castShadow>
        <sphereGeometry args={[4.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#E91E63" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Pandal Golden Kalash Finial */}
      <mesh position={[0, 10.0, -4]}>
        <coneGeometry args={[0.4, 1.2, 12]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.9} />
      </mesh>

      {/* Ring of 16 Glowing Traditional Earthen Diyas with Real Fire Glow */}
      {Array.from({ length: DIYA_COUNT }).map((_, i) => {
        const angle = (i / DIYA_COUNT) * Math.PI * 2;
        const r = 5.6;
        const x = Math.sin(angle) * r;
        const z = Math.cos(angle) * r;

        return (
          <group key={i} position={[x, 0.12, z]}>
            {/* Clay Diya Lamp Base */}
            <mesh>
              <cylinderGeometry args={[0.16, 0.1, 0.1, 12]} />
              <meshStandardMaterial color="#8D6E63" roughness={0.9} />
            </mesh>
            {/* Flickering Warm Fire Flame */}
            <mesh position={[0, 0.12, 0]}>
              <coneGeometry args={[0.06, 0.18, 8]} />
              <meshStandardMaterial color="#FF9800" emissive="#FFD54F" emissiveIntensity={3.0} />
            </mesh>
            <pointLight position={[0, 0.25, 0]} color="#FF9800" intensity={0.9} distance={3.5} decay={2} />
          </group>
        );
      })}

      {/* Pandal Marigold Garlands & Banner */}
      <mesh position={[0, 5.2, -3.8]} castShadow>
        <boxGeometry args={[7.2, 1.1, 0.2]} />
        <meshStandardMaterial color="#880E4F" />
      </mesh>
      <Text position={[0, 5.4, -3.65]} fontSize={0.34} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        🪔 Sneha's Festive Rangoli Pandal 🪔
      </Text>
      <Text position={[0, 4.8, -3.65]} fontSize={0.18} color="#FFFFFF" anchorX="center" anchorY="middle">
        Celebrating the Rangoli Artist & Queen of Lights ♡
      </Text>
    </group>
  );
}
