// ============================================================
// SNEHA WORLD — Sneha's Dream Home
// A full 3D fashion-doll house with ground floor, upper floor,
// balcony, windows, "SNEHA'S HOME" sign, garden, fence, trees.
// ============================================================

import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { DreamHouseInterior } from './DreamHouseInterior';

// ── Color Palette ─────────────────────────────────────────────
const WALL_PINK   = '#FFD6E7';   // Soft pink walls
const WALL_DEEP   = '#F8BBD0';   // Slightly deeper pink
const ROOF_PINK   = '#F06292';   // Hot pink roof
const ROOF_DARK   = '#C2185B';   // Roof shadow / accent
const TRIM_WHITE  = '#FFFFFF';   // Window frames, trim
const DOOR_GOLD   = '#FFD700';   // Front door gold
const GOLD        = '#FFD700';
const GLASS_BLUE  = '#B3E5FC';   // Window glass
const GARDEN_GRN  = '#A5D6A7';   // Grass
const HEDGE_GRN   = '#388E3C';   // Hedge
const FENCE_WHITE = '#FFFFFF';
const STONE_GREY  = '#F5F0EE';   // Pathway stones
const FLOWER_PINK = '#FF80AB';
const FLOWER_YLW  = '#FFD740';
const FLOWER_PRP  = '#CE93D8';
const TREE_BROWN  = '#6D4C41';
const TREE_GRN    = '#66BB6A';

export function DreamHouse() {
  return (
    <group name="dreamhouse" position={[0, 0, -28]}>
      {/* ── Walk-In Royal Interior ── */}
      <Suspense fallback={null}>
        <DreamHouseInterior />
      </Suspense>

      {/* ── Property Ground ── */}
      <PropertyGround />

      {/* ── Fence around property ── */}
      <PropertyFence />

      {/* ── Driveway / front path ── */}
      <FrontPath />

      {/* ── Garden trees ── */}
      <GardenTrees />

      {/* ── Flower beds ── */}
      <FlowerBeds />

      {/* ── Hedges ── */}
      <Hedges />

      {/* ── Main House Structure ── */}
      <HouseMain />

      {/* ── Left Wing ── */}
      <HouseWing side={-1} />

      {/* ── Right Wing ── */}
      <HouseWing side={1} />

      {/* ── Roof system ── */}
      <RoofSystem />

      {/* ── Windows ── */}
      <Windows />

      {/* ── Front Door ── */}
      <FrontDoor />

      {/* ── Balcony ── */}
      <Balcony />

      {/* ── "SNEHA'S HOME" sign ── */}
      <Suspense fallback={null}>
        <HomeSign />
      </Suspense>

      {/* ── Chimneys ── */}
      <Chimney position={[-3.5, 8.5, -1]} />
      <Chimney position={[3.5, 8.5, -1]} />

      {/* ── Decorative elements ── */}
      <HouseDecorations />

      {/* ── Outdoor lighting ── */}
      <OutdoorLights />
    </group>
  );
}

// ── Property Ground ────────────────────────────────────────

