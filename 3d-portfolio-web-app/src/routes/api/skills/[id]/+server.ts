import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Skill } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;
    
    await connectToDatabase();
    
    const skill = await Skill.findById(id);
    
    if (!skill) {
      return json({ success: false, message: 'Skill not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      skill
    });
  } catch (error) {
    console.error('Error fetching skill:', error);
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
    const skillData = await event.request.json();
    
    await connectToDatabase();
    
    const skill = await Skill.findByIdAndUpdate(
      id,
      skillData,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return json({ success: false, message: 'Skill not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      skill
    });
  } catch (error) {
    console.error('Error updating skill:', error);
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
    
    const skill = await Skill.findByIdAndDelete(id);
    
    if (!skill) {
      return json({ success: false, message: 'Skill not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 