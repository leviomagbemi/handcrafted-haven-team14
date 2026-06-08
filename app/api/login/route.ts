import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/app/lib/data";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	console.log("API route /api/login called"); // Log to confirm API route is reached

	try {
		const { email, password } = req.body; // Parse the JSON body
		console.log("Request data:", { email, password });

		const user = await getUser(email);
		console.log("User fetched:", user);

		if (!user) {
			console.log("User not found");
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		console.log("Password match:", passwordMatch);

		if (!passwordMatch) {
			console.log("Password does not match");
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
			expiresIn: "1h",
		});
		console.log("Login successful, token generated:", token);

		return res.status(200).json({ token });
	} catch (error) {
		console.error("Internal server error", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
