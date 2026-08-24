// ============================================================
// SNEHA WORLD — Prissi & Gunnu on the Royal Flower Jhula (Swing)
// Two cute friends enjoying on an animated swinging golden jhula!
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#FFD700';
const PINK_HOT = '#FF1493';
const PINK_LIGHT = '#FF80AB';
const WHITE = '#FFFFFF';

export function PrissiAndGunnuJhula({ position = [10, 0, 18], rotation = [0, -Math.PI / 6, 0] }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const swing1Ref = useRef<THREE.Group>(null!);
  const swing2Ref = useRef<THREE.Group>(null!);
  const bubbleRef = useRef<THREE.Group>(null!);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    // Animated swinging motion with realistic pendulum arc
    if (swing1Ref.current) {
      swing1Ref.current.rotation.x = Math.sin(t * 1.8) * 0.35;
    }
    if (swing2Ref.current) {
      swing2Ref.current.rotation.x = Math.sin(t * 1.8 + 0.8) * 0.35;
    }
    if (bubbleRef.current) {
      bubbleRef.current.position.y = 3.6 + Math.sin(t * 2) * 0.08;
    }
  });

  return (
    <group name="prissi-and-gunnu-jhula" position={position} rotation={rotation}>
      {/* ── Flower Lawn Base ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[4.5, 24]} />
        <meshStandardMaterial color="#FCE4EC" roughness={0.5} />
      </mesh>
      {/* Golden Floral Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[4.2, 4.5, 24]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* ── Grand Golden Jhula Frame ── */}
      {/* Left A-Frame Support */}
      <mesh position={[-2.4, 2.2, -0.6]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 4.6, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
      </mesh>
      <mesh position={[-2.4, 2.2, 0.6]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 4.6, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Right A-Frame Support */}
      <mesh position={[2.4, 2.2, -0.6]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 4.6, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
      </mesh>
      <mesh position={[2.4, 2.2, 0.6]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 4.6, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Top Crossbar */}
      <mesh position={[0, 4.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 5.2, 12]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Pink Rose Flower Garlands on Crossbar */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-2.0 + i * 0.5, 4.4, 0]}>
          <sphereGeometry args={[0.14, 8, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? PINK_HOT : PINK_LIGHT} emissive={PINK_HOT} emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* ── Swing 1: PRISSI ── */}
      <group position={[-1.1, 4.4, 0]}>
        <group ref={swing1Ref}>
          {/* Gold Chains */}
          {[-0.45, 0.45].map((x, i) => (
            <mesh key={i} position={[x, -1.8, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 3.6, 6]} />
              <meshStandardMaterial color={GOLD} metalness={0.9} />
            </mesh>
          ))}
          {/* Wooden Swing Plank */}
          <mesh position={[0, -3.6, 0]} castShadow>
            <boxGeometry args={[1.1, 0.1, 0.45]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.6} />
          </mesh>

          {/* 👧 Prissi Character Figure (Sitting on Swing) */}
          <group position={[0, -3.2, 0]}>
            {/* Prissi Cute Lavender / Pink Dress */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.32, 0.5, 12]} />
              <meshStandardMaterial color="#CE93D8" roughness={0.4} />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 0.58, 0]} castShadow>
              <capsuleGeometry args={[0.14, 0.25, 6, 10]} />
              <meshStandardMaterial color="#CE93D8" roughness={0.4} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.88, 0]} castShadow>
              <sphereGeometry args={[0.16, 12, 12]} />
              <meshStandardMaterial color="#FDDEC0" roughness={0.6} />
            </mesh>
            {/* Hair: Cute Brunette Pigtails with Pink Bows */}
            <mesh position={[0, 0.95, -0.04]}>
              <sphereGeometry args={[0.17, 10, 10]} />
              <meshStandardMaterial color="#4E342E" roughness={0.3} />
            </mesh>
            {[-0.18, 0.18].map((x, i) => (
              <mesh key={i} position={[x, 0.95, -0.08]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color={PINK_HOT} />
              </mesh>
            ))}
            {/* Happy Eyes */}
            {[-0.05, 0.05].map((x, i) => (
              <mesh key={i} position={[x, 0.9, 0.14]}>
                <sphereGeometry args={[0.02, 6, 6]} />
                <meshStandardMaterial color="#111111" />
              </mesh>
            ))}

            {/* Overhead Tag: PRISSI */}
            <Text position={[0, 1.25, 0]} fontSize={0.16} color="#CE93D8" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#1A0028" outlineWidth={0.02}>
              🌸 PRISSI 🌸
            </Text>
          </group>
        </group>
      </group>

      {/* ── Swing 2: GUNNU ── */}
      <group position={[1.1, 4.4, 0]}>
        <group ref={swing2Ref}>
          {/* Gold Chains */}
          {[-0.45, 0.45].map((x, i) => (
            <mesh key={i} position={[x, -1.8, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 3.6, 6]} />
              <meshStandardMaterial color={GOLD} metalness={0.9} />
            </mesh>
          ))}
          {/* Wooden Swing Plank */}
          <mesh position={[0, -3.6, 0]} castShadow>
            <boxGeometry args={[1.1, 0.1, 0.45]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.6} />
          </mesh>

          {/* 👧 Gunnu Character Figure (Sitting on Swing) */}
          <group position={[0, -3.2, 0]}>
            {/* Gunnu Cute Yellow / Peach Dress */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.32, 0.5, 12]} />
              <meshStandardMaterial color="#FFD54F" roughness={0.4} />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 0.58, 0]} castShadow>
              <capsuleGeometry args={[0.14, 0.25, 6, 10]} />
              <meshStandardMaterial color="#FFD54F" roughness={0.4} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.88, 0]} castShadow>
              <sphereGeometry args={[0.16, 12, 12]} />
              <meshStandardMaterial color="#FDDEC0" roughness={0.6} />
            </mesh>
            {/* Hair: Long Dark Hair with Golden Hairband */}
            <mesh position={[0, 0.95, -0.04]}>
              <sphereGeometry args={[0.17, 10, 10]} />
              <meshStandardMaterial color="#212121" roughness={0.3} />
            </mesh>
            <mesh position={[0, 1.0, 0]}>
              <torusGeometry args={[0.16, 0.02, 6, 16, Math.PI]} />
              <meshStandardMaterial color={GOLD} metalness={0.8} />
            </mesh>
            {/* Happy Eyes */}
            {[-0.05, 0.05].map((x, i) => (
              <mesh key={i} position={[x, 0.9, 0.14]}>
                <sphereGeometry args={[0.02, 6, 6]} />
                <meshStandardMaterial color="#111111" />
              </mesh>
            ))}

            {/* Overhead Tag: GUNNU */}
            <Text position={[0, 1.25, 0]} fontSize={0.16} color="#FFD54F" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#1A0028" outlineWidth={0.02}>
              ✨ GUNNU ✨
            </Text>
          </group>
        </group>
      </group>

      {/* ── Cheerful Shared Speech Banner ── */}
      <group ref={bubbleRef} position={[0, 3.6, 0]}>
        <mesh>
          <boxGeometry args={[4.2, 0.5, 0.08]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
        <Text position={[0, 0, 0.05]} fontSize={0.14} color="#D81B60" anchorX="center" anchorY="middle" fontWeight={800}>
          "Yay! Sneha Di is the Queen of the World! 💖👭"
        </Text>
      </group>
    </group>
  );
}
