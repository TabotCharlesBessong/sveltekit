import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/db/models';
import { createToken } from '$lib/auth/jwt';
import { connectToDatabase } from '$lib/db/connection';
import { ADMIN_REGISTRATION_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { name, email, password, registrationKey } = await request.json();
    
    // Validate inputs
    if (!name || !email || !password || !registrationKey) {
      return json({ success: false, message: 'All fields are required' }, { status: 400 });
    }
    
    // Verify admin registration key
    if (registrationKey !== ADMIN_REGISTRATION_KEY) {
      return json({ success: false, message: 'Invalid registration key' }, { status: 403 });
    }
    
    await connectToDatabase();
    
    // Check if any user exists (only allow the first admin to register)
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return json({ success: false, message: 'Admin already registered' }, { status: 403 });
    }
    
    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return json({ success: false, message: 'Email already in use' }, { status: 400 });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password
    });
    
    await user.save();
    
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
    console.error('Registration error:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 