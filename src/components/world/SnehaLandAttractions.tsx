// ============================================================
// SNEHA WORLD — Snehaland Disneyland Theme Park & Carnival
// Royal Carousel, Carnival Food Stalls, Balloon Carts, Plushie Booth,
// Swan Lake, Fairytale Castle Gates & Victorian Streetlamps!
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#FFD700';
const PINK_HOT = '#FF1493';
const PINK_LIGHT = '#FF80AB';
const WHITE = '#FFFFFF';

export function SnehaLandAttractions() {
  return (
    <group name="snehaland-disneyland">
      {/* ── 1. Royal Grand Carousel (East Plaza) ── */}
      <RoyalCarousel position={[22, 0, 16]} />

      {/* ── 2. Carnival Food & Souvenir Promenade (West Plaza) ── */}
      <CottonCandyStall position={[-14, 0, 15]} rotation={[0, Math.PI / 4, 0]} />
      <PopcornCart position={[-19, 0, 12]} rotation={[0, Math.PI / 3, 0]} />
      <DisneyBalloonCart position={[-10, 0, 18]} rotation={[0, -Math.PI / 6, 0]} />
      <PlushieGameBooth position={[-25, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
      <TiaraSouvenirStall position={[-25, 0, -8]} rotation={[0, Math.PI / 2, 0]} />
      <IceCreamSundaeTruck position={[16, 0, -18]} rotation={[0, -Math.PI / 3, 0]} />

      {/* ── 3. Swan Lake & Arched Bridge (South-East) ── */}
      <SwanLake position={[26, 0, -2]} />

      {/* ── 4. Disneyland Floral Heart Entrance Arches ── */}
      <FloralHeartArch position={[0, 0, 10]} />
      <FloralHeartArch position={[0, 0, -14]} />
      <FloralHeartArch position={[-12, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <FloralHeartArch position={[12, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ── 5. Theme Park Directional Signposts ── */}
      <DisneylandSignpost position={[4, 0, 6]} />
      <DisneylandSignpost position={[-4, 0, -6]} />

      {/* ── 6. Victorian Streetlamps Along Promenade ── */}
      <StreetLampRow />
    </group>
  );
}

// ── 1. Royal Grand Carousel (Animated Merry-Go-Round) ──────────

function RoyalCarousel({ position }: { position: [number, number, number] }) {
  const carouselRef = useRef<THREE.Group>(null!);
  const horsesRef = useRef<THREE.Group[]>([]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (carouselRef.current) {
      carouselRef.current.rotation.y = t * 0.4;
    }
    // Bobbing horses up and down
    horsesRef.current.forEach((h, i) => {
      if (h) {
        h.position.y = 0.9 + Math.sin(t * 2 + i * 1.2) * 0.25;
      }
    });
  });

  const HORSE_COUNT = 6;

  return (
    <group position={position}>
      {/* Base Platform */}
      <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[5.2, 5.5, 0.5, 32]} />
        <meshStandardMaterial color="#FFF0F5" roughness={0.3} />
      </mesh>
      {/* Gold Trim Base */}
      <mesh position={[0, 0.52, 0]}>
        <ringGeometry args={[4.9, 5.2, 32]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} emissive={GOLD} emissiveIntensity={0.3} />
      </mesh>

      {/* Center Mirror Pillar */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 4.2, 16]} />
        <meshStandardMaterial color={GOLD} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Rotating Carousel Roof & Horses */}
      <group ref={carouselRef} position={[0, 0, 0]}>
        {/* Canopy Roof Cone */}
        <mesh position={[0, 4.8, 0]} castShadow>
          <coneGeometry args={[5.5, 2.2, 32]} />
          <meshStandardMaterial color={PINK_HOT} roughness={0.3} />
        </mesh>
        {/* Canopy Gold Crown Finial */}
        <mesh position={[0, 6.2, 0]}>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} />
        </mesh>

        {/* 6 Fairytale Carousel Horses & Gold Poles */}
        {Array.from({ length: HORSE_COUNT }).map((_, i) => {
          const angle = (i / HORSE_COUNT) * Math.PI * 2;
          const r = 3.6;
          const x = Math.sin(angle) * r;
          const z = Math.cos(angle) * r;

          return (
            <group key={i} position={[x, 0, z]}>
              {/* Gold Pole */}
              <mesh position={[0, 2.4, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 4.4, 8]} />
                <meshStandardMaterial color={GOLD} roughness={0.1} metalness={0.9} />
              </mesh>

              {/* Horse Figure */}
              <group
                ref={(el) => { if (el) horsesRef.current[i] = el; }}
                position={[0, 0.9, 0]}
                rotation={[0, angle + Math.PI / 2, 0]}
              >
                {/* Body */}
                <mesh position={[0, 0, 0]} castShadow>
                  <capsuleGeometry args={[0.22, 0.55, 8, 12]} />
                  <meshStandardMaterial color={WHITE} roughness={0.3} />
                </mesh>
                {/* Saddle */}
                <mesh position={[0, 0.12, 0]}>
                  <boxGeometry args={[0.26, 0.14, 0.35]} />
                  <meshStandardMaterial color={PINK_LIGHT} roughness={0.4} />
                </mesh>
                {/* Neck & Head */}
                <mesh position={[0, 0.35, 0.3]} rotation={[0.4, 0, 0]} castShadow>
                  <cylinderGeometry args={[0.1, 0.16, 0.45, 8]} />
                  <meshStandardMaterial color={WHITE} roughness={0.3} />
                </mesh>
                {/* Gold Mane & Tail */}
                <mesh position={[0, 0.4, 0.18]}>
                  <boxGeometry args={[0.06, 0.25, 0.2]} />
                  <meshStandardMaterial color={GOLD} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>

      {/* Marquee Text */}
      <Text position={[0, 3.8, 5.2]} fontSize={0.28} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Princess Carousel ♡
      </Text>
      <pointLight position={[0, 3, 0]} color="#FF80AB" intensity={2} distance={10} decay={2} />
    </group>
  );
}

// ── 2. Pink Cotton Candy Stand ─────────────────────────────────

function CottonCandyStall({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Wooden Kiosk Base */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2.2, 1.2, 1.4]} />
        <meshStandardMaterial color={PINK_LIGHT} roughness={0.4} />
      </mesh>
      {/* Striped Canopy */}
      <mesh position={[0, 2.1, 0]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[2.4, 0.15, 1.6]} />
        <meshStandardMaterial color={PINK_HOT} roughness={0.3} />
      </mesh>
      {/* Canopy Poles */}
      {[[-1, -0.6], [1, -0.6], [-1, 0.6], [1, 0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.5, z]}>
          <cylinderGeometry args={[0.025, 0.025, 1.2, 6]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} />
        </mesh>
      ))}
      {/* Big Spun Sugar Fluff Displays */}
      <mesh position={[-0.5, 1.4, 0]}>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.9} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.25, 10, 10]} />
        <meshStandardMaterial color="#80DEEA" roughness={0.9} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.5, 1.4, 0]}>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshStandardMaterial color="#CE93D8" roughness={0.9} transparent opacity={0.85} />
      </mesh>

      <Text position={[0, 2.3, 0.8]} fontSize={0.16} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Cotton Candy Fluff ♡
      </Text>
    </group>
  );
}

