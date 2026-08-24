// ============================================================
// SNEHA WORLD — Barbie World Extras
// Pink convertible car, heart pool, carousel, ferris wheel,
// heart arch, giant love sign, star walkway, rose garden,
// dance floor, neon signs, giant hearts — FULL BARBIE WORLD
// ============================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

export function BarbieWorldExtras() {
  return (
    <group name="barbie-extras">
      {/* ── Sneha's Grand Statue: Most Beautiful Girl in the World ── */}
      <SnehaStatue position={[-18, 0, 0]} />

      {/* ── Pink Convertible Car ── */}
      <PinkConvertible position={[15, 0, -20]} rotation={[0, -Math.PI/3, 0]} />

      {/* ── Pink & Gold Glam Scooter/Motorbike ── */}
      <PinkGlamScooter position={[11.5, 0, -17]} rotation={[0, -Math.PI/4, 0]} />

      {/* ── Heart-shaped swimming pool ── */}
      <HeartPool position={[-20, 0, -10]} />

      {/* ── Spinning Carousel ── */}
      <Carousel position={[22, 0, 15]} />

      {/* ── Heart Archway (walk-through) ── */}
      <HeartArch position={[0, 0, -10]} />

      {/* ── Giant 3D LOVE Sign ── */}
      <GiantLoveSign position={[0, 0, 40]} />

      {/* ── Star Walkway ── */}
      <StarWalkway />

      {/* ── Rose Garden ── */}
      <RoseGarden position={[-22, 0, 15]} />

      {/* ── Dance Floor ── */}
      <DanceFloor position={[0, 0, 50]} />

      {/* ── Neon Signs ── */}
      <Suspense fallback={null}>
        <NeonSigns />
      </Suspense>

      {/* ── Giant floating hearts above world ── */}
      <FloatingGiantHearts />

      {/* ── Wishing well ── */}
      <WishingWell position={[16, 0, 5]} />

      {/* ── Pink hot air balloon (floating) ── */}
      <HotAirBalloon position={[0, 28, -15]} />

      {/* ── Confetti rain ── */}
      <ConfettiRain />

      {/* ── Ribbon arch path ── */}
      <RibbonArches />
    </group>
  );
}

// ── Pink Convertible Car ──────────────────────────────────────

