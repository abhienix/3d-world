// ============================================================
// SNEHA WORLD — Walk-In Dreamhouse Interior
// Royal Barbie Bedroom, Hollywood Glam Vanity & Wall Gallery
// ============================================================

import React, { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

export function DreamHouseInterior() {
  return (
    <group position={[0, 0, -28]}>
      {/* ── Dreamhouse Interior Room (Ground & 1st Floor) ── */}
      {/* Plush Pink Heart Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.9} />
      </mesh>

      {/* ── ROYAL VELVET HEART CANOPY BED ── */}
      <CanopyBed position={[0, 0, -2]} />

      {/* ── HOLLYWOOD GLAM VANITY TABLE ── */}
      <VanityTable position={[-4, 0, 1]} rotation={[0, Math.PI / 2, 0]} />

      {/* ── WALL GALLERY OF HER PHOTOS ── */}
      <Suspense fallback={null}>
        <InteriorPhotoFrame
          photoUrl="/photos/memory_03.jpg"
          position={[-3.8, 2.4, -3.2]}
          rotation={[0, 0, 0]}
          title="Most Beautiful ✨"
        />
        <InteriorPhotoFrame
          photoUrl="/photos/memory_02.jpg"
          position={[3.8, 2.4, -3.2]}
          rotation={[0, 0, 0]}
          title="Pure Art 🥻"
        />
        <InteriorPhotoFrame
          photoUrl="/photos/memory_04.jpg"
          position={[4.8, 2.4, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          title="My Princess 👑"
        />
      </Suspense>

      {/* ── WARDROBE & CLOTHES RACK ── */}
      <WardrobeRack position={[4, 0, 1.5]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ── COZY FIREPLACE WITH WARM GLOW ── */}
      <Fireplace position={[0, 0, 3.4]} rotation={[0, Math.PI, 0]} />

      {/* ── CRYSTAL CHANDELIER ── */}
      <Chandelier position={[0, 3.4, 0]} />
    </group>
  );
}

// ── Canopy Bed ────────────────────────────────────────────────

function CanopyBed({ position }: { position: [number, number, number] }) {
  const GOLD = '#FFD700';
  const PINK_VELVET = '#FF4081';
  const PILLOW = '#FFF8F0';

  return (
    <group position={position}>
      {/* Bed Base */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[3.0, 0.5, 3.2]} />
        <meshStandardMaterial color={PINK_VELVET} roughness={0.5} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[2.8, 0.35, 3.0]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>

      {/* Silk Blanket */}
      <mesh position={[0, 0.8, 0.3]}>
        <boxGeometry args={[2.85, 0.22, 2.2]} />
        <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.2} />
      </mesh>

      {/* Silk Pillows */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.96, -1.0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.7, 0.18, 0.5]} />
          <meshStandardMaterial color={PILLOW} roughness={0.3} />
        </mesh>
      ))}

      {/* Gold Bedposts */}
      {[[-1.45, -1.55], [1.45, -1.55], [-1.45, 1.55], [1.45, 1.55]].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.6, z]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 3.2, 8]} />
          <meshStandardMaterial color={GOLD} roughness={0.15} metalness={0.85} />
        </mesh>
      ))}

      {/* Canopy Top Fabric */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[3.1, 0.08, 3.3]} />
        <meshStandardMaterial color="#FFB6C1" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// ── Hollywood Glam Vanity Table ───────────────────────────────

