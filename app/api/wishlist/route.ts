// app/api/wishlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';
import { getSavedItems } from '@/app/lib/data';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export async function GET(request: NextRequest) {
  try {
    let token = request.cookies.get('token')?.value;

    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const userId = decoded.id;

    const savedItems = await getSavedItems(userId);
    return NextResponse.json(savedItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let token = request.cookies.get('token')?.value;

    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const userId = decoded.id;

    const { itemId } = await request.json();
    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    // Toggle saved item
    const existing = await sql`
      SELECT id FROM saved_items 
      WHERE user_id = ${userId} AND item_id = ${itemId};
    `;

    let action = 'added';
    if (existing.rows.length > 0) {
      await sql`
        DELETE FROM saved_items 
        WHERE user_id = ${userId} AND item_id = ${itemId};
      `;
      action = 'removed';
    } else {
      await sql`
        INSERT INTO saved_items (user_id, item_id) 
        VALUES (${userId}, ${itemId});
      `;
    }

    // Fetch updated list to return
    const updatedWishlist = await getSavedItems(userId);

    return NextResponse.json({ success: true, action, wishlist: updatedWishlist });
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    return NextResponse.json({ error: 'Failed to toggle wishlist' }, { status: 500 });
  }
}
