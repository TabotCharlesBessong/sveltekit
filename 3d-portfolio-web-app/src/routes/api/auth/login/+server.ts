import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/db/models';
import { createToken } from '$lib/auth/jwt';
import { connectToDatabase } from '$lib/db/connection';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }
    
    await connectToDatabase();
    const user = await User.findOne({ email });
    
    if (!user) {
      return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
    
    const token = createToken(user);
    
    return json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 