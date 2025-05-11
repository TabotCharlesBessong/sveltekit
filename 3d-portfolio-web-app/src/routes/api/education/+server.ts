import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Education } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async () => {
  try {
    await connectToDatabase();
    
    const educations = await Education
      .find()
      .sort({ current: -1, endDate: -1, startDate: -1, order: 1 });
    
    return json({
      success: true,
      educations
    });
  } catch (error) {
    console.error('Error fetching educations:', error);
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
    
    const educationData = await event.request.json();
    
    await connectToDatabase();
    
    const education = new Education(educationData);
    await education.save();
    
    return json({
      success: true,
      education
    });
  } catch (error) {
    console.error('Error creating education:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 