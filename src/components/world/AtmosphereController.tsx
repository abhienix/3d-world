// ============================================================
// SNEHA WORLD — Dynamic Atmosphere & Sky Controller
// Switches between Day ☀️, Sunset 🌅, and Starry Night 🌌 moods.
// ============================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useGameStore } from '../../stores/gameStore';
import * as THREE from 'three';

export function AtmosphereController() {
  const timeOfDay = useGameStore((s) => s.timeOfDay);

  return (
    <>
      {/* ── Sky & Atmosphere Dome & Volumetric Fog ── */}
      {timeOfDay === 'night' ? (
        <>
          <fog attach="fog" args={['#0A0216', 30, 160]} />
          <mesh>
            <sphereGeometry args={[220, 24, 24]} />
            <meshBasicMaterial color="#0A0216" side={THREE.BackSide} />
          </mesh>
          <mesh>
            <sphereGeometry args={[190, 16, 16]} />
            <meshBasicMaterial color="#210530" side={THREE.BackSide} transparent opacity={0.5} />
          </mesh>
          {/* Twinkling Stars in Night Mode */}
          <Stars radius={160} depth={50} count={1800} factor={4} saturation={0.8} fade speed={1} />

          {/* Moonlight & Purple Neon */}
          <ambientLight color="#2E1B4E" intensity={0.75} />
          <directionalLight
            color="#9C27B0"
            intensity={1.2}
            position={[-15, 25, -15]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={120}
            shadow-camera-left={-60}
            shadow-camera-right={60}
            shadow-camera-top={60}
            shadow-camera-bottom={-60}
            shadow-bias={-0.0005}
          />
          <directionalLight color="#FF1493" intensity={0.8} position={[15, 12, 10]} />
          <hemisphereLight args={['#3F51B5', '#1A0028', 0.6]} />
        </>
      ) : timeOfDay === 'day' ? (
        <>
          <fog attach="fog" args={['#FCE4EC', 45, 220]} />
          <mesh>
            <sphereGeometry args={[220, 24, 24]} />
            <meshBasicMaterial color="#81D4FA" side={THREE.BackSide} />
          </mesh>
          <mesh>
            <sphereGeometry args={[190, 16, 16]} />
            <meshBasicMaterial color="#F8BBD0" side={THREE.BackSide} transparent opacity={0.4} />
          </mesh>

          {/* Sunny Golden Day Lights */}
          <ambientLight color="#FFF0F5" intensity={0.95} />
          <directionalLight
            color="#FFFDE7"
            intensity={1.9}
            position={[25, 35, 20]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={120}
            shadow-camera-left={-60}
            shadow-camera-right={60}
            shadow-camera-top={60}
            shadow-camera-bottom={-60}
            shadow-bias={-0.0005}
          />
          <directionalLight color="#FF80AB" intensity={0.5} position={[-15, 15, -5]} />
          <hemisphereLight args={['#E1F5FE', '#FCE4EC', 0.75]} />
        </>
      ) : (
        /* Sunset Mood 🌅 */
        <>
          <fog attach="fog" args={['#4A0E2E', 35, 180]} />
          <mesh>
            <sphereGeometry args={[220, 24, 24]} />
            <meshBasicMaterial color="#D81B60" side={THREE.BackSide} />
          </mesh>
          <mesh>
            <sphereGeometry args={[190, 16, 16]} />
            <meshBasicMaterial color="#FFA726" side={THREE.BackSide} transparent opacity={0.45} />
          </mesh>
          <Stars radius={160} depth={50} count={600} factor={2} saturation={0.5} fade speed={0.5} />

          {/* Warm Amber Sunset Lights */}
          <ambientLight color="#FFE4F0" intensity={0.9} />
          <directionalLight
            color="#FF9800"
            intensity={1.8}
            position={[20, 18, 20]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={120}
            shadow-camera-left={-60}
            shadow-camera-right={60}
            shadow-camera-top={60}
            shadow-camera-bottom={-60}
            shadow-bias={-0.0005}
          />
          <directionalLight color="#FF4081" intensity={0.75} position={[-15, 12, -5]} />
          <directionalLight color="#7B1FA2" intensity={0.45} position={[0, 8, -20]} />
          <hemisphereLight args={['#FF80AB', '#FFE0B2', 0.7]} />
        </>
      )}

      {/* ── Fluffy Pastel Clouds ── */}
      <CloudPuff position={[-15, 18, -30]} scale={3.2} />
      <CloudPuff position={[20, 22, -40]} scale={2.8} />
      <CloudPuff position={[-25, 20, 10]} scale={2.4} />
      <CloudPuff position={[30, 16, 20]} scale={3.6} />

      {/* ── Ambient Floating Fairy Particles ── */}
      <FloatingParticles />
    </>
  );
}

function CloudPuff({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const speed = 0.03 + Math.random() * 0.02;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x =
        position[0] + Math.sin(state.clock.elapsedTime * speed) * 2;
    }
  });

  const blobs: [number, number, number, number][] = [
    [0, 0, 0, 1],
    [1.2, 0.3, 0.4, 0.85],
    [-1.1, 0.2, 0.2, 0.8],
    [0.5, 0.6, -0.3, 0.7],
    [-0.4, 0.5, 0.5, 0.75],
  ];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {blobs.map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[s, 7, 7]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={1}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

const PARTICLE_COUNT = 45;

function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = new THREE.Object3D();

  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: (Math.random() - 0.5) * 35,
    y: Math.random() * 6 + 0.5,
    z: (Math.random() - 0.5) * 35,
    speed: 0.3 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    size: 0.02 + Math.random() * 0.03,
  }));

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const y = p.y + Math.sin(t * p.speed + p.phase) * 0.4;
      const s = (0.5 + Math.sin(t * p.speed * 1.5 + p.phase) * 0.5) * p.size * 25;
      dummy.position.set(p.x, y, p.z);
      dummy.scale.setScalar(Math.max(0.001, s));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.04, 4, 4]} />
      <meshStandardMaterial
        color="#FFB6C1"
        emissive="#FF80AB"
        emissiveIntensity={0.9}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}
