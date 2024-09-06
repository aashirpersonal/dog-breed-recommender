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
    return NextResponse.json(
      { 
        error: 'Failed to fetch dog breeds', 
        details: e instanceof Error ? e.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const quizAnswers = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("dogBreedRecommender");
    const collection = db.collection("dogBreeds");

    // Fetch all dog breeds from the database
    const dogBreeds = await collection.find({}).toArray();

    // Score each breed based on how well it matches the user's preferences
    const scoredBreeds = dogBreeds.map(breed => ({
      ...breed,
      score: calculateBreedScore(breed, quizAnswers)
    }));

    // Sort breeds by score (descending) and take top 10 recommendations
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

type Preferences = {
  size_preference: 'small' | 'medium' | 'large' | 'extra_large' | 'no_preference';
  activity_level: 'sedentary' | 'moderate' | 'very_active' | 'no_preference';
  grooming_preference: 'low_maintenance' | 'moderate_grooming' | 'high_maintenance' | 'no_preference';
  trainability_importance: 'not_important' | 'somewhat_important' | 'very_important';
  barking_tolerance: 'minimal' | 'some_barking' | 'frequent_barking' | 'no_preference';
  living_situation?: string;
  family_situation?: string;
  other_pets?: string;
  climate?: string;
  health_concerns?: string;
  official_recognition?: string;
};
function calculateBreedScore(breed: any, preferences: any): number {
  let score = 0;

  const toNumber = (value: any): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const calculateMatchScore = (breedValue: number, preferenceValue: number, weight: number) => {
    const difference = Math.abs(breedValue - preferenceValue);
    return Math.max(5 - difference, 0) * weight;
  };

  // 1. Living situation (Adapts Well To Apartment Living and Tolerates Being Alone)
  if (preferences.living_situation === 'Apartment') {
    score += toNumber(breed['Adapts Well To Apartment Living']) * 2;
  }

  // 2. Experience (Good For Novice Dog Owners and Trainability)
  if (preferences.experience === 'First-time dog owner') {
    score += toNumber(breed['Good For Novice Dog Owners']) * 2;
  }
  score += toNumber(breed['Trainability']) * 1.5;

  // 3. Activity level (High Energy Level, Exercise Needs, Intensity)
  const activityMap: { [key: string]: number } = { 'Low': 1, 'Moderate': 3, 'High': 5 };
  const preferredActivity = activityMap[preferences.activity_level as keyof typeof activityMap] || 3;
  score += calculateMatchScore(toNumber(breed['High Energy Level']), preferredActivity, 2);
  score += calculateMatchScore(toNumber(breed['Exercise Needs']), preferredActivity, 2);

  // 4. Family situation (Kid-Friendly and Best Family Dogs)
  if (preferences.family_situation === 'Family with young children') {
    score += toNumber(breed['Kid-Friendly']) * 3;
  }
  score += toNumber(breed['Best Family Dogs']) * 1.5;

  // 5. Other pets (Dog Friendly and Friendly Toward Strangers)
  if (preferences.other_pets === 'Other dogs') {
    score += toNumber(breed['Dog Friendly']) * 1.5;
  }
  if (preferences.other_pets === 'Cats') {
    score += toNumber(breed['Dog Friendly']) * 1.5;  // Assuming dog-friendly dogs are generally good with cats.
  }

  // 6. Grooming preference (Health And Grooming Needs and Easy To Groom)
  const groomingMap: { [key: string]: number } = { 'Low maintenance': 1, 'Regular grooming': 3, 'Extensive grooming': 5 };
  const preferredGrooming = groomingMap[preferences.grooming_preference as keyof typeof groomingMap] || 3;
  score += calculateMatchScore(toNumber(breed['Health And Grooming Needs']), preferredGrooming, 2);
  score += calculateMatchScore(toNumber(breed['Easy To Groom']), preferredGrooming, 1.5);

  // 7. Shedding tolerance (Shedding)
  const sheddingMap: { [key: string]: number } = { 'Prefer no shedding': 1, 'Can tolerate some shedding': 3, 'Don’t mind heavy shedding': 5 };
  const preferredShedding = sheddingMap[preferences.shedding_tolerance as keyof typeof sheddingMap] || 3;
  score += calculateMatchScore(toNumber(breed['Shedding']), preferredShedding, 2);

  // 8. Barking tolerance (Tendency To Bark Or Howl)
  const barkingMap: { [key: string]: number } = { 'Prefer minimal barking': 1, 'Can tolerate some barking': 3, 'Don’t mind frequent barking': 5 };
  const preferredBarking = barkingMap[preferences.barking_tolerance as keyof typeof barkingMap] || 3;
  score += calculateMatchScore(toNumber(breed['Tendency To Bark Or Howl']), preferredBarking, 1.5);

  // 9. Climate (Tolerates Cold Weather and Tolerates Hot Weather)
  if (preferences.climate === 'Cold') {
    score += toNumber(breed['Tolerates Cold Weather']) * 2;
  }
  if (preferences.climate === 'Hot') {
    score += toNumber(breed['Tolerates Hot Weather']) * 2;
  }

  // 10. Health concerns (General Health, Shedding, Drooling Potential)
  if (preferences.health_concerns === 'Need a hypoallergenic dog') {
    score += (5 - toNumber(breed['Shedding'])) * 2;  // Inverse shedding score for hypoallergenic.
  }
  if (preferences.health_concerns === 'Prefer minimal health issues') {
    score += toNumber(breed['General Health']) * 2;
  }

  // 11. Official recognition (Officially Recognized)
  if (preferences.official_recognition === 'Yes, I prefer officially recognized breeds' && breed['Officially Recognized'] === 'Yes') {
    score += 10;
  }

  return score;
}
