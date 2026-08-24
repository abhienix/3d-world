// ============================================================
// SNEHA WORLD — Central Personalization Data File
//
// ✏️ EDIT THIS FILE to personalize the entire experience.
// ============================================================

import type { SnehaProfile, Memory, Collectible, Outfit, WorldArea } from '../types';

// ── Profile ─────────────────────────────────────────────────
export const snehaProfile: SnehaProfile = {
  name: 'Sneha',
  nickname: undefined,
  favoriteColors: ['#FF80AB', '#C8A2C8', '#FFD700', '#E53935', '#1A237E'],
  favoriteThings: [
    'Rangoli',
    'Sarees',
    'Festive celebrations',
    'Nature & riversides',
    'Traditional art',
  ],
  favoriteFlower: 'Marigold',
  favoriteFood: undefined,
  hobbies: ['Rangoli', 'Fashion', 'Travel', 'Celebrations'],
  accentColor: '#FF80AB',
  secondaryColor: '#CE93D8',

  // ✏️ FINAL MESSAGE — Replace with your personal message.
  finalMessage: `FINAL_MESSAGE_PLACEHOLDER

— Replace this text in src/data/sneha.ts → finalMessage`,
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
    position: [5, 0, 8],
  },
  {
    id: 'memory-02',
    title: 'The Rangoli Artist',
    date: undefined,
    message:
      'Look at her. Surrounded by color, light and diyas — the most beautiful artwork being the one who made it. She creates beauty wherever she goes.',
    photoUrl: '/photos/memory_02.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [-7, 0, 12],
  },
  {
    id: 'memory-03',
    title: 'Golden Day',
    date: undefined,
    message:
      'Yellow suits her. She was glowing brighter than the sun that day. That smile — it\'s the kind that stays with you long after the photo ends.',
    photoUrl: '/photos/memory_03.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [10, 0, -5],
  },
  {
    id: 'memory-04',
    title: 'The Celebrations',
    date: undefined,
    message:
      'There she is — dressed in gold and red, adorned in flowers, absolutely radiant. She makes every celebration more beautiful just by being in it.',
    photoUrl: '/photos/memory_04.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [-5, 0, -10],
  },
  {
    id: 'memory-05',
    title: 'By the River',
    date: undefined,
    message:
      'Wind in her hair, a soft smile, the river behind her. This is the kind of moment you want to keep forever. So here it is — kept forever.',
    photoUrl: '/photos/memory_05.jpg',
    videoUrl: undefined,
    discovered: false,
    position: [8, 0, 15],
  },
];

// ── Collectibles ─────────────────────────────────────────────
export const collectibles: Collectible[] = [
  { id: 'c-01', name: 'Pink Heart',   type: 'heart',  position: [3, 0.5, 3],    collected: false },
  { id: 'c-02', name: 'Gold Star',    type: 'star',   position: [-4, 0.5, 2],   collected: false },
  { id: 'c-03', name: 'Pink Bow',     type: 'bow',    position: [0, 0.5, -5],   collected: false },
  { id: 'c-04', name: 'Marigold',     type: 'flower', position: [6, 0.5, -2],   collected: false },
  { id: 'c-05', name: 'Gift Box',     type: 'gift',   position: [-3, 0.5, -8],  collected: false },
  { id: 'c-06', name: 'Little Diya',  type: 'custom', position: [-6, 0.5, 6],   collected: false },
  { id: 'c-07', name: 'Paper Heart',  type: 'heart',  position: [9, 0.5, 1],    collected: false },
  { id: 'c-08', name: 'Gold Bangle',  type: 'custom', position: [-9, 0.5, -4],  collected: false },
];

// ── Outfits ───────────────────────────────────────────────────
export const outfits: Outfit[] = [
  {
    id: 'outfit-saree',
    name: 'Silk Saree',
    hair: { id: 'hair-long', label: 'Long Flowing' },
    top:  { id: 'top-saree-blouse', label: 'Gold Blouse' },
    bottom: { id: 'bottom-saree', label: 'Navy Silk Saree' },
    shoes: { id: 'shoes-heels', label: 'Gold Heels' },
    accessories: [
      { id: 'acc-earrings', label: 'Jhumka Earrings' },
      { id: 'acc-bangle',   label: 'Gold Bangles' },
      { id: 'acc-bindi',    label: 'Red Bindi' },
    ],
  },
  {
    id: 'outfit-kurta',
    name: 'Yellow Kurta',
    hair: { id: 'hair-long-loose', label: 'Loose & Flowing' },
    top:  { id: 'top-kurta', label: 'Yellow Floral Kurta' },
    bottom: { id: 'bottom-kurta', label: 'Palazzo' },
    shoes: { id: 'shoes-flats', label: 'Flats' },
    accessories: [
      { id: 'acc-stud',  label: 'Pearl Studs' },
      { id: 'acc-bindi', label: 'Red Bindi' },
      { id: 'acc-nath',  label: 'Small Nose Ring' },
    ],
  },
  {
    id: 'outfit-festive',
    name: 'Festive Lehenga',
    hair: { id: 'hair-braid', label: 'Floral Braid' },
    top:  { id: 'top-lehenga', label: 'Peach & Red Embroidered Blouse' },
    bottom: { id: 'bottom-lehenga', label: 'Embroidered Skirt' },
    shoes: { id: 'shoes-heels', label: 'Embellished Heels' },
    accessories: [
      { id: 'acc-maangtikka', label: 'Maang Tikka' },
      { id: 'acc-chaandbali', label: 'Chaandbali Earrings' },
      { id: 'acc-necklace',   label: 'Gold Necklace' },
      { id: 'acc-flowers',    label: 'Hair Flowers' },
    ],
  },
  {
    id: 'outfit-casual',
    name: 'Casual White',
    hair: { id: 'hair-wavy', label: 'Wavy & Free' },
    top:  { id: 'top-white', label: 'White Top' },
    bottom: { id: 'bottom-black', label: 'Black Jeans' },
    shoes: { id: 'shoes-sneakers', label: 'White Sneakers' },
    accessories: [
      { id: 'acc-bangle-gold', label: 'Gold Bracelet' },
      { id: 'acc-ring',        label: 'Delicate Ring' },
    ],
  },
];

// ── World Areas ───────────────────────────────────────────────
export const worldAreas: WorldArea[] = [
  { id: 'plaza',        name: 'Main Plaza',       unlocked: true,  position: [0, 0, 0] },
  { id: 'dreamhouse',   name: 'Dreamhouse',        unlocked: true,  position: [0, 0, -20] },
  { id: 'garden',       name: 'Memory Garden',     unlocked: true,  position: [0, 0, 25] },
  { id: 'dressing',     name: 'Dressing Room',     unlocked: true,  position: [-18, 0, 0] },
  { id: 'collectibles', name: 'Collectible Area',  unlocked: true,  position: [18, 0, 0] },
  { id: 'secret',       name: 'Secret Area',       unlocked: false, position: [0, 0, -50] },
];

// ── Special Dates ──────────────────────────────────────────────
// Used by the constellation/star memory system
export const specialDates = [
  {
    id: 'date-start',
    date: '18 June 2025',
    label: 'The Beginning',
    message: 'The day two strangers became each other\'s home.',
  },
];
