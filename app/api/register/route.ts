// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      password,
      role = 'buyer',
      studio_name,
      craft_type,
      story,
    } = body;

    // --- Defensive Type Checks ---
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof role !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Name, email, password, and role must be valid strings.' },
        { status: 400 }
      );
    }

    // --- Trimming & Normalization ---
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const cleanRole = role.trim().toLowerCase();

    // --- Role Allow-listing ---
    const ALLOWED_ROLES = ['buyer', 'artisan'];
    if (!ALLOWED_ROLES.includes(cleanRole)) {
      return NextResponse.json(
        { error: 'Invalid role specified. Must be buyer or artisan.' },
        { status: 400 }
      );
    }

    // --- Field Existence & Trimming Checks ---
    if (!trimmedName) {
      return NextResponse.json(
        { error: 'Full name is required and cannot be empty.' },
        { status: 400 }
      );
    }

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: 'Full name cannot exceed 100 characters.' },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (trimmedEmail.length > 254) {
      return NextResponse.json(
        { error: 'Email address cannot exceed 254 characters.' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    if (!trimmedPassword) {
      return NextResponse.json(
        { error: 'Password cannot consist only of whitespace.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        { error: 'Password cannot exceed 128 characters.' },
        { status: 400 }
      );
    }

    // --- Conditional Artisan Validation ---
    let trimmedStudioName = '';
    let trimmedStory = '';
    let cleanCraftType = 'Ceramics';

    if (cleanRole === 'artisan') {
      if (typeof studio_name !== 'string' || !studio_name.trim()) {
        return NextResponse.json(
          { error: 'Studio name is required for artisan accounts.' },
          { status: 400 }
        );
      }
      trimmedStudioName = studio_name.trim();
      if (trimmedStudioName.length > 100) {
        return NextResponse.json(
          { error: 'Studio name cannot exceed 100 characters.' },
          { status: 400 }
        );
      }

      if (story !== undefined && story !== null) {
        if (typeof story !== 'string') {
          return NextResponse.json(
            { error: 'Your story must be a string.' },
            { status: 400 }
          );
        }
        trimmedStory = story.trim();
        if (trimmedStory.length > 1000) {
          return NextResponse.json(
            { error: 'Your story cannot exceed 1000 characters.' },
            { status: 400 }
          );
        }
      }

      if (craft_type !== undefined && craft_type !== null) {
        if (typeof craft_type !== 'string') {
          return NextResponse.json(
            { error: 'Craft type must be a string.' },
            { status: 400 }
          );
        }
        cleanCraftType = craft_type.trim();
      }
    }

    // --- Check for existing users account ---
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${trimmedEmail};
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // --- Hash password ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Insert into users table ---
    const newUser = await sql`
      INSERT INTO users (name, email, password, image_url, role)
      VALUES (
        ${trimmedName},
        ${trimmedEmail},
        ${hashedPassword},
        '/users/default-avatar.png',
        ${cleanRole}
      )
      RETURNING id;
    `;

    const userId = newUser.rows[0].id;

    // --- If artisan: also insert into artisans table ---
    if (cleanRole === 'artisan') {
      // Check if an artisan profile with this email already exists (shouldn't, but safety check)
      const existingArtisan = await sql`
        SELECT id FROM artisans WHERE email = ${trimmedEmail};
      `;

      if (existingArtisan.rows.length === 0) {
        await sql`
          INSERT INTO artisans (id, name, email, story, image_url, studio_name, craft_type)
          VALUES (
            ${userId},
            ${trimmedName},
            ${trimmedEmail},
            ${trimmedStory},
            '/images/default-artisan.jpg',
            ${trimmedStudioName},
            ${cleanCraftType}
          );
        `;
      }
    }

    return NextResponse.json(
      { success: true, message: 'Account created successfully.', role: cleanRole },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