function PinkConvertible({ position, rotation }: {
  position: [number,number,number];
  rotation?: [number,number,number];
}) {
  const BODY_PINK  = '#FF1493';
  const BODY_LT    = '#FF69B4';
  const CHROME     = '#E8E8E8';
  const WINDSHIELD = '#B3E5FC';
  const TIRE_BLK   = '#222';
  const WHEEL_SLV  = '#BDBDBD';
  const SEAT_CREAM = '#FFF8E1';
  const GOLD       = '#FFD700';

  return (
    <group position={position} rotation={rotation}>
      {/* Main body */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[4.4, 0.55, 2.0]} />
        <meshStandardMaterial color={BODY_PINK} roughness={0.15} metalness={0.5} />
      </mesh>

      {/* Hood */}
      <mesh position={[1.5, 0.75, 0]} castShadow>
        <boxGeometry args={[1.5, 0.22, 1.9]} />
        <meshStandardMaterial color={BODY_PINK} roughness={0.15} metalness={0.5} />
      </mesh>

      {/* Trunk */}
      <mesh position={[-1.35, 0.75, 0]} castShadow>
        <boxGeometry args={[1.7, 0.22, 1.9]} />
        <meshStandardMaterial color={BODY_PINK} roughness={0.15} metalness={0.5} />
      </mesh>

      {/* Cabin (open top convertible) */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[2.0, 0.55, 1.9]} />
        <meshStandardMaterial color={BODY_LT} roughness={0.15} metalness={0.4} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.9, 1.22, 0]} rotation={[0, 0, Math.PI/6]}>
        <boxGeometry args={[0.06, 0.7, 1.7]} />
        <meshStandardMaterial color={WINDSHIELD} roughness={0} metalness={0.2} transparent opacity={0.55} />
      </mesh>

      {/* Seats */}
      <mesh position={[0.15, 1.05, 0.5]} material={new THREE.MeshStandardMaterial({ color: SEAT_CREAM, roughness: 0.5 })}>
        <boxGeometry args={[0.7, 0.18, 0.75]} />
      </mesh>
      <mesh position={[0.15, 1.05, -0.5]} material={new THREE.MeshStandardMaterial({ color: SEAT_CREAM, roughness: 0.5 })}>
        <boxGeometry args={[0.7, 0.18, 0.75]} />
      </mesh>

      {/* Steering wheel */}
      <mesh position={[0.55, 1.2, 0.45]} rotation={[Math.PI/4, 0, 0]}>
        <torusGeometry args={[0.18, 0.025, 6, 16]} />
        <meshStandardMaterial color={CHROME} roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Chrome trim */}
      <mesh position={[0, 0.29, 0]}>
        <boxGeometry args={[4.5, 0.06, 2.06]} />
        <meshStandardMaterial color={CHROME} roughness={0.15} metalness={0.8} />
      </mesh>

      {/* Grille */}
      <mesh position={[2.22, 0.62, 0]}>
        <boxGeometry args={[0.06, 0.3, 1.5]} />
        <meshStandardMaterial color={CHROME} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Headlights */}
      {[-0.6, 0.6].map((z, i) => (
        <group key={i} position={[2.24, 0.65, z]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 10]} />
            <meshStandardMaterial color="#FFFDE7" emissive="#FFFACD" emissiveIntensity={1.5} roughness={0} />
          </mesh>
          <pointLight position={[0.2, 0, 0]} color="#FFFDE7" intensity={0.5} distance={4} decay={2} />
        </group>
      ))}

      {/* Taillights */}
      {[-0.6, 0.6].map((z, i) => (
        <mesh key={i} position={[-2.24, 0.65, z]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 10]} />
          <meshStandardMaterial color="#FF1744" emissive="#FF1744" emissiveIntensity={0.8} roughness={0} />
        </mesh>
      ))}

      {/* Wheels (4) */}
      {[
        [1.4, 0, 1.06], [1.4, 0, -1.06],
        [-1.3, 0, 1.06], [-1.3, 0, -1.06],
      ].map((pos, i) => (
        <group key={i} position={pos as [number,number,number]} rotation={[0, 0, Math.PI/2]}>
          <mesh>
            <cylinderGeometry args={[0.36, 0.36, 0.24, 16]} />
            <meshStandardMaterial color={TIRE_BLK} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.04, 16]} />
            <meshStandardMaterial color={WHEEL_SLV} roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Wheel spokes */}
          {[0,1,2,3,4].map((s) => (
            <mesh key={s} position={[0, 0.13, 0]} rotation={[0, (s/5)*Math.PI*2, 0]}>
              <boxGeometry args={[0.03, 0.05, 0.46]} />
              <meshStandardMaterial color={WHEEL_SLV} roughness={0.2} metalness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Gold star on hood */}
      <mesh position={[1.85, 0.87, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Number plate */}
      <mesh position={[2.24, 0.4, 0]}>
        <boxGeometry args={[0.05, 0.18, 0.7]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <Suspense fallback={null}>
        <Text position={[2.27, 0.4, 0]} rotation={[0, Math.PI/2, 0]} fontSize={0.1} color="#FF1493" anchorX="center" anchorY="middle">
          SNEHA ❤
        </Text>
      </Suspense>
    </group>
  );
}

// ── Heart Pool ────────────────────────────────────────────────

function HeartPool({ position }: { position: [number,number,number] }) {
  const waterRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (waterRef.current) {
      const m = waterRef.current.material as THREE.MeshStandardMaterial;
      m.opacity = 0.7 + Math.sin(s.clock.elapsedTime) * 0.08;
    }
  });

  // Heart shape approximated with two circles + rotated box
  return (
    <group position={position}>
      {/* Pool rim — heart shape via blobs */}
      <mesh position={[-1.5, 0.12, -0.5]} castShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.24, 20]} />
        <meshStandardMaterial color="#FFCDD2" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[1.5, 0.12, -0.5]} castShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.24, 20]} />
        <meshStandardMaterial color="#FFCDD2" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.12, 1.5]} rotation={[0, Math.PI/4, 0]} castShadow>
        <boxGeometry args={[4.4, 0.24, 4.4]} />
        <meshStandardMaterial color="#FFCDD2" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Water left */}
      <mesh ref={waterRef} position={[-1.5, 0.25, -0.5]}>
        <cylinderGeometry args={[2.0, 2.0, 0.06, 20]} />
        <meshStandardMaterial color="#F48FB1" roughness={0} metalness={0.1} transparent opacity={0.75} />
      </mesh>
      {/* Water right */}
      <mesh position={[1.5, 0.25, -0.5]}>
        <cylinderGeometry args={[2.0, 2.0, 0.06, 20]} />
        <meshStandardMaterial color="#F48FB1" roughness={0} metalness={0.1} transparent opacity={0.75} />
      </mesh>
      {/* Water center */}
      <mesh position={[0, 0.25, 1.5]} rotation={[0, Math.PI/4, 0]}>
        <boxGeometry args={[4.0, 0.06, 4.0]} />
        <meshStandardMaterial color="#F48FB1" roughness={0} metalness={0.1} transparent opacity={0.75} />
      </mesh>

      {/* Pool light */}
      <pointLight position={[0, 0.5, 0]} color="#FF80AB" intensity={2.0} distance={8} decay={2} />
      <pointLight position={[0, 0.5, 0]} color="#CE93D8" intensity={1.0} distance={6} decay={2} />

      {/* Pool chairs */}
      <PoolChair position={[-4.5, 0, 0]} />
      <PoolChair position={[4.5, 0, 0]} rotation={[0, Math.PI, 0]} />

      {/* Pool sign */}
      <Suspense fallback={null}>
        <Text position={[0, 1.5, -3.5]} fontSize={0.4} color="#FF1493" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#fff" outlineWidth={0.02}>
          Sneha's Pool 💖
        </Text>
      </Suspense>
    </group>
  );
}

function PoolChair({ position, rotation = [0,0,0] }: { position: [number,number,number]; rotation?: [number,number,number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.08, 1.6]} />
        <meshStandardMaterial color="#FFCDD2" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.42, -0.65]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.6]} />
        <meshStandardMaterial color="#FFCDD2" roughness={0.4} />
      </mesh>
      {[-0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0]}>
          <boxGeometry args={[0.06, 0.2, 1.6]} />
          <meshStandardMaterial color="#EF9A9A" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ── Spinning Carousel ─────────────────────────────────────────

