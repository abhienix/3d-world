// ============================================================
// SNEHA WORLD — Mobile Input Store
// Shared state between MobileControls UI and the 3D scene.
// ============================================================

export const mobileInput = {
  forward:  false,
  backward: false,
  left:     false,
  right:    false,
  run:      false,
  // Camera rotation deltas (consumed each frame by ThirdPersonCamera)
  cameraDX: 0,
  cameraDY: 0,
};
