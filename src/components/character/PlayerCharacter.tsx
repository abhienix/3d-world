// ============================================================
// SNEHA WORLD — Player Character (Sneha — Barbie Glamour Queen)
//
// Features:
//   - Warm dusky brown glowing skin
//   - Gorgeous long silky dark flowing hair
//   - Golden Princess Tiara with pink gems
//   - Sparkling Pink & Gold Barbie Royal Ballgown
//   - Red bindi on forehead + gold nose ring (nath)
//   - Jhumka earrings + gold bangles + delicate necklace
//   - Floating 3D Overhead Name Tag: "👑 SNEHA 👑"
// ============================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameStore } from '../../stores/gameStore';

const WALK_SPEED = 5.2;
const RUN_SPEED  = 9.5;
const ROT_SPEED  = 8.5;

// ── Color palette ─────────────────────────────────────────────
const C_SKIN     = '#C68642'; // Warm dusky brown
const C_SKIN_LT  = '#D4956A';
const C_HAIR     = '#1A1008'; // Dark flowing hair
const C_DRESS_1  = '#FF1493'; // Hot Pink Barbie
const C_DRESS_2  = '#FF80AB'; // Soft Pink Shimmer
const C_DRESS_3  = '#FFD700'; // Royal Gold trim
const C_GOLD     = '#FFD700';
const C_TIARA    = '#FFE082';
const C_BINDI    = '#E53935';
const C_LIP      = '#D81B60';

interface PlayerCharacterProps {
  playerRef: React.RefObject<THREE.Group | null>;
}

