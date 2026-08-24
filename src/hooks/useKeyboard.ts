// ============================================================
// SNEHA WORLD — Keyboard & Mobile Input Hook
// ============================================================

import { useEffect, useRef } from 'react';
import { mobileInput } from '../stores/mobileInput';

export interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  run: boolean;
  debug: boolean;
}

export function useKeyboard() {
  const keyboardState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false,
    run: false,
    debug: false,
  });

  const keys = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false,
    run: false,
    debug: false,
  });

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup':    keyboardState.current.forward  = true; break;
        case 's': case 'arrowdown':  keyboardState.current.backward = true; break;
        case 'a': case 'arrowleft':  keyboardState.current.left     = true; break;
        case 'd': case 'arrowright': keyboardState.current.right    = true; break;
        case 'e':                    keyboardState.current.interact  = true; break;
        case 'shift':                keyboardState.current.run       = true; break;
        case '`':                    keyboardState.current.debug     = true; break;
      }
    };

    const onUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup':    keyboardState.current.forward  = false; break;
        case 's': case 'arrowdown':  keyboardState.current.backward = false; break;
        case 'a': case 'arrowleft':  keyboardState.current.left     = false; break;
        case 'd': case 'arrowright': keyboardState.current.right    = false; break;
        case 'e':                    keyboardState.current.interact  = false; break;
        case 'shift':                keyboardState.current.run       = false; break;
        case '`':                    keyboardState.current.debug     = false; break;
      }
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  // Sync keyboard + mobile inputs dynamically
  return {
    get current() {
      keys.current.forward  = keyboardState.current.forward  || mobileInput.forward;
      keys.current.backward = keyboardState.current.backward || mobileInput.backward;
      keys.current.left     = keyboardState.current.left     || mobileInput.left;
      keys.current.right    = keyboardState.current.right    || mobileInput.right;
      keys.current.run      = keyboardState.current.run      || mobileInput.run;
      keys.current.interact = keyboardState.current.interact;
      keys.current.debug    = keyboardState.current.debug;
      return keys.current;
    },
  };
}
