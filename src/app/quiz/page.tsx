// src/app/quiz/page.tsx

'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Stepper, 
  Step, 
  StepLabel,
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel,
  Paper
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 'living_space',
    text: 'What type of living space do you have?',
    options: [
      { value: 'apartment', label: 'Apartment' },
      { value: 'house_small_yard', label: 'House with small yard' },
      { value: 'house_large_yard', label: 'House with large yard' }
    ]
  },
  {
    id: 'activity_level',
    text: 'How active is your lifestyle?',
    options: [
      { value: 'sedentary', label: 'Sedentary' },
      { value: 'moderate', label: 'Moderately active' },
      { value: 'very_active', label: 'Very active' }
    ]
  },
  {
    id: 'experience',
    text: 'How experienced are you with dogs?',
    options: [
      { value: 'first_time', label: 'First-time owner' },
      { value: 'some_experience', label: 'Some experience' },
      { value: 'very_experienced', label: 'Very experienced' }
    ]
  },
  {
    id: 'grooming',
    text: 'How much grooming are you willing to do?',
    options: [
      { value: 'low', label: 'Minimal grooming' },
      { value: 'medium', label: 'Regular grooming' },
      { value: 'high', label: 'Extensive grooming' }
    ]
  },
  {
    id: 'barking',
    text: 'How tolerant are you of barking?',
    options: [
      { value: 'quiet', label: 'Prefer quiet dogs' },
      { value: 'some_barking', label: 'Some barking is okay' },
      { value: 'vocal', label: 'Don\'t mind vocal dogs' }
    ]
  }
];

export default function QuizPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [questions[activeStep].id]: event.target.value
    });
  };

  const handleNext = () => {
    if (activeStep < questions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Quiz completed, navigate to results page with answers
      router.push(`/results?${new URLSearchParams(answers).toString()}`);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Find Your Perfect Dog Breed
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {questions.map((question, index) => (
            <Step key={question.id}>
              <StepLabel>{`Question ${index + 1}`}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography variant="h6">{questions[activeStep].text}</Typography>
            </FormLabel>
            <RadioGroup
              value={answers[questions[activeStep].id] || ''}
              onChange={handleAnswer}
            >
              {questions[activeStep].options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!answers[questions[activeStep].id]}
          >
            {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}