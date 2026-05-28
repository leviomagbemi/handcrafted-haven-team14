import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/data";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export async function POST(request: Request) {
	console.log("API route /api/login called"); // Log to confirm API route is reached

	try {
		const { email, password } = await request.json(); // Parse the JSON body
		console.log("Request data:", { email, password });

		const user = await getUser(email);
		console.log("User fetched:", user);

		if (!user) {
			console.log("User not found");
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		console.log("Password match:", passwordMatch);

		if (!passwordMatch) {
			console.log("Password does not match");
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
			expiresIn: "1h",
		});
		console.log("Login successful, token generated:", token);

		return NextResponse.json({ token });
	} catch (error) {
		console.error("Internal server error", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