// ── Popcorn Cart ──────────────────────────────────────────────

function PopcornCart({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Red/Pink Cart Body */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.5, 0.9, 1.0]} />
        <meshStandardMaterial color="#FF1493" roughness={0.3} />
      </mesh>
      {/* Glass Popcorn Chamber */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1.3, 0.7, 0.85]} />
        <meshStandardMaterial color="#E0F7FA" transparent opacity={0.4} />
      </mesh>
      {/* Glowing Popcorn kernels inside */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.1, 0.3, 0.7]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.6} />
      </mesh>
      {/* Cart Wheels */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0.52]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} />
        </mesh>
      ))}
      <Text position={[0, 1.9, 0]} fontSize={0.14} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Sweet Popcorn 🍿
      </Text>
    </group>
  );
}

// ── Disney Helium Balloon Cart ────────────────────────────────

function DisneyBalloonCart({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const balloonGroupRef = useRef<THREE.Group>(null!);

  useFrame((s) => {
    if (balloonGroupRef.current) {
      balloonGroupRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.15;
      balloonGroupRef.current.position.y = 2.4 + Math.sin(s.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  const BALLOON_COLORS = ['#FF1493', '#FF80AB', '#FFD700', '#CE93D8', '#80DEEA', '#FFA726', '#FF4081'];

  return (
    <group position={position} rotation={rotation}>
      {/* Golden Cart Stand */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1.0, 16]} />
        <meshStandardMaterial color={PINK_LIGHT} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.06, 16]} />
        <meshStandardMaterial color={GOLD} metalness={0.8} />
      </mesh>

      {/* Floating Cluster of Balloons */}
      <group ref={balloonGroupRef} position={[0, 2.4, 0]}>
        {BALLOON_COLORS.map((col, i) => {
          const a = (i / BALLOON_COLORS.length) * Math.PI * 2;
          const x = Math.sin(a) * 0.45;
          const z = Math.cos(a) * 0.45;
          const y = (i % 2) * 0.3;

          return (
            <group key={i} position={[x, y, z]}>
              {/* Balloon */}
              <mesh castShadow>
                <sphereGeometry args={[0.22, 12, 12]} />
                <meshStandardMaterial color={col} roughness={0.15} metalness={0.2} emissive={col} emissiveIntensity={0.3} />
              </mesh>
              {/* Balloon String */}
              <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 1.0, 4]} />
                <meshStandardMaterial color="#FFFFFF" />
              </mesh>
            </group>
          );
        })}
      </group>

      <Text position={[0, 1.2, 0]} fontSize={0.15} color="#FF1493" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Sneha Magic Balloons 🎈
      </Text>
    </group>
  );
}

