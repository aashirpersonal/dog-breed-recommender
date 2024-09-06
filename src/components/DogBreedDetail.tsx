// src/components/DogBreedDetail.tsx

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  MobileStepper,
  LinearProgress,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BrushIcon from '@mui/icons-material/Brush';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { DogBreed } from '@/types';  // Ensure this import matches your centralized DogBreed type


interface DogBreedDetailProps {
  dog: DogBreed | null;
  open: boolean;
  onClose: () => void;
}

const TraitBar: React.FC<{ trait: string, value: string }> = ({ trait, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Typography variant="body2" color="text.primary" noWrap sx={{ width: '60%', mr: 1 }}>
        {trait}
      </Typography>
      <Box sx={{ width: '30%', mr: 1 }}>
        <LinearProgress variant="determinate" value={Number(value) * 20} />
      </Box>
      <Box sx={{ minWidth: 35, textAlign: 'right' }}>
        <Typography variant="body2" color="text.primary">{value}/5</Typography>
      </Box>
    </Box>
  );

  const TraitCategory: React.FC<{ title: string, icon: React.ReactNode, traits: { name: string, key: keyof DogBreed }[], dog: DogBreed }> = ({ title, icon, traits, dog }) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <span style={{ marginLeft: '8px' }}>{title}</span>
      </Typography>
      {traits.map(trait => (
      <TraitBar
        key={trait.key}
        trait={trait.name}
        value={dog[trait.key] ?? 'N/A'}  // Handle missing or undefined values
      />
    ))}
    </Paper>
  );

  const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ dog, open, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    
    useEffect(() => {
      if (dog) {
        const newImages = [dog.FeaturedImageURL, ...(dog.AdditionalImageURLs ? dog.AdditionalImageURLs.split('|') : [])];
        setImages(newImages);
        setActiveStep(0);  // Reset to the first image when a new dog is selected
      }
    }, [dog]);
    if (!dog) return null;
  
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const traitCategories = [
      {
        title: 'Compatibility',
        icon: <HomeIcon />,
        traits: [
          { name: 'Adaptability', key: 'Adaptability' as keyof DogBreed },
          { name: 'Apartment Living', key: 'Adapts Well To Apartment Living' as keyof DogBreed },
          { name: 'Novice Owners', key: 'Good For Novice Dog Owners' as keyof DogBreed },
          { name: 'Sensitivity', key: 'Sensitivity Level' as keyof DogBreed },
          { name: 'Alone Tolerance', key: 'Tolerates Being Alone' as keyof DogBreed },
          { name: 'Cold Tolerance', key: 'Tolerates Cold Weather' as keyof DogBreed },
          { name: 'Heat Tolerance', key: 'Tolerates Hot Weather' as keyof DogBreed },
        ],
      },
      {
        title: 'Friendliness',
        icon: <FavoriteIcon />,
        traits: [
          { name: 'Overall Friendliness', key: 'All-around friendliness' as keyof DogBreed },
          { name: 'Family Affection', key: 'Best Family Dogs' as keyof DogBreed },
          { name: 'Kid-Friendly', key: 'Kid-Friendly' as keyof DogBreed },
          { name: 'Dog Friendly', key: 'Dog Friendly' as keyof DogBreed },
          { name: 'Stranger Friendly', key: 'Friendly Toward Strangers' as keyof DogBreed },
        ],
      },
      {
        title: 'Health & Grooming',
        icon: <BrushIcon />,
        traits: [
          { name: 'Grooming Needs', key: 'Health And Grooming Needs' as keyof DogBreed },
          { name: 'Shedding', key: 'Shedding' as keyof DogBreed },
          { name: 'Drooling', key: 'Drooling Potential' as keyof DogBreed },
          { name: 'Grooming Ease', key: 'Easy To Groom' as keyof DogBreed },
          { name: 'General Health', key: 'General Health' as keyof DogBreed },
          { name: 'Weight Gain', key: 'Potential For Weight Gain' as keyof DogBreed },
          { name: 'Size', key: 'Size' as keyof DogBreed },
        ],
      },
      {
        title: 'Trainability',
        icon: <SchoolIcon />,
        traits: [
          { name: 'Trainability', key: 'Trainability' as keyof DogBreed },
          { name: 'Training Ease', key: 'Easy To Train' as keyof DogBreed },
          { name: 'Intelligence', key: 'Intelligence' as keyof DogBreed },
          { name: 'Mouthiness', key: 'Potential For Mouthiness' as keyof DogBreed },
          { name: 'Prey Drive', key: 'Prey Drive' as keyof DogBreed },
          { name: 'Barking Tendency', key: 'Tendency To Bark Or Howl' as keyof DogBreed },
          { name: 'Wanderlust', key: 'Wanderlust Potential' as keyof DogBreed },
        ],
      },
      {
        title: 'Exercise Needs',
        icon: <FitnessCenterIcon />,
        traits: [
          { name: 'Energy Level', key: 'High Energy Level' as keyof DogBreed },
          { name: 'Exercise Needs', key: 'Exercise Needs' as keyof DogBreed },
          { name: 'Intensity', key: 'Intensity' as keyof DogBreed },
          { name: 'Playfulness', key: 'Potential For Playfulness' as keyof DogBreed },
        ],
      },
    ];
    
    
    

      return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
          <DialogTitle>{dog['Dog Name']}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: 500, maxWidth: 400, margin: 'auto' }}>
                  <img
                    src={images[activeStep]}
                    alt={`${dog['Dog Name']} - Image ${activeStep + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        <KeyboardArrowRight />
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        <KeyboardArrowLeft />
                        Back
                      </Button>
                    }
                  />
                </Paper>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Quick Facts</Typography>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="body2">Life Expectancy: {dog['Life Expectancy']}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="body2">Weight: {dog['Weight']}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="body2">Height: {dog['Height']}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Temperament</Typography>
              <Typography variant="body1">{dog.Temperament}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {traitCategories.map((category, index) => (
              <TraitCategory
                key={index}
                title={category.title}
                icon={category.icon}
                traits={category.traits}
                dog={dog}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DogBreedDetail;