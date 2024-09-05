// src/components/CustomQuiz.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  styled
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 4),
  textTransform: 'none',
  fontWeight: 'bold',
}));

interface Question {
  id: string;
  question: string;
  answers: string[];
}

interface CustomQuizProps {
  questions: Question[];
  onComplete: (answers: { [key: string]: string }) => void;
}

const CustomQuiz: React.FC<CustomQuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 10, borderRadius: 5 }} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {questions[currentQuestion].question}
              </Typography>
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              >
                {questions[currentQuestion].answers.map((answer, index) => (
                  <FormControlLabel
                    key={index}
                    value={answer}
                    control={<Radio />}
                    label={answer}
                    sx={{ my: 1 }}
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </StyledCard>
        </motion.div>
      </AnimatePresence>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <StyledButton onClick={handlePrevious} disabled={currentQuestion === 0} variant="outlined">
          Previous
        </StyledButton>
        <StyledButton
          onClick={handleNext}
          disabled={!answers[questions[currentQuestion].id]}
          variant="contained"
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </StyledButton>
      </Box>
    </Box>
  );
};

export default CustomQuiz;