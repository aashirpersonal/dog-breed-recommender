// src/data/quizQuestions.ts

export const questions = [
    {
      id: 'living_situation',
      question: 'What is your living situation?',
      shortLabel: 'Living Space',
      tooltip: 'Your living space can affect which dog breeds are most suitable for you.',
      answers: ['Apartment', 'House with small yard', 'House with large yard']
    },
    {
      id: 'activity_level',
      question: 'How would you describe your activity level?',
      shortLabel: 'Activity',
      tooltip: 'Different dog breeds have varying exercise needs that should match your lifestyle.',
      answers: ['Mostly sedentary', 'Moderately active', 'Very active']
    },
    {
      id: 'time_commitment',
      question: 'How much time can you dedicate to your dog daily?',
      shortLabel: 'Time',
      tooltip: 'Dogs require time for exercise, training, and companionship.',
      answers: ['Minimal (less than 30 minutes)', 'Moderate (30-60 minutes)', 'Extensive (more than 60 minutes)']
    },
    {
      id: 'experience',
      question: 'What is your experience level with dogs?',
      shortLabel: 'Experience',
      tooltip: 'Some breeds are better suited for experienced owners, while others are great for first-time owners.',
      answers: ['First-time owner', 'Some experience', 'Very experienced']
    },
    {
      id: 'family_situation',
      question: 'What is your family situation?',
      shortLabel: 'Family',
      tooltip: 'Family composition can influence which dog breeds are most compatible.',
      answers: ['Single adult', 'Couple without children', 'Family with young children', 'Family with older children', 'Senior(s)']
    },
    {
      id: 'other_pets',
      question: 'Do you have other pets?',
      shortLabel: 'Other Pets',
      tooltip: 'Some dog breeds get along better with other pets than others.',
      answers: ['No other pets', 'Other dogs', 'Cats', 'Small animals (e.g., rabbits, birds)']
    },
    {
      id: 'grooming_preference',
      question: 'What are your grooming preferences?',
      shortLabel: 'Grooming',
      tooltip: 'Different breeds have varying grooming needs, from minimal to extensive.',
      answers: ['Low maintenance', 'Willing to do regular grooming', 'Happy to do extensive grooming']
    },
    {
      id: 'shedding_tolerance',
      question: 'How tolerant are you of shedding?',
      shortLabel: 'Shedding',
      tooltip: 'Some breeds shed more than others, which can affect allergies and cleaning needs.',
      answers: ['Prefer no shedding', 'Can tolerate some shedding', "Don't mind heavy shedding"]
    },
    {
      id: 'size_preference',
      question: 'What size dog do you prefer?',
      shortLabel: 'Size',
      tooltip: 'Dog sizes can range from tiny toy breeds to giant breeds.',
      answers: ['Small (under 20 lbs)', 'Medium (20-50 lbs)', 'Large (50-90 lbs)', 'Extra large (over 90 lbs)']
    },
    {
      id: 'trainability_importance',
      question: 'How important is easy trainability to you?',
      shortLabel: 'Trainability',
      tooltip: 'Some breeds are more eager to please and easier to train than others.',
      answers: ['Very important', 'Somewhat important', 'Not important']
    },
    {
      id: 'energy_level',
      question: 'What energy level are you looking for in a dog?',
      shortLabel: 'Energy',
      tooltip: 'Energy levels in dogs can range from very low to extremely high.',
      answers: ['Low energy', 'Moderate energy', 'High energy']
    },
    {
      id: 'barking_tolerance',
      question: 'How tolerant are you of barking?',
      shortLabel: 'Barking',
      tooltip: 'Some breeds are more vocal than others, which can affect your living situation.',
      answers: ['Prefer minimal barking', 'Can tolerate some barking', "Don't mind frequent barking"]
    },
    {
      id: 'climate',
      question: 'What type of climate do you live in?',
      shortLabel: 'Climate',
      tooltip: 'Some breeds are better suited for certain climates due to their coat type and body structure.',
      answers: ['Cold', 'Moderate', 'Hot']
    },
    {
      id: 'lifestyle',
      question: 'Which lifestyle activities do you want to share with your dog?',
      shortLabel: 'Activities',
      tooltip: 'Different breeds excel at and enjoy various activities.',
      answers: ['Cuddling and relaxing at home', 'Regular walks', 'Jogging or running', 'Hiking and outdoor adventures', 'Dog sports (agility, obedience, etc.)']
    },
    {
      id: 'health_concerns',
      question: 'Do you have any specific health concerns or preferences?',
      shortLabel: 'Health',
      tooltip: 'Some breeds are prone to certain health issues, while others are known for being generally healthy.',
      answers: ['No specific concerns', 'Need a hypoallergenic breed', 'Prefer breeds with minimal known health issues']
    },
    {
      id: 'official_recognition',
      question: 'Do you prefer officially recognized dog breeds?',
      shortLabel: 'Recognition',
      tooltip: 'Officially recognized breeds are often easier to find and have more predictable traits.',
      answers: [
        'Yes, I prefer officially recognized breeds',
        'No, I\'m open to all breeds',
        'No preference'
      ]
    }
  ];
  
  export default questions;