// ── Plushie Game Booth ────────────────────────────────────────

function PlushieGameBooth({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Booth Stall */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[3.2, 2.4, 1.8]} />
        <meshStandardMaterial color="#FFF0F5" roughness={0.4} />
      </mesh>
      {/* Front Counter Opening */}
      <mesh position={[0, 0.6, 0.92]} castShadow>
        <boxGeometry args={[2.8, 1.0, 0.2]} />
        <meshStandardMaterial color={PINK_HOT} roughness={0.3} />
      </mesh>
      {/* Shelves with Giant Teddy Bears & Plushies */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <group key={i} position={[x, 1.35, 0.4]}>
          {/* Teddy Body */}
          <mesh castShadow>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.9} />
          </mesh>
          {/* Teddy Head */}
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.9} />
          </mesh>
          {/* Pink Bow */}
          <mesh position={[0, 0.18, 0.12]}>
            <boxGeometry args={[0.1, 0.06, 0.04]} />
            <meshStandardMaterial color={PINK_HOT} />
          </mesh>
        </group>
      ))}

      <Text position={[0, 2.6, 0.92]} fontSize={0.22} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Sneha's Toy Castle 🧸
      </Text>
    </group>
  );
}

// ── Tiara & Jewelry Souvenir Stall ────────────────────────────

function TiaraSouvenirStall({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2.8, 1.2, 1.4]} />
        <meshStandardMaterial color="#FFF8E7" roughness={0.3} />
      </mesh>
      {/* Velvet Display Case */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2.6, 0.1, 1.2]} />
        <meshStandardMaterial color="#880E4F" roughness={0.8} />
      </mesh>
      {/* Glass Top */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.6, 0.4, 1.2]} />
        <meshStandardMaterial color="#E0F7FA" transparent opacity={0.3} roughness={0} />
      </mesh>
      {/* 3 Golden Tiaras on Display */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 1.35, 0]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.15, 0.025, 8, 16, Math.PI]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
        </mesh>
      ))}

      <Text position={[0, 2.0, 0]} fontSize={0.18} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Queen Tiara Boutique 👑
      </Text>
    </group>
  );
}

// ── Ice Cream Sundae Truck ────────────────────────────────────

function IceCreamSundaeTruck({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Truck Body */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3.8, 1.8, 2.0]} />
        <meshStandardMaterial color="#FFF0F5" roughness={0.3} />
      </mesh>
      {/* Pink Truck Trim */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3.85, 0.5, 2.05]} />
        <meshStandardMaterial color={PINK_HOT} roughness={0.3} />
      </mesh>
      {/* Giant Soft-Serve Ice Cream on Roof */}
      <mesh position={[0, 2.4, 0]} rotation={[0, 0, 0.1]} castShadow>
        <coneGeometry args={[0.4, 1.1, 16]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.4} emissive="#FF80AB" emissiveIntensity={0.3} />
      </mesh>
      {/* Waffle Cone */}
      <mesh position={[0, 1.9, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.35, 0.6, 16]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.7} />
      </mesh>

      <Text position={[0, 1.4, 1.05]} fontSize={0.22} color={PINK_HOT} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Sneha Sundaes 🍦
      </Text>
    </group>
  );
}

// ── 3. Swan Lake & Arched Bridge ──────────────────────────────

