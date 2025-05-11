import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  location: string;
  logoUrl?: string;
  order: number;
}

const educationSchema = new mongoose.Schema<IEducation>({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const Education = mongoose.models.Education || mongoose.model<IEducation>('Education', educationSchema); 