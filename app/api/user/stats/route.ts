// app/api/user/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';
import { getUserReviewsCount, getSavedItems } from '@/app/lib/data';

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

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role?: string };
    const userId = decoded.id;

    // Check users table to get actual role
    const userResult = await sql`
      SELECT id, role FROM users WHERE id = ${userId};
    `;

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = userResult.rows[0].role || 'buyer';

    if (userRole === 'artisan') {
      // Fetch artisan stats
      const listingsRes = await sql`
        SELECT COUNT(*) as count FROM items WHERE artisan_id = ${userId};
      `;
      const reviewsRes = await sql`
        SELECT COUNT(r.id) as count
        FROM reviews r
        JOIN items i ON i.id = r.item_id
        WHERE i.artisan_id = ${userId};
      `;
      
      return NextResponse.json({
        role: 'artisan',
        listingsCount: Number(listingsRes.rows[0].count),
        reviewsCount: Number(reviewsRes.rows[0].count),
        salesCount: 0
      });
    } else {
      // Fetch buyer stats
      const reviewsCount = await getUserReviewsCount(userId);
      const savedItems = await getSavedItems(userId);
      
      return NextResponse.json({
        role: 'buyer',
        reviewsCount,
        savedItemsCount: savedItems.length,
        ordersCount: 0
      });
    }
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
