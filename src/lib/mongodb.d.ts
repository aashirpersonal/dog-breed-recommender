import { MongoClient } from 'mongodb';
// src/types/global.d.ts
import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

declare const clientPromise: Promise<MongoClient>;
export default clientPromise;