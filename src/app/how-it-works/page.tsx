// src/app/how-it-works/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Container,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
    Quiz as QuizIcon,
    Psychology as PsychologyIcon,
    PetsOutlined as PetsIcon,
    CheckCircleOutline as CheckIcon,
    TrendingUp as TrendingUpIcon,
    Balance as BalanceIcon,
    Favorite as FavoriteIcon,
    FitnessCenter as FitnessCenterIcon,
    Brush as BrushIcon,
    School as SchoolIcon,
} from '@mui/icons-material';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
// Define the props type for ScoringFactor component
interface ScoringFactorProps {
  icon: React.ReactNode;
  factor: string;
  description: string;
}
const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Paper elevation={3} sx={{ 
      p: 3, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[10],
      },
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h5" component="h3" sx={{ ml: 2 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body1">{description}</Typography>
    </Paper>
  );
};

const ScoringFactor: React.FC<ScoringFactorProps> = ({ icon, factor, description }) => (
  <ListItem>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText 
      primary={factor} 
      secondary={description}
      primaryTypographyProps={{ fontWeight: 'bold' }}
    />
  </ListItem>
);

export default function HowItWorksPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        How Our Dog Breed Finder Works
      </Typography>
      <Typography variant="h5" paragraph align="center" color="text.secondary" sx={{ mb: 6 }}>
        Discover the perfect canine companion with our intelligent matching system
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <StepCard
            icon={<QuizIcon fontSize="large" color="primary" />}
            title="Take the Quiz"
            description="Answer a series of questions about your lifestyle, preferences, and living situation. Our comprehensive quiz covers all aspects of dog ownership."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StepCard
            icon={<PsychologyIcon fontSize="large" color="primary" />}
            title="AI Analysis"
            description="Our advanced algorithm analyzes your responses, comparing them against our extensive database of dog breed characteristics and requirements."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StepCard
            icon={<PetsIcon fontSize="large" color="primary" />}
            title="Get Matched"
            description="Receive personalized breed recommendations that best match your lifestyle and preferences, complete with detailed information about each breed."
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Our Scoring System
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Our sophisticated scoring system considers multiple factors to ensure the best match between you and your future furry friend. Here&apos;s how we evaluate each breed:
        </Typography>
        <Paper elevation={3} sx={{ p: 4, bgcolor: theme.palette.grey[50] }}>
          <List>
            <ScoringFactor
              icon={<BalanceIcon color="primary" />}
              factor="Adaptability"
              description="How well the breed adapts to various living situations and lifestyle changes."
            />
            <ScoringFactor
              icon={<FavoriteIcon color="primary" />}
              factor="Friendliness"
              description="The breed's general disposition towards people and other animals."
            />
            <ScoringFactor
              icon={<FitnessCenterIcon color="primary" />}
              factor="Exercise Needs"
              description="The amount and intensity of physical activity the breed requires."
            />
            <ScoringFactor
              icon={<BrushIcon color="primary" />}
              factor="Grooming Requirements"
              description="The level of grooming and maintenance the breed needs."
            />
            <ScoringFactor
              icon={<SchoolIcon color="primary" />}
              factor="Trainability"
              description="How easy it is to train the breed and their general obedience level."
            />
            <ScoringFactor
              icon={<CheckIcon color="primary" />}
              factor="Compatibility Factors"
              description="Specific traits like size, barking tendency, and tolerance to different climates."
            />
          </List>
        </Paper>
      </Box>

      <Box>
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Matching Process
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Our algorithm calculates a compatibility score for each breed based on how well their characteristics align with your quiz responses. The higher the score, the better the match!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 600, bgcolor: theme.palette.primary.light, color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Compatibility Score = Σ (Trait Match × Importance Factor)
            </Typography>
            <Typography variant="body1">
              Where:
              <br />• Trait Match: How closely a breed&apos;s trait aligns with your preference
              <br />• Importance Factor: The weight given to each trait based on your priorities
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Find Your Perfect Match?
        </Typography>
        <Typography variant="body1" paragraph>
          Take our quiz now and discover the dog breeds that are best suited for you!
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          href="/quiz"
          startIcon={<PetsIcon />}
        >
          Start the Quiz
        </Button>
      </Box>
    </Container>
  );
}