function Carousel({ position }: { position: [number,number,number] }) {
  const roofRef  = useRef<THREE.Group>(null!);
  const horsesRef = useRef<THREE.Group>(null!);

  useFrame((s) => {
    if (roofRef.current) roofRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (horsesRef.current) horsesRef.current.rotation.y = s.clock.elapsedTime * 0.4;
  });

  const COLORS = ['#FF80AB', '#CE93D8', '#FFD740', '#80DEEA', '#FFAB91', '#FF69B4'];

  return (
    <group position={position}>
      {/* Base platform */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.8, 4.0, 0.3, 24]} />
        <meshStandardMaterial color="#FFCDD2" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Decorative base ring */}
      <mesh position={[0, 0.32, 0]}>
        <torusGeometry args={[3.8, 0.12, 8, 30]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.7} emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>

      {/* Center pole */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 7, 10]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.25} metalness={0.3} />
      </mesh>

      {/* Spinning roof */}
      <group ref={roofRef} position={[0, 7.2, 0]}>
        <mesh castShadow>
          <coneGeometry args={[4.2, 2.2, 16]} />
          <meshStandardMaterial color="#FF1493" roughness={0.25} metalness={0.15} />
        </mesh>
        {/* Roof trim */}
        <mesh position={[0, -1.1, 0]}>
          <torusGeometry args={[4.15, 0.14, 8, 20]} />
          <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.7} emissive="#FFD700" emissiveIntensity={0.3} />
        </mesh>
        {/* Roof tip star */}
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.25, 10, 10]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Roof pennants */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.sin(a) * 2.8, -0.8, Math.cos(a) * 2.8]}>
              <sphereGeometry args={[0.12, 7, 7]} />
              <meshStandardMaterial color={COLORS[i % COLORS.length]} emissive={COLORS[i % COLORS.length]} emissiveIntensity={0.4} roughness={0.2} />
            </mesh>
          );
        })}
      </group>

      {/* Spinning horses */}
      <group ref={horsesRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.sin(angle) * 2.8;
          const z = Math.cos(angle) * 2.8;
          return (
            <CarouselHorse
              key={i}
              position={[x, 1.2, z]}
              color={COLORS[i]}
              index={i}
            />
          );
        })}
      </group>

      {/* Lights */}
      <pointLight position={[0, 5, 0]} color="#FF80AB" intensity={2} distance={10} decay={2} />
    </group>
  );
}

