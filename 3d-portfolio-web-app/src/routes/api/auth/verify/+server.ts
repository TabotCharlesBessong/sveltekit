import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/db/models';
import { verifyToken } from '$lib/auth/jwt';
import { connectToDatabase } from '$lib/db/connection';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return json({ success: false, message: 'Token is required' }, { status: 400 });
    }
    
    const payload = verifyToken(token);
    
    if (!payload) {
      return json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
    }
    
    await connectToDatabase();
    const user = await User.findById(payload.userId);
    
    if (!user) {
      return json({ success: false, message: 'User not found' }, { status: 401 });
    }
    
    return json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 