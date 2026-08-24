// ============================================================
// SNEHA WORLD — World Layout
// Connecting paths, boundary walls, world decorations,
// and all area placements.
// ============================================================

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PATH_COLOR   = '#F5EFEE';
const BORDER_COLOR = '#E8DDE0';
const GRASS_COLOR  = '#EDE7F6';   // Soft lavender ground (outside areas)
const GRASS_ALT    = '#F3E5F5';

export function WorldLayout() {
  return (
    <group name="world-layout">
      {/* ── Main connecting paths ── */}
      <MainPaths />

      {/* ── Decorative world borders / hedges ── */}
      <WorldBoundaryDecor />

      {/* ── Path lamp posts ── */}
      <PathLamps />

      {/* ── Area transition markers ── */}
      <AreaTransitionFlowers />

      {/* ── Small pond near garden path ── */}
      <SmallPond position={[8, 0, 14]} />
      <SmallPond position={[-8, 0, 14]} />

      {/* ── Bench along paths ── */}
      <PathBench position={[4, 0, 11]} rotation={[0, -Math.PI/4, 0]} />
      <PathBench position={[-4, 0, 11]} rotation={[0, Math.PI/4, 0]} />
    </group>
  );
}

// ── Main Connecting Paths ─────────────────────────────────

function MainPaths() {
  return (
    <group>
      {/* Plaza → Dreamhouse (northward, -Z) */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.07, -16]} receiveShadow>
        <planeGeometry args={[3.5, 14]} />
        <meshStandardMaterial color={PATH_COLOR} roughness={0.6} />
      </mesh>
      {/* Path stone tiles */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI/2, 0, 0]} position={[0, -0.05, -10.5 - i * 1.4]}>
          <planeGeometry args={[3.0, 1.1]} />
          <meshStandardMaterial color={i%2===0 ? '#EEE5E8' : '#E8DDE0'} roughness={0.7} />
        </mesh>
      ))}

      {/* Plaza → Memory Garden (southward, +Z) */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.07, 16]} receiveShadow>
        <planeGeometry args={[3.5, 14]} />
        <meshStandardMaterial color={PATH_COLOR} roughness={0.6} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI/2, 0, 0]} position={[0, -0.05, 10.5 + i*1.35]}>
          <planeGeometry args={[3.0, 1.05]} />
          <meshStandardMaterial color={i%2===0 ? '#EEE5E8' : '#E8DDE0'} roughness={0.7} />
        </mesh>
      ))}

      {/* Plaza → Dressing Room (westward, -X) */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[-14, -0.07, 0]} receiveShadow>
        <planeGeometry args={[14, 3.5]} />
        <meshStandardMaterial color={PATH_COLOR} roughness={0.6} />
      </mesh>

      {/* Plaza → Collectibles (eastward, +X) */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[14, -0.07, 0]} receiveShadow>
        <planeGeometry args={[14, 3.5]} />
        <meshStandardMaterial color={PATH_COLOR} roughness={0.6} />
      </mesh>

      {/* Cross-path around plaza */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.06, 0]}>
        <circleGeometry args={[1.2, 20]} />
        <meshStandardMaterial color={BORDER_COLOR} roughness={0.5} />
      </mesh>
    </group>
  );
}

// ── World Boundary Decoration ──────────────────────────────

function WorldBoundaryDecor() {
  // Scatter small bushes and flowers along the world boundary
  const bushPositions: [number,number,number][] = [
    [18, 0, -10], [18, 0, 5], [18, 0, 20],
    [-18, 0, -10], [-18, 0, 5], [-18, 0, 20],
    [-5, 0, 35], [5, 0, 35], [0, 0, 35],
    [-10, 0, -45], [10, 0, -45],
  ];

  return (
    <group>
      {bushPositions.map((pos, i) => (
        <Bush key={i} position={pos} />
      ))}
    </group>
  );
}

function Bush({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.7, 9, 7]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
      <mesh position={[0.4, 0.5, 0.2]} castShadow>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial color="#43A047" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.35, 0.1]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ── Path Lamp Posts ────────────────────────────────────────

function PathLamps() {
  const positions: [number,number,number][] = [
    // North path (dreamhouse)
    [2.5, 0, -11], [-2.5, 0, -11],
    [2.5, 0, -18], [-2.5, 0, -18],
    // South path (garden)
    [2.5, 0, 11],  [-2.5, 0, 11],
    [2.5, 0, 18],  [-2.5, 0, 18],
    // East path
    [12, 0, 2.5],  [12, 0, -2.5],
    // West path
    [-12, 0, 2.5], [-12, 0, -2.5],
  ];

  return (
    <group>
      {positions.map((pos, i) => (
        <PathLampPost key={i} position={pos} />
      ))}
    </group>
  );
}

