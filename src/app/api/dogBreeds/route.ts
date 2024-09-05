// src/app/api/dogBreeds/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const skip = (page - 1) * limit;

  try {
    const client = await clientPromise;
    const db = client.db("dogBreedRecommender");
    const collection = db.collection("dogBreeds");

    const dogBreeds = await collection.find({}).skip(skip).limit(limit).toArray();
    const total = await collection.countDocuments();

    console.log(`Fetched ${dogBreeds.length} dog breeds. Total: ${total}`);
    
    return NextResponse.json({ 
      dogBreeds, 
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (e) {
    console.error('Error fetching dog breeds:', e);
    return NextResponse.json({ error: 'Failed to fetch dog breeds', details: e.message }, { status: 500 });
  }
}