function PropertyGround() {
  return (
    <>
      {/* Grass lawn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 2]} receiveShadow>
        <planeGeometry args={[32, 36]} />
        <meshStandardMaterial color={GARDEN_GRN} roughness={0.9} />
      </mesh>
      {/* Front lawn lighter strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 10]}>
        <planeGeometry args={[28, 14]} />
        <meshStandardMaterial color="#B8E6B8" roughness={0.8} />
      </mesh>
    </>
  );
}

// ── Main House Body ────────────────────────────────────────

function HouseMain() {
  return (
    <group>
      {/* ── Ground Floor ── */}
      {/* Main walls */}
      <mesh position={[0, 2.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 4, 8]} />
        <meshStandardMaterial color={WALL_PINK} roughness={0.4} metalness={0.02} />
      </mesh>
      {/* Ground floor front face accent */}
      <mesh position={[0, 2.0, 4.01]}>
        <boxGeometry args={[12, 4, 0.04]} />
        <meshStandardMaterial color={WALL_DEEP} roughness={0.35} />
      </mesh>

      {/* ── Upper Floor ── */}
      <mesh position={[0, 6.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[11, 3.8, 7.6]} />
        <meshStandardMaterial color={WALL_PINK} roughness={0.4} metalness={0.02} />
      </mesh>

      {/* ── Floor divider band ── */}
      <mesh position={[0, 4.05, 0]} castShadow>
        <boxGeometry args={[12.3, 0.3, 8.3]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.1} />
      </mesh>

      {/* ── Corner columns (ground floor) ── */}
      {[[-5.9, 2, 3.9], [5.9, 2, 3.9], [-5.9, 2, -3.9], [5.9, 2, -3.9]].map((pos, i) => (
        <mesh key={i} position={pos as [number,number,number]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 4.2, 10]} />
          <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.15} />
        </mesh>
      ))}

      {/* ── Upper floor corner columns ── */}
      {[[-5.3, 6.1, 3.6], [5.3, 6.1, 3.6], [-5.3, 6.1, -3.6], [5.3, 6.1, -3.6]].map((pos, i) => (
        <mesh key={i} position={pos as [number,number,number]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 3.9, 10]} />
          <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.15} />
        </mesh>
      ))}

      {/* Foundation */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[12.4, 0.5, 8.4]} />
        <meshStandardMaterial color="#EEE0E5" roughness={0.5} />
      </mesh>
    </group>
  );
}

// ── Side Wings ────────────────────────────────────────────

function HouseWing({ side }: { side: 1 | -1 }) {
  const x = side * 7.8;
  return (
    <group>
      {/* Wing body */}
      <mesh position={[x, 1.6, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 3.2, 7]} />
        <meshStandardMaterial color={WALL_DEEP} roughness={0.45} metalness={0.02} />
      </mesh>
      {/* Wing roof */}
      <mesh position={[x, 3.55, -0.5]} castShadow>
        <boxGeometry args={[3.8, 0.3, 7.3]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} />
      </mesh>
      {/* Wing pitched roof */}
      <mesh position={[x, 4.6, -0.5]} rotation={[0, 0, side * 0.4]}>
        <boxGeometry args={[4, 2, 7.2]} />
        <meshStandardMaterial color={ROOF_PINK} roughness={0.3} />
      </mesh>
      {/* Wing window */}
      <WindowUnit
        position={[x + side * 0.01, 1.7, 3.52]}
        width={1.2}
        height={1.4}
      />
    </group>
  );
}

// ── Roof System ───────────────────────────────────────────

function RoofSystem() {
  return (
    <group>
      {/* Roof base parapet */}
      <mesh position={[0, 8.1, 0]} castShadow>
        <boxGeometry args={[12.4, 0.4, 8.0]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.1} />
      </mesh>

      {/* Main pitched roof — front half */}
      <mesh position={[0, 9.3, 1.5]} rotation={[0.52, 0, 0]} castShadow>
        <boxGeometry args={[12.2, 0.25, 6.2]} />
        <meshStandardMaterial color={ROOF_PINK} roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Main pitched roof — back half */}
      <mesh position={[0, 9.3, -1.5]} rotation={[-0.52, 0, 0]} castShadow>
        <boxGeometry args={[12.2, 0.25, 6.2]} />
        <meshStandardMaterial color={ROOF_PINK} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Roof ridge */}
      <mesh position={[0, 10.8, 0]} castShadow>
        <boxGeometry args={[12.4, 0.3, 0.6]} />
        <meshStandardMaterial color={ROOF_DARK} roughness={0.25} metalness={0.1} />
      </mesh>

      {/* Roof trim along eaves */}
      {[-6, 6].map((x, i) => (
        <mesh key={i} position={[x, 8.3, 0]} castShadow>
          <boxGeometry args={[0.25, 0.45, 8.5]} />
          <meshStandardMaterial color={TRIM_WHITE} roughness={0.3} />
        </mesh>
      ))}

      {/* Dormer window (front upper roof) */}
      <DormerWindow position={[-2.5, 9.6, 3.5]} />
      <DormerWindow position={[2.5, 9.6, 3.5]} />
    </group>
  );
}

