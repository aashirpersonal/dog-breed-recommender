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


interface DogBreed {
  id: string;
  'Dog Name': string;
  Temperament: string;
  'Life Expectancy': string;
  'Weight': string;
  'Height': string;
  FeaturedImageURL: string;
  AdditionalImageURLs: string;
  // Compatibility traits
  Adaptability: string;
  'Adapts Well To Apartment Living': string;
  'Good For Novice Owners': string;
  'Sensitivity Level': string;
  'Tolerates Being Alone': string;
  'Tolerates Cold Weather': string;
  'Tolerates Hot Weather': string;
  // Friendliness traits
  'All-around friendliness': string;
  'Affectionate with Family': string;
  'Kid-Friendly': string;
  'Dog Friendly': string;
  'Friendly Toward Strangers': string;
  // Health traits
  'Health And Grooming Needs': string;
  'Amount Of Shedding': string;
  'Drooling Potential': string;
  'Easy To Groom': string;
  'General Health': string;
  'Potential For Weight Gain': string;
  'Size': string;
  // Trainability traits
  Trainability: string;
  'Easy To Train': string;
  Intelligence: string;
  'Potential For Mouthiness': string;
  'Prey Drive': string;
  'Tendency To Bark Or Howl': string;
  'Wanderlust Potential': string;
  // Exercise traits
  'Exercise needs': string;
  'Energy Level': string;
  Intensity: string;
  'Exercise Needs': string;
  'Potential For Playfulness': string;
}

interface DogBreedDetailProps {
  dog: DogBreed | null;
  open: boolean;
  onClose: () => void;
}

const TraitBar = ({ trait, value }) => (
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

  const TraitCategory = ({ title, icon, traits, dog }) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <span style={{ marginLeft: '8px' }}>{title}</span>
      </Typography>
      {traits.map(trait => (
        <TraitBar
          key={trait.key}
          trait={trait.name}
          value={dog[trait.key]}
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
            { name: 'Adaptability', key: 'Adaptability' },
            { name: 'Apartment Living', key: 'Adapts Well To Apartment Living' },
            { name: 'Novice Owners', key: 'Good For Novice Dog Owners' },
            { name: 'Sensitivity', key: 'Sensitivity Level' },
            { name: 'Alone Tolerance', key: 'Tolerates Being Alone' },
            { name: 'Cold Tolerance', key: 'Tolerates Cold Weather' },
            { name: 'Heat Tolerance', key: 'Tolerates Hot Weather' },
          ],
        },
        {
          title: 'Friendliness',
          icon: <FavoriteIcon />,
          traits: [
            { name: 'Overall Friendliness', key: 'All-around friendliness' },
            { name: 'Family Affection', key: 'Best Family Dogs' },
            { name: 'Kid-Friendly', key: 'Kid-Friendly' },
            { name: 'Dog Friendly', key: 'Dog Friendly' },
            { name: 'Stranger Friendly', key: 'Friendly Toward Strangers' },
          ],
        },
        {
          title: 'Health & Grooming',
          icon: <BrushIcon />,
          traits: [
            { name: 'Grooming Needs', key: 'Health And Grooming Needs' },
            { name: 'Shedding', key: 'Shedding' },
            { name: 'Drooling', key: 'Drooling Potential' },
            { name: 'Grooming Ease', key: 'Easy To Groom' },
            { name: 'General Health', key: 'General Health' },
            { name: 'Weight Gain', key: 'Potential For Weight Gain' },
            { name: 'Size', key: 'Size' },
          ],
        },
        {
          title: 'Trainability',
          icon: <SchoolIcon />,
          traits: [
            { name: 'Trainability', key: 'Trainability' },
            { name: 'Training Ease', key: 'Easy To Train' },
            { name: 'Intelligence', key: 'Intelligence' },
            { name: 'Mouthiness', key: 'Potential For Mouthiness' },
            { name: 'Prey Drive', key: 'Prey Drive' },
            { name: 'Barking Tendency', key: 'Tendency To Bark Or Howl' },
            { name: 'Wanderlust', key: 'Wanderlust Potential' },
          ],
        },
        {
          title: 'Exercise Needs',
          icon: <FitnessCenterIcon />,
          traits: [
            { name: 'Energy Level', key: 'High Energy Level' },
            { name: 'Exercise Needs', key: 'Exercise Needs' },
            { name: 'Intensity', key: 'Intensity' },
            { name: 'Playfulness', key: 'Potential For Playfulness' },
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