export function PlayerCharacter({ playerRef }: PlayerCharacterProps) {
  const keys      = useKeyboard();
  const phase     = useGameStore((s) => s.phase);
  const rotRef    = useRef(0);
  const bobRef    = useRef(0);
  const velRef    = useRef(new THREE.Vector3());
  const movingRef = useRef(false);

  // Create materials once
  const mats = useMemo(() => ({
    skin:    new THREE.MeshStandardMaterial({ color: C_SKIN,    roughness: 0.6 }),
    skinLt:  new THREE.MeshStandardMaterial({ color: C_SKIN_LT, roughness: 0.6 }),
    hair:    new THREE.MeshStandardMaterial({ color: C_HAIR,    roughness: 0.35, metalness: 0.1 }),
    dress1:  new THREE.MeshStandardMaterial({ color: C_DRESS_1, roughness: 0.2,  metalness: 0.25, emissive: C_DRESS_1, emissiveIntensity: 0.15 }),
    dress2:  new THREE.MeshStandardMaterial({ color: C_DRESS_2, roughness: 0.25, metalness: 0.15 }),
    gold:    new THREE.MeshStandardMaterial({ color: C_GOLD,    roughness: 0.15, metalness: 0.85, emissive: C_GOLD, emissiveIntensity: 0.25 }),
    tiara:   new THREE.MeshStandardMaterial({ color: C_TIARA,   roughness: 0.1,  metalness: 0.9, emissive: '#FFD700', emissiveIntensity: 0.4 }),
    gem:     new THREE.MeshStandardMaterial({ color: '#FF1493', roughness: 0.05, metalness: 0.3, emissive: '#FF1493', emissiveIntensity: 0.8 }),
    bindi:   new THREE.MeshStandardMaterial({ color: C_BINDI,   roughness: 0.4,  emissive: C_BINDI, emissiveIntensity: 0.4 }),
    eyes:    new THREE.MeshStandardMaterial({ color: '#1A0A05', roughness: 0.2 }),
    glint:   new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.1 }),
    lip:     new THREE.MeshStandardMaterial({ color: C_LIP,     roughness: 0.35 }),
    shadow:  new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.18 }),
  }), []);

  useFrame((_, delta) => {
    if (!playerRef.current) return;
    if (phase !== 'playing') return;

    const player = playerRef.current;
    const cameraYaw = (player as THREE.Group & { cameraYaw?: number }).cameraYaw ?? 0;

    let dx = 0, dz = 0;
    if (keys.current.forward)  dz -= 1;
    if (keys.current.backward) dz += 1;
    if (keys.current.left)     dx -= 1;
    if (keys.current.right)    dx += 1;

    const moving = dx !== 0 || dz !== 0;
    movingRef.current = moving;

    if (moving) {
      const angle = Math.atan2(dx, dz) + cameraYaw;
      const speed = keys.current.run ? RUN_SPEED : WALK_SPEED;
      velRef.current.set(Math.sin(angle) * speed, 0, Math.cos(angle) * speed);
      let diff = angle - rotRef.current;
      while (diff >  Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      rotRef.current += diff * Math.min(ROT_SPEED * delta, 1);
      player.rotation.y = rotRef.current;
      bobRef.current += delta * (keys.current.run ? 14 : 8.5);
    } else {
      velRef.current.multiplyScalar(0.82);
      bobRef.current += delta * 1.5;
    }

    player.position.addScaledVector(velRef.current, delta);
    const groundY = player.position.y > 20 ? 45.0 : 0;
    if (player.position.y < groundY) player.position.y = groundY;
  });

  return (
    <group ref={playerRef} position={[0, 0, 5]}>
      {/* Floating Overhead Name Tag */}
      <OverheadNameTag />

      {/* Ground Shadow Blob */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} material={mats.shadow}>
        <circleGeometry args={[0.55, 20]} />
      </mesh>

      {/* ══ GORGEOUS BARBIE DRESS ══ */}
      {/* Flared Lower Gown */}
      <mesh position={[0, 0.65, 0]} castShadow material={mats.dress1}>
        <cylinderGeometry args={[0.26, 0.58, 1.25, 24]} />
      </mesh>

      {/* Shimmer Ruffle Tier 1 */}
      <mesh position={[0, 0.45, 0]} material={mats.dress2}>
        <cylinderGeometry args={[0.38, 0.62, 0.5, 24]} />
      </mesh>

      {/* Gold Border Lace on Gown Hem */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.62, 24]} />
        <primitive object={mats.gold} />
      </mesh>

      {/* Corset / Bodice */}
      <mesh position={[0, 1.22, 0]} castShadow material={mats.dress1}>
        <capsuleGeometry args={[0.21, 0.38, 8, 16]} />
      </mesh>

      {/* Golden Belt with Heart Buckle */}
      <mesh position={[0, 1.05, 0]} material={mats.gold}>
        <torusGeometry args={[0.22, 0.025, 8, 24]} />
      </mesh>
      <mesh position={[0, 1.05, 0.22]} material={mats.gem}>
        <sphereGeometry args={[0.045, 8, 8]} />
      </mesh>

      {/* Neck & Collar */}
      <mesh position={[0, 1.54, 0]} material={mats.skinLt}>
        <cylinderGeometry args={[0.085, 0.1, 0.18, 12]} />
      </mesh>

      {/* Gold Royal Necklace */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = ((i - 3) / 7) * Math.PI * 0.6;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.14, 1.48 - Math.abs(a) * 0.03, Math.cos(a) * 0.14]} material={mats.gold}>
            <sphereGeometry args={[0.016, 6, 6]} />
          </mesh>
        );
      })}

      {/* ══ HEAD & FACE ══ */}
      <mesh position={[0, 1.78, 0]} castShadow material={mats.skin}>
        <sphereGeometry args={[0.215, 20, 20]} />
      </mesh>

      {/* Long Flowing Silky Hair */}
      <mesh position={[0, 1.94, -0.02]} material={mats.hair}>
        <sphereGeometry args={[0.23, 18, 18]} />
      </mesh>
      {/* Hair flowing back & sides */}
      <mesh position={[-0.14, 1.58, -0.09]} rotation={[0.15, 0.12, 0.08]} material={mats.hair}>
        <capsuleGeometry args={[0.11, 0.75, 6, 12]} />
      </mesh>
      <mesh position={[0.14, 1.58, -0.09]} rotation={[0.15, -0.12, -0.08]} material={mats.hair}>
        <capsuleGeometry args={[0.11, 0.75, 6, 12]} />
      </mesh>
      <mesh position={[0, 1.52, -0.15]} rotation={[0.2, 0, 0]} material={mats.hair}>
        <capsuleGeometry args={[0.12, 0.8, 6, 12]} />
      </mesh>

      {/* 👑 GOLDEN PRINCESS TIARA 👑 */}
      <group position={[0, 2.05, 0.08]} rotation={[-0.2, 0, 0]}>
        {/* Tiara Band */}
        <mesh material={mats.tiara}>
          <torusGeometry args={[0.16, 0.016, 6, 18, Math.PI]} />
        </mesh>
        {/* Crown Peaks */}
        {[-0.1, -0.05, 0, 0.05, 0.1].map((x, i) => (
          <mesh key={i} position={[x, (0.08 - Math.abs(x) * 0.4), 0]} material={mats.tiara}>
            <coneGeometry args={[0.022, 0.06 + (i === 2 ? 0.03 : 0), 4]} />
          </mesh>
        ))}
        {/* Ruby Center Gem */}
        <mesh position={[0, 0.06, 0.015]} material={mats.gem}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
      </group>

      {/* 🔴 RED BINDI 🔴 */}
      <mesh position={[0, 1.89, 0.215]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <primitive object={mats.bindi} />
      </mesh>

      {/* 💛 NOSE RING (NATH) 💛 */}
      <mesh position={[0.04, 1.77, 0.216]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.012, 0.0035, 6, 12]} />
        <primitive object={mats.gold} />
      </mesh>

      {/* Big Expressive Eyes */}
      <mesh position={[0.078, 1.815, 0.202]} material={mats.eyes}>
        <sphereGeometry args={[0.028, 10, 10]} />
      </mesh>
      <mesh position={[-0.078, 1.815, 0.202]} material={mats.eyes}>
        <sphereGeometry args={[0.028, 10, 10]} />
      </mesh>
      {/* Eye glints */}
      <mesh position={[0.086, 1.825, 0.216]} material={mats.glint}>
        <sphereGeometry args={[0.008, 6, 6]} />
      </mesh>
      <mesh position={[-0.07, 1.825, 0.216]} material={mats.glint}>
        <sphereGeometry args={[0.008, 6, 6]} />
      </mesh>

      {/* Rosy Lips */}
      <mesh position={[0, 1.745, 0.212]} rotation={[0.08, 0, 0]} material={mats.lip}>
        <capsuleGeometry args={[0.022, 0.065, 4, 8]} />
      </mesh>

      {/* Jhumka Earrings */}
      <JhumkaEarring position={[0.22, 1.77, 0.03]} goldMat={mats.gold} />
      <JhumkaEarring position={[-0.22, 1.77, 0.03]} goldMat={mats.gold} />

      {/* ══ ARMS & BANGLES ══ */}
      <mesh position={[0.3, 1.25, 0]} rotation={[0, 0, 0.35]} castShadow material={mats.skinLt}>
        <capsuleGeometry args={[0.065, 0.35, 6, 10]} />
      </mesh>
      <mesh position={[-0.3, 1.25, 0]} rotation={[0, 0, -0.35]} castShadow material={mats.skinLt}>
        <capsuleGeometry args={[0.065, 0.35, 6, 10]} />
      </mesh>

      {/* Gold Bangles */}
      <mesh position={[0.3, 1.05, 0]} rotation={[0, 0, 0.35]} material={mats.gold}>
        <torusGeometry args={[0.07, 0.012, 6, 16]} />
      </mesh>
      <mesh position={[-0.3, 1.05, 0]} rotation={[0, 0, -0.35]} material={mats.gold}>
        <torusGeometry args={[0.07, 0.012, 6, 16]} />
      </mesh>

      {/* ══ LEGS (animated) ══ */}
      <AnimatedLeg side={1}  bobRef={bobRef} movingRef={movingRef} skinMat={mats.skin} />
      <AnimatedLeg side={-1} bobRef={bobRef} movingRef={movingRef} skinMat={mats.skin} />

      {/* Glowing Aura Sparkle */}
      <pointLight position={[0, 1.5, 0.4]} color="#FF80AB" intensity={0.9} distance={4} decay={2} />
    </group>
  );
}