function DormerWindow({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Dormer box */}
      <mesh castShadow>
        <boxGeometry args={[2, 1.8, 1.2]} />
        <meshStandardMaterial color={WALL_PINK} roughness={0.4} />
      </mesh>
      {/* Dormer window glass */}
      <mesh position={[0, 0, 0.62]}>
        <boxGeometry args={[1.2, 1.1, 0.05]} />
        <meshStandardMaterial color={GLASS_BLUE} roughness={0} metalness={0.2} transparent opacity={0.6} />
      </mesh>
      {/* Dormer mini roof */}
      <mesh position={[0, 1.3, 0]} rotation={[-0.4, 0, 0]} castShadow>
        <boxGeometry args={[2.3, 0.15, 1.6]} />
        <meshStandardMaterial color={ROOF_DARK} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ── Windows ───────────────────────────────────────────────

function WindowUnit({
  position,
  width = 1.5,
  height = 1.8,
}: {
  position: [number, number, number];
  width?: number;
  height?: number;
}) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[width + 0.18, height + 0.18, 0.1]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.1} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[width, height, 0.06]} />
        <meshStandardMaterial color={GLASS_BLUE} roughness={0} metalness={0.15} transparent opacity={0.55} />
      </mesh>
      {/* Cross divider H */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[width + 0.06, 0.06, 0.04]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.3} />
      </mesh>
      {/* Cross divider V */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.06, height + 0.06, 0.04]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.3} />
      </mesh>
      {/* Window sill */}
      <mesh position={[0, -(height / 2 + 0.08), 0.06]}>
        <boxGeometry args={[width + 0.4, 0.12, 0.2]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Windows() {
  // Ground floor front windows
  const gfFront: [number, number, number][] = [
    [-3.5, 2.0, 4.06],
    [3.5, 2.0, 4.06],
  ];
  // Upper floor front windows
  const ufFront: [number, number, number][] = [
    [-3.2, 6.3, 4.42],
    [0, 6.3, 4.42],
    [3.2, 6.3, 4.42],
  ];
  // Side windows
  const sides: { pos: [number,number,number]; rot: [number,number,number] }[] = [
    { pos: [6.06, 2.0, 0.5],  rot: [0, Math.PI/2, 0] },
    { pos: [6.06, 2.0, -2.5], rot: [0, Math.PI/2, 0] },
    { pos: [-6.06, 2.0, 0.5], rot: [0, -Math.PI/2, 0] },
    { pos: [-6.06, 2.0, -2.5],rot: [0, -Math.PI/2, 0] },
    { pos: [5.56, 6.3, 0],    rot: [0, Math.PI/2, 0] },
    { pos: [-5.56, 6.3, 0],   rot: [0, -Math.PI/2, 0] },
  ];

  return (
    <group>
      {gfFront.map((pos, i) => (
        <WindowUnit key={`gf-${i}`} position={pos} width={1.5} height={1.8} />
      ))}
      {ufFront.map((pos, i) => (
        <WindowUnit key={`uf-${i}`} position={pos} width={1.3} height={1.6} />
      ))}
      {sides.map((s, i) => (
        <group key={`side-${i}`} position={s.pos} rotation={s.rot}>
          <WindowUnit position={[0, 0, 0]} width={1.3} height={1.6} />
        </group>
      ))}
    </group>
  );
}

// ── Front Door ────────────────────────────────────────────

function FrontDoor() {
  const ref = useRef<THREE.Group>(null!);
  return (
    <group ref={ref} position={[0, 1.3, 4.1]}>
      {/* Door frame */}
      <mesh>
        <boxGeometry args={[1.9, 2.85, 0.12]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.1} />
      </mesh>
      {/* Left door panel */}
      <mesh position={[-0.44, 0, 0.07]}>
        <boxGeometry args={[0.84, 2.6, 0.08]} />
        <meshStandardMaterial color={DOOR_GOLD} roughness={0.2} metalness={0.5} />
      </mesh>
      {/* Right door panel */}
      <mesh position={[0.44, 0, 0.07]}>
        <boxGeometry args={[0.84, 2.6, 0.08]} />
        <meshStandardMaterial color={DOOR_GOLD} roughness={0.2} metalness={0.5} />
      </mesh>
      {/* Door handles */}
      <mesh position={[-0.06, 0, 0.14]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FFF8E1" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.06, 0, 0.14]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FFF8E1" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Door arch */}
      <mesh position={[0, 1.55, 0.04]}>
        <torusGeometry args={[0.94, 0.12, 8, 20, Math.PI]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} />
      </mesh>
      {/* Door steps */}
      <mesh position={[0, -1.55, 0.3]}>
        <boxGeometry args={[2.5, 0.15, 0.6]} />
        <meshStandardMaterial color="#EEE0E5" roughness={0.5} />
      </mesh>
      <mesh position={[0, -1.65, 0.7]}>
        <boxGeometry args={[3, 0.15, 0.6]} />
        <meshStandardMaterial color="#E8D8DC" roughness={0.5} />
      </mesh>
      {/* Door light */}
      <pointLight position={[0, 1.8, 0.5]} color="#FFF8E1" intensity={1.5} distance={5} decay={2} />
    </group>
  );
}

// ── Balcony ───────────────────────────────────────────────

function Balcony() {
  return (
    <group position={[0, 4.4, 4.5]}>
      {/* Balcony floor */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.5, 0.2, 2.0]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Railing posts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-4 + i * 0.9, 0.55, 0.9]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 7]} />
          <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.2} />
        </mesh>
      ))}
      {/* Top railing bar */}
      <mesh position={[0, 1.0, 0.9]}>
        <boxGeometry args={[8.5, 0.1, 0.1]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} metalness={0.2} />
      </mesh>
      {/* Side rails */}
      <mesh position={[-4.2, 0.55, 0.4]}>
        <boxGeometry args={[0.08, 0.9, 1.1]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} />
      </mesh>
      <mesh position={[4.2, 0.55, 0.4]}>
        <boxGeometry args={[0.08, 0.9, 1.1]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.25} />
      </mesh>
      {/* Flower pots on balcony */}
      <FlowerPot position={[-3.5, 0.2, 0.7]} color="#FF80AB" />
      <FlowerPot position={[0, 0.2, 0.7]} color="#CE93D8" />
      <FlowerPot position={[3.5, 0.2, 0.7]} color="#FF80AB" />
    </group>
  );
}