function VanityTable({ position, rotation = [0, 0, 0] }: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const GOLD = '#FFD700';
  const WHITE = '#FFFFFF';

  return (
    <group position={position} rotation={rotation}>
      {/* Table Surface */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[2.2, 0.1, 1.0]} />
        <meshStandardMaterial color={WHITE} roughness={0.1} />
      </mesh>
      {/* Legs */}
      {[[-0.95, -0.4], [0.95, -0.4], [-0.95, 0.4], [0.95, 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.45, z]}>
          <cylinderGeometry args={[0.03, 0.04, 0.9, 8]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
        </mesh>
      ))}

      {/* Round Mirror */}
      <mesh position={[0, 1.8, -0.4]}>
        <cylinderGeometry args={[0.7, 0.7, 0.04, 24]} />
        <meshStandardMaterial color="#E0F7FA" roughness={0.0} metalness={0.9} />
      </mesh>
      {/* Gold Mirror Frame */}
      <mesh position={[0, 1.8, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.04, 8, 24]} />
        <meshStandardMaterial color={GOLD} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Glowing Vanity Bulbs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.7, 1.8 + Math.cos(a) * 0.7, -0.37]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#FFFDE7" emissive="#FFFACD" emissiveIntensity={1.8} />
          </mesh>
        );
      })}

      {/* Perfume Bottles & Makeup on Table */}
      <mesh position={[-0.5, 1.05, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.18, 8]} />
        <meshStandardMaterial color="#FF80AB" transparent opacity={0.85} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, 1.05, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.16, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Vanity Stool */}
      <mesh position={[0, 0.45, 0.6]}>
        <cylinderGeometry args={[0.35, 0.35, 0.45, 16]} />
        <meshStandardMaterial color="#FF4081" roughness={0.6} />
      </mesh>

      <pointLight position={[0, 1.8, 0.2]} color="#FFF8E1" intensity={1.5} distance={5} decay={2} />
    </group>
  );
}

// ── Interior Framed Photo ─────────────────────────────────────

function InteriorPhotoFrame({
  photoUrl, position, rotation = [0, 0, 0], title,
}: {
  photoUrl: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
}) {
  const texture = useTexture(photoUrl);

  return (
    <group position={position} rotation={rotation}>
      {/* Gold Baroque Frame */}
      <mesh>
        <boxGeometry args={[1.5, 1.9, 0.06]} />
        <meshStandardMaterial color="#FFD700" roughness={0.15} metalness={0.85} />
      </mesh>
      {/* Photo */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[1.3, 1.7]} />
        <meshStandardMaterial map={texture} roughness={0.2} />
      </mesh>
      {/* Title */}
      <Text position={[0, -1.08, 0.04]} fontSize={0.12} color="#FFD700" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        {title}
      </Text>
    </group>
  );
}

// ── Wardrobe Clothes Rack ─────────────────────────────────────

function WardrobeRack({ position, rotation = [0, 0, 0] }: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const GOLD = '#FFD700';
  const DRESS_COLORS = ['#FF1493', '#FFD700', '#CE93D8', '#80DEEA', '#FF80AB'];

  return (
    <group position={position} rotation={rotation}>
      {/* Stand Posts */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 1.0, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 2.0, 6]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      {/* Top Bar */}
      <mesh position={[0, 1.95, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.7, 6]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Hanging Barbie Gowns */}
      {DRESS_COLORS.map((color, i) => (
        <group key={i} position={[-0.6 + i * 0.3, 1.3, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <coneGeometry args={[0.16, 0.7, 8]} />
            <meshStandardMaterial color={color} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Fireplace ─────────────────────────────────────────────────

function Fireplace({ position, rotation = [0, 0, 0] }: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const fireRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (fireRef.current) {
      const m = fireRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.2 + Math.sin(s.clock.elapsedTime * 8) * 0.4;
      fireRef.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 6) * 0.1);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Hearth Surround */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[2.0, 1.6, 0.6]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.3} />
      </mesh>
      {/* Fire Cavity */}
      <mesh position={[0, 0.6, 0.15]}>
        <boxGeometry args={[1.2, 1.0, 0.4]} />
        <meshStandardMaterial color="#1A0A0E" roughness={0.9} />
      </mesh>
      {/* Glowing Fire Flame */}
      <mesh ref={fireRef} position={[0, 0.45, 0.2]}>
        <coneGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial color="#FF6D00" emissive="#FF3D00" emissiveIntensity={1.5} roughness={0} />
      </mesh>
      <pointLight position={[0, 0.6, 0.4]} color="#FFA726" intensity={2} distance={6} decay={2} />
    </group>
  );
}

// ── Chandelier ────────────────────────────────────────────────

function Chandelier({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={ref} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.0, 6]} />
        <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.03, 8, 16]} />
        <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Crystals */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.6, -0.15, Math.cos(a) * 0.6]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial color="#E0F7FA" roughness={0} metalness={0.9} emissive="#E0F7FA" emissiveIntensity={0.5} />
          </mesh>
        );
      })}
      <pointLight position={[0, 0, 0]} color="#FFE0B2" intensity={1.8} distance={8} decay={2} />
    </group>
  );
}
