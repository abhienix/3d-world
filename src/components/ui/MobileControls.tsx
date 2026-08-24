// ============================================================
// SNEHA WORLD — Mobile On-Screen Touch Controls
// Joystick, Sprint button, Action/Interact button, and Touch Look Area
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { mobileInput } from '../../stores/mobileInput';
import { interactableRegistry } from '../interaction/interactionRegistry';

export function MobileControls() {
  const phase = useGameStore((s) => s.phase);
  const nearbyInteractableId = useGameStore((s) => s.nearbyInteractableId);
  const setActiveInteraction = useGameStore((s) => s.setActiveInteraction);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [joystickActive, setJoystickActive] = useState(false);
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 });

  const touchLookStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const joystickTouchId = useRef<number | null>(null);
  const joystickBaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile touch
    const checkTouch = () => {
      setIsTouchDevice(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth <= 900);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  if (phase !== 'playing' || !isTouchDevice) return null;

  // Handle Joystick Touch Start
  const handleJoystickStart = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    joystickTouchId.current = touch.identifier;
    setJoystickActive(true);
    updateJoystick(touch.clientX, touch.clientY);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === joystickTouchId.current) {
        updateJoystick(touch.clientX, touch.clientY);
      }
    }
  };

  const handleJoystickEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId.current) {
        joystickTouchId.current = null;
        setJoystickActive(false);
        setStickPos({ x: 0, y: 0 });
        mobileInput.forward = false;
        mobileInput.backward = false;
        mobileInput.left = false;
        mobileInput.right = false;
      }
    }
  };

  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = rect.width / 2;

    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(distance, maxRadius);

    const nx = Math.cos(angle) * clampedDist;
    const ny = Math.sin(angle) * clampedDist;

    setStickPos({ x: nx, y: ny });

    const threshold = 15;
    mobileInput.forward  = dy < -threshold;
    mobileInput.backward = dy > threshold;
    mobileInput.left     = dx < -threshold;
    mobileInput.right    = dx > threshold;
  };

  // Handle Camera Look Touch on right side of screen
  const handleLookStart = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      // Only capture if touch is on right 60% of screen
      if (touch.clientX > window.innerWidth * 0.35 && !touchLookStart.current) {
        touchLookStart.current = { id: touch.identifier, x: touch.clientX, y: touch.clientY };
      }
    }
  };

  const handleLookMove = (e: React.TouchEvent) => {
    const current = touchLookStart.current;
    if (!current) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === current.id) {
        const deltaX = touch.clientX - current.x;
        const deltaY = touch.clientY - current.y;
        mobileInput.cameraDX += deltaX;
        mobileInput.cameraDY += deltaY;
        current.x = touch.clientX;
        current.y = touch.clientY;
      }
    }
  };

  const handleLookEnd = (e: React.TouchEvent) => {
    const current = touchLookStart.current;
    if (!current) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === current.id) {
        touchLookStart.current = null;
        break;
      }
    }
  };

  const handleInteract = () => {
    if (nearbyInteractableId) {
      const entry = interactableRegistry.get(nearbyInteractableId);
      if (entry) {
        setActiveInteraction({ data: entry.data, objectId: nearbyInteractableId });
      }
    }
  };

  const toggleRun = () => {
    const next = !isRunning;
    setIsRunning(next);
    mobileInput.run = next;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 90,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Right-half Camera Touch Orbit Area */}
      <div
        onTouchStart={handleLookStart}
        onTouchMove={handleLookMove}
        onTouchEnd={handleLookEnd}
        onTouchCancel={handleLookEnd}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '65%',
          height: '75%',
          pointerEvents: 'auto',
        }}
      />

      {/* Virtual Joystick (Bottom Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          pointerEvents: 'auto',
          touchAction: 'none',
        }}
      >
        <div
          ref={joystickBaseRef}
          onTouchStart={handleJoystickStart}
          onTouchMove={handleJoystickMove}
          onTouchEnd={handleJoystickEnd}
          onTouchCancel={handleJoystickEnd}
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,128,171,0.28) 0%, rgba(20,5,30,0.55) 100%)',
            border: '2px solid rgba(255,128,171,0.6)',
            boxShadow: '0 8px 32px rgba(255,128,171,0.3), inset 0 0 15px rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Inner stick nub */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF4081, #FF80AB)',
              border: '2px solid #FFFFFF',
              boxShadow: '0 4px 15px rgba(255,64,129,0.7)',
              transform: `translate(${stickPos.x}px, ${stickPos.y}px)`,
              transition: joystickActive ? 'none' : 'transform 0.15s ease-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: 18,
            }}
          >
            🌸
          </div>
        </div>
      </div>

      {/* Action Buttons (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          pointerEvents: 'auto',
        }}
      >
        {/* Interact / Discover Button (When near interactable) */}
        {nearbyInteractableId && (
          <button
            onClick={handleInteract}
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #FFA000)',
              border: '2px solid #FFF',
              boxShadow: '0 0 25px rgba(255,215,0,0.8)',
              color: '#4A148C',
              fontSize: 14,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 1s infinite alternate',
            }}
          >
            <span style={{ fontSize: 20 }}>✨</span>
            <span style={{ fontSize: 10, letterSpacing: '0.05em' }}>OPEN</span>
          </button>
        )}

        {/* Sprint / Run Button */}
        <button
          onClick={toggleRun}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: isRunning
              ? 'linear-gradient(135deg, #FF1493, #E91E63)'
              : 'rgba(30,10,40,0.75)',
            border: isRunning ? '2px solid #FFD700' : '2px solid rgba(255,128,171,0.5)',
            boxShadow: isRunning
              ? '0 0 20px rgba(255,20,147,0.8)'
              : '0 4px 15px rgba(0,0,0,0.3)',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 18 }}>{isRunning ? '⚡' : '👟'}</span>
          <span style={{ fontSize: 9 }}>{isRunning ? 'RUNNING' : 'RUN'}</span>
        </button>
      </div>
    </div>
  );
}
