// src/app/api/dogBreeds/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const search = searchParams.get('search') || '';

  try {
    const client = await clientPromise;
    const db = client.db("dogBreedRecommender");
    const collection = db.collection("dogBreeds");

    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = { 
        $or: [
          { "Dog Name": { $regex: search, $options: 'i' } },
          { Temperament: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const dogBreeds = await collection.find(query).skip(skip).limit(limit).toArray();
    const total = await collection.countDocuments(query);

    const serializedDogBreeds = dogBreeds.map(breed => ({
      ...breed,
      _id: breed._id.toString(),
    }));

    return NextResponse.json({ 
      dogBreeds: serializedDogBreeds, 
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
export async function POST(request: Request) {
  const quizAnswers = await request.json();
  
  try {
    const client = await clientPromise;
    const db = client.db("dogBreedRecommender");
    const collection = db.collection("dogBreeds");

    // Find all dog breeds (we'll filter in memory for more precise control)
    const dogBreeds = await collection.find({}).toArray();

    // Score each breed based on how well it matches the user's preferences
    const scoredBreeds = dogBreeds.map(breed => ({
      ...breed,
      score: calculateBreedScore(breed, quizAnswers)
    }));

    // Sort breeds by score (descending) and take top 10
    const recommendedBreeds = scoredBreeds
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json(recommendedBreeds);
  } catch (e) {
    console.error('Error fetching dog breed recommendations:', e);
    return NextResponse.json({ error: 'Failed to fetch dog breed recommendations' }, { status: 500 });
  }
}
function buildQueryFromAnswers(quizAnswers: any) {
  const query: any = {};

  // Basic filtering to reduce the initial dataset
  if (quizAnswers.size_preference === 'small') {
    query['Size'] = { $lte: "2" };
  } else if (quizAnswers.size_preference === 'large' || quizAnswers.size_preference === 'extra_large') {
    query['Size'] = { $gte: "4" };
  }

  if (quizAnswers.health_concerns === 'allergies') {
    query['Amount Of Shedding'] = { $lte: "2" };
  }

  if (quizAnswers.living_situation === 'apartment') {
    query['Adapts Well To Apartment Living'] = { $gte: "3" };
  }

  // Add filter for officially recognized breeds if specified
  if (quizAnswers.official_recognition === 'Yes, I prefer officially recognized breeds') {
    query['Officially Recognized'] = 'Yes';
  }

  return query;
}

function calculateBreedScore(breed: any, preferences: any): number {
  let score = 0;
  const weights: { [key: string]: number } = {};

  // Helper function to convert string to number safely
  const toNumber = (value: string): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Helper function to calculate score based on preference match
  const calculateMatchScore = (breedValue: number, preferenceValue: number, weight: number) => {
    const difference = Math.abs(breedValue - preferenceValue);
    return Math.max(5 - difference, 0) * weight;
  };

  // Set weights based on user preferences
  weights.size = preferences.size_preference === 'no_preference' ? 1 : 2;
  weights.energy = preferences.activity_level === 'no_preference' ? 1 : 2;
  weights.grooming = preferences.grooming_preference === 'no_preference' ? 1 : 2;
  weights.trainability = preferences.trainability_importance === 'not_important' ? 1 : 2;
  weights.barking = preferences.barking_tolerance === 'no_preference' ? 1 : 2;

  // Size preference
  const sizeMap = { 'small': 1, 'medium': 2, 'large': 3, 'extra_large': 4 };
  const preferredSize = sizeMap[preferences.size_preference] || 2.5;
  score += calculateMatchScore(toNumber(breed['Size']), preferredSize, weights.size);

  // Energy level and exercise needs
  const energyMap = { 'sedentary': 1, 'moderate': 3, 'very_active': 5 };
  const preferredEnergy = energyMap[preferences.activity_level] || 3;
  score += calculateMatchScore(toNumber(breed['Energy Level']), preferredEnergy, weights.energy);
  score += calculateMatchScore(toNumber(breed['Exercise needs']), preferredEnergy, weights.energy);

  // Grooming needs
  const groomingMap = { 'low_maintenance': 1, 'moderate_grooming': 3, 'high_maintenance': 5 };
  const preferredGrooming = groomingMap[preferences.grooming_preference] || 3;
  score += calculateMatchScore(toNumber(breed['Health And Grooming Needs']), preferredGrooming, weights.grooming);

  // Trainability
  const trainabilityMap = { 'not_important': 1, 'somewhat_important': 3, 'very_important': 5 };
  const preferredTrainability = trainabilityMap[preferences.trainability_importance] || 3;
  score += calculateMatchScore(toNumber(breed['Trainability']), preferredTrainability, weights.trainability);

  // Barking tendency
  const barkingMap = { 'minimal': 1, 'some_barking': 3, 'frequent_barking': 5 };
  const preferredBarking = barkingMap[preferences.barking_tolerance] || 3;
  score += calculateMatchScore(toNumber(breed['Tendency To Bark Or Howl']), preferredBarking, weights.barking);

  // Living situation
  if (preferences.living_situation === 'apartment') {
    score += toNumber(breed['Adapts Well To Apartment Living']) * 2;
  }

  // Family situation
  if (preferences.family_situation === 'family_young_children') {
    score += toNumber(breed['Kid-Friendly']) * 2;
  }

  // Other pets
  if (preferences.other_pets === 'dogs') {
    score += toNumber(breed['Dog Friendly']) * 1.5;
  }
  if (preferences.other_pets === 'cats') {
    score += toNumber(breed['Dog Friendly']) * 1.5; // Assuming dog-friendly dogs are also generally cat-friendly
  }

  // Climate
  if (preferences.climate === 'cold') {
    score += toNumber(breed['Tolerates Cold Weather']) * 1.5;
  }
  if (preferences.climate === 'hot') {
    score += toNumber(breed['Tolerates Hot Weather']) * 1.5;
  }

  // Health concerns
  if (preferences.health_concerns === 'hypoallergenic') {
    score += (5 - toNumber(breed['Amount Of Shedding'])) * 2; // Invert shedding score for hypoallergenic
  }
  if (preferences.health_concerns === 'minimal_health_issues') {
    score += toNumber(breed['General Health']) * 2;
  }

  // Official recognition
  if (preferences.official_recognition === 'Yes, I prefer officially recognized breeds' && breed['Officially Recognized'] === 'Yes') {
    score += 10;
  }

  return score;
}