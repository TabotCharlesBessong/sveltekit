import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: number; // 1-100
  logoUrl?: string;
  order: number;
}

const skillSchema = new mongoose.Schema<ISkill>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  proficiency: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  logoUrl: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', skillSchema); 