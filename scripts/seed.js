
require("dotenv").config({ path: ".env.local" });

const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

const {
  users,
  artisans,
  items,
  reviews,
} = require("../app/lib/placeholder-data.js");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log('Created "users" table');

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await client.sql`
        INSERT INTO users (id, name, email, password, image_url)
        VALUES (
          ${user.id},
          ${user.name},
          ${user.email},
          ${hashedPassword},
          ${user.image_url}
        );
      `;
    }

    console.log(`Seeded ${users.length} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedArtisans(client) {
  try {
    await client.sql`
      CREATE TABLE artisans (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        story TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log('Created "artisans" table');

    for (const artisan of artisans) {
      const hashedPassword = await bcrypt.hash(artisan.password, 10);

      await client.sql`
        INSERT INTO artisans (
          id,
          name,
          email,
          password,
          story,
          image_url
        )
        VALUES (
          ${artisan.id},
          ${artisan.name},
          ${artisan.email},
          ${hashedPassword},
          ${artisan.story},
          ${artisan.image_url}
        );
      `;
    }

    console.log(`Seeded ${artisans.length} artisans`);
  } catch (error) {
    console.error("Error seeding artisans:", error);
    throw error;
  }
}

async function seedItems(client) {
  try {
    await client.sql`
      CREATE TABLE items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        artisan_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        category VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,

        CONSTRAINT fk_artisan
          FOREIGN KEY (artisan_id)
          REFERENCES artisans(id)
          ON DELETE CASCADE
      );
    `;

    console.log('Created "items" table');

    for (const item of items) {
      await client.sql`
        INSERT INTO items (
          id,
          artisan_id,
          title,
          price,
          category,
          description,
          image_url,
          status
        )
        VALUES (
          ${item.id},
          ${item.artisan_id},
          ${item.title},
          ${item.price},
          ${item.category},
          ${item.description},
          ${item.image_url},
          ${item.status}
        );
      `;
    }

    console.log(`Seeded ${items.length} items`);
  } catch (error) {
    console.error("Error seeding items:", error);
    throw error;
  }
}

async function seedReviews(client) {
  try {
    await client.sql`
      CREATE TABLE reviews (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        item_id UUID NOT NULL,
        text TEXT NOT NULL,
        date DATE NOT NULL,
        rate INT NOT NULL,

        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_item
          FOREIGN KEY (item_id)
          REFERENCES items(id)
          ON DELETE CASCADE
      );
    `;

    console.log('Created "reviews" table');

    for (const review of reviews) {
      await client.sql`
        INSERT INTO reviews (
          user_id,
          item_id,
          text,
          date,
          rate
        )
        VALUES (
          ${review.user_id},
          ${review.item_id},
          ${review.text},
          ${review.date},
          ${review.rate}
        );
      `;
    }

    console.log(`Seeded ${reviews.length} reviews`);
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    console.log("Dropping existing tables...");

    await client.sql`DROP TABLE IF EXISTS reviews CASCADE`;
    await client.sql`DROP TABLE IF EXISTS items CASCADE`;
    await client.sql`DROP TABLE IF EXISTS artisans CASCADE`;
    await client.sql`DROP TABLE IF EXISTS users CASCADE`;

    console.log("Old tables removed");

    await seedUsers(client);
    await seedArtisans(client);
    await seedItems(client);
    await seedReviews(client);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(
      "An error occurred while attempting to seed the database:",
      error
    );
  } finally {
    await client.end();
  }
}

main();
