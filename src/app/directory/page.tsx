// src/app/directory/page.tsx
import { Metadata } from 'next'
import DirectoryPage from '@/components/DirectoryPage'
import clientPromise from '@/lib/mongodb'

export const metadata: Metadata = {
  title: 'Dog Breed Directory - Explore All Breeds',
  description: 'Browse our comprehensive directory of dog breeds to find detailed information on various canine companions.',
}

async function getInitialDogBreeds() {
  const client = await clientPromise
  const db = client.db("dogBreedRecommender")
  const collection = db.collection("dogBreeds")

  const dogBreeds = await collection.find({}).limit(12).toArray()
  const total = await collection.countDocuments({})

  return {
    dogBreeds,
    total,
    page: 1,
    limit: 12,
    totalPages: Math.ceil(total / 12)
  }
}

export default async function Directory() {
  const initialDogBreeds = await getInitialDogBreeds()
  return <DirectoryPage initialDogBreeds={initialDogBreeds} />
}