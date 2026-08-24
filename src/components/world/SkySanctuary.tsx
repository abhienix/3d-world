// ============================================================
// SNEHA WORLD — Floating Sky Sanctuary
// Secret Cloud Island in the sky with crystal heart & love gazebo
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveObject } from '../interaction/InteractiveObject';

export function SkySanctuary() {
  const crystalHeartRef = useRef<THREE.Group>(null!);
  const waterfallRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (crystalHeartRef.current) {
      crystalHeartRef.current.rotation.y = s.clock.elapsedTime * 0.5;
      crystalHeartRef.current.position.y = 49 + Math.sin(s.clock.elapsedTime * 1.5) * 0.3;
    }
    if (waterfallRef.current) {
      const m = waterfallRef.current.material as THREE.MeshStandardMaterial;
      m.opacity = 0.65 + Math.sin(s.clock.elapsedTime * 3) * 0.15;
    }
  });

  return (
    <group name="sky-sanctuary">
      {/* ── Plaza Ground Teleport Pad ── */}
      <TeleportPad
        position={[6, 0.05, 0]}
        targetY={45.5}
        label="✨ Teleport to Sky Sanctuary"
        color="#FF80AB"
      />

      {/* ── Floating Cloud Island Base (y = 45) ── */}
      <group position={[0, 45, 0]}>
        {/* Island Core Platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <circleGeometry args={[14, 32]} />
          <meshStandardMaterial color="#FFF0F5" roughness={0.4} />
        </mesh>
        {/* Island Gold Rim */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[13.7, 14.2, 32]} />
          <meshStandardMaterial color="#FFD700" roughness={0.15} metalness={0.9} emissive="#FFD700" emissiveIntensity={0.3} />
        </mesh>

        {/* Fluffy Cloud Base Blobs Under Island */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = 12.5 + Math.sin(i * 2) * 1.5;
          return (
            <mesh key={i} position={[Math.sin(a) * r, -1.2, Math.cos(a) * r]}>
              <sphereGeometry args={[2.8, 10, 10]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.9} transparent opacity={0.85} />
            </mesh>
          );
        })}

        {/* ── Sky Return Teleport Pad ── */}
        <TeleportPad
          position={[0, 0.05, 10]}
          targetY={0.5}
          label="🌸 Return to Grand Plaza"
          color="#FF1493"
        />

        {/* ── Giant Spinning Diamond Heart in the Sky ── */}
        <group ref={crystalHeartRef} position={[0, 4, 0]}>
          <mesh position={[-0.9, 0.6, 0]}>
            <sphereGeometry args={[1.4, 16, 16]} />
            <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.8} roughness={0} metalness={0.2} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.9, 0.6, 0]}>
            <sphereGeometry args={[1.4, 16, 16]} />
            <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.8} roughness={0} metalness={0.2} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, -0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[2.6, 2.6, 1.2]} />
            <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.8} roughness={0} metalness={0.2} transparent opacity={0.9} />
          </mesh>
          <pointLight position={[0, 0, 0]} color="#FF1493" intensity={4} distance={20} decay={2} />
        </group>

        {/* ── Golden Gazebo of Eternal Love ── */}
        <LoveGazebo position={[0, 0, -4]} />

        {/* ── Crystal Waterfall ── */}
        <mesh ref={waterfallRef} position={[0, -8, -13.8]}>
          <cylinderGeometry args={[1.2, 1.8, 16, 16]} />
          <meshStandardMaterial color="#F48FB1" roughness={0} metalness={0.1} transparent opacity={0.7} />
        </mesh>

        {/* ── Sky Love Letter Pedestal ── */}
        <LoveLetterPedestal position={[0, 0, -3.5]} />
      </group>
    </group>
  );
}

// ── Interactive Teleport Pad ──────────────────────────────────

function TeleportPad({
  position, targetY, label, color,
}: {
  position: [number, number, number];
  targetY: number;
  label: string;
  color: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = s.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[1.4, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.2} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[1.3, 1.5, 24]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} roughness={0} />
      </mesh>

      {/* Beam of Light */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.8, 1.2, 5, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.2} roughness={0} />
      </mesh>
      <pointLight position={[0, 1.5, 0]} color={color} intensity={2} distance={6} decay={2} />

      <Text position={[0, 2.6, 0]} fontSize={0.22} color="#FFFFFF" anchorX="center" anchorY="middle" outlineColor="#1A002A" outlineWidth={0.02}>
        {label}
      </Text>

      {/* Interactive Object Trigger */}
      <InteractiveObject
        id={`teleport-${targetY}`}
        position={position}
        radius={2.0}
        data={{
          type: 'door',
          title: label,
          targetPosition: [0, targetY, 0],
        }}
      />
    </group>
  );
}

// ── Golden Gazebo ─────────────────────────────────────────────

function LoveGazebo({ position }: { position: [number, number, number] }) {
  const GOLD = '#FFD700';

  return (
    <group position={position}>
      {/* 6 Golden Pillars */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const r = 3.5;
        return (
          <mesh key={i} position={[Math.sin(a) * r, 2.2, Math.cos(a) * r]} castShadow>
            <cylinderGeometry args={[0.1, 0.14, 4.4, 8]} />
            <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} emissive={GOLD} emissiveIntensity={0.2} />
          </mesh>
        );
      })}

      {/* Dome Roof */}
      <mesh position={[0, 5.2, 0]} castShadow>
        <sphereGeometry args={[4.0, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Crown Top */}
      <mesh position={[0, 7.3, 0]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.9} roughness={0} metalness={0.9} />
      </mesh>
    </group>
  );
}

// ── Love Letter Pedestal ──────────────────────────────────────

function LoveLetterPedestal({ position }: { position: [number, number, number] }) {
  const heartRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = s.clock.elapsedTime * 2;
      heartRef.current.position.y = 1.6 + Math.sin(s.clock.elapsedTime * 3) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* Marble Pedestal */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.55, 1.2, 16]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Gold Trim */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.06, 16]} />
        <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Glowing Love Letter Envelope & Heart */}
      <mesh ref={heartRef} position={[0, 1.6, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.08]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.7} roughness={0.2} />
      </mesh>

      <Text position={[0, 2.1, 0]} fontSize={0.18} color="#FFD700" anchorX="center" anchorY="middle" outlineColor="#000000" outlineWidth={0.02}>
        💌 Open Sneha's Love Letter
      </Text>

      <InteractiveObject
        id="sky-love-letter"
        position={position}
        radius={2.5}
        data={{
          type: 'memory',
          memoryId: 'memory-01',
        }}
      />
    </group>
  );
}
