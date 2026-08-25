// ============================================================
// SNEHA WORLD — Asansol & Kulti City Expansion
// Sentrum Mall, Fern Residency, Kulti Ki Rani Billboard,
// Sneha Airport, Sneha Railway Jn, Bus Stand, Zudio BOGO,
// Asansol Girls' College, and Auto Stand!
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#FFD700';
const PINK_HOT = '#FF1493';
const WHITE = '#FFFFFF';

export function AsansolCityExpansion() {
  return (
    <group name="asansol-city">
      {/* ── 1. Kulti Ki Rani Giant Billboard ── */}
      <React.Suspense fallback={null}>
        <KultiKiRaniBillboard position={[-8, 0, 28]} rotation={[0, Math.PI, 0]} />
      </React.Suspense>

      {/* ── 2. Sentrum Mall (North-West City Avenue) ── */}
      <SentrumMall position={[-38, 0, -48]} rotation={[0, Math.PI / 6, 0]} />

      {/* ── 3. The Fern Residency Hotel ── */}
      <FernResidencyHotel position={[38, 0, -48]} rotation={[0, -Math.PI / 6, 0]} />

      {/* ── 4. Zudio Fashion Store (BUY 1 GET 1 FREE) ── */}
      <ZudioStore position={[-42, 0, -28]} rotation={[0, Math.PI / 4, 0]} />

      {/* ── 5. Asansol Girls' College Heritage Campus ── */}
      <AsansolGirlsCollege position={[42, 0, -28]} rotation={[0, -Math.PI / 4, 0]} />

      {/* ── 6. Sneha Railway Junction (East City Ring) ── */}
      <SnehaRailwayStation position={[52, 0, 10]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ── 7. Sneha International Airport (North Skyline) ── */}
      <SnehaAirport position={[0, 0, -75]} />

      {/* ── 8. Sneha Central Bus Terminal ── */}
      <SnehaBusStand position={[-50, 0, 10]} rotation={[0, Math.PI / 2, 0]} />

      {/* ── 9. Sneha Auto Stand with Yellow-Green Autos ── */}
      <SnehaAutoStand position={[-16, 0, 24]} rotation={[0, Math.PI / 4, 0]} />
    </group>
  );
}

// ── 1. Billboard: "Kulti Ki Rani 👑" ───────────────────────────

function KultiKiRaniBillboard({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const tex = useTexture('/photos/memory_04.jpg');

  return (
    <group position={position} rotation={rotation}>
      {/* 2 Heavy Steel Lattice Legs */}
      {[-3.2, 3.2].map((x, i) => (
        <mesh key={i} position={[x, 3.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.22, 7.0, 8]} />
          <meshStandardMaterial color="#37474F" roughness={0.6} metalness={0.8} />
        </mesh>
      ))}

      {/* Billboard Frame */}
      <mesh position={[0, 7.2, 0]} castShadow>
        <boxGeometry args={[9.2, 5.2, 0.35]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.9} emissive={GOLD} emissiveIntensity={0.3} />
      </mesh>

      {/* Real Photo Canvas */}
      <mesh position={[-1.8, 7.2, 0.2]}>
        <planeGeometry args={[4.6, 4.4]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>

      {/* Text Praise Side Panel */}
      <group position={[2.1, 7.2, 0.2]}>
        <mesh>
          <planeGeometry args={[3.8, 4.4]} />
          <meshStandardMaterial color="#1A0028" roughness={0.3} />
        </mesh>
        <Text position={[0, 1.4, 0.05]} fontSize={0.36} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
          👑 Kulti Ki Rani 👑
        </Text>
        <Text position={[0, 0.6, 0.05]} fontSize={0.24} color="#FF1493" anchorX="center" anchorY="middle">
          The Pride & Beauty of Asansol
        </Text>
        <Text position={[0, -0.2, 0.05]} fontSize={0.18} color="#FFFFFF" anchorX="center" anchorY="middle" maxWidth={3.4} textAlign="center">
          "Most Beautiful Girl in the Entire Universe. Forever Queen of Abhi's Heart ♡"
        </Text>
        <Text position={[0, -1.4, 0.05]} fontSize={0.16} color="#FFD700" anchorX="center" anchorY="middle">
          ✨ 18-06-25 · Forever & Always ✨
        </Text>
      </group>

      {/* Overhead Floodlights */}
      {[-3, 0, 3].map((x, i) => (
        <group key={i} position={[x, 10.0, 1.2]}>
          <mesh position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.25, 0.4, 8]} />
            <meshStandardMaterial color="#263238" />
          </mesh>
          <pointLight position={[0, -0.2, 0]} color="#FFFDE7" intensity={3} distance={12} decay={2} />
        </group>
      ))}
    </group>
  );
}

