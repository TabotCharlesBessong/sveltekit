import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Experience } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async () => {
  try {
    await connectToDatabase();
    
    const experiences = await Experience
      .find()
      .sort({ current: -1, endDate: -1, startDate: -1, order: 1 });
    
    return json({
      success: true,
      experiences
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async (event) => {
  try {
    // Check authentication
    const isAuthenticated = await requireAuth(event);
    if (!isAuthenticated) {
      return json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    const experienceData = await event.request.json();
    
    await connectToDatabase();
    
    const experience = new Experience(experienceData);
    await experience.save();
    
    return json({
      success: true,
      experience
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 