function CarouselHorse({ position, color, index }: {
  position: [number,number,number];
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const phase = (index / 6) * Math.PI * 2;

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 1.5 + phase) * 0.4;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Pole */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 3.5, 6]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Horse body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.6, 6, 10]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Horse head */}
      <mesh position={[0.3, 0.7, 0]} rotation={[0, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.18, 0.28, 5, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Mane */}
      <mesh position={[0.2, 0.88, 0]}>
        <sphereGeometry args={[0.12, 7, 7]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[[-0.15, -0.22, 0.1], [0.15, -0.22, 0.1], [-0.15, -0.22, -0.1], [0.15, -0.22, -0.1]].map((lp, li) => (
        <mesh key={li} position={lp as [number,number,number]}>
          <cylinderGeometry args={[0.055, 0.055, 0.45, 6]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ── Heart Archway ─────────────────────────────────────────────

function HeartArch({ position }: { position: [number,number,number] }) {
  const ARCH_PINK = '#FF1493';
  const ref = useRef<THREE.Group>(null!);

  useFrame((s) => {
    // Subtle glow pulse
    if (ref.current) {
      ref.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const m = child.material as THREE.MeshStandardMaterial;
          if (m.emissive) {
            m.emissiveIntensity = 0.25 + Math.sin(s.clock.elapsedTime * 1.2) * 0.12;
          }
        }
      });
    }
  });

  return (
    <group position={position} ref={ref}>
      {/* Left post */}
      <mesh position={[-2.5, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 5, 10]} />
        <meshStandardMaterial color={ARCH_PINK} roughness={0.2} metalness={0.3} emissive={ARCH_PINK} emissiveIntensity={0.25} />
      </mesh>
      {/* Right post */}
      <mesh position={[2.5, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 5, 10]} />
        <meshStandardMaterial color={ARCH_PINK} roughness={0.2} metalness={0.3} emissive={ARCH_PINK} emissiveIntensity={0.25} />
      </mesh>

      {/* Heart top — two spheres */}
      <mesh position={[-1.1, 5.5, 0]} castShadow>
        <sphereGeometry args={[1.5, 14, 14]} />
        <meshStandardMaterial color={ARCH_PINK} roughness={0.2} metalness={0.2} emissive={ARCH_PINK} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.1, 5.5, 0]} castShadow>
        <sphereGeometry args={[1.5, 14, 14]} />
        <meshStandardMaterial color={ARCH_PINK} roughness={0.2} metalness={0.2} emissive={ARCH_PINK} emissiveIntensity={0.3} />
      </mesh>
      {/* Heart bottom point */}
      <mesh position={[0, 3.8, 0]} rotation={[0, 0, Math.PI/4]} castShadow>
        <boxGeometry args={[2.8, 2.8, 0.4]} />
        <meshStandardMaterial color={ARCH_PINK} roughness={0.2} metalness={0.2} emissive={ARCH_PINK} emissiveIntensity={0.3} />
      </mesh>

      {/* White outline ring */}
      <mesh position={[-1.1, 5.5, 0]}>
        <torusGeometry args={[1.5, 0.08, 8, 20]} />
        <meshStandardMaterial color="#fff" roughness={0.3} transparent opacity={0.5} />
      </mesh>
      <mesh position={[1.1, 5.5, 0]}>
        <torusGeometry args={[1.5, 0.08, 8, 20]} />
        <meshStandardMaterial color="#fff" roughness={0.3} transparent opacity={0.5} />
      </mesh>

      {/* Flower garland on arch */}
      {Array.from({ length: 12 }).map((_, i) => {
        const t = i / 11;
        const x = (t - 0.5) * 4.5;
        const y = 5.5 + Math.sin(t * Math.PI) * 1.2;
        return (
          <mesh key={i} position={[x, y, 0.25]}>
            <sphereGeometry args={[0.13, 7, 7]} />
            <meshStandardMaterial
              color={['#FF80AB', '#FFD700', '#CE93D8', '#FFAB91'][i % 4]}
              roughness={0.4}
              emissive={['#FF80AB', '#FFD700', '#CE93D8', '#FFAB91'][i % 4]}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* Arch point light */}
      <pointLight position={[0, 5, 0.5]} color="#FF1493" intensity={1.5} distance={7} decay={2} />

      {/* Welcome text */}
      <Suspense fallback={null}>
        <Text position={[0, 7.5, 0]} fontSize={0.3} color="#FFD700" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#FF1493" outlineWidth={0.015}>
          With Love ♡
        </Text>
      </Suspense>
    </group>
  );
}

// ── Giant LOVE Sign ───────────────────────────────────────────

function GiantLoveSign({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      {/* Base platform */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[8, 8.5, 0.3, 32]} />
        <meshStandardMaterial color="#FFCDD2" roughness={0.4} />
      </mesh>

      <Suspense fallback={null}>
        {/* LOVE */}
        <Text
          position={[0, 5, 0]}
          fontSize={3.8}
          color="#FF1493"
          anchorX="center"
          anchorY="middle"
          outlineColor="#FFD700"
          outlineWidth={0.06}
          font="/fonts/Pacifico-Regular.ttf"
        >
          LOVE
        </Text>

        {/* Sneha */}
        <Text
          position={[0, 2.0, 0]}
          fontSize={2.2}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          outlineColor="#FF1493"
          outlineWidth={0.05}
          font="/fonts/Pacifico-Regular.ttf"
        >
          Sneha
        </Text>

        {/* 18-06-25 */}
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.7}
          color="rgba(255,180,200,0.9)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          ✦ 18 · 06 · 25 ✦
        </Text>
      </Suspense>

      {/* Decorative stars around */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r = 6.5;
        return (
          <group key={i} position={[Math.sin(a) * r, 0.4, Math.cos(a) * r]}>
            <mesh>
              <sphereGeometry args={[0.28, 10, 10]} />
              <meshStandardMaterial
                color={['#FF80AB', '#FFD700', '#CE93D8', '#FF1493', '#80DEEA', '#FFAB91', '#F48FB1', '#FFE082'][i]}
                emissive={['#FF80AB', '#FFD700', '#CE93D8', '#FF1493', '#80DEEA', '#FFAB91', '#F48FB1', '#FFE082'][i]}
                emissiveIntensity={0.6}
                roughness={0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Big lights */}
      <pointLight position={[0, 4, 2]} color="#FF1493" intensity={3} distance={16} decay={2} />
      <pointLight position={[0, 1, 2]} color="#FFD700" intensity={2} distance={12} decay={2} />
    </group>
  );
}

// ── Star Walkway ──────────────────────────────────────────────

function StarWalkway() {
  const starPositions: [number,number,number][] = [];
  // Line of stars from plaza to dreamhouse
  for (let i = 0; i < 12; i++) {
    starPositions.push([-1.5, 0, -10 - i * 1.5]);
    starPositions.push([1.5, 0, -10 - i * 1.5]);
  }

  return (
    <group>
      {starPositions.map((pos, i) => (
        <GlowStar key={i} position={pos} index={i} />
      ))}
    </group>
  );
}

function GlowStar({ position, index }: { position: [number,number,number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = index * 0.3;
  const colors = ['#FFD700', '#FF80AB', '#CE93D8', '#FFD740'];

  useFrame((s) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.4 + Math.sin(s.clock.elapsedTime * 2 + phase) * 0.35;
      ref.current.rotation.y = s.clock.elapsedTime * 0.8 + phase;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.12, 8, 8]} />
      <meshStandardMaterial
        color={colors[index % colors.length]}
        emissive={colors[index % colors.length]}
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
}

// ── Rose Garden ───────────────────────────────────────────────

function RoseGarden({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      {/* Garden ground */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial color="#A5D6A7" roughness={0.9} />
      </mesh>

      {/* Heart-shaped rose arrangement */}
      {heartPositions(6, 4.5).map((pos, i) => (
        <Rose3D key={i} position={[pos[0], 0, pos[1]]} color={i % 3 === 0 ? '#E53935' : i % 3 === 1 ? '#FF80AB' : '#FFB6C1'} />
      ))}

      {/* Central large rose */}
      <Rose3D position={[0, 0, 0]} color="#C62828" scale={1.5} />

      {/* Arbor entrance */}
      <GardenArbor position={[0, 0, -8]} />

      {/* Sign */}
      <Suspense fallback={null}>
        <Text position={[0, 3.5, -8]} fontSize={0.3} color="#E53935" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#fff" outlineWidth={0.015}>
          Rose Garden 🌹
        </Text>
      </Suspense>

      <pointLight position={[0, 2, 0]} color="#FF4081" intensity={1.5} distance={10} decay={2} />
    </group>
  );
}

function heartPositions(count: number, size: number): [number, number][] {
  const positions: [number, number][] = [];
  for (let i = 0; i < count * 4; i++) {
    const t = (i / (count * 4)) * Math.PI * 2;
    const x = size * 0.8 * Math.pow(Math.sin(t), 3);
    const y = size * 0.8 * (0.85 * Math.cos(t) - 0.35 * Math.cos(2*t) - 0.15 * Math.cos(3*t) - 0.05 * Math.cos(4*t));
    positions.push([x, -y]);
  }
  return positions;
}

function Rose3D({ position, color, scale = 1 }: { position: [number,number,number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Group>(null!);
  const phase = Math.random() * Math.PI * 2;
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3 + phase) * 0.08;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.6, 5]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
      {/* Leaves */}
      <mesh position={[0.12, 0.22, 0]} rotation={[0, 0, 0.7]}>
        <sphereGeometry args={[0.1, 6, 5]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.6} />
      </mesh>
      {/* Rose head — layered petals */}
      {[0, 1, 2].map((layer) => {
        const r = 0.07 + layer * 0.04;
        const count = 4 + layer * 2;
        return Array.from({ length: count }).map((_, i) => {
          const a = (i / count) * Math.PI * 2;
          return (
            <mesh key={`${layer}-${i}`} position={[Math.sin(a) * r, 0.64 + layer * 0.06, Math.cos(a) * r]} rotation={[layer * 0.2, a, Math.PI/5 + layer * 0.1]}>
              <sphereGeometry args={[0.07 - layer * 0.01, 7, 6]} />
              <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} />
            </mesh>
          );
        });
      })}
      {/* Center */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.06, 7, 7]} />
        <meshStandardMaterial color="#B71C1C" roughness={0.3} emissive="#B71C1C" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function GardenArbor({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 1.8, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 3.6, 8]} />
          <meshStandardMaterial color="#388E3C" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 3.7, 0]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.08, 0.08, 3.2, 8]} />
        <meshStandardMaterial color="#388E3C" roughness={0.6} />
      </mesh>
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, 3.7, 0]}>
          <sphereGeometry args={[0.14, 7, 7]} />
          <meshStandardMaterial color="#E53935" roughness={0.3} emissive="#E53935" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ── Dance Floor ───────────────────────────────────────────────

