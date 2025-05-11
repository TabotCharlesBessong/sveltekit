import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Project } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async ({ url }) => {
  try {
    await connectToDatabase();
    
    const limit = Number(url.searchParams.get('limit')) || undefined;
    const featured = url.searchParams.get('featured') === 'true';
    
    let query = {};
    
    if (featured) {
      query = { featured: true };
    }
    
    const projects = await Project
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit || 0);
    
    return json({
      success: true,
      projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
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
    
    const projectData = await event.request.json();
    
    await connectToDatabase();
    
    const project = new Project(projectData);
    await project.save();
    
    return json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 