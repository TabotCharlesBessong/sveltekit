import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Project } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;
    
    await connectToDatabase();
    
    const project = await Project.findById(id);
    
    if (!project) {
      return json({ success: false, message: 'Project not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
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
    const projectData = await event.request.json();
    
    await connectToDatabase();
    
    const project = await Project.findByIdAndUpdate(
      id,
      projectData,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return json({ success: false, message: 'Project not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Error updating project:', error);
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
    
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return json({ success: false, message: 'Project not found' }, { status: 404 });
    }
    
    return json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
}; 