// ── Floating Overhead Name Tag ────────────────────────────────

function OverheadNameTag() {
  const ref = useRef<THREE.Group>(null!);
  const heartRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = 2.55 + Math.sin(s.clock.elapsedTime * 2) * 0.06;
    }
    if (heartRef.current) {
      heartRef.current.rotation.y = s.clock.elapsedTime * 3;
      heartRef.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 4) * 0.15);
    }
  });

  return (
    <group ref={ref}>
      {/* Background Plate */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.2, 0.65]} />
        <meshBasicMaterial color="#1A002A" transparent opacity={0.65} />
      </mesh>

      {/* Main Name */}
      <Text
        position={[0, 0.12, 0.02]}
        fontSize={0.26}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineColor="#FF1493"
        outlineWidth={0.02}
        font="/fonts/Pacifico-Regular.ttf"
      >
        👑 SNEHA 👑
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.12, 0.02]}
        fontSize={0.095}
        color="#FFB6C1"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        The Most Beautiful Girl in the World ✨
      </Text>

      {/* Floating Crown Heart on Top */}
      <mesh ref={heartRef} position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function JhumkaEarring({ position, goldMat }: { position: [number, number, number]; goldMat: THREE.Material }) {
  return (
    <group position={position}>
      <mesh material={goldMat}>
        <cylinderGeometry args={[0.022, 0.022, 0.015, 8]} />
      </mesh>
      <mesh position={[0, -0.035, 0]} material={goldMat}>
        <sphereGeometry args={[0.025, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </group>
  );
}

interface LegProps {
  side: 1 | -1;
  bobRef: React.RefObject<number>;
  movingRef: React.RefObject<boolean>;
  skinMat: THREE.MeshStandardMaterial;
}

function AnimatedLeg({ side, bobRef, movingRef, skinMat }: LegProps) {
  const legRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!legRef.current) return;
    if (movingRef.current) {
      legRef.current.rotation.x = Math.sin(bobRef.current + (side === 1 ? 0 : Math.PI)) * 0.4;
    } else {
      legRef.current.rotation.x *= 0.85;
    }
  });

  return (
    <mesh ref={legRef} position={[side * 0.1, 0.5, 0]} castShadow material={skinMat}>
      <capsuleGeometry args={[0.075, 0.44, 6, 10]} />
    </mesh>
  );
}