function SwanLake({ position }: { position: [number, number, number] }) {
  const swanRef = useRef<THREE.Group>(null!);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (swanRef.current) {
      // Swan swims in gentle circle
      const r = 3.5;
      swanRef.current.position.x = Math.sin(t * 0.3) * r;
      swanRef.current.position.z = Math.cos(t * 0.3) * r;
      swanRef.current.rotation.y = t * 0.3 + Math.PI / 2;
    }
  });

  return (
    <group position={position}>
      {/* Lake Basin Water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[6.5, 32]} />
        <meshStandardMaterial color="#80DEEA" roughness={0.05} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      {/* Lake Stone Rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[6.3, 6.7, 32]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.8} />
      </mesh>

      {/* Swimming White Swan */}
      <group ref={swanRef} position={[3, 0.1, 0]}>
        {/* Swan Body */}
        <mesh castShadow>
          <capsuleGeometry args={[0.18, 0.38, 8, 12]} />
          <meshStandardMaterial color={WHITE} roughness={0.3} />
        </mesh>
        {/* Graceful Curved Neck */}
        <mesh position={[0, 0.28, 0.22]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 0.45, 8]} />
          <meshStandardMaterial color={WHITE} roughness={0.3} />
        </mesh>
        {/* Beak */}
        <mesh position={[0, 0.46, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.03, 0.1, 6]} />
          <meshStandardMaterial color="#FF9800" />
        </mesh>
        {/* Golden Crown on Swan */}
        <mesh position={[0, 0.52, 0.25]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Arched Fairytale Bridge over Lake */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.1, 6.8]} />
          <meshStandardMaterial color="#FFF0F5" roughness={0.4} />
        </mesh>
        {/* Bridge Gold Railings */}
        {[-0.65, 0.65].map((x, i) => (
          <mesh key={i} position={[x, 0.9, 0]}>
            <boxGeometry args={[0.06, 0.8, 6.8]} />
            <meshStandardMaterial color={GOLD} metalness={0.8} />
          </mesh>
        ))}
      </group>

      <Text position={[0, 1.8, 0]} fontSize={0.24} color="#FF1493" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Swan Lake of Love ♡
      </Text>
    </group>
  );
}

// ── 4. Floral Heart Arch ──────────────────────────────────────

function FloralHeartArch({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* 2 Golden Arch Pillars */}
      {[-2.0, 2.0].map((x, i) => (
        <mesh key={i} position={[x, 2.0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 4.0, 8]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      {/* Curved Arch Ring */}
      <mesh position={[0, 3.8, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.0, 0.1, 8, 24, Math.PI]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Pink Rose Flower clusters on Arch */}
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 8) * Math.PI;
        const x = -Math.cos(a) * 2.0;
        const y = 3.8 + Math.sin(a) * 2.0;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? PINK_HOT : PINK_LIGHT} emissive={PINK_HOT} emissiveIntensity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── 5. Disneyland Directional Signposts ────────────────────────

function DisneylandSignpost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Gold Pole */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 2.8, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Direction Wooden Arrows */}
      <SignArrow position={[0.45, 2.4, 0]} rotation={[0, 0.2, 0]} label="🏰 Dream Castle ➔" color={PINK_HOT} />
      <SignArrow position={[-0.45, 2.0, 0]} rotation={[0, -0.4, 0]} label="⬅ 🎡 Wonder Wheel" color="#9C27B0" />
      <SignArrow position={[0.45, 1.6, 0]} rotation={[0, 0.6, 0]} label="☕ Sneha Café ➔" color="#FF80AB" />
      <SignArrow position={[-0.45, 1.2, 0]} rotation={[0, -0.8, 0]} label="⬅ ☁️ Sky Sanctuary" color="#00BCD4" />
    </group>
  );
}

function SignArrow({ position, rotation, label, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
  color: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[1.3, 0.26, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <Text position={[0, 0, 0.03]} fontSize={0.11} color={WHITE} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

// ── 6. Victorian Streetlamps Along Walkways ────────────────────

function StreetLampRow() {
  const LAMP_POSITIONS: [number, number, number][] = [
    [-6, 0, 8],
    [6, 0, 8],
    [-6, 0, -8],
    [6, 0, -8],
    [-12, 0, 12],
    [12, 0, 12],
    [-12, 0, -18],
    [12, 0, -18],
    [0, 0, 26],
    [0, 0, -24],
  ];

  return (
    <group name="street-lamps">
      {LAMP_POSITIONS.map((pos, i) => (
        <VictorianStreetLamp key={i} position={pos} />
      ))}
      {/* 2 Regional Warm Ambient Lights instead of 10 individual point lights */}
      <pointLight position={[0, 3.5, 0]} color="#FFE082" intensity={1.8} distance={22} decay={2} />
      <pointLight position={[0, 3.5, -20]} color="#FFE082" intensity={1.8} distance={22} decay={2} />
    </group>
  );
}

function VictorianStreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Lamp Post */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.08, 3.0, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Ornate Arm */}
      <mesh position={[0, 3.05, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} />
      </mesh>
      {/* Glowing Glass Lantern (High Emissive for realistic glow without heavy point light overhead) */}
      <mesh position={[0, 2.9, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#FFFDE7" emissive="#FFD700" emissiveIntensity={2.5} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}
