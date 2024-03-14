import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function generateToken(user: any) {
    
    const secret: any = process.env.JWT_SECRET;

    return jwt.sign({ userId: user.id }, secret, { expiresIn: '1d' });
}

