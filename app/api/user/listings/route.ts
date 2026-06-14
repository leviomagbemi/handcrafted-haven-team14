import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

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

    // Check users table to verify role
    const userResult = await sql`
      SELECT role FROM users WHERE id = ${userId};
    `;

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = userResult.rows[0].role || 'buyer';

    if (userRole !== 'artisan') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Fetch listings
    const result = await sql`
      SELECT id, title, price, category, image_url, status
      FROM items
      WHERE artisan_id = ${userId}
      ORDER BY id DESC;
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching artisan listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
