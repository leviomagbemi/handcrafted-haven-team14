// app/lib/data.ts

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { User, Item, Artisans } from "./definitions";

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
    const data = await sql<Item>`
      SELECT
        items.id,
        items.artisan_id,
        items.title,
        items.price,
        items.category,
        items.description,
        items.image_url,
        items.status,
        artisans.name
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
    const result = await sql`
      SELECT
        id,
        name,
        story,
        image_url
      FROM artisans
      WHERE id = ${id};
    `;

    return result.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch artisan.");
  }
}

export async function fetchArtistItems(id: string) {
  noStore();

  try {
    const result = await sql`
      SELECT
        id,
        title,
        image_url
      FROM items
      WHERE artisan_id = ${id};
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch artist items.");
  }
}
