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

export async function POST(request: Request) {
  const quizAnswers = await request.json();
  
  try {
    const client = await clientPromise;
    const db = client.db("dogBreedRecommender");
    const collection = db.collection("dogBreeds");

    // Convert quiz answers to database query
    const query = buildQueryFromAnswers(quizAnswers);

    // Find matching dog breeds
    const dogBreeds = await collection.find(query).toArray();

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
    query['Size'] = { $lte: 2 };
  } else if (quizAnswers.size_preference === 'large' || quizAnswers.size_preference === 'extra_large') {
    query['Size'] = { $gte: 4 };
  }

  if (quizAnswers.health_concerns === 'allergies') {
    query['Amount Of Shedding'] = { $lte: 2 };
  }

  if (quizAnswers.living_situation === 'apartment') {
    query['Adapts Well To Apartment Living'] = { $gte: 3 };
  }

  // Add filter for officially recognized breeds if specified
  if (quizAnswers.official_recognition === 'Yes, I prefer officially recognized breeds') {
    query['Officially Recognized'] = 'Yes';
  }

  return query;
}

function calculateBreedScore(breed: any, preferences: any): number {
  let score = 0;

  // Living situation
  if (preferences.living_situation === 'apartment') {
    score += breed['Adapts Well To Apartment Living'] * 2;
  } else {
    score += breed['Adapts Well To Apartment Living'];
  }

  // Activity level and exercise needs
  const activityLevel = preferences.activity_level;
  const exerciseScore = breed['Exercise needs'] * 2;
  if (activityLevel === 'sedentary' && exerciseScore <= 6) score += 10;
  else if (activityLevel === 'moderate' && exerciseScore > 6 && exerciseScore <= 8) score += 10;
  else if (activityLevel === 'very_active' && exerciseScore > 8) score += 10;

  // Time commitment
  const timeCommitment = preferences.time_commitment;
  const energyScore = breed['Energy Level'] * 2;
  if (timeCommitment === 'minimal' && energyScore <= 6) score += 10;
  else if (timeCommitment === 'moderate' && energyScore > 6 && energyScore <= 8) score += 10;
  else if (timeCommitment === 'extensive' && energyScore > 8) score += 10;

  // Experience level
  if (preferences.experience === 'first_time' && breed['Good For Novice Owners'] >= 4) score += 10;

  // Family situation
  if (preferences.family_situation === 'family_young_children' && breed['Kid-Friendly'] >= 4) score += 10;

  // Other pets
  if (preferences.other_pets === 'dogs' && breed['Dog Friendly'] >= 4) score += 5;
  if (preferences.other_pets === 'cats' && breed['Dog Friendly'] >= 3) score += 5;

  // Grooming and shedding
  const groomingPreference = preferences.grooming_preference;
  const groomingScore = 6 - breed['Easy To Groom']; // Invert so higher is easier
  if (groomingPreference === 'low_maintenance' && groomingScore >= 4) score += 10;
  else if (groomingPreference === 'moderate_grooming' && groomingScore >= 3) score += 10;
  else if (groomingPreference === 'high_maintenance') score += 10;

  const sheddingTolerance = preferences.shedding_tolerance;
  const sheddingScore = breed['Amount Of Shedding'];
  if (sheddingTolerance === 'no_shedding' && sheddingScore <= 2) score += 10;
  else if (sheddingTolerance === 'some_shedding' && sheddingScore <= 3) score += 10;
  else if (sheddingTolerance === 'heavy_shedding') score += 10;

  // Size preference
  const sizePreference = preferences.size_preference;
  const sizeScore = breed['Size'];
  if (sizePreference === 'small' && sizeScore <= 2) score += 10;
  else if (sizePreference === 'medium' && sizeScore > 2 && sizeScore <= 3) score += 10;
  else if (sizePreference === 'large' && sizeScore > 3 && sizeScore <= 4) score += 10;
  else if (sizePreference === 'extra_large' && sizeScore > 4) score += 10;

  // Trainability
  const trainabilityImportance = preferences.trainability_importance;
  const trainabilityScore = breed['Trainability'];
  if (trainabilityImportance === 'very_important' && trainabilityScore >= 4) score += 10;
  else if (trainabilityImportance === 'somewhat_important' && trainabilityScore >= 3) score += 10;
  else if (trainabilityImportance === 'not_important') score += 10;

  // Energy level
  const energyPreference = preferences.energy_level;
  const energyLevelScore = breed['Energy Level'];
  if (energyPreference === 'low' && energyLevelScore <= 2) score += 10;
  else if (energyPreference === 'moderate' && energyLevelScore > 2 && energyLevelScore <= 3) score += 10;
  else if (energyPreference === 'high' && energyLevelScore > 3) score += 10;

  // Barking tolerance
  const barkingTolerance = preferences.barking_tolerance;
  const barkingScore = breed['Tendency To Bark Or Howl'];
  if (barkingTolerance === 'minimal' && barkingScore <= 2) score += 10;
  else if (barkingTolerance === 'some_barking' && barkingScore <= 3) score += 10;
  else if (barkingTolerance === 'frequent_barking') score += 10;

  // Climate
  const climate = preferences.climate;
  if (climate === 'cold' && breed['Tolerates Cold Weather'] >= 4) score += 5;
  if (climate === 'hot' && breed['Tolerates Hot Weather'] >= 4) score += 5;

  // Lifestyle activities
  const lifestyle = preferences.lifestyle;
  if (lifestyle === 'cuddles' && breed['Affectionate with Family'] >= 4) score += 5;
  if (lifestyle === 'walks' && breed['Energy Level'] >= 3) score += 5;
  if (lifestyle === 'jogging' && breed['Energy Level'] >= 4) score += 5;
  if (lifestyle === 'hiking' && breed['Energy Level'] >= 4 && breed['Intensity'] >= 4) score += 5;
  if (lifestyle === 'dog_sports' && breed['Trainability'] >= 4 && breed['Energy Level'] >= 4) score += 5;

  // Health concerns
  const healthConcerns = preferences.health_concerns;
  if (healthConcerns === 'hypoallergenic' && breed['Amount Of Shedding'] <= 2) score += 10;
  if (healthConcerns === 'minimal_health_issues' && breed['General Health'] >= 4) score += 10;

  // Official recognition
  const officialRecognition = preferences.official_recognition;
  if (officialRecognition === 'Yes, I prefer officially recognized breeds' && breed['Officially Recognized'] === 'Yes') {
    score += 10;
  } else if (officialRecognition === 'No, I\'m open to all breeds') {
    score += 5; // Give a slight preference to all breeds
  }

  // Additional factors
  score += breed['Adaptability'] * 2;
  score += breed['All-around friendliness'] * 2;
  score += breed['Potential For Playfulness'] * 2;

  return score;
}