// ── 2. Sentrum Mall (Grand Shopping Mall) ─────────────────────

function SentrumMall({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Multi-Story Mall Complex */}
      <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 15, 12]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.3} />
      </mesh>

      {/* Glass Atrium Curtain Wall */}
      <mesh position={[0, 6.5, 6.05]}>
        <planeGeometry args={[14, 11]} />
        <meshStandardMaterial color="#80DEEA" roughness={0.05} metalness={0.8} transparent opacity={0.7} />
      </mesh>

      {/* Mall Entrance Grand Canopy */}
      <mesh position={[0, 3.2, 8.0]} castShadow>
        <boxGeometry args={[10, 0.4, 4]} />
        <meshStandardMaterial color="#FF1493" roughness={0.3} />
      </mesh>
      {/* 4 Golden Entrance Pillars */}
      {[-4, -1.5, 1.5, 4].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 9.8]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, 3.0, 8]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} />
        </mesh>
      ))}

      {/* Giant Mall Rooftop Neon Sign */}
      <mesh position={[0, 16.5, 0]} castShadow>
        <boxGeometry args={[14, 2.2, 0.6]} />
        <meshStandardMaterial color="#0D47A1" />
      </mesh>
      <Text position={[0, 16.5, 0.35]} fontSize={0.85} color="#FFD700" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        SENTRUM MALL ♡
      </Text>
      <pointLight position={[0, 16.5, 2.5]} color="#FF80AB" intensity={3} distance={15} decay={2} />

      {/* Storefront Window Banners */}
      <Text position={[0, 4.2, 6.1]} fontSize={0.28} color="#FF1493" anchorX="center" anchorY="middle">
        ✨ Sneha's VIP Shopping & Cinema Galleria ✨
      </Text>
    </group>
  );
}

// ── 3. The Fern Residency Hotel ───────────────────────────────

