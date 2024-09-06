// File: src/app/directory/page.tsx

import { Metadata } from 'next';
import DirectoryPage from '@/components/DirectoryPage';
import clientPromise from '@/lib/mongodb';
import { DogBreed } from '@/types';  // Adjust the import path if needed

export const metadata: Metadata = {
  title: 'Dog Breed Directory - Explore All Breeds',
  description: 'Browse our comprehensive directory of dog breeds to find detailed information on various canine companions.',
};

// Function to get initial dog breeds from the database
async function getInitialDogBreeds(page = 1, limit = 12): Promise<{ dogBreeds: DogBreed[]; total: number; page: number; limit: number; totalPages: number }> {
  const client = await clientPromise;
  const db = client.db("dogBreedRecommender");
  const collection = db.collection("dogBreeds");

  const skip = (page - 1) * limit;
  const dogBreeds = await collection.find({}).skip(skip).limit(limit).toArray();
  const total = await collection.countDocuments({});

  // Ensure that you map all the fields to match the DogBreed type
  const serializedDogBreeds: DogBreed[] = dogBreeds.map(breed => ({
    _id: breed._id.toString(),
    'Dog Name': breed['Dog Name'],
    Temperament: breed.Temperament,
    Adaptability: breed.Adaptability,
    'Adapts Well To Apartment Living': breed['Adapts Well To Apartment Living'],
    'Good For Novice Dog Owners': breed['Good For Novice Dog Owners'],
    'Sensitivity Level': breed['Sensitivity Level'],
    'Tolerates Being Alone': breed['Tolerates Being Alone'],
    'Tolerates Cold Weather': breed['Tolerates Cold Weather'],
    'Tolerates Hot Weather': breed['Tolerates Hot Weather'],
    'All-around friendliness': breed['All-around friendliness'],
    'Best Family Dogs': breed['Best Family Dogs'],
    'Kid-Friendly': breed['Kid-Friendly'],
    'Dog Friendly': breed['Dog Friendly'],
    'Friendly Toward Strangers': breed['Friendly Toward Strangers'],
    'Health And Grooming Needs': breed['Health And Grooming Needs'],
    Shedding: breed.Shedding,
    'Drooling Potential': breed['Drooling Potential'],
    'Easy To Groom': breed['Easy To Groom'],
    'General Health': breed['General Health'],
    'Potential For Weight Gain': breed['Potential For Weight Gain'],
    Size: breed.Size,
    Weight: breed.Weight,  // Include the missing Weight field
    Trainability: breed.Trainability,
    'Easy To Train': breed['Easy To Train'],
    Intelligence: breed.Intelligence,
    'Potential For Mouthiness': breed['Potential For Mouthiness'],
    'Prey Drive': breed['Prey Drive'],
    'Tendency To Bark Or Howl': breed['Tendency To Bark Or Howl'],
    'Wanderlust Potential': breed['Wanderlust Potential'],
    'Exercise Needs': breed['Exercise Needs'],
    'High Energy Level': breed['High Energy Level'],
    Intensity: breed.Intensity,
    'Potential For Playfulness': breed['Potential For Playfulness'],
    'Officially Recognized': breed['Officially Recognized'],
    FeaturedImageURL: breed.FeaturedImageURL,
    AdditionalImageURLs: breed.AdditionalImageURLs,
    'Life Expectancy': breed['Life Expectancy'], // Add missing field
    'Height': breed['Height'],                   // Add missing field
  }));

  return {
    dogBreeds: serializedDogBreeds,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

// Main directory page component to display breeds
export default async function Directory({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const page = Number(searchParams.page) || 1;
  const initialDogBreeds = await getInitialDogBreeds(page);
  return <DirectoryPage initialDogBreeds={initialDogBreeds} />;
}