// ── SNEHA'S HOME Sign ─────────────────────────────────────

function HomeSign() {
  return (
    <group position={[0, 8.8, 4.0]}>
      {/* Sign background panel */}
      <mesh castShadow>
        <boxGeometry args={[5.5, 1.0, 0.12]} />
        <meshStandardMaterial color={TRIM_WHITE} roughness={0.2} metalness={0.05} />
      </mesh>
      {/* Gold border */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[5.7, 1.2, 0.08]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.6} emissive={GOLD} emissiveIntensity={0.15} />
      </mesh>
      {/* Text */}
      <Text
        position={[0, 0.05, 0.1]}
        fontSize={0.38}
        color="#E91E8C"
        anchorX="center"
        anchorY="middle"
        outlineColor={TRIM_WHITE}
        outlineWidth={0.012}
        font="/fonts/Pacifico-Regular.ttf"
        letterSpacing={0.02}
      >
        Sneha's Home
      </Text>
      {/* Decorative star each side */}
      <mesh position={[-2.5, 0, 0.1]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[2.5, 0, 0.1]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Sign glow */}
      <pointLight position={[0, 0, 0.8]} color="#FF80AB" intensity={1.2} distance={5} decay={2} />
    </group>
  );
}

// ── Chimney ────────────────────────────────────────────────

