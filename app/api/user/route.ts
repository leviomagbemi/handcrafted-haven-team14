// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/lib/data';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {
  try {
    console.log("=== /api/user DEBUG ===");

    let token = request.cookies.get('token')?.value;

    // Fallback: Check Authorization header (for frontend that doesn't send cookies properly)
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
        console.log("✅ Token received from Authorization header");
      }
    }

    if (!token) {
      console.log("❌ No token found");
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    console.log("✅ Token valid for:", decoded.email);

    const user = await getUser(decoded.email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password, ...safeUser } = user;
    console.log("✅ User data sent successfully");
    return NextResponse.json(safeUser);

  } catch (error: any) {
    console.error("❌ Auth error:", error.message);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}