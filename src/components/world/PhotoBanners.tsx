// ============================================================
// SNEHA WORLD — Photo Banners & Billboards
// Sneha's real photos displayed on large 3D frames/banners
// throughout the world with love messages.
// ============================================================

import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

// ── All photo banners scattered across the world ─────────────

export function PhotoBanners() {
  return (
    <group name="photo-banners">
      {/* Giant welcome billboard at world entrance */}
      <Suspense fallback={<BannerFallback position={[0, 0, -8]} scale={1.8} color="#FF80AB" />}>
        <GiantWelcomeBillboard />
      </Suspense>

      {/* ── Beauty Billboard 1: Most Beautiful Girl (North Dreamhouse Entrance) ── */}
      <Suspense fallback={<BannerFallback position={[0, 0, -20]} scale={1.4} color="#FF1493" />}>
        <PhotoFrame
          photoUrl="/photos/memory_04.jpg"
          position={[0, 0, -22]}
          rotation={[0, 0, 0]}
          caption="👑 The Most Beautiful Girl in the World 👑"
          subCaption="Epitome of beauty, grace & eternal charm"
          frameColor="#FF1493"
          scale={1.35}
        />
      </Suspense>

      {/* ── Beauty Billboard 2: Pure Elegance (West Plaza Path) ── */}
      <Suspense fallback={<BannerFallback position={[-14, 0, -5]} scale={1.1} color="#FF80AB" />}>
        <PhotoFrame
          photoUrl="/photos/memory_02.jpg"
          position={[-14, 0, -5]}
          rotation={[0, Math.PI / 2, 0]}
          caption="Pure Magic & Elegance 🥻"
          subCaption="She creates art and radiates endless beauty"
          frameColor="#FF80AB"
          scale={1.15}
        />
      </Suspense>

      {/* ── Beauty Billboard 3: Sunshine Glow (East Plaza Path) ── */}
      <Suspense fallback={<BannerFallback position={[14, 0, -5]} scale={1.1} color="#FFD700" />}>
        <PhotoFrame
          photoUrl="/photos/memory_03.jpg"
          position={[14, 0, -5]}
          rotation={[0, -Math.PI / 2, 0]}
          caption="Golden Goddess ✨"
          subCaption="That smile is brighter than a million suns"
          frameColor="#FFD700"
          scale={1.15}
        />
      </Suspense>

      {/* ── Beauty Billboard 4: Natural Grace (Near Pool) ── */}
      <Suspense fallback={<BannerFallback position={[-20, 0, -3]} scale={1.1} color="#80DEEA" />}>
        <PhotoFrame
          photoUrl="/photos/memory_05.jpg"
          position={[-20, 0, -3]}
          rotation={[0, Math.PI / 3, 0]}
          caption="Prettiest Eyes & Gentle Soul 🌊"
          subCaption="Wind in her hair, perfection in every frame"
          frameColor="#80DEEA"
          scale={1.15}
        />
      </Suspense>

      {/* ── Beauty Billboard 5: Royal Glamour (Near Carousel) ── */}
      <Suspense fallback={<BannerFallback position={[20, 0, 10]} scale={1.1} color="#CE93D8" />}>
        <PhotoFrame
          photoUrl="/photos/memory_04.jpg"
          position={[20, 0, 10]}
          rotation={[0, -Math.PI / 3, 0]}
          caption="Radiant Royal Princess 🌸"
          subCaption="Every moment with you is pure heaven"
          frameColor="#CE93D8"
          scale={1.15}
        />
      </Suspense>

      {/* Floating photo frames near the dreamhouse */}
      <Suspense fallback={<BannerFallback position={[-10, 0, -28]} scale={0.9} color="#FF80AB" />}>
        <FloatingPhotoFrame
          photoUrl="/photos/memory_03.jpg"
          position={[-10, 3.5, -28]}
          caption="My Queen Sneha 💖"
          frameColor="#E91E8C"
        />
      </Suspense>

      <Suspense fallback={<BannerFallback position={[10, 0, -28]} scale={0.9} color="#CE93D8" />}>
        <FloatingPhotoFrame
          photoUrl="/photos/memory_05.jpg"
          position={[10, 3.5, -28]}
          caption="Forever Gorgeous 🌊"
          frameColor="#CE93D8"
        />
      </Suspense>

      {/* Heart-framed banner in the garden */}
      <Suspense fallback={<BannerFallback position={[0, 0, 22]} scale={1.2} color="#FF1493" />}>
        <HeartFrameBanner
          photoUrl="/photos/memory_01.jpg"
          position={[0, 0, 22]}
          caption="18 · 06 · 25"
          subCaption="The day two strangers became each other's home 💗"
        />
      </Suspense>

      {/* Love message boards */}
      <LoveMessageBoard position={[-16, 0, 10]} rotation={[0, Math.PI / 2, 0]} />
      <LoveMessageBoard position={[16, 0, 10]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Hanging banner strings above the plaza */}
      <HangingBannerString />
    </group>
  );
}

// ── Giant Welcome Billboard ───────────────────────────────────

