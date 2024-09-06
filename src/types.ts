// src/types.ts
export interface DogBreed {
    _id: string;
    id?: string;  // You can set this if necessary, or remove if not used
    'Dog Name': string;
    Temperament: string;
    Adaptability: string;
    'Adapts Well To Apartment Living': string;
    'Good For Novice Dog Owners': string;
    'Sensitivity Level': string;
    'Tolerates Being Alone': string;
    'Tolerates Cold Weather': string;
    'Tolerates Hot Weather': string;
    'All-around friendliness': string;
    'Best Family Dogs': string;
    'Kid-Friendly': string;
    'Dog Friendly': string;
    'Friendly Toward Strangers': string;
    'Health And Grooming Needs': string;
    Shedding: string;
    'Drooling Potential': string;
    'Easy To Groom': string;
    'General Health': string;
    'Potential For Weight Gain': string;
    Size: string;
    Trainability: string;
    'Easy To Train': string;
    Intelligence: string;
    'Potential For Mouthiness': string;
    'Prey Drive': string;
    'Tendency To Bark Or Howl': string;
    'Wanderlust Potential': string;
    'Exercise Needs': string;
    'High Energy Level': string;
    Intensity: string;
    'Potential For Playfulness': string;
    'Officially Recognized': string;
    FeaturedImageURL: string;
    AdditionalImageURLs: string;
    'Life Expectancy': string;
    'Height': string;
    'Weight': string;
  }
  export interface PaginatedDogBreeds {
    dogBreeds: DogBreed[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }