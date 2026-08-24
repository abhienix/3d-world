// ============================================================
// SNEHA WORLD — Central Personalization Data File
// ============================================================

import type { SnehaProfile, Memory, Collectible, Outfit, WorldArea } from '../types';

// ── Profile ─────────────────────────────────────────────────
export const snehaProfile: SnehaProfile = {
  name: 'Sneha',
  nickname: 'Queen',
  favoriteColors: ['#FF1493', '#FF80AB', '#FFD700', '#CE93D8', '#E53935'],
  favoriteThings: [
    'Rangoli',
    'Sarees',
    'Festive celebrations',
    'Nature & riversides',
    'Traditional art',
    'Barbie Aesthetics',
  ],
  favoriteFlower: 'Marigold & Pink Rose',
  favoriteFood: 'Sweets & Boba',
  hobbies: ['Rangoli', 'Fashion', 'Travel', 'Celebrations', 'Photography'],
  accentColor: '#FF1493',
  secondaryColor: '#FFD700',

  finalMessage: `My Dearest Sneha,

You are my home, my peace, and the most beautiful dream I could ever ask for.
From the very first day we met on 18-06-25, you brought magic, laughter, and endless warmth into my world.

Every smile of yours is my favorite work of art.
Every moment with you is a memory I will cherish forever and always.

You are the queen of my heart, the prettiest girl in the universe, and my forever love.

Forever & Always Yours,
Abhi ♡`,
};

// ── Memories ─────────────────────────────────────────────────
export const memories: Memory[] = [
  {
    id: 'memory-01',
    title: 'The Day Two Strangers Became Each Other\'s Home',
    date: '18 June 2025',
    message:
      'The day two strangers became each other\'s home. A little paper heart folded with care — carrying the date that changed everything. 18-06-25. ❤️',
    photoUrl: '/photos/memory_01.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [0, 0, 18],
  },
  {
    id: 'memory-02',
    title: 'The Rangoli Artist',
    date: 'Diwali Glow',
    message:
      'Look at her. Surrounded by color, light and diyas — the most beautiful artwork being the one who made it. She creates beauty wherever she goes.',
    photoUrl: '/photos/memory_02.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [-14, 0, -5],
  },
  {
    id: 'memory-03',
    title: 'Golden Day',
    date: 'Sunshine Smile',
    message:
      'Yellow suits her. She was glowing brighter than the sun that day. That smile — it\'s the kind that stays with you long after the photo ends.',
    photoUrl: '/photos/memory_03.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [14, 0, -5],
  },
  {
    id: 'memory-04',
    title: 'The Celebrations',
    date: 'Royal Elegance',
    message:
      'There she is — dressed in gold and red, adorned in flowers, absolutely radiant. She makes every celebration more beautiful just by being in it.',
    photoUrl: '/photos/memory_04.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [-8, 0, -22],
  },
  {
    id: 'memory-05',
    title: 'By the River',
    date: 'Serene Breeze',
    message:
      'Wind in her hair, a soft smile, the river behind her. This is the kind of moment you want to keep forever. So here it is — kept forever.',
    photoUrl: '/photos/memory_05.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [-20, 0, -3],
  },
];

// ── Collectibles ─────────────────────────────────────────────
export const collectibles: Collectible[] = [
  { id: 'c-01', name: 'Pink Diamond Heart', type: 'heart',  position: [0, 1.2, 5],     collected: false },
  { id: 'c-02', name: 'Golden Tiara Gem',   type: 'star',   position: [-18, 1.2, 0],   collected: false },
  { id: 'c-03', name: 'Sparkling Rose',     type: 'flower', position: [-22, 1.2, 15],  collected: false },
  { id: 'c-04', name: 'Carousel Gold Star', type: 'star',   position: [22, 1.2, 15],   collected: false },
  { id: 'c-05', name: 'Dreamhouse Key',     type: 'gift',   position: [0, 1.2, -26],   collected: false },
  { id: 'c-06', name: 'Romantic Diya',      type: 'custom', position: [0, 1.2, 40],    collected: false },
  { id: 'c-07', name: 'Love Convertible Gem', type: 'heart', position: [15, 1.2, -20], collected: false },
  { id: 'c-08', name: 'Sky Sanctuary Crystal', type: 'heart', position: [0, 46.2, 0],   collected: false },
];

// ── Outfits ──────────────────────────────────────────────────
export const outfits: Outfit[] = [
  {
    id: 'outfit-barbie-gown',
    name: 'Barbie Royal Princess Ballgown',
    description: 'Hot pink cascading gown with golden lace borders and sparkling diamond tiara.',
    previewColor: '#FF1493',
    unlocked: true,
    parts: [],
  },
  {
    id: 'outfit-silk-saree',
    name: 'Navy Silk Diwali Saree',
    description: 'Rich royal blue silk saree with gold zari border and traditional jhumkas.',
    previewColor: '#1A237E',
    unlocked: true,
    parts: [],
  },
  {
    id: 'outfit-festive-lehenga',
    name: 'Peach & Gold Celebration Lehenga',
    description: 'Embroidered festive lehenga with maang tikka and chandelier earrings.',
    previewColor: '#FFA07A',
    unlocked: true,
    parts: [],
  },
  {
    id: 'outfit-yellow-kurta',
    name: 'Sunshine Floral Kurta',
    description: 'Bright yellow floral kurta with delicate red bindi and golden bangles.',
    previewColor: '#FFD700',
    unlocked: true,
    parts: [],
  },
];

// ── World Areas ──────────────────────────────────────────────
export const worldAreas: WorldArea[] = [
  {
    id: 'plaza',
    name: 'Grand Barbie Plaza',
    description: 'The glowing heart of Sneha World with fountains, photo billboards, and love banners.',
    centerPosition: [0, 0, 0],
    radius: 12,
    unlocked: true,
  },
  {
    id: 'dreamhouse',
    name: 'Sneha\'s Dream Home',
    description: 'A 2-story pink Barbie mansion with royal bedroom, vanity table, and private gardens.',
    centerPosition: [0, 0, -28],
    radius: 18,
    unlocked: true,
  },
  {
    id: 'garden',
    name: 'Anniversary Memory Garden',
    description: 'Glowing flower blooms holding real photographic memories of your journey.',
    centerPosition: [0, 0, 22],
    radius: 14,
    unlocked: true,
  },
  {
    id: 'statue',
    name: 'Sneha Monument & Pool',
    description: 'The grand golden statue honoring the most beautiful girl in the world and pink heart pool.',
    centerPosition: [-18, 0, -5],
    radius: 15,
    unlocked: true,
  },
  {
    id: 'cafe',
    name: 'Café de Sneha ♡',
    description: 'A cute outdoor Parisian Barbie cafe serving strawberry cakes, macarons, and love lattes.',
    centerPosition: [-25, 0, -22],
    radius: 12,
    unlocked: true,
  },
  {
    id: 'skysanctuary',
    name: 'Floating Sky Sanctuary',
    description: 'A secret celestial cloud island with glowing waterfalls, giant crystal heart, and love letter.',
    centerPosition: [0, 45, 0],
    radius: 20,
    unlocked: true,
  },
];
