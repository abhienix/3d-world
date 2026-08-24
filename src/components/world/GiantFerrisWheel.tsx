// ============================================================
// SNEHA WORLD — Giant Ferris Wheel (The Love Wonder Wheel)
// Animated rotating giant wheel with 8 glowing heart gondolas.
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const GONDOLA_COUNT = 8;
const WHEEL_RADIUS = 9.5;

export function GiantFerrisWheel({ position = [38, 0, -10] }: { position?: [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null!);
  const gondolaRefs = useRef<THREE.Group[]>([]);

  const GOLD = '#FFD700';
  const PINK = '#FF1493';
  const GONDOLA_COLORS = ['#FF1493', '#FF80AB', '#FFD700', '#CE93D8', '#80DEEA', '#FF4081', '#FFA726', '#E040FB'];

  useFrame((s) => {
    const rotSpeed = 0.25;
    const currentRot = s.clock.elapsedTime * rotSpeed;

    if (wheelRef.current) {
      wheelRef.current.rotation.z = currentRot;
    }

    // Keep gondolas hanging vertically while wheel rotates
    gondolaRefs.current.forEach((g) => {
      if (g) {
        g.rotation.z = -currentRot;
      }
    });
  });

  return (
    <group name="ferris-wheel" position={position} rotation={[0, -Math.PI / 6, 0]}>
      {/* ── Base Platform ── */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[11, 11.5, 0.4, 32]} />
        <meshStandardMaterial color="#FFF0F5" roughness={0.4} />
      </mesh>

      {/* ── A-Frame Support Legs ── */}
      {[-2.2, 2.2].map((z, zi) => (
        <group key={zi} position={[0, 0, z]}>
          <mesh position={[-4, 6, 0]} rotation={[0, 0, -0.42]} castShadow>
            <cylinderGeometry args={[0.2, 0.28, 14, 8]} />
            <meshStandardMaterial color={PINK} roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh position={[4, 6, 0]} rotation={[0, 0, 0.42]} castShadow>
            <cylinderGeometry args={[0.2, 0.28, 14, 8]} />
            <meshStandardMaterial color={PINK} roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* ── Center Axle ── */}
      <mesh position={[0, 11.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 5.2, 16]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} emissive={GOLD} emissiveIntensity={0.4} />
      </mesh>

      {/* ── Rotating Wheel Assembly ── */}
      <group ref={wheelRef} position={[0, 11.5, 0]}>
        {/* Outer Wheel Rim Rings */}
        {[-1.2, 1.2].map((z, zi) => (
          <group key={zi} position={[0, 0, z]}>
            <mesh>
              <torusGeometry args={[WHEEL_RADIUS, 0.12, 8, 36]} />
              <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.8} emissive={GOLD} emissiveIntensity={0.3} />
            </mesh>
            <mesh>
              <torusGeometry args={[WHEEL_RADIUS * 0.6, 0.08, 8, 28]} />
              <meshStandardMaterial color={PINK} roughness={0.3} metalness={0.4} />
            </mesh>

            {/* Spokes */}
            {Array.from({ length: GONDOLA_COUNT }).map((_, si) => {
              const angle = (si / GONDOLA_COUNT) * Math.PI * 2;
              return (
                <mesh key={si} position={[Math.sin(angle) * (WHEEL_RADIUS / 2), Math.cos(angle) * (WHEEL_RADIUS / 2), 0]} rotation={[0, 0, -angle]}>
                  <cylinderGeometry args={[0.04, 0.04, WHEEL_RADIUS, 6]} />
                  <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.7} />
                </mesh>
              );
            })}
          </group>
        ))}

        {/* 8 Gondola Cabins */}
        {Array.from({ length: GONDOLA_COUNT }).map((_, gi) => {
          const angle = (gi / GONDOLA_COUNT) * Math.PI * 2;
          const x = Math.sin(angle) * WHEEL_RADIUS;
          const y = Math.cos(angle) * WHEEL_RADIUS;

          return (
            <group
              key={gi}
              ref={(el) => { if (el) gondolaRefs.current[gi] = el; }}
              position={[x, y, 0]}
            >
              {/* Gondola Cabin Body */}
              <mesh position={[0, -0.7, 0]} castShadow>
                <boxGeometry args={[1.5, 1.3, 1.8]} />
                <meshStandardMaterial color={GONDOLA_COLORS[gi]} roughness={0.2} metalness={0.2} emissive={GONDOLA_COLORS[gi]} emissiveIntensity={0.2} />
              </mesh>
              {/* Canopy Roof */}
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 0.25, 16]} />
                <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
              </mesh>
              {/* Hanging Bar */}
              <mesh position={[0, 0.45, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
                <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
              </mesh>
              {/* Cabin Light */}
              <pointLight position={[0, -0.6, 0]} color={GONDOLA_COLORS[gi]} intensity={0.9} distance={5} decay={2} />
            </group>
          );
        })}
      </group>

      {/* ── Entrance Sign ── */}
      <Text position={[0, 2.8, 6.5]} fontSize={0.42} color="#FF1493" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#FFFFFF" outlineWidth={0.02}>
        The Wonder Wheel ♡
      </Text>
    </group>
  );
}
