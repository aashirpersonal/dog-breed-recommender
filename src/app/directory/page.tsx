// src/app/directory/page.tsx
import { Metadata } from 'next'
import DirectoryPage from '@/components/DirectoryPage'
import clientPromise from '@/lib/mongodb'

export const metadata: Metadata = {
  title: 'Dog Breed Directory - Explore All Breeds',
  description: 'Browse our comprehensive directory of dog breeds to find detailed information on various canine companions.',
}

async function getInitialDogBreeds(page = 1, limit = 12) {
  const client = await clientPromise
  const db = client.db("dogBreedRecommender")
  const collection = db.collection("dogBreeds")

  const skip = (page - 1) * limit
  const dogBreeds = await collection.find({}).skip(skip).limit(limit).toArray()
  const total = await collection.countDocuments({})

  const serializedDogBreeds = dogBreeds.map(breed => ({
    ...breed,
    _id: breed._id.toString(),
  }))

  return {
    dogBreeds: serializedDogBreeds,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  }
}

export default async function Directory({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const page = Number(searchParams.page) || 1;
  const initialDogBreeds = await getInitialDogBreeds(page);
  return <DirectoryPage initialDogBreeds={initialDogBreeds} />;
}