function DanceFloor({ position }: { position: [number,number,number] }) {
  const tileRefs = useRef<THREE.Mesh[]>([]);
  const TILES = 6;
  const COLORS_LIST = ['#FF80AB', '#CE93D8', '#FFD700', '#80DEEA', '#FFAB91', '#F48FB1'];

  useFrame((s) => {
    tileRefs.current.forEach((tile, i) => {
      if (!tile) return;
      const row = Math.floor(i / TILES);
      const col = i % TILES;
      const m = tile.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.1 + Math.sin(s.clock.elapsedTime * 2 + row * 0.8 + col * 0.5) * 0.4;
    });
  });

  return (
    <group position={position}>
      {/* Floor base */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#1A0A1E" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Glowing tiles */}
      {Array.from({ length: TILES }).map((_, row) =>
        Array.from({ length: TILES }).map((_, col) => {
          const idx = row * TILES + col;
          const color = COLORS_LIST[(row + col) % COLORS_LIST.length];
          const x = (col - TILES/2 + 0.5) * 2.2;
          const z = (row - TILES/2 + 0.5) * 2.2;
          return (
            <mesh
              key={idx}
              ref={(el) => { if (el) tileRefs.current[idx] = el; }}
              position={[x, 0.02, z]}
              rotation={[-Math.PI/2, 0, 0]}
            >
              <planeGeometry args={[2.0, 2.0]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.1} metalness={0.2} transparent opacity={0.85} />
            </mesh>
          );
        })
      )}

      {/* Stage */}
      <mesh position={[0, 0.25, -5.5]} castShadow>
        <boxGeometry args={[8, 0.5, 3]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.2} metalness={0.2} />
      </mesh>
      <Suspense fallback={null}>
        <Text position={[0, 0.6, -5.5]} fontSize={0.5} color="#FFD700" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#FF1493" outlineWidth={0.02}>
          Sneha's Stage ✨
        </Text>
      </Suspense>

      {/* Disco ball */}
      <DiscoBall position={[0, 6, 0]} />

      {/* Spotlights */}
      {[-4, 0, 4].map((x, i) => (
        <spotLight key={i} position={[x, 8, -6]} target-position={[x * 0.5, 0, 0]} color={['#FF80AB', '#CE93D8', '#FFD700'][i]} intensity={3} distance={15} angle={0.5} penumbra={0.3} decay={2} />
      ))}
    </group>
  );
}

function DiscoBall({ position }: { position: [number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.8;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1, 6]} />
        <meshStandardMaterial color="#BDBDBD" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.0} metalness={0.95} />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#FFFFFF" intensity={1} distance={12} decay={2} />
    </group>
  );
}

