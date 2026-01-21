
import { Product, PaymentMethod } from './types';

export const HERO_PRODUCTS: Product[] = [
  // --- TECH & GADGETS ---
  {
    id: '1',
    name: 'Ultra-Series Smartwatch (HK8 Pro)',
    price: 3200,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
    description: 'The premium "Apple Watch look" with AMOLED display, health tracking, and 5-day battery life.',
    rating: 4.8,
    stock: 45,
    badge: 'Trend',
    warranty: '7-Day Replacement'
  },
  {
    id: '2',
    name: 'TWS Earbuds (Lenovo GM2 Pro)',
    price: 1450,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1588156979435-379b9d802b0a?auto=format&fit=crop&q=80&w=800',
    description: 'Gaming-grade low latency audio with deep bass and ENC noise cancellation.',
    rating: 4.7,
    stock: 120,
    badge: 'Viral',
    warranty: '1-Month Warranty'
  },
  {
    id: '3',
    name: 'Mini Wi-Fi UPS for Router',
    price: 1950,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800',
    description: 'Provides 6+ hours of backup for your Wi-Fi router during load-shedding.',
    rating: 4.9,
    stock: 80,
    badge: 'Utility',
    warranty: '6-Month Warranty'
  },
  {
    id: '4',
    name: '65W GaN Fast Charger (Dual Port)',
    price: 2400,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1610492421943-834955364176?auto=format&fit=crop&q=80&w=800',
    description: 'Fast-charge your laptop and phone simultaneously with one compact charger.',
    rating: 4.9,
    stock: 65,
    badge: 'Utility',
    warranty: '6-Month Warranty'
  },
  {
    id: '5',
    name: 'Magnetic MagSafe Power Bank',
    price: 3400,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3bf91992a1?auto=format&fit=crop&q=80&w=800',
    description: '10,000mAh capacity with strong magnetic suction for MagSafe compatible devices.',
    rating: 4.6,
    stock: 40,
    badge: 'Trend'
  },
  {
    id: '6',
    name: '7-in-1 USB-C Hub / Docking Station',
    price: 1850,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d715b909?auto=format&fit=crop&q=80&w=800',
    description: 'Features 4K HDMI, USB 3.0, and PD charging ports for ultimate productivity.',
    rating: 4.7,
    stock: 55,
    badge: 'Utility'
  },
  {
    id: '7',
    name: 'Wireless Ergonomic Vertical Mouse',
    price: 1650,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800',
    description: 'Ergonomic design to prevent wrist strain during long work hours.',
    rating: 4.5,
    stock: 30,
    badge: 'Utility'
  },
  {
    id: '8',
    name: 'LED Screen Bar / Monitor Light',
    price: 2800,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1616440837900-473f7c4c585d?auto=format&fit=crop&q=80&w=800',
    description: 'Reduces screen glare and eye fatigue. Perfect for late-night work.',
    rating: 4.9,
    stock: 25,
    badge: 'Trend'
  },
  {
    id: '9',
    name: 'Smart Coffee Mug Warmer (USB)',
    price: 1200,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1544787210-2211d247157a?auto=format&fit=crop&q=80&w=800',
    description: 'Keep your beverage warm at your desk. Intelligent heating technology.',
    rating: 4.4,
    stock: 90,
    badge: 'Utility'
  },
  {
    id: '10',
    name: 'Bluetooth TikTok / Selfie Remote',
    price: 450,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1612117561115-46f043ccb2b4?auto=format&fit=crop&q=80&w=800',
    description: 'Scroll TikTok or snap photos from a distance with this handy remote.',
    rating: 4.2,
    stock: 500,
    badge: 'Viral'
  },
  {
    id: '11',
    name: 'Dual Interface Flash Drive (128GB)',
    price: 1550,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1531492746076-1a1bd9ad2475?auto=format&fit=crop&q=80&w=800',
    description: 'Seamlessly move files between USB-A and USB-C devices.',
    rating: 4.7,
    stock: 150,
    badge: 'Utility'
  },
  {
    id: '12',
    name: 'Portable Thermal Label Printer',
    price: 3800,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&q=80&w=800',
    description: 'Bluetooth-connected thermal printer for easy organization and labeling.',
    rating: 4.8,
    stock: 20,
    badge: 'Trend'
  },

  // --- KITCHEN & HOME ---
  {
    id: '13',
    name: '4-in-1 Vegetable Chopper & Slicer',
    price: 850,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
    description: 'A viral kitchen tool that saves 70% of food preparation time.',
    rating: 4.6,
    stock: 200,
    badge: 'Viral'
  },
  {
    id: '14',
    name: 'Portable Electric Juicer Bottle',
    price: 1650,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9391?auto=format&fit=crop&q=80&w=800',
    description: 'Rechargeable blender bottle for fresh smoothies anywhere.',
    rating: 4.7,
    stock: 85,
    badge: 'Trend'
  },
  {
    id: '15',
    name: 'Handheld Milk Frother',
    price: 450,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1544212911-3d7f94031d27?auto=format&fit=crop&q=80&w=800',
    description: 'Whip up professional foam for your coffee in seconds.',
    rating: 4.5,
    stock: 300,
    badge: 'Utility'
  },
  {
    id: '16',
    name: 'Automatic Touchless Soap Dispenser',
    price: 1350,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    description: 'Infrared sensor for hygienic, touch-free hand washing.',
    rating: 4.6,
    stock: 120,
    badge: 'Utility'
  },
  {
    id: '17',
    name: 'Electric Spin Scrubber Cleaner',
    price: 3500,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d10?auto=format&fit=crop&q=80&w=800',
    description: 'Powerful scrub brush for bathrooms and kitchens. Rechargeable.',
    rating: 4.9,
    stock: 15,
    badge: 'Trend'
  },
  {
    id: '18',
    name: 'Multipurpose Silicon Food Lids',
    price: 350,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    description: 'Eco-friendly stretchable lids to keep food fresh in any container.',
    rating: 4.4,
    stock: 400,
    badge: 'Utility'
  },
  {
    id: '19',
    name: 'Astronaut Galaxy Projector',
    price: 2600,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800',
    description: 'Project nebulas and stars. A viral aesthetic favorite for bedrooms.',
    rating: 4.9,
    stock: 30,
    badge: 'Trend'
  },
  {
    id: '20',
    name: 'Portable Rechargeable Neck Fan',
    price: 1400,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1591123109677-248356980479?auto=format&fit=crop&q=80&w=800',
    description: 'Hands-free cooling for commutes or power outages.',
    rating: 4.5,
    stock: 110,
    badge: 'Utility'
  },
  {
    id: '21',
    name: 'Motion Sensor LED Closet Light',
    price: 750,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=800',
    description: 'Sticks anywhere. Automatically lights up in the dark when motion is detected.',
    rating: 4.8,
    stock: 250,
    badge: 'Utility'
  },
  {
    id: '22',
    name: 'Handheld Garment Steamer',
    price: 2900,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=800',
    description: 'Portable steam iron for quick and easy wrinkle removal.',
    rating: 4.7,
    stock: 45,
    badge: 'Trend'
  },
  {
    id: '23',
    name: 'Premium Mosquito Killer Racket',
    price: 950,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1611095777215-99645dc2466a?auto=format&fit=crop&q=80&w=800',
    description: 'Foldable design with UV light bait for efficient insect control.',
    rating: 4.6,
    stock: 180,
    badge: 'Utility'
  },
  {
    id: '24',
    name: 'Smart Desktop Air Purifier',
    price: 4500,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1585771724684-2827df011420?auto=format&fit=crop&q=80&w=800',
    description: 'Compact HEPA-filter purifier for office desks or bedrooms.',
    rating: 4.8,
    stock: 12,
    badge: 'Trend'
  },

  // --- LIFESTYLE ---
  {
    id: '25',
    name: 'Vintage T9 Professional Trimmer',
    price: 1100,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800',
    description: 'Iconic "Buddha" metal trimmer for precise grooming.',
    rating: 4.8,
    stock: 150,
    badge: 'Utility'
  },
  {
    id: '26',
    name: 'Rechargeable Electric Lint Remover',
    price: 950,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800',
    description: 'Revive old clothes by removing lint and pills instantly.',
    rating: 4.6,
    stock: 300,
    badge: 'Utility'
  },
  {
    id: '27',
    name: 'Minimalist Anti-Theft Slim Wallet',
    price: 1250,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    description: 'RFID-blocking slim card holder for the modern professional.',
    rating: 4.7,
    stock: 100,
    badge: 'Trend'
  },
  {
    id: '28',
    name: 'Ultrasonic Jewelry Cleaner',
    price: 2200,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab60e?auto=format&fit=crop&q=80&w=800',
    description: 'Cleans jewelry and eyeglasses using safe ultrasonic waves.',
    rating: 4.8,
    stock: 40,
    badge: 'Utility'
  },
  {
    id: '29',
    name: 'Digital Portable Luggage Scale',
    price: 650,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
    description: 'Accurate scale for travelers to avoid airport weight fees.',
    rating: 4.5,
    stock: 200,
    badge: 'Utility'
  },
  {
    id: '30',
    name: 'Mini Cordless Car Vacuum',
    price: 2600,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1563214059-e092120e2418?auto=format&fit=crop&q=80&w=800',
    description: 'Compact, powerful suction to keep your vehicle interior pristine.',
    rating: 4.6,
    stock: 60,
    badge: 'Trend'
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'bkash', name: 'bKash', icon: '৳', color: 'bg-[#D12053]' },
  { id: 'nagad', name: 'Nagad', icon: '৳', color: 'bg-[#F7941D]' },
  { id: 'rocket', name: 'Rocket', icon: '৳', color: 'bg-[#8C3494]' },
  { id: 'card', name: 'Card', icon: '💳', color: 'bg-indigo-600' }
];

export const CATEGORIES: string[] = ['All', 'Tech', 'Kitchen', 'Home', 'Lifestyle'];
