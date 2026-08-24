// ============================================================
// SNEHA WORLD — Math / Utility Helpers
// ============================================================

import * as THREE from 'three';

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp a value between min and max */
export const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

/** Returns a random float in [min, max] */
export const randFloat = (min: number, max: number) => Math.random() * (max - min) + min;

/** Returns a random integer in [min, max] inclusive */
export const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Smoothly approach target value */
export const damp = (current: number, target: number, smoothing: number, dt: number) =>
  lerp(current, target, 1 - Math.pow(smoothing, dt));

/** Convert hex color string to THREE.Color */
export const hexToColor = (hex: string) => new THREE.Color(hex);

/** Create a soft glow material */
export const glowMaterial = (color: string, intensity = 1.0) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.2,
    metalness: 0.1,
  });
