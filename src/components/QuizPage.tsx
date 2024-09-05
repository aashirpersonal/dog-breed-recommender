// src/components/QuizPage.tsx

import React, { useState } from 'react';
import { Typography, Container, Box, Radio, RadioGroup, FormControlLabel, LinearProgress, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const GlassCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));


const questions = [
  {
    id: 'living_situation',
    question: 'What is your living situation?',
    answers: ['Apartment', 'House with small yard', 'House with large yard']
  },
  {
    id: 'activity_level',
    question: 'How would you describe your activity level?',
    answers: ['Mostly sedentary', 'Moderately active', 'Very active']
  },
  {
    id: 'time_commitment',
    question: 'How much time can you dedicate to your dog daily?',
    answers: ['Minimal (less than 30 minutes)', 'Moderate (30-60 minutes)', 'Extensive (more than 60 minutes)']
  },
  {
    id: 'experience',
    question: 'What is your experience level with dogs?',
    answers: ['First-time owner', 'Some experience', 'Very experienced']
  },
  {
    id: 'family_situation',
    question: 'What is your family situation?',
    answers: ['Single adult', 'Couple without children', 'Family with young children', 'Family with older children', 'Senior(s)']
  },
  {
    id: 'other_pets',
    question: 'Do you have other pets?',
    answers: ['No other pets', 'Other dogs', 'Cats', 'Small animals (e.g., rabbits, birds)']
  },
  {
    id: 'grooming_preference',
    question: 'What are your grooming preferences?',
    answers: ['Low maintenance', 'Willing to do regular grooming', 'Happy to do extensive grooming']
  },
  {
    id: 'shedding_tolerance',
    question: 'How tolerant are you of shedding?',
    answers: ['Prefer no shedding', 'Can tolerate some shedding', "Don't mind heavy shedding"]
  },
  {
    id: 'size_preference',
    question: 'What size dog do you prefer?',
    answers: ['Small (under 20 lbs)', 'Medium (20-50 lbs)', 'Large (50-90 lbs)', 'Extra large (over 90 lbs)']
  },
  {
    id: 'trainability_importance',
    question: 'How important is easy trainability to you?',
    answers: ['Very important', 'Somewhat important', 'Not important']
  },
  {
    id: 'energy_level',
    question: 'What energy level are you looking for in a dog?',
    answers: ['Low energy', 'Moderate energy', 'High energy']
  },
  {
    id: 'barking_tolerance',
    question: 'How tolerant are you of barking?',
    answers: ['Prefer minimal barking', 'Can tolerate some barking', "Don't mind frequent barking"]
  },
  {
    id: 'climate',
    question: 'What type of climate do you live in?',
    answers: ['Cold', 'Moderate', 'Hot']
  },
  {
    id: 'lifestyle',
    question: 'Which lifestyle activities do you want to share with your dog?',
    answers: ['Cuddling and relaxing at home', 'Regular walks', 'Jogging or running', 'Hiking and outdoor adventures', 'Dog sports (agility, obedience, etc.)']
  },
  {
    id: 'health_concerns',
    question: 'Do you have any specific health concerns or preferences?',
    answers: ['No specific concerns', 'Need a hypoallergenic breed', 'Prefer breeds with minimal known health issues']
  },
  {
    id: 'official_recognition',
    question: 'Do you prefer officially recognized dog breeds? (They are easier to find)',
    answers: [
      'Yes, I prefer officially recognized breeds',
      'No, I\'m open to all breeds',
      'No preference'
    ]
  }
];

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleAnswer = async (answer: string) => {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
      setAnswers(newAnswers);
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        await handleQuizComplete(newAnswers);
      }
    };
  
    const handleQuizComplete = async (finalAnswers: { [key: string]: string }) => {
      setLoading(true);
      try {
        const response = await fetch('/api/dogBreeds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalAnswers),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const recommendations = await response.json();
        
        localStorage.setItem('dogRecommendations', JSON.stringify(recommendations));
        
        // Simulate a delay for the loading screen
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        router.push('/results');
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false);
      }
    };
  
    const progress = ((currentQuestion + 1) / questions.length) * 100;
  
    if (loading) {
        return (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              width: '100vw',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 9999,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Finding Your Perfect Match
            </Typography>
            <Typography variant="h6" gutterBottom>
              Searching through 500+ dog breeds...
            </Typography>
            <Box sx={{ width: '200px', height: '200px', position: 'relative' }}>
              <Box
                component={motion.div}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '4px solid white',
                  borderTop: '4px solid transparent',
                  position: 'absolute',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </Box>
          </Box>
      );
    }
  
    return (
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
          Find Your Perfect Dog Breed
        </Typography>
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 10, borderRadius: 5 }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard>
                <Typography variant="h5" gutterBottom>
                  {questions[currentQuestion].question}
                </Typography>
                <RadioGroup>
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <FormControlLabel
                      key={index}
                      value={answer}
                      control={<Radio />}
                      label={answer}
                      sx={{ my: 1 }}
                      onClick={() => handleAnswer(answer)}
                    />
                  ))}
                </RadioGroup>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    );
  }