function GiantWelcomeBillboard() {
  const texture = useTexture('/photos/memory_03.jpg');
  const ref = useRef<THREE.Group>(null!);

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = 9 + Math.sin(s.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group ref={ref} position={[0, 9, -8]}>
      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[5.8, 0.18, 10, 40]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.6} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Gold ornate frame */}
      <mesh>
        <boxGeometry args={[9.0, 6.0, 0.18]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.7} emissive="#FFD700" emissiveIntensity={0.15} />
      </mesh>

      {/* Inner dark mat */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[8.5, 5.5, 0.05]} />
        <meshStandardMaterial color="#2D0A2E" roughness={0.3} />
      </mesh>

      {/* Photo texture */}
      <mesh position={[0, 0.5, 0.16]}>
        <planeGeometry args={[7.5, 4.0]} />
        <meshStandardMaterial map={texture} roughness={0.3} />
      </mesh>

      {/* Text overlay */}
      <Text
        position={[0, -2.4, 0.18]}
        fontSize={0.55}
        color="#FF80AB"
        anchorX="center"
        anchorY="middle"
        outlineColor="#2D0A2E"
        outlineWidth={0.025}
        font="/fonts/Pacifico-Regular.ttf"
      >
        SNEHA WORLD ✦
      </Text>

      <Text
        position={[0, -2.95, 0.18]}
        fontSize={0.22}
        color="rgba(255,220,240,0.8)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        Made with all my love, just for you
      </Text>

      {/* Corner decorative gems */}
      {[[-4.2, 2.7], [4.2, 2.7], [-4.2, -2.7], [4.2, -2.7]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.2]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial color="#FF80AB" emissive="#FF80AB" emissiveIntensity={0.7} roughness={0.1} metalness={0.5} />
        </mesh>
      ))}

      {/* Glow light */}
      <pointLight position={[0, 0, 1]} color="#FF80AB" intensity={2} distance={8} decay={2} />
    </group>
  );
}

// ── Photo Frame (standing billboard style) ───────────────────

interface PhotoFrameProps {
  photoUrl: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  caption: string;
  subCaption?: string;
  frameColor?: string;
  scale?: number;
}

function PhotoFrame({
  photoUrl, position, rotation = [0, 0, 0],
  caption, subCaption, frameColor = '#FF80AB', scale = 1,
}: PhotoFrameProps) {
  const texture = useTexture(photoUrl);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Post left */}
      <mesh position={[-1.3, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 4.2, 8]} />
        <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Post right */}
      <mesh position={[1.3, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 4.2, 8]} />
        <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Frame outer */}
      <mesh position={[0, 3.6, 0]} castShadow>
        <boxGeometry args={[3.0, 3.8, 0.14]} />
        <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.5} emissive={frameColor} emissiveIntensity={0.1} />
      </mesh>

      {/* Photo */}
      <mesh position={[0, 3.6, 0.09]}>
        <planeGeometry args={[2.7, 3.4]} />
        <meshStandardMaterial map={texture} roughness={0.2} />
      </mesh>

      {/* Caption panel */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[3.0, 0.9, 0.12]} />
        <meshStandardMaterial color="#1A0A1E" roughness={0.3} />
      </mesh>

      <Text position={[0, 1.65, 0.1]} fontSize={0.2} color={frameColor} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        {caption}
      </Text>
      {subCaption && (
        <Text position={[0, 1.42, 0.1]} fontSize={0.1} color="rgba(255,220,240,0.75)" anchorX="center" anchorY="middle" letterSpacing={0.02} maxWidth={2.8}>
          {subCaption}
        </Text>
      )}

      {/* Glow */}
      <pointLight position={[0, 3.6, 0.8]} color={frameColor} intensity={0.8} distance={4} decay={2} />
    </group>
  );
}

// ── Floating Photo Frame ──────────────────────────────────────

function FloatingPhotoFrame({
  photoUrl, position, caption, frameColor = '#FF80AB',
}: {
  photoUrl: string;
  position: [number, number, number];
  caption: string;
  frameColor?: string;
}) {
  const texture = useTexture(photoUrl);
  const ref = useRef<THREE.Group>(null!);
  const phase = Math.random() * Math.PI * 2;

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.5 + phase) * 0.4;
      ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2 + phase) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[1.65, 0.1, 8, 32]} />
        <meshStandardMaterial color={frameColor} emissive={frameColor} emissiveIntensity={0.5} roughness={0.1} metalness={0.6} />
      </mesh>

      {/* Frame */}
      <mesh>
        <boxGeometry args={[2.8, 3.6, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.5} emissive={frameColor} emissiveIntensity={0.1} />
      </mesh>

      {/* Photo */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.5, 3.2]} />
        <meshStandardMaterial map={texture} roughness={0.2} />
      </mesh>

      {/* Caption */}
      <Text position={[0, -2.0, 0.08]} fontSize={0.22} color={frameColor} anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        {caption}
      </Text>

      {/* Corner stars */}
      {[[-1.3, 1.7], [1.3, 1.7], [-1.3, -1.7], [1.3, -1.7]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]}>
          <sphereGeometry args={[0.1, 7, 7]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.7} roughness={0.1} />
        </mesh>
      ))}

      <pointLight position={[0, 0, 0.8]} color={frameColor} intensity={0.6} distance={4} decay={2} />
    </group>
  );
}

