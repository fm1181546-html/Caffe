// ============================================
// CHEZNOUS BOARDGAME CAFE — MENU DATA
// ============================================

import { Star, Sparkles } from 'lucide-react';

import imgBakso from '../assets/img/Bakso ala loka.jpg';
import imgNasiGoreng from '../assets/img/Nasi Goreng Loka.jpg';
import imgMixPlatter from '../assets/img/Mix Platter.jpg';
import imgSeblak from '../assets/img/Seblak ala loka.jpg';
import imgMieNyemek from '../assets/img/Mie Nyemek.jpg';
import imgPisang from '../assets/img/Pisang Goreng Sambal.jpg';
import imgMieInstan from '../assets/img/Mie Instan ala loka.jpg';

import imgJuiceAlpukat from '../assets/img/Juice Alpukat.jpg';
import imgLokacitrus from '../assets/img/Lokalcitrus.jpg';
import imgLokamilk from '../assets/img/Lokamilk.jpg';
import imgLokaOrange from '../assets/img/Lokaorange.jpg';
import imgAirMineral from '../assets/img/Air Mineral.jpg';

import imgLokachino from '../assets/img/Lokachino.jpg';
import imgMangoLokachino from '../assets/img/Manggo Lokachino.jpg';
import imgBerryLokachino from '../assets/img/Berry Lokachino.jpg';
import imgOrangeLokachino from '../assets/img/Orangecino.jpg';
import imgFrenchPress from '../assets/img/French Press.jpg';
import imgLokaV60 from '../assets/img/Loka V60.jpg';

import imgBoardGame from '../assets/img/Boardgame.jpg';
import imgBoardGame2 from '../assets/img/Boardgame2.jpg';

export const FOOD_ITEMS = [
  {
    id: 'f1',
    name: 'Bakso ChezNous',
    price: 25000,
    category: 'food',
    description: 'Bakso sapi premium dengan kuah kaldu spesial, mie, tahu, dan topping pilihan khas ChezNous.',
    tag: 'Best Seller',
    tagIcon: Star,
    isBestSeller: true,
    image: imgBakso,
  },
  {
    id: 'f2',
    name: 'Nasi Goreng ChezNous',
    price: 28000,
    category: 'food',
    description: 'Nasi goreng special recipe khas ChezNous dengan telur ceplok, acar, dan kerupuk renyah.',
    tag: "Chef's Pick",
    tagIcon: Sparkles,
    image: imgNasiGoreng,
  },
  {
    id: 'f3',
    name: 'Mix Platter',
    price: 20000,
    category: 'food',
    description: 'Kombinasi berbagai camilan gorengan pilihan: tahu, tempe, pisang, dan lainnya.',
    tag: 'Sharing',
    image: imgMixPlatter,
  },
  {
    id: 'f4',
    name: 'Seblak Ala ChezNous',
    price: 25000,
    category: 'food',
    description: 'Seblak khas Bandung dengan level pedas pilihan, kerupuk kenyal, telur, dan topping sosis.',
    tag: 'Spicy 🌶',
    image: imgSeblak,
  },
  {
    id: 'f5',
    name: 'Mie Nyemek ChezNous',
    price: 25000,
    category: 'food',
    description: 'Mie kuah kental semi-kering dengan bumbu rempah yang kaya, bakso, dan sayuran segar.',
    image: imgMieNyemek,
  },
  {
    id: 'f6',
    name: 'Pisang Goreng Sambal',
    price: 25000,
    category: 'food',
    description: 'Pisang kepok goreng crispy dengan sambal matah khas Loka yang segar dan pedas.',
    image: imgPisang,
  },
  {
    id: 'f7',
    name: 'Mie Instan ChezNous',
    price: 18000,
    category: 'food',
    description: 'Mie instan dimasak ala ChezNous dengan tambahan telur, sayur, dan sambal spesial.',
    tag: 'Hemat',
    image: imgMieInstan,
  },
];

export const DRINK_NON_COFFEE = [
  {
    id: 'd1',
    name: 'Juice Alpukat',
    price: 25000,
    category: 'non-coffee',
    description: 'Alpukat segar blended dengan susu, cokelat meses, dan sedikit kental manis.',
    tag: 'Favorit',
    tagIcon: Star,
    isBestSeller: true,
    image: imgJuiceAlpukat,
  },
  {
    id: 'd2',
    name: 'ChezNouscitrus',
    price: 15000,
    category: 'non-coffee',
    description: 'Minuman segar perpaduan lemon, jeruk nipis, dan soda dengan sejumput mint.',
    image: imgLokacitrus,
  },
  {
    id: 'd3',
    name: 'ChezNousmilk',
    price: 18000,
    category: 'non-coffee',
    description: 'Fresh milk khas ChezNous dengan pilihan rasa original, cokelat, atau strawberry.',
    image: imgLokamilk,
  },
  {
    id: 'd4',
    name: 'ChezNous Orange',
    price: 20000,
    category: 'non-coffee',
    description: 'Jeruk peras segar dicampur madu dan soda, menyegarkan selama main game.',
    image: imgLokaOrange,
  },
  {
    id: 'd5',
    name: 'Air Mineral',
    price: 7000,
    category: 'non-coffee',
    description: 'Air mineral dingin segar.',
    image: imgAirMineral,
  },
];

