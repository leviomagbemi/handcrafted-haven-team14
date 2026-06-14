// app/lib/data.ts

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { User, Item, Artisans } from "./definitions";
import { dbConfig, getMockShopItems, getMockArtisans, countMockShopItems } from "./db-config";

// ======================
// USERS
// ======================

export async function getUser(email: string) {
  noStore();

  try {
    const result = await sql<User>`
      SELECT *
      FROM users
      WHERE email = ${email};
    `;

    return result.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

// ======================
// PRODUCTS
// ======================

export async function getAllProductImages() {
  noStore();

  try {
    const result = await sql`
      SELECT
        id,
        image_url,
        title
      FROM items;
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product images.");
  }
}

export async function getProductDetail(id: string) {
  noStore();

  try {
    const data = await sql<any>`
      SELECT
        items.id,
        items.artisan_id,
        items.title,
        items.price,
        items.category,
        items.description,
        items.image_url,
        items.status,
        artisans.name,
        artisans.image_url AS artisan_image_url,
        artisans.story AS artisan_story,
        artisans.studio_name AS artisan_studio_name,
        artisans.craft_type AS artisan_craft_type
      FROM items
      JOIN artisans
        ON artisans.id = items.artisan_id
      WHERE items.id = ${id};
    `;

    return data.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Product Details");
  }
}

export async function fetchItems() {
  noStore();

  try {
    const result = await sql<Item>`
      SELECT *
      FROM items;
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch items.");
  }
}

export async function fetchFilteredItems(query: string) {
  noStore();

  try {
    const result = await sql<Item>`
      SELECT
        id,
        artisan_id,
        title,
        price,
        category,
        description,
        image_url,
        status
      FROM items
      WHERE
        title ILIKE ${`%${query}%`}
        OR price::text ILIKE ${`%${query}%`}
        OR category ILIKE ${`%${query}%`}
        OR description ILIKE ${`%${query}%`}
        OR status ILIKE ${`%${query}%`};
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered items.");
  }
}

export async function fetchCategory(category: string) {
  noStore();

  try {
    const result = await sql<Item>`
      SELECT
        id,
        artisan_id,
        title,
        price,
        category,
        description,
        image_url,
        status
      FROM items
      WHERE category = ${category};
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category items.");
  }
}

export async function filteredCategory(
  category: string,
  query: string
) {
  noStore();

  try {
    const result = await sql<Item>`
      SELECT
        id,
        artisan_id,
        title,
        price,
        category,
        description,
        image_url,
        status
      FROM items
      WHERE
        category = ${category}
        AND (
          title ILIKE ${`%${query}%`}
          OR price::text ILIKE ${`%${query}%`}
          OR description ILIKE ${`%${query}%`}
          OR status ILIKE ${`%${query}%`}
        );
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered category items.");
  }
}

// ======================
// REVIEWS
// ======================

export async function getItemReviews(id: string) {
  noStore();

  try {
    const result = await sql`
      SELECT
        reviews.id,
        reviews.user_id,
        reviews.item_id,
        reviews.text,
        reviews.date,
        reviews.rate,
        users.name
      FROM reviews
      INNER JOIN users
        ON users.id = reviews.user_id
      WHERE reviews.item_id = ${id};
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to retrieve reviews.");
  }
}

export async function getUserReviewsCount(userId: string) {
  noStore();
  try {
    const result = await runQueryWithRetry(() => sql`
      SELECT COUNT(*) as count
      FROM reviews
      WHERE user_id = ${userId};
    `);
    return Number(result.rows[0].count);
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}

export async function getSavedItems(userId: string) {
  noStore();
  try {
    const result = await runQueryWithRetry(() => sql`
      SELECT
        items.id,
        items.artisan_id,
        items.title,
        items.price,
        items.category,
        items.description,
        items.image_url,
        items.status,
        artisans.name AS artisan_name
      FROM saved_items
      JOIN items ON items.id = saved_items.item_id
      JOIN artisans ON artisans.id = items.artisan_id
      WHERE saved_items.user_id = ${userId}
      ORDER BY saved_items.created_at DESC;
    `);
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function getItemImages(itemId: string) {
  noStore();
  try {
    const result = await runQueryWithRetry(() => sql`
      SELECT image_url
      FROM item_images
      WHERE item_id = ${itemId}
      ORDER BY display_order ASC;
    `);
    return result.rows.map(r => r.image_url);
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// ======================
// ARTISANS
// ======================

export async function fetchArtisan() {
  noStore();

  try {
    const result = await sql<Artisans>`
      SELECT
        id,
        name,
        email,
        image_url
      FROM artisans;
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch artisans.");
  }
}

export async function getSingleArtisan(id: string) {
  noStore();

  try {
    const result = await runQueryWithRetry(() => sql`
      SELECT
        id,
        name,
        story,
        image_url,
        studio_name,
        craft_type
      FROM artisans
      WHERE id = ${id};
    `);

    return result.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch artisan.");
  }
}

export async function fetchArtistItems(id: string) {
  noStore();

  try {
    const result = await runQueryWithRetry(() => sql`
      SELECT
        id,
        title,
        price,
        category,
        image_url,
        status
      FROM items
      WHERE artisan_id = ${id};
    `);

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch artist items.");
  }
}
async function runQueryWithRetry<T>(queryFn: () => Promise<T>, retries = 3, delayMs = 1500): Promise<T> {
  try {
    return await queryFn();
  } catch (error: any) {
    const isTimeout =
      error.message?.includes("fetch failed") ||
      error.message?.toLowerCase().includes("timeout") ||
      error.message?.toLowerCase().includes("connect");

    if (retries > 0 && isTimeout) {
      console.warn(
        `Database connection failed, retrying in ${delayMs}ms... (${retries} retries left). Error: ${error.message}`
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return runQueryWithRetry(queryFn, retries - 1, delayMs * 2);
    }
    throw error;
  }
}

export async function fetchFilteredShopItems({
  query = '',
  categories = [],
  minPrice = 0,
  maxPrice = 999999,
  minRating = 0,
  sort = 'best-selling',
  limit = 9,
  offset = 0,
}: {
  query?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
  limit?: number;
  offset?: number;
}) {
  noStore();

  // Use mock data in development when database is not configured
  if (dbConfig.useMockData) {
    console.log('📦 Using mock shop items (database not configured)');
    const mockItems = getMockShopItems({ query, categories, minPrice, maxPrice, limit, offset });
    return mockItems as Item[];
  }

  try {
    const dbCategories: string[] = [];
    categories.forEach((cat) => {
      const c = cat.toLowerCase();
      if (c === "ceramics") {
        dbCategories.push("art", "arts");
      } else if (c === "textiles") {
        dbCategories.push("textiles");
      } else if (c === "jewelry") {
        dbCategories.push("accessories");
      } else if (c === "woodwork") {
        dbCategories.push("decor");
      } else {
        dbCategories.push(c);
      }
    });

    const hasCategories = dbCategories.length > 0;
    const finalCategories = hasCategories ? dbCategories : [''];

    const result = await runQueryWithRetry(() => sql<Item>`
      SELECT
        items.id,
        items.artisan_id,
        items.title,
        items.price,
        items.category,
        items.description,
        items.image_url,
        items.status,
        artisans.name AS artisan_name,
        COALESCE(reviews_summary.avg_rating, 0) AS avg_rating,
        COALESCE(reviews_summary.review_count, 0) AS review_count
      FROM items
      LEFT JOIN artisans
        ON artisans.id = items.artisan_id
      LEFT JOIN (
        SELECT item_id, AVG(rate) AS avg_rating, COUNT(id) AS review_count
        FROM reviews
        GROUP BY item_id
      ) reviews_summary
        ON reviews_summary.item_id = items.id
      WHERE
        (items.title ILIKE ${`%${query}%`} OR items.description ILIKE ${`%${query}%`} OR artisans.name ILIKE ${`%${query}%`})
        AND (NOT ${hasCategories} OR items.category = ANY(${finalCategories as any}))
        AND items.price >= ${minPrice}
        AND items.price <= ${maxPrice}
        AND COALESCE(reviews_summary.avg_rating, 0) >= ${minRating}::numeric
      ORDER BY
        (CASE WHEN ${sort} = 'price-low' THEN items.price END) ASC,
        (CASE WHEN ${sort} = 'price-high' THEN items.price END) DESC,
        (CASE WHEN ${sort} = 'rating' THEN reviews_summary.avg_rating END) DESC NULLS LAST,
        (CASE WHEN ${sort} = 'best-selling' THEN reviews_summary.review_count END) DESC NULLS LAST,
        items.title ASC
      LIMIT ${limit} OFFSET ${offset};
    `);

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered shop items.");
  }
}

export async function fetchShopItemsCount({
  query = '',
  categories = [],
  minPrice = 0,
  maxPrice = 999999,
  minRating = 0,
}: {
  query?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}) {
  noStore();

  // Use mock data in development when database is not configured
  if (dbConfig.useMockData) {
    console.log('📊 Using mock shop items count (database not configured)');
    return countMockShopItems({ query, categories, minPrice, maxPrice, minRating });
  }

  try {
    const dbCategories: string[] = [];
    categories.forEach((cat) => {
      const c = cat.toLowerCase();
      if (c === "ceramics") {
        dbCategories.push("art", "arts");
      } else if (c === "textiles") {
        dbCategories.push("textiles");
      } else if (c === "jewelry") {
        dbCategories.push("accessories");
      } else if (c === "woodwork") {
        dbCategories.push("decor");
      } else {
        dbCategories.push(c);
      }
    });

    const hasCategories = dbCategories.length > 0;
    const finalCategories = hasCategories ? dbCategories : [''];

    const result = await runQueryWithRetry(() => sql`
      SELECT COUNT(DISTINCT items.id) as count
      FROM items
      LEFT JOIN artisans
        ON artisans.id = items.artisan_id
      LEFT JOIN (
        SELECT item_id, AVG(rate) AS avg_rating
        FROM reviews
        GROUP BY item_id
      ) reviews_summary
        ON reviews_summary.item_id = items.id
      WHERE
        (items.title ILIKE ${`%${query}%`} OR items.description ILIKE ${`%${query}%`} OR artisans.name ILIKE ${`%${query}%`})
        AND (NOT ${hasCategories} OR items.category = ANY(${finalCategories as any}))
        AND items.price >= ${minPrice}
        AND items.price <= ${maxPrice}
        AND COALESCE(reviews_summary.avg_rating, 0) >= ${minRating}::numeric;
    `);

    return Number(result.rows[0].count);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch shop items count.");
  }
}

export async function fetchFilteredArtisans({
  query = '',
  craftType = 'All Crafts',
}: {
  query?: string;
  craftType?: string;
}) {
  noStore();

  // Use mock data in development when database is not configured
  if (dbConfig.useMockData) {
    console.log('👩‍🎨 Using mock artisans (database not configured)');
    const mockArtisans = getMockArtisans({ query, craftType });
    return mockArtisans as Artisans[];
  }

  try {
    const isAllCrafts = craftType === 'All Crafts' || !craftType;

    const result = await runQueryWithRetry(() => sql<Artisans>`
      SELECT id, name, email, story, image_url, studio_name, craft_type
      FROM artisans
      WHERE
        (name ILIKE ${`%${query}%`} OR studio_name ILIKE ${`%${query}%`})
        AND (${isAllCrafts}::boolean OR craft_type ILIKE ${craftType})
      ORDER BY name ASC;
    `);

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered artisans.");
  }
}
