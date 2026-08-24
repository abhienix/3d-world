// ============================================================
// SNEHA WORLD — Companion Character: Abhi
// A cute stylized companion who follows Sneha wherever she goes
// and always speaks sweet love messages with flashing hearts!
// ============================================================

import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const LOVE_MESSAGES = [
  'I love uh! I love uh baby! 💖',
  'You are the most beautiful girl in the world! ✨',
  'My Queen Sneha 👑💕',
  'You are my whole world! 🌸',
  'I love you so much baby! 🥰',
  'The prettiest girl ever! 💖',
  'Always by your side, Sneha ❤️',
];

interface AbhiCharacterProps {
  playerRef: React.RefObject<THREE.Group | null>;
}

export function AbhiCharacter({ playerRef }: AbhiCharacterProps) {
  const abhiRef = useRef<THREE.Group>(null!);
  const bobRef = useRef(0);
  const isWalkingRef = useRef(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const timerRef = useRef(0);

  // Materials
  const mats = useMemo(() => ({
    skin:    new THREE.MeshStandardMaterial({ color: '#D4956A', roughness: 0.65 }),
    hair:    new THREE.MeshStandardMaterial({ color: '#1B1410', roughness: 0.4 }),
    jacket:  new THREE.MeshStandardMaterial({ color: '#212121', roughness: 0.4 }),
    shirt:   new THREE.MeshStandardMaterial({ color: '#FF4081', roughness: 0.3, metalness: 0.1 }),
    pants:   new THREE.MeshStandardMaterial({ color: '#37474F', roughness: 0.6 }),
    shoes:   new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.3 }),
    eyes:    new THREE.MeshStandardMaterial({ color: '#0F0A06', roughness: 0.2 }),
    gold:    new THREE.MeshStandardMaterial({ color: '#FFD700', roughness: 0.2, metalness: 0.8 }),
    shadow:  new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.18 }),
  }), []);

  useFrame((state, delta) => {
    if (!abhiRef.current || !playerRef.current) return;

    const abhi = abhiRef.current;
    const player = playerRef.current;

    // Target position: trailing 2.2 units behind Sneha
    const playerPos = player.position;
    const playerRot = player.rotation.y;
    const followOffset = new THREE.Vector3(
      -Math.sin(playerRot) * 2.2 + 0.8,
      0,
      -Math.cos(playerRot) * 2.2
    );

    const targetPos = playerPos.clone().add(followOffset);
    const distToTarget = abhi.position.distanceTo(targetPos);

    if (distToTarget > 0.3) {
      // Smoothly walk towards target position
      isWalkingRef.current = true;
      const moveSpeed = Math.min(distToTarget * 4, 7.5);
      const dir = targetPos.clone().sub(abhi.position).normalize();
      abhi.position.addScaledVector(dir, moveSpeed * delta);

      // Rotate Abhi to face movement direction or face Sneha
      const lookTarget = playerPos.clone();
      lookTarget.y = abhi.position.y;
      abhi.lookAt(lookTarget);

      bobRef.current += delta * 10;
    } else {
      isWalkingRef.current = false;
      // When stopped, always look directly at Sneha with love
      const lookTarget = playerPos.clone();
      lookTarget.y = abhi.position.y;
      abhi.lookAt(lookTarget);
      bobRef.current += delta * 1.5;
    }

    if (abhi.position.y < 0) abhi.position.y = 0;

    // Cycle sweet love messages every 3.5 seconds
    timerRef.current += delta;
    if (timerRef.current > 3.5) {
      timerRef.current = 0;
      setMsgIndex((prev) => (prev + 1) % LOVE_MESSAGES.length);
    }
  });

  return (
    <group ref={abhiRef} position={[1, 0, 3]}>
      {/* Ground Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} material={mats.shadow}>
        <circleGeometry args={[0.45, 16]} />
      </mesh>

      {/* Floating Love Speech Bubble */}
      <SpeechBubble message={LOVE_MESSAGES[msgIndex]} />

      {/* ══ BODY / OUTFIT ══ */}
      {/* Pink inner tee */}
      <mesh position={[0, 1.15, 0]} castShadow material={mats.shirt}>
        <capsuleGeometry args={[0.2, 0.45, 8, 14]} />
      </mesh>

      {/* Stylish Black Jacket */}
      <mesh position={[0, 1.18, 0]} castShadow material={mats.jacket}>
        <boxGeometry args={[0.46, 0.52, 0.38]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.5, 0]} material={mats.skin}>
        <cylinderGeometry args={[0.08, 0.09, 0.16, 10]} />
      </mesh>

      {/* ══ HEAD & HAIR ══ */}
      <mesh position={[0, 1.74, 0]} castShadow material={mats.skin}>
        <sphereGeometry args={[0.21, 16, 16]} />
      </mesh>

      {/* Handsome Haircut */}
      <mesh position={[0, 1.88, 0.02]} material={mats.hair}>
        <sphereGeometry args={[0.22, 16, 16]} />
      </mesh>
      {/* Front hair fringe */}
      <mesh position={[0.04, 1.86, 0.16]} rotation={[0.2, 0.1, -0.3]} material={mats.hair}>
        <boxGeometry args={[0.16, 0.1, 0.12]} />
      </mesh>

      {/* Cute Eyes looking at Sneha */}
      <mesh position={[0.075, 1.76, 0.19]} material={mats.eyes}>
        <sphereGeometry args={[0.026, 8, 8]} />
      </mesh>
      <mesh position={[-0.075, 1.76, 0.19]} material={mats.eyes}>
        <sphereGeometry args={[0.026, 8, 8]} />
      </mesh>

      {/* Happy Smile */}
      <mesh position={[0, 1.68, 0.2]} rotation={[0.05, 0, 0]}>
        <capsuleGeometry args={[0.018, 0.06, 4, 8]} />
        <meshStandardMaterial color="#B71C1C" roughness={0.4} />
      </mesh>

      {/* ══ ARMS ══ */}
      <mesh position={[0.28, 1.2, 0]} rotation={[0, 0, 0.2]} castShadow material={mats.jacket}>
        <capsuleGeometry args={[0.07, 0.36, 6, 10]} />
      </mesh>
      <mesh position={[-0.28, 1.2, 0]} rotation={[0, 0, -0.2]} castShadow material={mats.jacket}>
        <capsuleGeometry args={[0.07, 0.36, 6, 10]} />
      </mesh>

      {/* ══ PANTS & LEGS (animated) ══ */}
      <AnimatedAbhiLeg side={1}  bobRef={bobRef} isWalkingRef={isWalkingRef} pantsMat={mats.pants} />
      <AnimatedAbhiLeg side={-1} bobRef={bobRef} isWalkingRef={isWalkingRef} pantsMat={mats.pants} />

      {/* ══ WHITE SNEAKERS ══ */}
      <mesh position={[0.1, 0.08, 0.03]} castShadow material={mats.shoes}>
        <boxGeometry args={[0.13, 0.09, 0.25]} />
      </mesh>
      <mesh position={[-0.1, 0.08, 0.03]} castShadow material={mats.shoes}>
        <boxGeometry args={[0.13, 0.09, 0.25]} />
      </mesh>

      {/* Name Tag Over Abhi */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.16}
        color="#80DEEA"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000000"
        outlineWidth={0.015}
      >
        ✦ Abhi ✦
      </Text>
    </group>
  );
}