// ── Neon Signs ────────────────────────────────────────────────

function NeonSigns() {
  return (
    <group>
      <NeonSign position={[-18, 4, 22]} rotation={[0, Math.PI/2, 0]} text="LOVE IS REAL ✦" color="#FF80AB" />
      <NeonSign position={[18, 4, 22]} rotation={[0, -Math.PI/2, 0]} text="SNEHA ❤ FOREVER" color="#CE93D8" />
      <NeonSign position={[0, 4, 36]} rotation={[0, Math.PI, 0]} text="YOU ARE MY WORLD ✦" color="#FFD700" />
    </group>
  );
}

function NeonSign({ position, rotation = [0,0,0], text, color }: {
  position: [number,number,number];
  rotation?: [number,number,number];
  text: string;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.children.forEach((c) => {
        if (c instanceof THREE.Mesh) {
          const m = c.material as THREE.MeshStandardMaterial;
          if (m.emissive) m.emissiveIntensity = 0.7 + Math.sin(s.clock.elapsedTime * 3) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[8, 1.2, 0.1]} />
        <meshStandardMaterial color="#0D0015" roughness={0.3} />
      </mesh>
      <mesh>
        <boxGeometry args={[8.2, 1.4, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <Text position={[0, 0, 0.08]} fontSize={0.32} color={color} anchorX="center" anchorY="middle" letterSpacing={0.06}>
        {text}
      </Text>
      <pointLight position={[0, 0, 0.5]} color={color} intensity={1.2} distance={6} decay={2} />
    </group>
  );
}

// ── Floating Giant Hearts ─────────────────────────────────────

function FloatingGiantHearts() {
  const hearts = [
    { pos: [-30, 14, -10] as [number,number,number], color: '#FF1493', scale: 1.5 },
    { pos: [30, 12, -5]   as [number,number,number], color: '#CE93D8', scale: 1.2 },
    { pos: [-25, 18, 20]  as [number,number,number], color: '#FF80AB', scale: 1.0 },
    { pos: [25, 16, 18]   as [number,number,number], color: '#FFD700', scale: 0.9 },
    { pos: [0, 22, -30]   as [number,number,number], color: '#FF1493', scale: 1.8 },
  ];

  return (
    <group>
      {hearts.map((h, i) => (
        <FloatingHeart key={i} position={h.pos} color={h.color} scale={h.scale} index={i} />
      ))}
    </group>
  );
}

function FloatingHeart({ position, color, scale, index }: {
  position: [number,number,number]; color: string; scale: number; index: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const phase = index * 1.2;

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.35 + phase) * 1.5;
      ref.current.rotation.y = s.clock.elapsedTime * 0.08 + phase;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[-0.5, 0.3, 0]}>
        <sphereGeometry args={[0.8, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.2} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <sphereGeometry args={[0.8, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.2} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[1.55, 1.55, 0.6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.2} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      <pointLight position={[0, 0, 0]} color={color} intensity={0.8} distance={8} decay={2} />
    </group>
  );
}

// ── Wishing Well ──────────────────────────────────────────────

function WishingWell({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[1.0, 1.1, 0.8, 16]} />
        <meshStandardMaterial color="#EEE0E5" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.08, 16]} />
        <meshStandardMaterial color="#AADDFF" roughness={0} metalness={0.1} transparent opacity={0.7} />
      </mesh>
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.6, 7]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 2.5, 0]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 7]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[1.1, 0.7, 8]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.3} />
      </mesh>
      <pointLight position={[0, 0.8, 0]} color="#AADDFF" intensity={0.6} distance={4} decay={2} />
      <Suspense fallback={null}>
        <Text position={[0, 3.3, 0]} fontSize={0.18} color="#FF80AB" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
          Make a wish ✨
        </Text>
      </Suspense>
    </group>
  );
}

// ── Pink Hot Air Balloon ──────────────────────────────────────

function HotAirBalloon({ position }: { position: [number,number,number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.25) * 2;
      ref.current.rotation.y = s.clock.elapsedTime * 0.05;
    }
  });

  const STRIPES = ['#FF1493', '#FFD700', '#FF80AB', '#CE93D8', '#FF69B4', '#FFFDE7'];

  return (
    <group ref={ref} position={position}>
      {/* Balloon */}
      {STRIPES.map((color, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[3.5, 6, 12, (i/STRIPES.length)*Math.PI*2, Math.PI*2/STRIPES.length]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Net lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i/8)*Math.PI*2;
        return (
          <mesh key={i} position={[Math.sin(a)*2, -1.5, Math.cos(a)*2]} rotation={[0.4, a, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 3.5, 4]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.6} />
          </mesh>
        );
      })}

      {/* Basket */}
      <mesh position={[0, -4.2, 0]} castShadow>
        <boxGeometry args={[1.4, 1.0, 1.4]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>

      {/* Basket rim */}
      <mesh position={[0, -3.7, 0]}>
        <boxGeometry args={[1.6, 0.12, 1.6]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.6} />
      </mesh>

      {/* Banner from balloon */}
      <Suspense fallback={null}>
        <Text position={[0, -2.2, 1.8]} fontSize={0.35} color="#FFD700" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#FF1493" outlineWidth={0.02}>
          Sneha ♡
        </Text>
      </Suspense>

      <pointLight position={[0, -2, 0]} color="#FF80AB" intensity={1.5} distance={10} decay={2} />
    </group>
  );
}