function Chimney({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 1.5, 0.7]} />
        <meshStandardMaterial color="#EEE0E5" roughness={0.6} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.95, 0.2, 0.95]} />
        <meshStandardMaterial color={ROOF_DARK} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ── Property Fence ────────────────────────────────────────

function PropertyFence() {
  const posts: { start: [number,number,number]; end: [number,number,number] }[] = [
    // Front left
    { start: [-14, 0, 16.5], end: [-14, 0, -17] },
    // Front right
    { start: [14, 0, 16.5], end: [14, 0, -17] },
    // Back
    { start: [-14, 0, -17], end: [14, 0, -17] },
    // Front (split for gate)
    { start: [-14, 0, 16.5], end: [-2.5, 0, 16.5] },
    { start: [2.5, 0, 16.5], end: [14, 0, 16.5] },
  ];

  return (
    <group>
      {/* Render fence segments */}
      {posts.map((seg, i) => (
        <FenceSegment key={i} start={seg.start} end={seg.end} />
      ))}

      {/* Gate posts */}
      <FencePost position={[-2.5, 0, 16.5]} tall />
      <FencePost position={[2.5, 0, 16.5]} tall />

      {/* Gate arch */}
      <mesh position={[0, 2.3, 16.5]}>
        <torusGeometry args={[2.4, 0.12, 8, 20, Math.PI]} />
        <meshStandardMaterial color={FENCE_WHITE} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Gate arch flowers */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 2.55, 16.5]}>
          <sphereGeometry args={[0.14, 8, 8]} />
          <meshStandardMaterial color={FLOWER_PINK} emissive={FLOWER_PINK} emissiveIntensity={0.3} roughness={0.3} />
        </mesh>
      ))}
      {/* Gate sign */}
      <Suspense fallback={null}>
        <Text position={[0, 1.75, 16.52]} fontSize={0.22} color="#E91E8C" anchorX="center" anchorY="middle" letterSpacing={0.06}>
          ✦ WELCOME ✦
        </Text>
      </Suspense>
    </group>
  );
}

function FenceSegment({ start, end }: { start: [number,number,number]; end: [number,number,number] }) {
  const midX = (start[0] + end[0]) / 2;
  const midZ = (start[2] + end[2]) / 2;
  const len = Math.sqrt(
    (end[0] - start[0]) ** 2 + (end[2] - start[2]) ** 2
  );
  const angle = Math.atan2(end[0] - start[0], end[2] - start[2]);
  const postCount = Math.floor(len / 1.2);

  return (
    <group>
      {/* Rail top */}
      <mesh position={[midX, 0.95, midZ]} rotation={[0, angle, 0]}>
        <boxGeometry args={[0.08, 0.08, len]} />
        <meshStandardMaterial color={FENCE_WHITE} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Rail mid */}
      <mesh position={[midX, 0.55, midZ]} rotation={[0, angle, 0]}>
        <boxGeometry args={[0.06, 0.06, len]} />
        <meshStandardMaterial color={FENCE_WHITE} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Pickets */}
      {Array.from({ length: postCount }).map((_, i) => {
        const t = i / postCount;
        const px = start[0] + (end[0] - start[0]) * t;
        const pz = start[2] + (end[2] - start[2]) * t;
        return <FencePost key={i} position={[px, 0, pz]} />;
      })}
    </group>
  );
}

function FencePost({ position, tall = false }: { position: [number,number,number]; tall?: boolean }) {
  const h = tall ? 2.4 : 1.1;
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[0.1, h, 0.1]} />
        <meshStandardMaterial color={FENCE_WHITE} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Post cap */}
      <mesh position={[0, h + 0.08, 0]}>
        <sphereGeometry args={[0.09, 6, 6]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  );
}

// ── Front Driveway Path ────────────────────────────────────