// ── Heart Frame Banner ────────────────────────────────────────

function HeartFrameBanner({
  photoUrl, position, caption, subCaption,
}: {
  photoUrl: string;
  position: [number, number, number];
  caption: string;
  subCaption: string;
}) {
  const texture = useTexture(photoUrl);
  const ref = useRef<THREE.Group>(null!);

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + 5.5 + Math.sin(s.clock.elapsedTime * 0.35) * 0.2;
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={ref} position={[position[0], position[1] + 5.5, position[2]]}>
      {/* Big heart shape behind (two spheres + rotated box) */}
      <mesh position={[-0.8, 0.5, -0.05]}>
        <sphereGeometry args={[1.2, 14, 14]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.35} roughness={0.2} metalness={0.1} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.8, 0.5, -0.05]}>
        <sphereGeometry args={[1.2, 14, 14]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.35} roughness={0.2} metalness={0.1} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, -0.6, -0.05]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.3, 2.3, 0.25]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.35} roughness={0.2} metalness={0.1} transparent opacity={0.9} />
      </mesh>

      {/* Photo on top */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[1.8, 2.2]} />
        <meshStandardMaterial map={texture} roughness={0.2} />
      </mesh>

      {/* Caption */}
      <Text position={[0, -2.1, 0.1]} fontSize={0.28} color="#FFD700" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf" outlineColor="#1A0A1E" outlineWidth={0.015}>
        {caption}
      </Text>
      <Text position={[0, -2.55, 0.1]} fontSize={0.115} color="rgba(255,200,230,0.85)" anchorX="center" anchorY="middle" maxWidth={3.5} letterSpacing={0.02}>
        {subCaption}
      </Text>

      <pointLight position={[0, 0, 1]} color="#FF1493" intensity={1.5} distance={7} decay={2} />
    </group>
  );
}

// ── Love Message Board ────────────────────────────────────────

function LoveMessageBoard({
  position, rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const messages = [
    '❤️ You are loved',
    '🌸 Always & forever',
    '✨ My favorite person',
    '💛 Made just for you',
    '🌊 Home is wherever you are',
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Post */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 3.0, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Board */}
      <mesh position={[0, 3.4, 0]} castShadow>
        <boxGeometry args={[3.5, 2.4, 0.12]} />
        <meshStandardMaterial color="#1A0A1E" roughness={0.3} />
      </mesh>

      {/* Board border */}
      <mesh position={[0, 3.4, -0.03]}>
        <boxGeometry args={[3.7, 2.6, 0.08]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.2} metalness={0.3} emissive="#FF80AB" emissiveIntensity={0.15} />
      </mesh>

      {/* Messages */}
      {messages.map((msg, i) => (
        <Text
          key={i}
          position={[0, 4.15 - i * 0.44, 0.1]}
          fontSize={0.17}
          color={['#FF80AB', '#FFD700', '#CE93D8', '#80DEEA', '#FFAB91'][i]}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.02}
        >
          {msg}
        </Text>
      ))}

      <pointLight position={[0, 3.4, 0.8]} color="#FF80AB" intensity={0.6} distance={4} decay={2} />
    </group>
  );
}

// ── Hanging Banner String above plaza ────────────────────────

function HangingBannerString() {
  const colors = ['#FF80AB', '#FFD700', '#CE93D8', '#FF1493', '#80DEEA', '#FFAB91'];
  const letters = ['S', 'N', 'E', 'H', 'A', '♡'];

  return (
    <group position={[0, 0, 3]}>
      {/* String */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[-4.5 + i * 1.5, 7.4, 0]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial color="#CE93D8" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 7.4, 0]}>
        <boxGeometry args={[9.5, 0.025, 0.025]} />
        <meshStandardMaterial color="#CE93D8" roughness={0.5} />
      </mesh>

      {/* Hanging triangular bunting */}
      {letters.map((letter, i) => (
        <BuntingFlag key={i} position={[-3.75 + i * 1.5, 6.8, 0]} color={colors[i]} letter={letter} />
      ))}
    </group>
  );
}

function BuntingFlag({
  position, color, letter,
}: {
  position: [number, number, number];
  color: string;
  letter: string;
}) {
  return (
    <group position={position}>
      {/* Triangle flag */}
      <mesh>
        <coneGeometry args={[0.45, 0.9, 4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <Text position={[0, 0.05, 0.45]} fontSize={0.28} color="#fff" anchorX="center" anchorY="middle" font="/fonts/Pacifico-Regular.ttf">
        {letter}
      </Text>
    </group>
  );
}

// ── Fallback while textures load ─────────────────────────────

function BannerFallback({
  position, scale = 1, color = '#FF80AB',
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh position={[position[0], position[1] + 3, position[2]]} scale={scale}>
      <boxGeometry args={[2.8, 3.5, 0.1]} />
      <meshStandardMaterial color={color} roughness={0.3} transparent opacity={0.3} />
    </mesh>
  );
}
