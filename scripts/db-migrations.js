// scripts/db-migrations.js
// Migration script: creates saved_items and item_images tables, and populates item_images gallery values.
// Run with: node scripts/db-migrations.js

require('dotenv').config({ path: '.env' });
const { sql } = require('@vercel/postgres');

async function migrate() {
  console.log('🔧  Running migrations...');

  // 1. Create saved_items table (wishlist)
  await sql`
    CREATE TABLE IF NOT EXISTS saved_items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, item_id)
    );
  `;
  console.log('✅  saved_items table created.');

  // 2. Create item_images table (gallery variations)
  await sql`
    CREATE TABLE IF NOT EXISTS item_images (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
      image_url VARCHAR(255) NOT NULL,
      display_order INT DEFAULT 0,
      UNIQUE(item_id, image_url)
    );
  `;
  console.log('✅  item_images table created.');

  // 3. Populate item_images with variations for all items
  const itemsResult = await sql`
    SELECT id, category, image_url FROM items;
  `;
  const items = itemsResult.rows;
  console.log(`Fetched ${items.length} items to populate gallery images.`);

  for (const item of items) {
    const itemId = item.id;
    const cat = (item.category || '').toLowerCase();
    const primaryImg = item.image_url;

    // 3.1. Insert primary image (display_order = 0)
    await sql`
      INSERT INTO item_images (item_id, image_url, display_order)
      VALUES (${itemId}, ${primaryImg}, 0)
      ON CONFLICT (item_id, image_url) DO NOTHING;
    `;

    // 3.2. Insert related gallery variations based on category
    let extraImages = [];
    if (cat.includes('textile')) {
      extraImages = ['/arts/textile-dream.png', '/arts/textile-purse.png'];
    } else if (cat.includes('decor') || cat.includes('art') || cat.includes('ceramic') || cat.includes('stone') || cat.includes('pitcher')) {
      extraImages = ['/arts/decor-ceramic-flower-pots.jpg', '/images/hand_thrown_ceramic_vase.png'];
    } else if (cat.includes('accessories') || cat.includes('jewel') || cat.includes('ring')) {
      extraImages = ['/arts/accessories-green-bracelet.png', '/arts/accessories-triangle-earrings.png'];
    } else {
      extraImages = ['/images/hand_thrown_ceramic_vase.png', '/images/sarah_jenkins_hands.png'];
    }

    // Insert extra image 1 (display_order = 1)
    await sql`
      INSERT INTO item_images (item_id, image_url, display_order)
      VALUES (${itemId}, ${extraImages[0]}, 1)
      ON CONFLICT (item_id, image_url) DO NOTHING;
    `;

    // Insert extra image 2 (display_order = 2)
    await sql`
      INSERT INTO item_images (item_id, image_url, display_order)
      VALUES (${itemId}, ${extraImages[1]}, 2)
      ON CONFLICT (item_id, image_url) DO NOTHING;
    `;
  }

  console.log('✅  item_images populated successfully.');
  console.log('\n🎉  Migrations complete.');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
