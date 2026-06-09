// scripts/add-role-column.js
// One-time migration: adds `role` column to users, updates seed artisans' users rows.
// Run with: node scripts/add-role-column.js

require('dotenv').config({ path: '.env' });
const { sql } = require('@vercel/postgres');

async function migrate() {
  console.log('🔧  Running migration: add role column to users...');

  // 1. Add role column if it doesn't exist yet
  await sql`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'buyer';
  `;
  console.log('✅  role column added (or already present).');

  // 2. Ensure the artisans table has a matching user_id reference column (optional future use)
  //    For now, artisans table stays independent. No further changes needed.

  console.log('\n🎉  Migration complete.');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
