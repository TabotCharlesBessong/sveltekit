import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    cachedConnection = connection;
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export function disconnectFromDatabase() {
  if (cachedConnection) {
    return mongoose.disconnect();
  }
} 