// ============================================================
// SNEHA WORLD — World Environment (Sky, Stars, Clouds, Particles)
// Note: lighting and ground are in MainScene (synchronous).
// ============================================================

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function WorldEnvironment() {
  return (
    <>
      {/* Sky — replaces the simple backdrop sphere */}
      <Sky
        sunPosition={[100, 20, 100]}
        inclination={0.52}
        azimuth={0.25}
        turbidity={8}
        rayleigh={1.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Stars */}
      <Stars
        radius={150}
        depth={60}
        count={1200}
        factor={3}
        saturation={0.3}
        fade
        speed={0.5}
      />

      {/* Hand-crafted cloud puffs (no async deps) */}
      <CloudPuff position={[-15, 18, -30]} scale={3} />
      <CloudPuff position={[20, 22, -40]} scale={2.5} />
      <CloudPuff position={[-25, 20, 10]} scale={2} />
      <CloudPuff position={[30, 16, 20]} scale={3.5} />

      {/* Floating sparkle particles */}
      <FloatingParticles />
    </>
  );
}

// ── Cloud Puff (geometry-based, no async) ────────────────────

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
            opacity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Floating Sparkle Particles ───────────────────────────────

const PARTICLE_COUNT = 50;

function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = new THREE.Object3D();

  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: (Math.random() - 0.5) * 28,
    y: Math.random() * 5 + 0.5,
    z: (Math.random() - 0.5) * 28,
    speed: 0.3 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    size: 0.02 + Math.random() * 0.025,
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
        emissiveIntensity={0.8}
        transparent
        opacity={0.75}
      />
    </instancedMesh>
  );
}