export const DRINK_COFFEE = [
  {
    id: 'c1',
    name: 'ChezNouschino',
    price: 21000,
    category: 'coffee',
    description: 'Cappuccino khas ChezNous dengan crema espresso sempurna dan latte art istimewa.',
    tag: 'Signature',
    tagIcon: Star,
    isBestSeller: true,
    image: imgLokachino,
  },
  {
    id: 'c2',
    name: 'Mango ChezNouschino',
    price: 22000,
    category: 'coffee',
    description: 'Perpaduan unik espresso, susu, dan mango segar — manis dengan sentuhan kopi.',
    image: imgMangoLokachino,
  },
  {
    id: 'c3',
    name: 'Berry ChezNouschino',
    price: 22000,
    category: 'coffee',
    description: 'Espresso segar dengan berry mix puree, susu, dan foam lembut nan menawan.',
    image: imgBerryLokachino,
  },
  {
    id: 'c4',
    name: 'Orange ChezNouschino',
    price: 25000,
    category: 'coffee',
    description: 'Espresso dengan jeruk segar, soda, dan twist oranye yang refreshing.',
    image: imgOrangeLokachino,
  },
  {
    id: 'c5',
    name: 'French Press',
    price: 25000,
    category: 'coffee',
    description: 'Kopi French Press dengan biji kopi pilihan yang diseduh dengan sempurna.',
    image: imgFrenchPress,
  },
  {
    id: 'c6',
    name: 'ChezNous V60',
    price: 35000,
    category: 'coffee',
    description: 'Pour-over V60 manual brew dengan single origin beans, bright & complex flavor.',
    tag: 'Premium',
    image: imgLokaV60,
  },
];

export const PLAY_PACKAGES = [
  {
    id: 'p1',
    name: 'Main Per Jam',
    price: 12000,
    category: 'play',
    description: 'Akses main semua koleksi boardgame selama 1 jam. Cocok untuk sesi singkat bersama teman.',
    icon: 'Clock',
    unit: '/ jam',
    image: imgBoardGame,
  },
  {
    id: 'p2',
    name: 'All Day Play',
    price: 35000,
    category: 'play',
    description: 'Bermain sepuasnya seharian penuh! Akses ke 200+ judul boardgame mulai buka hingga tutup.',
    tag: 'Best Value',
    tagIcon: Star,
    isBestSeller: true,
    icon: 'Dices',
    unit: '/ orang',
    image: imgBoardGame2,
  },
];

export const ALL_MENU = [
  ...FOOD_ITEMS,
  ...DRINK_NON_COFFEE,
  ...DRINK_COFFEE,
  ...PLAY_PACKAGES,
];

export const BOARDGAMES = [
  { id: 'bg1', name: 'Catan', players: '3–4', duration: '90 min', difficulty: 'Medium', category: 'Strategy' },
  { id: 'bg2', name: 'Ticket to Ride', players: '2–5', duration: '45–75 min', difficulty: 'Easy', category: 'Family' },
  { id: 'bg3', name: 'Pandemic', players: '2–4', duration: '45–60 min', difficulty: 'Medium', category: 'Cooperative' },
  { id: 'bg4', name: 'Splendor', players: '2–4', duration: '30 min', difficulty: 'Easy', category: 'Strategy' },
  { id: 'bg5', name: 'Codenames', players: '4–8+', duration: '15 min', difficulty: 'Easy', category: 'Party' },
  { id: 'bg6', name: 'Terraforming Mars', players: '1–5', duration: '120 min', difficulty: 'Hard', category: 'Strategy' },
  { id: 'bg7', name: 'Jenga', players: '2+', duration: '20 min', difficulty: 'Easy', category: 'Dexterity' },
  { id: 'bg8', name: 'Uno', players: '2–10', duration: '30 min', difficulty: 'Easy', category: 'Card Game' },
  { id: 'bg9', name: 'Dixit', players: '3–6', duration: '30 min', difficulty: 'Easy', category: 'Party' },
  { id: 'bg10', name: 'Monopoly', players: '2–6', duration: '60–180 min', difficulty: 'Easy', category: 'Classic' },
  { id: 'bg11', name: 'Azul', players: '2–4', duration: '45 min', difficulty: 'Medium', category: 'Strategy' },
  { id: 'bg12', name: 'Werewolf', players: '8–18', duration: '30 min', difficulty: 'Easy', category: 'Social' },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);