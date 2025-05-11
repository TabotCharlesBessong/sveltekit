import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { IUser } from '$lib/db/models';

interface TokenPayload {
  userId: string;
  email: string;
}

export function createToken(user: IUser): string {
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function getUserIdFromToken(token: string): string | null {
  const payload = verifyToken(token);
  return payload ? payload.userId : null;
} 