function FrontPath() {
  return (
    <group>
      {/* Main path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 11]} receiveShadow>
        <planeGeometry args={[3.5, 14]} />
        <meshStandardMaterial color={STONE_GREY} roughness={0.6} />
      </mesh>
      {/* Path stones */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 5 + i * 1.3]}>
          <planeGeometry args={[3.0, 0.95]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#EEE5E8' : '#E8DDE0'} roughness={0.7} />
        </mesh>
      ))}
      {/* Side path left */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7.5, -0.02, 3]}>
        <planeGeometry args={[2, 14]} />
        <meshStandardMaterial color={STONE_GREY} roughness={0.6} />
      </mesh>
      {/* Side path right */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7.5, -0.02, 3]}>
        <planeGeometry args={[2, 14]} />
        <meshStandardMaterial color={STONE_GREY} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ── Garden Trees ──────────────────────────────────────────

function GardenTrees() {
  const positions: [number,number,number][] = [
    [-11, 0, 5], [11, 0, 5],
    [-12, 0, -5], [12, 0, -5],
    [-10, 0, -12], [10, 0, -12],
    [-13, 0, 12], [13, 0, 12],
  ];
  return (
    <group>
      {positions.map((pos, i) => (
        <GardenTree key={i} position={pos} scale={0.8 + (i % 3) * 0.2} />
      ))}
    </group>
  );
}

function GardenTree({ position, scale = 1 }: { position: [number,number,number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null!);
  const spd = 0.15 + Math.random() * 0.1;
  const off = Math.random() * Math.PI * 2;

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(s.clock.elapsedTime * spd + off) * 0.02;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.28, 2.2, 8]} />
        <meshStandardMaterial color={TREE_BROWN} roughness={0.8} />
      </mesh>
      {/* Canopy layers */}
      <mesh position={[0, 3.0, 0]} castShadow>
        <sphereGeometry args={[1.5, 10, 10]} />
        <meshStandardMaterial color={TREE_GRN} roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.8, 0]} castShadow>
        <sphereGeometry args={[1.1, 10, 10]} />
        <meshStandardMaterial color="#81C784" roughness={0.7} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <sphereGeometry args={[0.7, 8, 8]} />
        <meshStandardMaterial color="#A5D6A7" roughness={0.7} />
      </mesh>
      {/* Pink blossom spots */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.9, 3.2, Math.cos(a) * 0.9]}>
            <sphereGeometry args={[0.22, 7, 7]} />
            <meshStandardMaterial color="#F8BBD0" roughness={0.5} transparent opacity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Flower Beds ───────────────────────────────────────────

function FlowerBeds() {
  return (
    <group>
      {/* Front left flower bed */}
      <FlowerBed position={[-5.5, 0, 5.5]} width={3} depth={1.5} />
      {/* Front right flower bed */}
      <FlowerBed position={[5.5, 0, 5.5]} width={3} depth={1.5} />
      {/* Left side bed */}
      <FlowerBed position={[-9, 0, -1]} width={1.5} depth={5} />
      {/* Right side bed */}
      <FlowerBed position={[9, 0, -1]} width={1.5} depth={5} />
      {/* Back garden bed */}
      <FlowerBed position={[0, 0, -9]} width={8} depth={2} />
    </group>
  );
}

function FlowerBed({ position, width, depth }: { position: [number,number,number]; width: number; depth: number }) {
  const flowerColors = [FLOWER_PINK, '#FFD740', FLOWER_PRP, '#FFAB91', '#80DEEA'];
  const count = Math.floor(width * depth * 1.5);

  return (
    <group position={position}>
      {/* Soil */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.9} />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[width + 0.12, 0.12, depth + 0.12]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      {/* Flowers */}
      {Array.from({ length: count }).map((_, i) => {
        const fx = (Math.random() - 0.5) * (width - 0.3);
        const fz = (Math.random() - 0.5) * (depth - 0.3);
        return (
          <BedFlower
            key={i}
            position={[fx, 0, fz]}
            color={flowerColors[i % flowerColors.length]}
          />
        );
      })}
    </group>
  );
}