function FernResidencyHotel({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Luxury Tower */}
      <mesh position={[0, 9, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 18, 10]} />
        <meshStandardMaterial color="#37474F" roughness={0.4} />
      </mesh>

      {/* Warm Illuminated Hotel Window Grids */}
      {Array.from({ length: 4 }).map((_, floor) => (
        <group key={floor} position={[0, 4 + floor * 3.2, 5.05]}>
          {[-4.5, -1.5, 1.5, 4.5].map((x, col) => (
            <mesh key={col} position={[x, 0, 0]}>
              <planeGeometry args={[1.8, 1.8]} />
              <meshStandardMaterial color="#FFF9C4" emissive="#FFE082" emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Hotel Entrance Porch */}
      <mesh position={[0, 2.2, 6.5]} castShadow>
        <boxGeometry args={[8, 0.3, 3]} />
        <meshStandardMaterial color="#263238" />
      </mesh>
      {/* Red Carpet Entrance */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 7.5]}>
        <planeGeometry args={[3, 5]} />
        <meshStandardMaterial color="#C2185B" roughness={0.8} />
      </mesh>

      {/* Rooftop Neon Hotel Signboard */}
      <mesh position={[0, 19.2, 0]}>
        <boxGeometry args={[12, 1.8, 0.5]} />
        <meshStandardMaterial color="#004D40" />
      </mesh>
      <Text position={[0, 19.2, 0.3]} fontSize={0.65} color="#80CBC4" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        The Fern Residency
      </Text>
      <Text position={[0, 1.2, 6.6]} fontSize={0.22} color={GOLD} anchorX="center" anchorY="middle">
        ★ ★ ★ ★ ★ Luxury Royal Suite for Sneha
      </Text>
      <pointLight position={[0, 19.2, 2.0]} color="#80CBC4" intensity={2.5} distance={14} decay={2} />
    </group>
  );
}

// ── 4. Zudio Store (BUY 1 GET 1 FREE) ──────────────────────────

function ZudioStore({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Sleek Black & White Store Building */}
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 7, 7]} />
        <meshStandardMaterial color="#111111" roughness={0.2} />
      </mesh>

      {/* Glass Storefront Windows */}
      <mesh position={[0, 2.2, 3.55]}>
        <planeGeometry args={[8.5, 3.8]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.1} transparent opacity={0.4} />
      </mesh>

      {/* ZUDIO Main Logo Signboard */}
      <mesh position={[0, 5.8, 3.6]} castShadow>
        <boxGeometry args={[8.8, 1.6, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <Text position={[0, 6.0, 3.75]} fontSize={0.82} color="#000000" anchorX="center" anchorY="middle" fontWeight={900}>
        ZUDIO
      </Text>

      {/* BUY 1 GET 1 Red Promo Banner */}
      <mesh position={[0, 4.8, 3.65]}>
        <boxGeometry args={[8.2, 0.65, 0.1]} />
        <meshStandardMaterial color="#E53935" emissive="#E53935" emissiveIntensity={0.5} />
      </mesh>
      <Text position={[0, 4.8, 3.75]} fontSize={0.26} color="#FFFFFF" anchorX="center" anchorY="middle" fontWeight={800}>
        🛍️ BUY 1 GET 1 FREE · SNEHA SPECIAL DISCOUNT 🛍️
      </Text>
    </group>
  );
}

// ── 5. Asansol Girls' College Heritage Campus ─────────────────

function AsansolGirlsCollege({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Red Brick Heritage Academic Building */}
      <mesh position={[0, 5.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[16, 11, 8]} />
        <meshStandardMaterial color="#A04028" roughness={0.7} />
      </mesh>

      {/* Central Heritage Clock Tower */}
      <mesh position={[0, 12.5, 0]} castShadow>
        <boxGeometry args={[4, 5, 4]} />
        <meshStandardMaterial color="#8D321A" roughness={0.7} />
      </mesh>
      {/* Clock Face */}
      <mesh position={[0, 13.5, 2.05]}>
        <circleGeometry args={[0.9, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      {/* Pyramid Roof on Clock Tower */}
      <mesh position={[0, 16.2, 0]} castShadow>
        <coneGeometry args={[2.8, 2.4, 4]} />
        <meshStandardMaterial color="#37474F" roughness={0.5} />
      </mesh>

      {/* Classical White Columns Porch */}
      {[-5, -2, 2, 5].map((x, i) => (
        <mesh key={i} position={[x, 2.5, 4.5]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 5.0, 12]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
      ))}

      {/* College Heritage Signboard */}
      <mesh position={[0, 7.5, 4.1]} castShadow>
        <boxGeometry args={[12, 1.2, 0.2]} />
        <meshStandardMaterial color="#1B5E20" />
      </mesh>
      <Text position={[0, 7.5, 4.25]} fontSize={0.42} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        Asansol Girls' College
      </Text>
      <Text position={[0, 6.2, 4.2]} fontSize={0.22} color="#FFFFFF" anchorX="center" anchorY="middle">
        🎓 Proud Alma Mater of the Prettiest Graduate Sneha 🎓
      </Text>
    </group>
  );
}

// ── 6. Sneha Railway Junction ─────────────────────────────────

function SnehaRailwayStation({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Red & White Station Platform Building */}
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[16, 7, 6]} />
        <meshStandardMaterial color="#B71C1C" roughness={0.6} />
      </mesh>

      {/* Platform Concrete Base */}
      <mesh position={[0, 0.3, 5]} receiveShadow>
        <boxGeometry args={[20, 0.6, 6]} />
        <meshStandardMaterial color="#9E9E9E" roughness={0.8} />
      </mesh>

      {/* Railway Tracks */}
      {[-1.2, 1.2].map((z, zi) => (
        <mesh key={zi} position={[0, 0.05, 9 + z]}>
          <boxGeometry args={[24, 0.08, 0.08]} />
          <meshStandardMaterial color="#424242" metalness={0.9} />
        </mesh>
      ))}

      {/* Parked Indian Railway Train Carriage */}
      <mesh position={[0, 1.8, 9]} castShadow>
        <boxGeometry args={[14, 2.6, 2.2]} />
        <meshStandardMaterial color="#1A237E" roughness={0.3} />
      </mesh>
      {/* Train Yellow Stripe */}
      <mesh position={[0, 1.8, 10.15]}>
        <boxGeometry args={[14, 0.4, 0.05]} />
        <meshStandardMaterial color={GOLD} />
      </mesh>

      {/* Indian Railways Traditional Yellow Station Board */}
      <mesh position={[0, 5.2, 3.1]} castShadow>
        <boxGeometry args={[10, 1.6, 0.2]} />
        <meshStandardMaterial color="#FDD835" />
      </mesh>
      <Text position={[0, 5.5, 3.25]} fontSize={0.42} color="#000000" anchorX="center" anchorY="middle" fontWeight={900}>
        स्नेहा जंक्शन / SNEHA JN.
      </Text>
      <Text position={[0, 4.8, 3.25]} fontSize={0.24} color="#B71C1C" anchorX="center" anchorY="middle" fontWeight={800}>
        DIRECT EXPRESS TO ABHI'S HEART ❤
      </Text>
    </group>
  );
}

// ── 7. Sneha International Airport ────────────────────────────

function SnehaAirport({ position }: { position: [number, number, number] }) {
  const radarRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (radarRef.current) {
      radarRef.current.rotation.y = s.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group position={position}>
      {/* Terminal Main Glass Hall */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[26, 10, 12]} />
        <meshStandardMaterial color="#37474F" roughness={0.3} />
      </mesh>
      {/* Glass Curtain Facade */}
      <mesh position={[0, 4.5, 6.05]}>
        <planeGeometry args={[24, 8]} />
        <meshStandardMaterial color="#80DEEA" roughness={0.05} metalness={0.8} transparent opacity={0.65} />
      </mesh>

      {/* Air Traffic Control Tower */}
      <mesh position={[-16, 10, 0]} castShadow>
        <cylinderGeometry args={[1.5, 2.2, 20, 16]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.4} />
      </mesh>
      {/* Glass Tower Cabin */}
      <mesh position={[-16, 20.5, 0]}>
        <cylinderGeometry args={[2.8, 2.2, 2.5, 16]} />
        <meshStandardMaterial color="#00BCD4" roughness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Rotating Radar Dish */}
      <mesh ref={radarRef} position={[-16, 22.8, 0]}>
        <cylinderGeometry args={[1.2, 0.2, 0.4, 8]} />
        <meshStandardMaterial color="#E53935" />
      </mesh>

      {/* Runway Tarmac & Lights */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 16]}>
        <planeGeometry args={[32, 16]} />
        <meshStandardMaterial color="#212121" roughness={0.9} />
      </mesh>

      {/* Pink & Gold Private Jet Plane on Runway */}
      <group position={[0, 1.4, 16]}>
        {/* Fuselage */}
        <mesh castShadow>
          <capsuleGeometry args={[0.8, 5.0, 8, 16]} />
          <meshStandardMaterial color={WHITE} roughness={0.2} />
        </mesh>
        {/* Wings */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[7.5, 1.6, 0.1]} />
          <meshStandardMaterial color={PINK_HOT} />
        </mesh>
        {/* Tail Fin */}
        <mesh position={[0, 1.1, -2.2]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.1, 1.5, 1.0]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} />
        </mesh>
      </group>

      {/* Airport Signboard */}
      <Text position={[0, 9.2, 6.2]} fontSize={0.65} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        ✈️ Sneha International Airport ✈️
      </Text>
      <pointLight position={[-16, 22, 0]} color="#E53935" intensity={3} distance={20} decay={2} />
    </group>
  );
}

