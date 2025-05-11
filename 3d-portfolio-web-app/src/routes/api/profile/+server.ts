import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Profile } from '$lib/db/models';
import { connectToDatabase } from '$lib/db/connection';
import { requireAuth } from '$lib/auth/authGuard';

export const GET: RequestHandler = async () => {
  try {
    await connectToDatabase();
    
    // Find the profile or create a default one if it doesn't exist
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = new Profile({
        firstName: 'Your',
        lastName: 'Name',
        tagline: 'Web Developer',
        bio: 'Short description about yourself',
        avatarUrl: '/images/avatar.jpg',
        email: 'your.email@example.com',
        location: 'Your Location',
        socialLinks: []
      });
      await profile.save();
    }
    
    return json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
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
    
    const profileData = await event.request.json();
    
    await connectToDatabase();
    
    // Find existing profile or create new one
    let profile = await Profile.findOne();
    
    if (profile) {
      // Update existing profile
      profile.firstName = profileData.firstName;
      profile.lastName = profileData.lastName;
      profile.tagline = profileData.tagline;
      profile.bio = profileData.bio;
      profile.avatarUrl = profileData.avatarUrl;
      profile.email = profileData.email;
      profile.location = profileData.location;
      profile.socialLinks = profileData.socialLinks;
    } else {
      // Create new profile
      profile = new Profile(profileData);
    }
    
    await profile.save();
    
    return json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return json({ success: false, message: 'Server error' }, { status: 500 });
  }
};