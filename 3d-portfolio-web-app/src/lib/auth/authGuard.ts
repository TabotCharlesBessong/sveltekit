import type { RequestEvent } from '@sveltejs/kit';
import { verifyToken } from './jwt';
import { User } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';

export async function requireAuth(event: RequestEvent): Promise<boolean> {
  const authHeader = event.request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  
  if (!payload) {
    return false;
  }
  
  try {
    await connectToDatabase();
    const user = await User.findById(payload.userId);
    return !!user;
  } catch (error) {
    return false;
  }
} 