// ── 8. Sneha Central Bus Terminal ─────────────────────────────

function SnehaBusStand({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Bus Terminal Shelter */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[14, 0.3, 6]} />
        <meshStandardMaterial color="#0288D1" roughness={0.3} />
      </mesh>
      {/* Support Pillars */}
      {[-6, 0, 6].map((x, i) => (
        <mesh key={i} position={[x, 1.25, 2.5]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 2.5, 8]} />
          <meshStandardMaterial color="#37474F" />
        </mesh>
      ))}

      {/* Parked City Buses */}
      {[-3.5, 3.5].map((x, i) => (
        <group key={i} position={[x, 1.4, 1.5]}>
          {/* Bus Body */}
          <mesh castShadow>
            <boxGeometry args={[4.2, 2.4, 2.2]} />
            <meshStandardMaterial color={i === 0 ? PINK_HOT : '#FFB300'} roughness={0.3} />
          </mesh>
          {/* Bus Windshield */}
          <mesh position={[2.12, 0.3, 0]}>
            <planeGeometry args={[1.8, 1.2]} />
            <meshStandardMaterial color="#E0F7FA" transparent opacity={0.7} />
          </mesh>
          <Text position={[0, 1.5, 0]} fontSize={0.18} color="#FFFFFF" anchorX="center" anchorY="middle">
            {i === 0 ? 'KULTI ➔ ASANSOL EXPRESS' : 'SNEHA SPECIAL AC BUS'}
          </Text>
        </group>
      ))}

      <Text position={[0, 3.4, 3.1]} fontSize={0.36} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        🚌 Sneha Central Bus Terminal 🚌
      </Text>
    </group>
  );
}