function PathLampPost({ position }: { position: [number,number,number] }) {
  const globeRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (globeRef.current) {
      const m = globeRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 1.8 + position[0]) * 0.08;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 2.0, 8]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Arm */}
      <mesh position={[0.25, 2.15, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.025, 0.025, 0.55, 6]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh ref={globeRef} position={[0.5, 2.25, 0]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color="#FFFDE7" emissive="#FFFACD" emissiveIntensity={0.55} roughness={0.1} transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0.5, 2.25, 0]} color="#FFFDE7" intensity={0.8} distance={5} decay={2} />
    </group>
  );
}

// ── Area Transition Flowers ────────────────────────────────

function AreaTransitionFlowers() {
  const clusters: { center: [number,number,number]; colors: string[] }[] = [
    {
      center: [0, 0, -10],
      colors: ['#FF80AB', '#FFD700', '#CE93D8'],
    },
    {
      center: [0, 0, 10],
      colors: ['#CE93D8', '#FF80AB', '#80DEEA'],
    },
    {
      center: [-10, 0, 0],
      colors: ['#FFD740', '#FF80AB', '#A5D6A7'],
    },
    {
      center: [10, 0, 0],
      colors: ['#FF80AB', '#FFAB91', '#CE93D8'],
    },
  ];

  return (
    <group>
      {clusters.map((c, ci) =>
        c.colors.map((color, fi) => {
          const angle = (fi / c.colors.length) * Math.PI * 2;
          const r = 1.2;
          return (
            <TransitionFlower
              key={`${ci}-${fi}`}
              position={[c.center[0] + Math.sin(angle)*r, 0, c.center[2] + Math.cos(angle)*r]}
              color={color}
            />
          );
        })
      )}
    </group>
  );
}

function TransitionFlower({ position, color }: { position: [number,number,number]; color: string }) {
  const ref = useRef<THREE.Group>(null!);
  const spd = 0.4 + Math.random() * 0.3;
  const off = Math.random() * Math.PI * 2;
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * spd + off) * 0.2;
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.38, 5]} />
        <meshStandardMaterial color="#66BB6A" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.055, 7, 7]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>
      {[0,1,2,3,4].map((i) => {
        const a = (i/5)*Math.PI*2;
        return (
          <mesh key={i} position={[Math.sin(a)*0.09, 0.42, Math.cos(a)*0.09]} rotation={[0,a,Math.PI/7]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Small Pond ────────────────────────────────────────────

function SmallPond({ position }: { position: [number,number,number] }) {
  const waterRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (waterRef.current) {
      (waterRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.6 + Math.sin(s.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* Pond basin */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <circleGeometry args={[1.6, 20]} />
        <meshStandardMaterial color="#8D9E88" roughness={0.7} />
      </mesh>
      {/* Water surface */}
      <mesh ref={waterRef} rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[1.4, 20]} />
        <meshStandardMaterial color="#64B5F6" roughness={0} metalness={0.1} transparent opacity={0.65} />
      </mesh>
      {/* Lily pads */}
      {[0, 1, 2].map((i) => {
        const a = (i/3)*Math.PI*2;
        return (
          <mesh key={i} rotation={[-Math.PI/2, 0, a]} position={[Math.sin(a)*0.6, 0.02, Math.cos(a)*0.6]}>
            <circleGeometry args={[0.22, 8]} />
            <meshStandardMaterial color="#388E3C" roughness={0.6} />
          </mesh>
        );
      })}
      {/* Lily flowers */}
      <mesh position={[0.3, 0.1, 0.2]}>
        <sphereGeometry args={[0.1, 7, 7]} />
        <meshStandardMaterial color="#FF80AB" roughness={0.4} emissive="#FF80AB" emissiveIntensity={0.2} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color="#88BBFF" intensity={0.4} distance={3} decay={2} />
    </group>
  );
}

// ── Path Bench ─────────────────────────────────────────────

function PathBench({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number,number,number];
  rotation?: [number,number,number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[1.6, 0.06, 0.45]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.73, -0.19]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.6, 0.35, 0.05]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      {[-0.65, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 0.23, 0]}>
          <boxGeometry args={[0.06, 0.46, 0.45]} />
          <meshStandardMaterial color="#6D4C41" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
