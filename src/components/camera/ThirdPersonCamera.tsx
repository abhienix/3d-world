// ============================================================
// SNEHA WORLD — Third-Person Camera Controller (Mobile & Desktop)
// ============================================================

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { mobileInput } from '../../stores/mobileInput';

const CAMERA_DISTANCE = 7.5;
const CAMERA_HEIGHT = 3.2;
const CAMERA_SMOOTHING = 0.08;
const MOUSE_SENSITIVITY = 0.003;
const VERTICAL_MIN = -0.25;
const VERTICAL_MAX = 0.85;

interface ThirdPersonCameraProps {
  targetRef: React.RefObject<THREE.Group | null>;
}

export function ThirdPersonCamera({ targetRef }: ThirdPersonCameraProps) {
  const { camera } = useThree();
  const settings = useGameStore((s) => s.settings);
  const phase = useGameStore((s) => s.phase);

  const photoModeActive = useGameStore((s) => s.photoModeActive);

  const yaw = useRef(0);
  const pitch = useRef(0.25);
  const isPointerLocked = useRef(false);
  const smoothedPos = useRef(new THREE.Vector3(0, 3, 8));
  const smoothedTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const onClick = () => {
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      if (!isTouch && phase === 'playing' && !useGameStore.getState().photoModeActive) {
        canvas.requestPointerLock();
      }
    };

    const onPointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === canvas;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isPointerLocked.current) return;
      const sens = MOUSE_SENSITIVITY * settings.cameraSensitivity;
      yaw.current -= e.movementX * sens;
      pitch.current = Math.max(
        VERTICAL_MIN,
        Math.min(VERTICAL_MAX, pitch.current - e.movementY * sens)
      );
    };

    canvas.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      canvas.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [phase, settings.cameraSensitivity]);

  useFrame((_, delta) => {
    if (!targetRef.current) return;

    // Apply mobile touch delta if any
    if (mobileInput.cameraDX !== 0 || mobileInput.cameraDY !== 0) {
      const touchSens = 0.005 * settings.cameraSensitivity;
      yaw.current -= mobileInput.cameraDX * touchSens;
      pitch.current = Math.max(
        VERTICAL_MIN,
        Math.min(VERTICAL_MAX, pitch.current - mobileInput.cameraDY * touchSens)
      );
      mobileInput.cameraDX = 0;
      mobileInput.cameraDY = 0;
    }

    const target = targetRef.current.position;
    const playerRot = targetRef.current.rotation.y;

    // In photo mode, smoothly orbit in front of Sneha for a flattering portrait
    if (photoModeActive) {
      yaw.current = playerRot + Math.PI + Math.sin(delta) * 0.1;
      pitch.current = 0.08;
    }

    const distance = photoModeActive ? 3.6 : CAMERA_DISTANCE;
    const height = photoModeActive ? 1.6 : CAMERA_HEIGHT;

    // Spherical camera offset
    const offset = new THREE.Vector3(
      Math.sin(yaw.current) * Math.cos(pitch.current) * distance,
      Math.sin(pitch.current) * distance + height,
      Math.cos(yaw.current) * Math.cos(pitch.current) * distance
    );

    const desiredPos = target.clone().add(offset);

    // Smooth camera movement
    const t = 1 - Math.pow(CAMERA_SMOOTHING, delta);
    smoothedPos.current.lerp(desiredPos, t);
    smoothedTarget.current.lerp(
      target.clone().add(new THREE.Vector3(0, photoModeActive ? 1.4 : 1.4, 0)),
      t
    );

    camera.position.copy(smoothedPos.current);
    camera.lookAt(smoothedTarget.current);

    // Expose yaw for player movement direction
    (targetRef.current as THREE.Group & { cameraYaw?: number }).cameraYaw = yaw.current;
  });

  return null;
}
