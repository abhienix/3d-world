// ============================================================
// SNEHA WORLD — Atmosphere & Dynamic Day/Sunset/Night Lighting
// Clean, crystal-clear 3D lighting with crisp shadows and depth
// ============================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';

export function AtmosphereController() {
  const timeOfDay = useGameStore((s) => s.timeOfDay);

  return (
    <>
      {/* ── Environment Lighting per Time of Day ── */}
      {timeOfDay === 'night' ? (
        /* Night Mood 🌌 */
        <>
          <fog attach="fog" args={['#0F0826', 80, 320]} />
          <color attach="background" args={['#0F0826']} />
          <Stars radius={160} depth={50} count={1800} factor={4} saturation={0.8} fade speed={1} />

          {/* Moonlight & Purple Neon */}
          <ambientLight color="#3A1C6E" intensity={0.65} />
          <directionalLight
            color="#B388FF"
            intensity={1.0}
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
          <directionalLight color="#FF4081" intensity={0.5} position={[15, 12, 10]} />
          <hemisphereLight args={['#3F51B5', '#1A0028', 0.5]} />
        </>
      ) : timeOfDay === 'day' ? (
        /* Sunny Golden Day ☀️ */
        <>
          <fog attach="fog" args={['#E8F5E9', 100, 380]} />
          <color attach="background" args={['#B3E5FC']} />

          {/* Sunny Golden Day Lights */}
          <ambientLight color="#FFFFFF" intensity={0.55} />
          <directionalLight
            color="#FFF9C4"
            intensity={1.2}
            position={[30, 45, 25]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={140}
            shadow-camera-left={-70}
            shadow-camera-right={70}
            shadow-camera-top={70}
            shadow-camera-bottom={-70}
            shadow-bias={-0.0005}
          />
          <directionalLight color="#FFD180" intensity={0.35} position={[-20, 20, -10]} />
          <hemisphereLight args={['#B3E5FC', '#A5D6A7', 0.55]} />
        </>
      ) : (
        /* Sunset Mood 🌅 */
        <>
          <fog attach="fog" args={['#3E103F', 70, 300]} />
          <color attach="background" args={['#5C1349']} />
          <Stars radius={160} depth={50} count={600} factor={2} saturation={0.5} fade speed={0.5} />

          {/* Warm Amber Sunset Lights */}
          <ambientLight color="#FFD180" intensity={0.55} />
          <directionalLight
            color="#FF9800"
            intensity={1.1}
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
          <directionalLight color="#FF4081" intensity={0.5} position={[-15, 12, -5]} />
          <hemisphereLight args={['#FF80AB', '#FFE0B2', 0.5]} />
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

// ── Low-poly fluffy cloud puff ────────────────────────────────

function CloudPuff({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x += delta * 0.15;
      if (meshRef.current.position.x > 80) {
        meshRef.current.position.x = -80;
      }
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} transparent opacity={0.8} />
      </mesh>
      <mesh position={[1.2, -0.2, 0]}>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} transparent opacity={0.8} />
      </mesh>
      <mesh position={[-1.2, -0.2, 0]}>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ── Floating magical particles ────────────────────────────────

function FloatingParticles() {
  const count = 35;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const temp: { x: number; y: number; z: number; speed: number; rotSpeed: number; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 70,
        y: Math.random() * 8 + 0.5,
        z: (Math.random() - 0.5) * 70,
        speed: Math.random() * 0.4 + 0.2,
        rotSpeed: Math.random() * 2 - 1,
        scale: Math.random() * 0.15 + 0.08,
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      p.y += delta * p.speed;
      if (p.y > 10) p.y = 0.5;

      dummy.position.set(p.x + Math.sin(t * 0.8 + i) * 0.5, p.y, p.z + Math.cos(t * 0.8 + i) * 0.5);
      dummy.rotation.set(t * p.rotSpeed, t * p.rotSpeed * 0.5, 0);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FF80AB"
        emissiveIntensity={0.6}
        roughness={0.2}
      />
    </instancedMesh>
  );
}
