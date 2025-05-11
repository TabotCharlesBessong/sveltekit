import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Education } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;
    
    await connectToDatabase();
    
    const education = await Education.findById(id);
    
    if (!education) {
      return json({ success: false, message: 'Education not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      education
    });
  } catch (error) {
    console.error('Error fetching education:', error);
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
    const educationData = await event.request.json();
    
    await connectToDatabase();
    
    const education = await Education.findByIdAndUpdate(
      id,
      educationData,
      { new: true, runValidators: true }
    );
    
    if (!education) {
      return json({ success: false, message: 'Education not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      education
    });
  } catch (error) {
    console.error('Error updating education:', error);
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
    
    const education = await Education.findByIdAndDelete(id);
    
    if (!education) {
      return json({ success: false, message: 'Education not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      message: 'Education deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting education:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 