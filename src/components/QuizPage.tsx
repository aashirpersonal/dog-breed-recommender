// src/components/QuizPage.tsx

'use client';

import React, { useState } from 'react';
import { Typography, Container, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'home',
    text: 'What type of home do you live in?',
    options: ['Apartment', 'House with small yard', 'House with large yard']
  },
  {
    id: 'exercise',
    text: 'How much time can you dedicate to exercising your dog daily?',
    options: ['15-30 minutes', '30-60 minutes', '60+ minutes']
  },
  // Add more questions based on your quiz structure
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: event.target.value
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, navigate to results page
      router.push('/results');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Dog Breed Quiz
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">{questions[currentQuestion].text}</FormLabel>
        <RadioGroup value={answers[questions[currentQuestion].id] || ''} onChange={handleAnswer}>
          {questions[currentQuestion].options.map((option, index) => (
            <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </FormControl>
      <Button 
        variant="contained" 
        onClick={handleNext} 
        disabled={!answers[questions[currentQuestion].id]}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
      </Button>
    </Container>
  );
}