// ── Floating Flashing Speech Bubble ───────────────────────────

function SpeechBubble({ message }: { message: string }) {
  const bubbleRef = useRef<THREE.Group>(null!);
  const heartRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (bubbleRef.current) {
      bubbleRef.current.position.y = 2.65 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
    }
    if (heartRef.current) {
      heartRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 6) * 0.25);
    }
  });

  return (
    <group ref={bubbleRef}>
      {/* Bubble background plate */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[3.2, 0.7]} />
        <meshBasicMaterial color="#FF1493" transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[3.3, 0.8]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      {/* Speech pointer triangle */}
      <mesh position={[0, -0.42, -0.02]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.14, 0.2, 3]} />
        <meshBasicMaterial color="#FF1493" />
      </mesh>

      {/* Animated Heart on top */}
      <mesh ref={heartRef} position={[0, 0.48, 0.02]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
      </mesh>

      {/* Text Message */}
      <Text
        position={[0, 0, 0.04]}
        fontSize={0.155}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.0}
        font="/fonts/Pacifico-Regular.ttf"
      >
        {message}
      </Text>
    </group>
  );
}

interface AbhiLegProps {
  side: 1 | -1;
  bobRef: React.RefObject<number>;
  isWalkingRef: React.RefObject<boolean>;
  pantsMat: THREE.Material;
}

function AnimatedAbhiLeg({ side, bobRef, isWalkingRef, pantsMat }: AbhiLegProps) {
  const legRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!legRef.current) return;
    if (isWalkingRef.current) {
      legRef.current.rotation.x = Math.sin(bobRef.current + (side === 1 ? 0 : Math.PI)) * 0.42;
    } else {
      legRef.current.rotation.x *= 0.85;
    }
  });

  return (
    <mesh ref={legRef} position={[side * 0.1, 0.52, 0]} castShadow material={pantsMat}>
      <capsuleGeometry args={[0.075, 0.48, 6, 10]} />
    </mesh>
  );
}
