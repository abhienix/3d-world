// ============================================================
// SNEHA WORLD — Main 3D Scene (Full Barbie World)
// Robust WebGL & Mobile-Ready Canvas Setup
// ============================================================

import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../stores/gameStore';
import { WorldLayout } from './world/WorldLayout';
import { MainPlaza } from './world/MainPlaza';
import { DreamHouse } from './world/DreamHouse';
import { MemoryGarden } from './world/MemoryGarden';
import { PhotoBanners } from './world/PhotoBanners';
import { BarbieWorldExtras } from './world/BarbieWorldExtras';
import { PlayerCharacter } from './character/PlayerCharacter';
import { AbhiCharacter } from './character/AbhiCharacter';
import { FootstepTrail } from './character/FootstepTrail';
import { ThirdPersonCamera } from './camera/ThirdPersonCamera';
import { InteractionManager } from './interaction/InteractiveObject';
import { AtmosphereController } from './world/AtmosphereController';
import { FireworksShow } from './world/FireworksShow';
import { SkySanctuary } from './world/SkySanctuary';
import { LoveCafe } from './world/LoveCafe';
import { GiantFerrisWheel } from './world/GiantFerrisWheel';
import { WorldCollectibles } from './world/WorldCollectibles';
import { SnehaLandAttractions } from './world/SnehaLandAttractions';
import { AsansolCityExpansion } from './world/AsansolCityExpansion';
import { AsansolLocalSpots } from './world/AsansolLocalSpots';
import { PrissiAndGunnuJhula } from './world/PrissiAndGunnuJhula';

// ── Asset loading simulator ──────────────────────────────────

function AssetLoader() {
  const setLoadingProgress = useGameStore((s) => s.setLoadingProgress);
  useEffect(() => {
    let progress = 15;
    setLoadingProgress(15);
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25 + 15);
      if (progress >= 100) {
        setLoadingProgress(100);
        clearInterval(interval);
      } else {
        setLoadingProgress(progress);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [setLoadingProgress]);
  return null;
}

// ── Inner scene ──────────────────────────────────────────────

function SceneInner() {
  const playerRef = useRef<THREE.Group>(null!);

  return (
    <>
      {/* ── Dynamic Atmosphere, Sky & Lights ── */}
      <AtmosphereController />
      <ImmediateGround />

      {/* ── Player + Abhi Companion + Footstep Sparkles ── */}
      <PlayerCharacter playerRef={playerRef} />
      <AbhiCharacter playerRef={playerRef} />
      <FootstepTrail playerRef={playerRef} />
      <ThirdPersonCamera targetRef={playerRef} />
      <InteractionManager playerRef={playerRef} />

      {/* ── Interactive Heart Fireworks ── */}
      <FireworksShow />

      {/* ── World layout — paths, ponds, benches ── */}
      <Suspense fallback={null}>
        <WorldLayout />
      </Suspense>

      {/* ── Main Plaza — stage, fountain, pedestals ── */}
      <Suspense fallback={null}>
        <MainPlaza />
      </Suspense>

      {/* ── Dream House — mansion, balcony, pool ── */}
      <Suspense fallback={null}>
        <DreamHouse />
      </Suspense>

      {/* ── Memory Garden — gazebos, statues, trees ── */}
      <Suspense fallback={null}>
        <MemoryGarden />
      </Suspense>

      {/* ── Photo Billboards & Banners ── */}
      <PhotoBanners />

      {/* ── Full Barbie World extras ── */}
      <Suspense fallback={null}>
        <BarbieWorldExtras />
      </Suspense>

      {/* ── Floating Sky Sanctuary (Secret Cloud Island) ── */}
      <Suspense fallback={null}>
        <SkySanctuary />
      </Suspense>

      {/* ── Café de Sneha ♡ ── */}
      <Suspense fallback={null}>
        <LoveCafe />
      </Suspense>

      {/* ── Giant Love Wonder Wheel ── */}
      <Suspense fallback={null}>
        <GiantFerrisWheel />
      </Suspense>

      {/* ── Glowing World Collectible Gems ── */}
      <WorldCollectibles />

      {/* ── Snehaland Disneyland Theme Park Stalls & Carousel ── */}
      <Suspense fallback={null}>
        <SnehaLandAttractions />
      </Suspense>

      {/* ── Asansol & Kulti City (Sentrum Mall, Fern Residency, Airport, Railway Jn, Zudio) ── */}
      <Suspense fallback={null}>
        <AsansolCityExpansion />
      </Suspense>

      {/* ── Category A: Maithon Dam, Phuchka Stall, Mishti Mukh, Festive Puja Pandal ── */}
      <Suspense fallback={null}>
        <AsansolLocalSpots />
      </Suspense>

      {/* ── Prissi & Gunnu on the Royal Flower Jhula ── */}
      <Suspense fallback={null}>
        <PrissiAndGunnuJhula />
      </Suspense>
    </>
  );
}

// ── Vibrant ground backdrop ──────────────────────────────────

function ImmediateGround() {
  return (
    <>
      {/* Main world ground — Soft pastel green & cream meadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#E8EAE6" roughness={0.85} metalness={0} />
      </mesh>
    </>
  );
}

// ── Exported scene ───────────────────────────────────────────

export function MainScene() {
  return (
    <>
      <AssetLoader />
      <Canvas
        shadows
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.8) : 1]}
        camera={{ fov: 60, near: 0.1, far: 280, position: [0, 5, 12] }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        style={{ position: 'fixed', inset: 0, touchAction: 'none' }}
      >
        <SceneInner />
      </Canvas>
    </>
  );
}
