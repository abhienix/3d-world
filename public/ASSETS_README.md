# SNEHA WORLD — Asset Directory Guide

This folder contains all media assets for SNEHA WORLD.
You can personalize the experience by adding files here — no code changes needed.
All file paths are referenced in `src/data/sneha.ts`.

---

## 📁 Folder Structure

```
public/
  models/      — 3D character and prop models (.glb / .gltf)
  textures/    — Texture images for 3D materials (.jpg / .png / .webp)
  photos/      — Memory photos shown in-game (.jpg / .png / .webp)
  videos/      — Memory video clips (.mp4 / .webm)
  audio/       — Music and sound effects (.mp3 / .ogg)
  fonts/       — Optional custom fonts (.ttf / .woff2)
```

---

## 🧍 Character Models

Place Sneha's 3D models in `public/models/`:

| File                    | Purpose                                 | Notes                          |
|-------------------------|-----------------------------------------|--------------------------------|
| `sneha.glb`             | Main character (T-pose / base mesh)     | Required for final character   |
| `sneha_idle.glb`        | Idle animation                          | Loops while standing           |
| `sneha_walk.glb`        | Walk cycle animation                    | 8–12 frames recommended        |
| `sneha_run.glb`         | Run animation (optional)                |                                |
| `sneha_wave.glb`        | Waving animation                        |                                |
| `sneha_dance.glb`       | Dance animation                         | Used in celebration sequence   |

**Recommended character spec:**
- Polygon count: 10,000–30,000 tris
- Rig: Humanoid (Mixamo-compatible preferred)
- Format: GLB (binary GLTF)
- Textures: embedded or in `/textures/character/`

---

## 🏠 Scene Props

| File                    | Purpose                                |
|-------------------------|----------------------------------------|
| `dreamhouse.glb`        | Dreamhouse building                    |
| `dressing_room.glb`     | Dressing room interior                 |
| `fountain.glb`          | Optional custom fountain               |

---

## 🖼 Memory Photos

Place in `public/photos/`:

| File                    | Purpose                                | Recommended Size  |
|-------------------------|----------------------------------------|-------------------|
| `memory_01.jpg`         | First memory photo                     | 1200 × 900 px     |
| `memory_02.jpg`         | Second memory photo                    | 1200 × 900 px     |
| `memory_03.jpg`         | Third memory photo                     | 1200 × 900 px     |
| ... (up to memory_10)   | Additional memories                    |                   |

**Tips:**
- Use `.jpg` for photos, `.png` for images with transparency
- Max file size per photo: 2MB recommended
- Aspect ratio: 4:3 or 16:9 works best

---

## 🎬 Memory Videos

Place in `public/videos/`:

| File                    | Purpose                                | Format            |
|-------------------------|----------------------------------------|-------------------|
| `memory_01.mp4`         | Optional video for first memory        | MP4 (H.264)       |
| `final_message.mp4`     | Optional video for final cinematic     | MP4, max 60s      |

---

## 🎵 Audio

Place in `public/audio/`:

| File                    | Purpose                                | Format            |
|-------------------------|----------------------------------------|-------------------|
| `background.mp3`        | Main background music (loops)          | MP3 128–192kbps   |
| `dreamhouse.mp3`        | Dreamhouse ambient music               | MP3               |
| `garden.mp3`            | Memory garden ambient music            | MP3               |
| `secret.mp3`            | Secret room music                      | MP3               |
| `cinematic.mp3`         | Final cinematic music                  | MP3               |
| `sfx_collect.mp3`       | Collectible pickup sound               | MP3, <1s          |
| `sfx_memory.mp3`        | Memory discovered sound                | MP3, <2s          |
| `sfx_door.mp3`          | Door open sound                        | MP3, <1s          |
| `sfx_footstep.mp3`      | Footstep sound                         | MP3, <0.5s        |

**Important:** Use royalty-free music only.
Recommended sources: Pixabay, Free Music Archive, Incompetech.

---

## 🔤 Fonts

Place in `public/fonts/` (optional — Google Fonts are loaded by default):

| File                    | Purpose                                |
|-------------------------|----------------------------------------|
| `Pacifico-Regular.ttf`  | Display font for signs and titles      |

Download from: https://fonts.google.com/specimen/Pacifico

---

## ✅ Checklist for Personalization

1. [ ] Add memory photos to `/photos/`
2. [ ] Update memory data in `src/data/sneha.ts`
3. [ ] Add background music to `/audio/`
4. [ ] Add Sneha's character GLB to `/models/` (when ready)
5. [ ] Write the final message in `src/data/sneha.ts` → `finalMessage`
6. [ ] Add the Pacifico font to `/fonts/` for best sign rendering
