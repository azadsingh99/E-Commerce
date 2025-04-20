import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB connected successfully');
    return client.db();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