// ── Confetti Rain ─────────────────────────────────────────────

const CONFETTI_COUNT = 80;

function ConfettiRain() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy   = new THREE.Object3D();
  const CONF_COLORS = ['#FF80AB', '#FFD700', '#CE93D8', '#FF1493', '#80DEEA', '#FFAB91'];

  const particles = useMemo(() => Array.from({ length: CONFETTI_COUNT }, () => ({
    x: (Math.random() - 0.5) * 60,
    y: Math.random() * 30 + 5,
    z: (Math.random() - 0.5) * 60,
    speed: 0.3 + Math.random() * 0.7,
    rotSpeed: Math.random() * 2,
    phase: Math.random() * Math.PI * 2,
  })), []);

  useFrame((s) => {
    if (!meshRef.current) return;
    const t = s.clock.elapsedTime;
    particles.forEach((p, i) => {
      const y = ((p.y - p.speed * t * 0.5) % 30 + 30) % 30 + 2;
      dummy.position.set(p.x + Math.sin(t * 0.3 + p.phase) * 0.5, y, p.z);
      dummy.rotation.set(t * p.rotSpeed, t * p.rotSpeed * 0.7, t * p.rotSpeed * 0.5);
      dummy.scale.setScalar(0.5);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, CONFETTI_COUNT]}>
      <boxGeometry args={[0.14, 0.08, 0.01]} />
      <meshStandardMaterial color="#FF80AB" roughness={0.3} metalness={0.1} />
    </instancedMesh>
  );
}

// ── Ribbon Arches along path ──────────────────────────────────

function RibbonArches() {
  return (
    <group>
      {/* Arches over the north path to dreamhouse */}
      {[-14, -18, -22].map((z, i) => (
        <PathArch key={i} position={[0, 0, z]} color={['#FF80AB', '#CE93D8', '#FFD700'][i]} />
      ))}
      {/* Arches over south path to garden */}
      {[12, 16, 20].map((z, i) => (
        <PathArch key={i + 10} position={[0, 0, z]} color={['#FF80AB', '#80DEEA', '#CE93D8'][i]} />
      ))}
    </group>
  );
}

