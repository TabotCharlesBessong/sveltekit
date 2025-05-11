import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Skill } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async ({ url }) => {
  try {
    await connectToDatabase();
    
    const category = url.searchParams.get('category');
    
    let query = {};
    
    if (category) {
      query = { category };
    }
    
    const skills = await Skill
      .find(query)
      .sort({ order: 1, proficiency: -1 });
    
    return json({
      success: true,
      skills
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
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
    
    const skillData = await event.request.json();
    
    await connectToDatabase();
    
    const skill = new Skill(skillData);
    await skill.save();
    
    return json({
      success: true,
      skill
    });
  } catch (error) {
    console.error('Error creating skill:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 