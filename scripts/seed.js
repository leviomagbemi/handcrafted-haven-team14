const { db } = require("@vercel/postgres");
const {
  users,
  artisans,
  items,
  reviews,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, image_url)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedArtisans(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "artisans" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS artisans (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        story TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "artisans" table`);

    // Insert data into the "artisans" table
    const insertedArtisans = await Promise.all(
      artisans.map(async (artisan) => {
        const hashedPassword = await bcrypt.hash(artisan.password, 10);
        return client.sql`
        INSERT INTO artisans (id, name, email, password, story, image_url)
        VALUES (${artisan.id}, ${artisan.name}, ${artisan.email}, ${hashedPassword}, ${artisan.story}, ${artisan.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedArtisans.length} artisans`);

    return {
      createTable,
      artisans: insertedArtisans,
    };
  } catch (error) {
    console.error("Error seeding artisans:", error);
    throw error;
  }
}

async function seedItems(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "items" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    artisan_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(255) NOT NULL, 
    description VARCHAR(255) NOT NULL, 
    image_url VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "items" table`);

    // Insert data into the "items" table
    const insertedItems = await Promise.all(
      items.map(
        (item) => client.sql`
        INSERT INTO items (id, artisan_id, title, price, category, description, image_url, status)
        VALUES (${item.id}, ${item.artisan_id}, ${item.title}, ${item.price}, ${item.category}, ${item.description}, ${item.image_url}, ${item.status})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedItems.length} items`);

    return {
      createTable,
      items: insertedItems,
    };
  } catch (error) {
    console.error("Error seeding items:", error);
    throw error;
  }
}

async function seedReviews(client) {
  try {
    // Create the "reviews" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        item_id UUID NOT NULL,
        text VARCHAR(255) NOT NULL,
        date DATE NOT NULL, 
        rate INT NOT NULL
      );
    `;

    console.log(`Created "reviews" table`);

    // Insert data into the "reviews" table
    const insertedReviews = await Promise.all(
      reviews.map(
        (review) => client.sql`
        INSERT INTO reviews (user_id, item_id, text, date, rate)
        VALUES (${review.user_id}, ${review.item_id}, ${review.text}, ${review.date}, ${review.rate})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedReviews.length} reviews`);

    return {
      createTable,
      reviews: insertedReviews,
    };
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedArtisans(client);
  await seedItems(client);
  await seedReviews(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
