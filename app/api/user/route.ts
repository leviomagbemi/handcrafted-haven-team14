// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getUser } from '@/app/lib/data';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export async function GET(request: NextRequest) {
  try {
    console.log("=== /api/user GET ===");

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
    const user = await getUser(decoded.email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password, ...safeUser } = user;

    // If user is an artisan, fetch and merge artisan profile details
    if (user.role === 'artisan') {
      const artisanResult = await sql`
        SELECT story, studio_name, craft_type, image_url
        FROM artisans
        WHERE id = ${user.id};
      `;
      const artisanDetails = artisanResult.rows[0];
      if (artisanDetails) {
        return NextResponse.json({
          ...safeUser,
          story: artisanDetails.story,
          studio_name: artisanDetails.studio_name,
          craft_type: artisanDetails.craft_type,
          image_url: artisanDetails.image_url || safeUser.image_url,
        });
      }
    }

    return NextResponse.json(safeUser);

  } catch (error: any) {
    console.error("❌ Auth GET error:", error.message);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log("=== /api/user PUT ===");

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

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    const user = await getUser(decoded.email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    const { name, story, studio_name, craft_type, image_url } = body;

    // Validate Name
    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }
    const trimmedName = name.trim();
    if (trimmedName.length > 100) {
      return NextResponse.json({ error: 'Full name cannot exceed 100 characters.' }, { status: 400 });
    }

    const cleanImageUrl = typeof image_url === 'string' ? image_url.trim() : '';

    if (user.role === 'artisan') {
      // Validate artisan-specific fields
      if (typeof studio_name !== 'string' || !studio_name.trim()) {
        return NextResponse.json({ error: 'Studio name is required for artisan profiles.' }, { status: 400 });
      }
      const trimmedStudioName = studio_name.trim();
      if (trimmedStudioName.length > 100) {
        return NextResponse.json({ error: 'Studio name cannot exceed 100 characters.' }, { status: 400 });
      }

      let trimmedStory = '';
      if (story !== undefined && story !== null) {
        if (typeof story !== 'string') {
          return NextResponse.json({ error: 'Story must be a valid string.' }, { status: 400 });
        }
        trimmedStory = story.trim();
        if (trimmedStory.length > 1000) {
          return NextResponse.json({ error: 'Story cannot exceed 1000 characters.' }, { status: 400 });
        }
      }

      const cleanCraftType = typeof craft_type === 'string' ? craft_type.trim() : 'Ceramics';

      // Perform updates inside a transaction
      await sql`BEGIN`;
      try {
        await sql`
          UPDATE users 
          SET name = ${trimmedName},
              image_url = ${cleanImageUrl || '/users/default-avatar.png'}
          WHERE id = ${user.id};
        `;

        await sql`
          UPDATE artisans
          SET name = ${trimmedName},
              story = ${trimmedStory},
              studio_name = ${trimmedStudioName},
              craft_type = ${cleanCraftType},
              image_url = ${cleanImageUrl || '/images/default-artisan.jpg'}
          WHERE id = ${user.id};
        `;
        await sql`COMMIT`;
      } catch (transactionError) {
        await sql`ROLLBACK`;
        throw transactionError;
      }
    } else {
      // Update buyer profile
      await sql`
        UPDATE users 
        SET name = ${trimmedName},
            image_url = ${cleanImageUrl || '/users/default-avatar.png'}
        WHERE id = ${user.id};
      `;
    }

    // Fetch updated user to return (including joined artisan data)
    let safeUser: any = null;
    const updatedUser = await getUser(decoded.email);
    if (updatedUser) {
      const { password, ...tempSafeUser } = updatedUser;
      safeUser = tempSafeUser;

      if (updatedUser.role === 'artisan') {
        const artisanResult = await sql`
          SELECT story, studio_name, craft_type, image_url
          FROM artisans
          WHERE id = ${updatedUser.id};
        `;
        const artisanDetails = artisanResult.rows[0];
        if (artisanDetails) {
          safeUser = {
            ...safeUser,
            story: artisanDetails.story,
            studio_name: artisanDetails.studio_name,
            craft_type: artisanDetails.craft_type,
            image_url: artisanDetails.image_url || safeUser.image_url,
          };
        }
      }
    }

    if (!safeUser) {
      return NextResponse.json({ error: 'Failed to retrieve updated user.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: safeUser });

  } catch (error: any) {
    console.error("❌ Auth PUT error:", error.message);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}