// ── 9. Sneha Auto Stand (Yellow & Green Auto Rickshaws) ─────────

function SnehaAutoStand({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Auto Stand Board */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[4.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#FFEB3B" />
      </mesh>
      <Text position={[0, 2.2, 0.08]} fontSize={0.24} color="#000000" anchorX="center" anchorY="middle" fontWeight={900}>
        🛺 SNEHA AUTO STAND 🛺
      </Text>
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2.0, 8]} />
        <meshStandardMaterial color="#37474F" />
      </mesh>

      {/* 2 Iconic Indian Yellow-Green Auto Rickshaws */}
      {[-1.8, 1.8].map((x, i) => (
        <group key={i} position={[x, 0.7, 1.8]}>
          {/* Lower Green Body */}
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.7, 1.2]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.4} />
          </mesh>
          {/* Upper Yellow Hood Roof */}
          <mesh position={[0, 0.65, 0]} castShadow>
            <boxGeometry args={[1.5, 0.6, 1.15]} />
            <meshStandardMaterial color="#FBC02D" roughness={0.3} />
          </mesh>
          {/* Headlight */}
          <mesh position={[0, 0.2, 0.62]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#FFFDE7" emissive="#FFEB3B" emissiveIntensity={0.8} />
          </mesh>
          {/* Auto Stand Sign Plate */}
          <Text position={[0, 0.9, 0.6]} fontSize={0.09} color="#000000" anchorX="center" anchorY="middle" fontWeight={900}>
            KULTI QUEEN SPECIAL
          </Text>
        </group>
      ))}
    </group>
  );
}