function PathArch({ position, color }: { position: [number,number,number]; color: string }) {
  return (
    <group position={position}>
      {/* Left post */}
      <mesh position={[-2.5, 1.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 3, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {/* Right post */}
      <mesh position={[2.5, 1.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 3, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {/* Arch curve */}
      <mesh position={[0, 3.1, 0]}>
        <torusGeometry args={[2.5, 0.09, 8, 20, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} emissive={color} emissiveIntensity={0.25} />
      </mesh>
      {/* Flower on top */}
      <mesh position={[0, 5.6, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
      <pointLight position={[0, 3.5, 0]} color={color} intensity={0.5} distance={5} decay={2} />
    </group>
  );
}

// ── Sneha's Grand Monument Statue ─────────────────────────────

function SnehaStatue({ position }: { position: [number, number, number] }) {
  const statueRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (statueRef.current) {
      statueRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.1;
    }
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 2) * 0.25;
    }
  });

  const GOLD = '#FFD700';
  const MARBLE = '#FFF8F0';
  const PINK = '#FF1493';

  return (
    <group position={position}>
      {/* ── Circular Fountain Basin Base ── */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[4.5, 4.8, 0.4, 32]} />
        <meshStandardMaterial color={MARBLE} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Gold Rim */}
      <mesh position={[0, 0.42, 0]}>
        <torusGeometry args={[4.5, 0.1, 8, 32]} />
        <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.8} />
      </mesh>
      {/* Crystal Pink Water */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[4.3, 4.3, 0.05, 32]} />
        <meshStandardMaterial color="#F48FB1" roughness={0} metalness={0.2} transparent opacity={0.7} />
      </mesh>

      {/* ── Marble & Gold Multi-Tier Pedestal ── */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[2.0, 2.3, 0.8, 16]} />
        <meshStandardMaterial color={MARBLE} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[2.2, 0.6, 2.2]} />
        <meshStandardMaterial color={MARBLE} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[2.4, 0.1, 2.4]} />
        <meshStandardMaterial color={GOLD} roughness={0.1} metalness={0.9} emissive={GOLD} emissiveIntensity={0.2} />
      </mesh>

      {/* ── Golden Plaque: SNEHA STATUE ── */}
      <mesh position={[0, 1.5, 1.12]} castShadow>
        <boxGeometry args={[2.1, 0.45, 0.04]} />
        <meshStandardMaterial color={GOLD} roughness={0.1} metalness={0.85} emissive={GOLD} emissiveIntensity={0.15} />
      </mesh>
      <Suspense fallback={null}>
        <Text position={[0, 1.58, 1.15]} fontSize={0.14} color="#1A002A" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
          👑 SNEHA STATUE 👑
        </Text>
        <Text position={[0, 1.4, 1.15]} fontSize={0.08} color="#4A148C" anchorX="center" anchorY="middle" letterSpacing={0.04}>
          The Most Beautiful Girl in the World
        </Text>
      </Suspense>

      {/* ── THE GOLDEN STATUE OF SNEHA ── */}
      <group ref={statueRef} position={[0, 1.9, 0]}>
        {/* Golden Gown */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.7, 1.5, 20]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} emissive={GOLD} emissiveIntensity={0.3} />
        </mesh>
        {/* Upper Bodice */}
        <mesh position={[0, 1.65, 0]} castShadow>
          <capsuleGeometry args={[0.22, 0.4, 8, 14]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} emissive={GOLD} emissiveIntensity={0.35} />
        </mesh>
        {/* Golden Head */}
        <mesh position={[0, 2.18, 0]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} emissive={GOLD} emissiveIntensity={0.35} />
        </mesh>
        {/* Flowing Golden Hair */}
        <mesh position={[0, 2.05, -0.1]}>
          <capsuleGeometry args={[0.15, 0.7, 6, 10]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
        </mesh>
        {/* Royal Crown on Statue */}
        <mesh position={[0, 2.42, 0]}>
          <cylinderGeometry args={[0.18, 0.12, 0.18, 6]} />
          <meshStandardMaterial color="#FFE082" roughness={0.05} metalness={0.95} emissive="#FFD700" emissiveIntensity={0.6} />
        </mesh>
        {/* Ruby atop crown */}
        <mesh position={[0, 2.54, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.9} />
        </mesh>

        {/* Arms holding a glowing pink heart */}
        <mesh position={[0.24, 1.65, 0.18]} rotation={[0.5, 0, 0.3]}>
          <capsuleGeometry args={[0.06, 0.3, 4, 8]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
        </mesh>
        <mesh position={[-0.24, 1.65, 0.18]} rotation={[0.5, 0, -0.3]}>
          <capsuleGeometry args={[0.06, 0.3, 4, 8]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.9} />
        </mesh>

        {/* Glowing Heart in Her Hands */}
        <mesh ref={glowRef} position={[0, 1.65, 0.35]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial color={PINK} emissive={PINK} emissiveIntensity={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Spotlight & Golden Glow */}
      <pointLight position={[0, 5, 2]} color="#FFD700" intensity={2.5} distance={12} decay={2} />
      <pointLight position={[0, 3, -2]} color="#FF80AB" intensity={1.5} distance={10} decay={2} />
    </group>
  );
}

// ── Pink & Gold Glam Scooter / Motorbike ───────────────────────

function PinkGlamScooter({ position, rotation = [0, 0, 0] }: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const PINK = '#FF1493';
  const PINK_LT = '#FF80AB';
  const GOLD = '#FFD700';
  const CHROME = '#E0E0E0';
  const SEAT = '#FFFFFF';

  return (
    <group position={position} rotation={rotation}>
      {/* ── Main Chassis ── */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[1.8, 0.4, 0.55]} />
        <meshStandardMaterial color={PINK} roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Rear Engine Cowl Curvature */}
      <mesh position={[-0.45, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.38, 12, 12]} />
        <meshStandardMaterial color={PINK} roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Front Legshield */}
      <mesh position={[0.65, 0.8, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.12, 0.85, 0.58]} />
        <meshStandardMaterial color={PINK} roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Gold Trim on Legshield */}
      <mesh position={[0.72, 0.8, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.02, 0.86, 0.6]} />
        <meshStandardMaterial color={GOLD} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Leather Seat */}
      <mesh position={[-0.2, 0.82, 0]} castShadow>
        <boxGeometry args={[0.85, 0.14, 0.38]} />
        <meshStandardMaterial color={SEAT} roughness={0.4} />
      </mesh>

      {/* Handlebars & Headlight Stem */}
      <mesh position={[0.6, 1.25, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.5, 8]} />
        <meshStandardMaterial color={CHROME} roughness={0.1} metalness={0.85} />
      </mesh>
      {/* Handlebar Crossbar */}
      <mesh position={[0.6, 1.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.75, 8]} />
        <meshStandardMaterial color={CHROME} roughness={0.1} metalness={0.85} />
      </mesh>
      {/* Gold Grips */}
      {[-0.34, 0.34].map((z, i) => (
        <mesh key={i} position={[0.6, 1.48, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.12, 8]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.7} />
        </mesh>
      ))}

      {/* Dual Glam Headlamps */}
      <mesh position={[0.75, 1.35, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 12]} />
        <meshStandardMaterial color="#FFFDE7" emissive="#FFFACD" emissiveIntensity={1.4} />
      </mesh>

      {/* Rear Taillight */}
      <mesh position={[-0.85, 0.65, 0]}>
        <boxGeometry args={[0.06, 0.12, 0.18]} />
        <meshStandardMaterial color="#FF1744" emissive="#FF1744" emissiveIntensity={0.9} />
      </mesh>

      {/* Chrome Mirrors */}
      {[-0.28, 0.28].map((z, i) => (
        <group key={i} position={[0.6, 1.62, z]}>
          <mesh>
            <cylinderGeometry args={[0.012, 0.012, 0.18, 6]} />
            <meshStandardMaterial color={CHROME} roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshStandardMaterial color={CHROME} roughness={0.05} metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Front Wheel */}
      <group position={[0.75, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.24, 0.24, 0.12, 16]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.13, 16]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* Rear Wheel */}
      <group position={[-0.6, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.24, 0.24, 0.12, 16]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.13, 16]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* SNEHA Scooter Decal */}
      <Suspense fallback={null}>
        <Text position={[0.72, 0.85, 0.3]} rotation={[0, Math.PI / 2, 0]} fontSize={0.09} color={GOLD} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
          Sneha ❤
        </Text>
      </Suspense>
    </group>
  );
}

