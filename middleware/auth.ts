import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export function withAuth(handler: Function) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET || 'default_secret_key');
            (req as any).user = decoded;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}
