// ============================================================
// SNEHA WORLD — Player Character (Barbie Princess with Sneha Features)
// Hand-crafted 3D sculpted facial likeness with Red Bindi, Golden Nose Ring (Nath),
// Princess Tiara, Jhumkas, Silky Hair & Royal Barbie Ballgown!
// ============================================================

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameStore } from '../../stores/gameStore';

// Movement constants
const WALK_SPEED = 4.8;
const RUN_SPEED  = 7.8;
const ROT_SPEED  = 12.0;

// Barbie Princess Palette
const C_SKIN    = '#FDDEC0';
const C_SKIN_LT = '#FFE6CC';
const C_BLUSH   = '#FF80AB';
const C_HAIR    = '#1B1310';
const C_DRESS_1 = '#FF1493'; // Iconic Barbie Hot Pink
const C_DRESS_2 = '#FF80AB'; // Soft Pink Shimmer
const C_GOLD    = '#FFD700'; // Royal Gold trim
const C_TIARA   = '#FFE082';
const C_GEM     = '#FF1493';
const C_BINDI   = '#E53935';
const C_LIP     = '#D81B60';

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
  const headRef   = useRef<THREE.Group>(null!);

  // Create materials once
  const mats = useMemo(() => ({
    skin:    new THREE.MeshStandardMaterial({ color: C_SKIN,    roughness: 0.55 }),
    skinLt:  new THREE.MeshStandardMaterial({ color: C_SKIN_LT, roughness: 0.55 }),
    blush:   new THREE.MeshStandardMaterial({ color: C_BLUSH,   roughness: 0.8, transparent: true, opacity: 0.45 }),
    hair:    new THREE.MeshStandardMaterial({ color: C_HAIR,    roughness: 0.3, metalness: 0.1 }),
    dress1:  new THREE.MeshStandardMaterial({ color: C_DRESS_1, roughness: 0.2,  metalness: 0.25, emissive: C_DRESS_1, emissiveIntensity: 0.15 }),
    dress2:  new THREE.MeshStandardMaterial({ color: C_DRESS_2, roughness: 0.25, metalness: 0.15 }),
    gold:    new THREE.MeshStandardMaterial({ color: C_GOLD,    roughness: 0.15, metalness: 0.85, emissive: C_GOLD, emissiveIntensity: 0.25 }),
    tiara:   new THREE.MeshStandardMaterial({ color: C_TIARA,   roughness: 0.1,  metalness: 0.9, emissive: '#FFD700', emissiveIntensity: 0.4 }),
    gem:     new THREE.MeshStandardMaterial({ color: C_GEM,     roughness: 0.05, metalness: 0.3, emissive: C_GEM, emissiveIntensity: 0.8 }),
    bindi:   new THREE.MeshStandardMaterial({ color: C_BINDI,   roughness: 0.4,  emissive: C_BINDI, emissiveIntensity: 0.5 }),
    eyes:    new THREE.MeshStandardMaterial({ color: '#160B08', roughness: 0.15 }),
    glint:   new THREE.MeshBasicMaterial({ color: '#FFFFFF' }),
    lip:     new THREE.MeshStandardMaterial({ color: C_LIP,     roughness: 0.25, emissive: '#C2185B', emissiveIntensity: 0.2 }),
    shadow:  new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.22 }),
  }), []);

  useFrame((_, delta) => {
    if (!playerRef.current || phase !== 'playing') return;
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

    // Gentle realistic breathing and head tilt
    if (headRef.current) {
      const breath = Math.sin(bobRef.current * 1.2) * 0.015;
      headRef.current.position.y = 1.78 + breath;
      headRef.current.rotation.z = Math.sin(bobRef.current * 0.8) * 0.02;
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, 5]}>
      {/* Floating Overhead Name Tag */}
      <OverheadNameTag />

      {/* Ground Shadow Blob */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} material={mats.shadow}>
        <circleGeometry args={[0.55, 20]} />
      </mesh>

      {/* ══ GORGEOUS BARBIE BALLGOWN ══ */}
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

      {/* Royal Pearl Necklace */}
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 0.9 - Math.PI * 0.45;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.14, 1.48 - Math.abs(a) * 0.03, Math.cos(a) * 0.14]} material={mats.gold}>
            <sphereGeometry args={[0.016, 6, 6]} />
          </mesh>
        );
      })}

      {/* ══ SCULPTED 3D PRINCESS FACE & HEAD ══ */}
      <group ref={headRef} position={[0, 1.78, 0]}>
        {/* Head Base Mesh */}
        <mesh castShadow material={mats.skin}>
          <sphereGeometry args={[0.215, 20, 20]} />
        </mesh>

        {/* Rosy Cheek Blush */}
        <mesh position={[0.11, 0.0, 0.17]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <primitive object={mats.blush} />
        </mesh>
        <mesh position={[-0.11, 0.0, 0.17]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <primitive object={mats.blush} />
        </mesh>

        {/* 🔴 SNEHA'S SIGNATURE RED BINDI 🔴 */}
        <mesh position={[0, 0.08, 0.205]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <primitive object={mats.bindi} />
        </mesh>

        {/* 💛 GOLDEN NOSE STUD (NATH) 💛 */}
        <mesh position={[0.038, -0.01, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.012, 0.0035, 6, 12]} />
          <primitive object={mats.gold} />
        </mesh>

        {/* Big Expressive Barbie Eyes */}
        <mesh position={[0.076, 0.035, 0.195]} material={mats.eyes}>
          <sphereGeometry args={[0.028, 10, 10]} />
        </mesh>
        <mesh position={[-0.076, 0.035, 0.195]} material={mats.eyes}>
          <sphereGeometry args={[0.028, 10, 10]} />
        </mesh>
        {/* Diamond Eye Glints */}
        <mesh position={[0.084, 0.045, 0.212]} material={mats.glint}>
          <sphereGeometry args={[0.009, 6, 6]} />
        </mesh>
        <mesh position={[-0.068, 0.045, 0.212]} material={mats.glint}>
          <sphereGeometry args={[0.009, 6, 6]} />
        </mesh>

        {/* Sweet Smiling Lips */}
        <mesh position={[0, -0.055, 0.205]} rotation={[0.05, 0, 0]} material={mats.lip}>
          <capsuleGeometry args={[0.02, 0.065, 4, 8]} />
        </mesh>

        {/* Long Flowing Silky Hair */}
        <mesh position={[0, 0.16, -0.02]} material={mats.hair}>
          <sphereGeometry args={[0.23, 18, 18]} />
        </mesh>
        {/* Hair flowing back & sides */}
        <mesh position={[-0.14, -0.2, -0.09]} rotation={[0.15, 0.12, 0.08]} material={mats.hair}>
          <capsuleGeometry args={[0.11, 0.75, 6, 12]} />
        </mesh>
        <mesh position={[0.14, -0.2, -0.09]} rotation={[0.15, -0.12, -0.08]} material={mats.hair}>
          <capsuleGeometry args={[0.11, 0.75, 6, 12]} />
        </mesh>
        <mesh position={[0, -0.26, -0.15]} rotation={[0.2, 0, 0]} material={mats.hair}>
          <capsuleGeometry args={[0.12, 0.8, 6, 12]} />
        </mesh>

        {/* 👑 GOLDEN PRINCESS TIARA 👑 */}
        <group position={[0, 0.27, 0.08]} rotation={[-0.2, 0, 0]}>
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

        {/* Jhumka Earrings */}
        <JhumkaEarring position={[0.22, -0.01, 0.03]} goldMat={mats.gold} />
        <JhumkaEarring position={[-0.22, -0.01, 0.03]} goldMat={mats.gold} />
      </group>

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
    </group>
  );
}

// ── Horizontal Floating Overhead Name Tag (Clean & No vertical beam) ──

function OverheadNameTag() {
  const textRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = 2.45 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
    }
  });

  return (
    <group ref={textRef} position={[0, 2.45, 0]}>
      {/* Horizontal Rounded Backing Pill */}
      <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.22, 1.8, 8, 16]} />
        <meshBasicMaterial color="#FF1493" transparent opacity={0.7} />
      </mesh>
      {/* Name Text */}
      <Text
        position={[0, 0.07, 0]}
        fontSize={0.22}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Pacifico-Regular.ttf"
        outlineColor="#880E4F"
        outlineWidth={0.03}
      >
        👑 SNEHA 👑
      </Text>
      <Text
        position={[0, -0.11, 0]}
        fontSize={0.11}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000000"
        outlineWidth={0.02}
      >
        The Most Beautiful Girl in the World ✨
      </Text>
    </group>
  );
}

