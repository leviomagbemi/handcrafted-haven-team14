/**
 * Database Configuration Helper
 * Handles development mode with mock data when POSTGRES_URL is not configured
 */

const IS_DEV = process.env.NODE_ENV === 'development';
const HAS_POSTGRES_URL = !!process.env.POSTGRES_URL;

// Log database status on module load
if (IS_DEV && !HAS_POSTGRES_URL) {
  console.warn('⚠️  DATABASE NOT CONFIGURED');
  console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.warn('POSTGRES_URL environment variable is not set.');
  console.warn('Using MOCK DATA for development.');
  console.warn('To configure database, edit .env.local and restart dev server.');
  console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
} else if (HAS_POSTGRES_URL) {
  console.log('✅ Using configured PostgreSQL database');
}

export const dbConfig = {
  isConfigured: HAS_POSTGRES_URL,
  isDevelopment: IS_DEV,
  useMockData: IS_DEV && !HAS_POSTGRES_URL,
};

// Mock shop items data
const mockShopItems = [
  {
    id: "65836928-49b3-499a-a1d3-4437f2397efd",
    artisan_id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    title: "Dream Catcher",
    price: 6000,
    category: "textiles",
    description: "Beautiful pink dream catcher.",
    image_url: "/arts/textile-dream.png",
    status: "available",
    artisan_name: "Aisha Al-Farsi",
  },
  {
    id: "65836928-49b3-499a-a1d3-4437f2397eaa",
    artisan_id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    title: "Silver Ring",
    price: 4500,
    category: "accessories",
    description: "Handcrafted silver ring with gemstone.",
    image_url: "/arts/jewelry-ring.png",
    status: "available",
    artisan_name: "Julian Vance",
  },
  {
    id: "65836928-49b3-499a-a1d3-4437f2397ebb",
    artisan_id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    title: "Ceramic Vase",
    price: 7500,
    category: "art",
    description: "Hand-thrown ceramic vase with natural glaze.",
    image_url: "/arts/ceramic-vase.png",
    status: "available",
    artisan_name: "Elena Rossi",
  },
  {
    id: "65836928-49b3-499a-a1d3-4437f2397ecc",
    artisan_id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    title: "Wooden Bowl",
    price: 5200,
    category: "decor",
    description: "Hand-carved wooden bowl from sustainable timber.",
    image_url: "/arts/wood-bowl.png",
    status: "available",
    artisan_name: "Marcus Thorne",
  },
];

// Mock artisans data
const mockArtisans = [
  {
    id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    name: "Aisha Al-Farsi",
    email: "aisha@nextmail.com",
    story: "Each thread carries the weight of a story, woven together for generations.",
    image_url: "/images/aisha_al_farsi.jpg",
    studio_name: "Silk Road Weavers",
    craft_type: "Textiles",
  },
  {
    id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    name: "Julian Vance",
    email: "julian@nextmail.com",
    story: "Sustainability is found in the longevity of timeless, well-crafted design.",
    image_url: "/images/julian_vance.jpg",
    studio_name: "Minimalist Metals",
    craft_type: "Jewelry",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Elena Rossi",
    email: "elena@nextmail.com",
    story: "My work is a conversation between the ancient earth and modern aesthetics.",
    image_url: "/images/elena_rossi.jpg",
    studio_name: "Earth & Fire Studio",
    craft_type: "Ceramics",
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Marcus Thorne",
    email: "liambaker@nextmail.com",
    story: "I listen to the grain of the wood to find the hidden form within each piece.",
    image_url: "/images/marcus_thorne.jpg",
    studio_name: "Grain & Soul",
    craft_type: "Woodworking",
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    name: "Clara Dupont",
    email: "william@nextmail.com",
    story: "Colors harvested from the garden, woven for your home.",
    image_url: "/images/clara_dupont.jpg",
    studio_name: "Loom & Leaf",
    craft_type: "Textiles",
  },
  {
    id: "c0ca3e18-62cd-11ee-8c99-0242ac120002",
    name: "Oliver Schmidt",
    email: "oliver@nextmail.com",
    story: "Built to endure, designed to age beautifully with use.",
    image_url: "/images/oliver_schmidt.jpg",
    studio_name: "Iron & Hide",
    craft_type: "Leatherwork",
  },
];

/**
 * Get mock data for shop items
 */
export function getMockShopItems(filters?: {
  query?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}): any[] {
  let items = [...mockShopItems];
  
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    items = items.filter(item => 
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.artisan_name?.toLowerCase().includes(q)
    );
  }

  if (filters?.categories && filters.categories.length > 0) {
    items = items.filter(item => 
      filters.categories!.some(cat => 
        item.category?.toLowerCase() === cat.toLowerCase()
      )
    );
  }

  if (filters?.minPrice !== undefined) {
    items = items.filter(item => item.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    items = items.filter(item => item.price <= filters.maxPrice!);
  }

  const offset = filters?.offset || 0;
  const limit = filters?.limit || 9;
  
  return items.slice(offset, offset + limit);
}

/**
 * Get mock artisans data
 */
export function getMockArtisans(filters?: {
  query?: string;
  craftType?: string;
}): any[] {
  let artisans = [...mockArtisans];

  if (filters?.query) {
    const q = filters.query.toLowerCase();
    artisans = artisans.filter(a =>
      a.name?.toLowerCase().includes(q) ||
      a.studio_name?.toLowerCase().includes(q)
    );
  }

  if (filters?.craftType && filters.craftType !== 'All Crafts') {
    artisans = artisans.filter(a =>
      a.craft_type?.toLowerCase() === filters.craftType?.toLowerCase()
    );
  }

  return artisans;
}

/**
 * Count mock shop items with filters applied
 */
export function countMockShopItems(filters?: {
  query?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}): number {
  let items = [...mockShopItems];
  
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    items = items.filter(item => 
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.artisan_name?.toLowerCase().includes(q)
    );
  }

  if (filters?.categories && filters.categories.length > 0) {
    items = items.filter(item => 
      filters.categories!.some(cat => 
        item.category?.toLowerCase() === cat.toLowerCase()
      )
    );
  }

  if (filters?.minPrice !== undefined) {
    items = items.filter(item => item.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    items = items.filter(item => item.price <= filters.maxPrice!);
  }

  // Note: minRating filtering would require review data, skipped for mock data
  
  return items.length;
}

export default dbConfig;