function BedFlower({ position, color }: { position: [number,number,number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.35, 5]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.055, 7, 7]} />
        <meshStandardMaterial color={FLOWER_YLW} roughness={0.3} emissive={FLOWER_YLW} emissiveIntensity={0.2} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.085, 0.38, Math.cos(a) * 0.085]} rotation={[0, a, Math.PI / 7]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Hedges ────────────────────────────────────────────────

function Hedges() {
  return (
    <group>
      {/* Left hedge row */}
      <HedgeRow start={[-13, 0, -5]} end={[-13, 0, 14]} />
      {/* Right hedge row */}
      <HedgeRow start={[13, 0, -5]} end={[13, 0, 14]} />
    </group>
  );
}

function HedgeRow({ start, end }: { start: [number,number,number]; end: [number,number,number] }) {
  const len = Math.sqrt((end[0]-start[0])**2 + (end[2]-start[2])**2);
  const count = Math.floor(len / 1.5);
  const mx = (start[0]+end[0])/2;
  const mz = (start[2]+end[2])/2;
  const ang = Math.atan2(end[0]-start[0], end[2]-start[2]);

  return (
    <group position={[mx, 0, mz]} rotation={[0, ang, 0]}>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 1.1, len]} />
        <meshStandardMaterial color={HEDGE_GRN} roughness={0.8} />
      </mesh>
      {/* Hedge top rounded nubs */}
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, 1.15, -len/2 + 0.75 + i*1.5]}>
          <sphereGeometry args={[0.52, 7, 5]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ── House Decorations ─────────────────────────────────────

function HouseDecorations() {
  return (
    <group>
      {/* Star decorations above windows */}
      {[-3.5, 3.5].map((x, i) => (
        <mesh key={i} position={[x, 3.4, 4.1]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.4} roughness={0.1} metalness={0.8} />
        </mesh>
      ))}

      {/* Roof decorative balls */}
      {[-5.5, -2, 0, 2, 5.5].map((x, i) => (
        <mesh key={i} position={[x, 11.05, 0]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.35} roughness={0.1} metalness={0.8} />
        </mesh>
      ))}

      {/* Flower pots flanking door */}
      <FlowerPot position={[-1.3, 0, 4.5]} color="#FF80AB" />
      <FlowerPot position={[1.3, 0, 4.5]} color="#CE93D8" />

      {/* Bird bath in garden */}
      <BirdBath position={[-8, 0, 8]} />
      <BirdBath position={[8, 0, 8]} />
    </group>
  );
}

function FlowerPot({ position, color }: { position: [number,number,number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.14, 0.4, 10]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.6} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.06, 10]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      {/* Flowers */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.1, 7, 7]} />
        <meshStandardMaterial color={color} roughness={0.4} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 5]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
    </group>
  );
}

function BirdBath({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#EEE0E5" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.45, 0.35, 0.12, 16]} />
        <meshStandardMaterial color="#EEE0E5" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.04, 16]} />
        <meshStandardMaterial color="#AADDFF" roughness={0} metalness={0.1} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// ── Outdoor Lights ────────────────────────────────────────

function OutdoorLights() {
  const lampPositions: [number,number,number][] = [
    [-4.5, 0, 5.5], [4.5, 0, 5.5],   // flank door
    [-12, 0, 5], [12, 0, 5],           // garden
    [-12, 0, -8], [12, 0, -8],         // rear
    [0, 0, 13], [-8, 0, 13], [8, 0, 13], // fence line
  ];

  return (
    <group>
      {lampPositions.map((pos, i) => (
        <HouseLamp key={i} position={pos} />
      ))}
    </group>
  );
}

function HouseLamp({ position }: { position: [number,number,number] }) {
  const globeRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (globeRef.current) {
      const m = globeRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 1.6 + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 2.2, 7]} />
        <meshStandardMaterial color="#BDBDBD" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh ref={globeRef} position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.15, 10, 10]} />
        <meshStandardMaterial color="#FFFDE7" emissive="#FFFACD" emissiveIntensity={0.55} roughness={0.1} transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, 2.3, 0]} color="#FFFDE7" intensity={1.0} distance={6} decay={2} />
    </group>
  );
}
