// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

async function ensureCartItemsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS cart_items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
      quantity INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, item_id)
    );
  `;
}

function getUserIdFromRequest(request: NextRequest): string | null {
  try {
    let token = request.cookies.get('token')?.value;

    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    return decoded.id;
  } catch (error) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await ensureCartItemsTable();

    const result = await sql`
      SELECT
        items.id,
        items.artisan_id,
        items.title,
        items.price,
        items.category,
        items.description,
        items.image_url,
        items.status,
        cart_items.quantity,
        artisans.name AS artisan_name
      FROM cart_items
      JOIN items ON items.id = cart_items.item_id
      JOIN artisans ON artisans.id = items.artisan_id
      WHERE cart_items.user_id = ${userId}
      ORDER BY cart_items.created_at DESC;
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await ensureCartItemsTable();

    const body = await request.json();
    const { itemId, quantity = 1 } = body;

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    // Upsert query: insert or add quantity
    await sql`
      INSERT INTO cart_items (user_id, item_id, quantity)
      VALUES (${userId}, ${itemId}, ${quantity})
      ON CONFLICT (user_id, item_id)
      DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity;
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await ensureCartItemsTable();

    const body = await request.json();
    const { itemId, quantity } = body;

    if (!itemId || quantity === undefined) {
      return NextResponse.json({ error: 'Item ID and quantity are required' }, { status: 400 });
    }

    if (quantity <= 0) {
      // If quantity is 0 or less, delete the item
      await sql`
        DELETE FROM cart_items
        WHERE user_id = ${userId} AND item_id = ${itemId};
      `;
    } else {
      await sql`
        UPDATE cart_items
        SET quantity = ${quantity}
        WHERE user_id = ${userId} AND item_id = ${itemId};
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return NextResponse.json({ error: 'Failed to update quantity' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await ensureCartItemsTable();

    const url = new URL(request.url);
    const itemId = url.searchParams.get('itemId');

    if (itemId) {
      // Delete specific item
      await sql`
        DELETE FROM cart_items
        WHERE user_id = ${userId} AND item_id = ${itemId};
      `;
    } else {
      // Clear entire cart
      await sql`
        DELETE FROM cart_items
        WHERE user_id = ${userId};
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting from cart:', error);
    return NextResponse.json({ error: 'Failed to delete from cart' }, { status: 500 });
  }
}
