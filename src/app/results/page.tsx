// src/app/results/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BrushIcon from '@mui/icons-material/Brush';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import DogBreedDetail from '@/components/DogBreedDetail';

interface DogBreed {
  id: string;
  'Dog Name': string;
  Temperament: string;
  Adaptability: string;
  'All-around friendliness': string;
  'Exercise needs': string;
  'Health And Grooming Needs': string;
  Trainability: string;
  FeaturedImageURL: string;
  'Officially Recognized': string;
}

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '75%', // 4:3 aspect ratio
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
});

const GlassBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const TraitBar = ({ trait, value, icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    {icon}
    <Typography variant="body2" noWrap sx={{ width: '30%', ml: 1 }}>{trait}</Typography>
    <LinearProgress 
      variant="determinate" 
      value={Number(value) * 20} 
      sx={{ flexGrow: 1, mr: 1 }} 
    />
    <Typography variant="body2">{value}/5</Typography>
  </Box>
);

const traits = [
  { name: 'Adapt', key: 'Adaptability', icon: <PetsIcon sx={{ mr: 1 }} /> },
  { name: 'Friendly', key: 'All-around friendliness', icon: <FavoriteIcon sx={{ mr: 1 }} /> },
  { name: 'Exercise', key: 'Exercise needs', icon: <FitnessCenterIcon sx={{ mr: 1 }} /> },
  { name: 'Groom', key: 'Health And Grooming Needs', icon: <BrushIcon sx={{ mr: 1 }} /> },
  { name: 'Train', key: 'Trainability', icon: <SchoolIcon sx={{ mr: 1 }} /> },
];

export default function ResultsPage() {
  const [recommendations, setRecommendations] = useState<DogBreed[]>([]);
  const [selectedDog, setSelectedDog] = useState<DogBreed | null>(null);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem('dogRecommendations');
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
      localStorage.removeItem('dogRecommendations');
    }
  }, []);

  const handleOpenDetail = (dog: DogBreed) => {
    setSelectedDog(dog);
  };

  const handleCloseDetail = () => {
    setSelectedDog(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <GlassBox sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Your Top Dog Breed Matches
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Based on your preferences, we&apos;ve found these breeds that might be perfect for you.
        </Typography>
      </GlassBox>
      <Grid container spacing={3}>
        {recommendations.map((dog) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
            <StyledCard>
              <StyledCardMedia
                image={dog.FeaturedImageURL}
                title={dog['Dog Name']}
              />
              <StyledCardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
                    {dog['Dog Name']}
                    {dog['Officially Recognized'] === 'Yes' && (
                      <Tooltip title="Officially Recognized">
                        <VerifiedIcon color="primary" sx={{ ml: 1, verticalAlign: 'middle' }} />
                      </Tooltip>
                    )}
                  </Typography>
                  <IconButton size="small" onClick={() => handleOpenDetail(dog)}>
                    <InfoIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {dog.Temperament}
                </Typography>
                {traits.map(trait => (
                  <TraitBar 
                    key={trait.key} 
                    trait={trait.name} 
                    value={dog[trait.key]} 
                    icon={trait.icon} 
                  />
                ))}
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <DogBreedDetail 
        dog={selectedDog} 
        open={!!selectedDog} 
        onClose={handleCloseDetail} 
      />
    </Container>
  );
}