// src/app/directory/page.tsx
import { Metadata } from 'next'
import DirectoryPage from '@/components/DirectoryPage'
import { getDogBreeds } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Dog Breed Directory - Explore All Breeds',
  description: 'Browse our comprehensive directory of dog breeds to find detailed information on various canine companions.',
}

export default async function Directory() {
  const initialDogBreeds = await getDogBreeds(1, 12, '')
  return <DirectoryPage initialDogBreeds={initialDogBreeds} />
}