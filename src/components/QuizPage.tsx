// src/components/QuizPage.tsx
import React, { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Paper,
  Grid,
  Button,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PetsIcon from '@mui/icons-material/Pets';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import questions from '@/data/quizQuestions';
import CustomStepper from './CustomStepper';
import AdvancedQuestionCard from './AdvancedQuestionCard';

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalAnswers),
      });
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const recommendations = await response.json();
      localStorage.setItem('dogRecommendations', JSON.stringify(recommendations));
      
      // Simulate a delay for the loading screen
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      router.push('/results');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              Find Your Perfect Dog Breed
            </Typography>
            <Typography variant="h5" paragraph color="textSecondary">
              Take our interactive quiz to discover the ideal canine companion that matches your lifestyle and preferences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                <PetsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">500+ Breeds</Typography>
              </Paper>
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">Expert-Backed</Typography>
              </Paper>
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">5 Min Quiz</Typography>
              </Paper>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: '100%', minHeight: 400 }}>
            <motion.img
              src="/dog breed quiz.png" // Add this image to your public folder
              alt="Happy dog with owner"
              style={{
                width: '80%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: theme.shape.borderRadius,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ my: 8 }}>
        <CustomStepper 
          steps={questions.map(q => q.shortLabel)} 
          currentStep={currentQuestion} 
        />
      </Box>

      <Box sx={{ maxWidth: 600, margin: 'auto', mb: 8 }}>
        <AnimatePresence mode="wait">
          <AdvancedQuestionCard
            key={currentQuestion}
            question={questions[currentQuestion].question}
            answers={questions[currentQuestion].answers}
            tooltip={questions[currentQuestion].tooltip}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" paragraph>
          Our advanced AI-powered algorithm analyzes your responses to match you with the perfect dog breed.
        </Typography>
        <Typography variant="body1" paragraph>
          Discover breeds that fit your living space, activity level, and personal preferences.
        </Typography>
        <Button variant="contained" color="primary" size="large" startIcon={<PetsIcon />}>
          Learn More About Our Process
        </Button>
      </Box>

      {loading && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
        }}>
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
                border: '4px solid',
                borderColor: theme => `${theme.palette.primary.main} transparent ${theme.palette.primary.main} ${theme.palette.primary.main}`,
                position: 'absolute',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default QuizPage;
