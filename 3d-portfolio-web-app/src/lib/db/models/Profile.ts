import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
}

export interface IProfile extends Document {
  firstName: string;
  lastName: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  email: string;
  location: string;
  socialLinks: ISocialLink[];
}

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  }
});

const profileSchema = new mongoose.Schema<IProfile>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  tagline: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  socialLinks: [socialLinkSchema]
}, { timestamps: true });

// Ensure there is only one profile document
profileSchema.statics.findOneOrCreate = async function() {
  const profile = await this.findOne();
  if (profile) {
    return profile;
  }
  
  return this.create({
    firstName: 'Your',
    lastName: 'Name',
    tagline: 'Web Developer',
    bio: 'Short description about yourself',
    avatarUrl: '/images/avatar.jpg',
    email: 'your.email@example.com',
    location: 'Your Location',
    socialLinks: []
  });
};

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', profileSchema); 