// ── Jhumka Earring ───────────────────────────────────────────

function JhumkaEarring({ position, goldMat }: { position: [number, number, number]; goldMat: THREE.Material }) {
  return (
    <group position={position}>
      <mesh material={goldMat}>
        <sphereGeometry args={[0.014, 6, 6]} />
      </mesh>
      <mesh position={[0, -0.03, 0]} material={goldMat}>
        <cylinderGeometry args={[0.003, 0.003, 0.04, 4]} />
      </mesh>
      <mesh position={[0, -0.06, 0]} material={goldMat}>
        <coneGeometry args={[0.022, 0.035, 8]} />
      </mesh>
    </group>
  );
}

// ── Animated Leg ─────────────────────────────────────────────

function AnimatedLeg({
  side,
  bobRef,
  movingRef,
  skinMat,
}: {
  side: number;
  bobRef: React.MutableRefObject<number>;
  movingRef: React.MutableRefObject<boolean>;
  skinMat: THREE.Material;
}) {
  const legRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!legRef.current) return;
    if (movingRef.current) {
      legRef.current.position.z = Math.sin(bobRef.current + (side > 0 ? 0 : Math.PI)) * 0.22;
      legRef.current.position.y = 0.28 + Math.abs(Math.cos(bobRef.current)) * 0.06;
    } else {
      legRef.current.position.z = 0;
      legRef.current.position.y = 0.28;
    }
  });

  return (
    <mesh
      ref={legRef}
      position={[side * 0.12, 0.28, 0]}
      castShadow
      material={skinMat}
    >
      <capsuleGeometry args={[0.055, 0.5, 6, 10]} />
    </mesh>
  );
}
