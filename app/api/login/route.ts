// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/lib/data';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await getUser(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      } 
    });

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    console.log("Login successful, token generated");
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}