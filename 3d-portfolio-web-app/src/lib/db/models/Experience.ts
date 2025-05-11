import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  location: string;
  companyLogo?: string;
  order: number;
}

const experienceSchema = new mongoose.Schema<IExperience>({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
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
  location: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const Experience = mongoose.models.Experience || mongoose.model<IExperience>('Experience', experienceSchema); 