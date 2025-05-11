import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Experience } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;
    
    await connectToDatabase();
    
    const experience = await Experience.findById(id);
    
    if (!experience) {
      return json({ success: false, message: 'Experience not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      experience
    });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
};

export const PUT: RequestHandler = async (event) => {
  try {
    // Check authentication
    const isAuthenticated = await requireAuth(event);
    if (!isAuthenticated) {
      return json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = event.params;
    const experienceData = await event.request.json();
    
    await connectToDatabase();
    
    const experience = await Experience.findByIdAndUpdate(
      id,
      experienceData,
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return json({ success: false, message: 'Experience not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      experience
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async (event) => {
  try {
    // Check authentication
    const isAuthenticated = await requireAuth(event);
    if (!isAuthenticated) {
      return json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = event.params;
    
    await connectToDatabase();
    
    const experience = await Experience.findByIdAndDelete(id);
    
    if (!experience) {
      return json({ success: false, message: 'Experience not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 