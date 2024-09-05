// src/components/ResultsPage.tsx

'use client';

import React from 'react';
import { Typography, Container, Card, CardContent, CardMedia } from '@mui/material';

// Mock data for dog breeds
const dogBreeds = [
  { name: 'Labrador Retriever', image: 'https://dog-breed-selector-images.s3.ap-northeast-1.amazonaws.com/dog/Labrador Retriever/Labrador-Retriever-featured.jpg' },
  { name: 'German Shepherd', image: 'https://dog-breed-selector-images.s3.ap-northeast-1.amazonaws.com/dog/German Shepherd/German-Shepherd-featured.jpg' },
  { name: 'Golden Retriever', image: 'https://dog-breed-selector-images.s3.ap-northeast-1.amazonaws.com/dog/Golden Retriever/Golden-Retriever-featured.jpg' },
];

export default function ResultsPage() {
  // In a real application, you would get the quiz answers from a state management solution or API
  // and use them to calculate the recommendations

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Your Dog Breed Matches
      </Typography>
      {dogBreeds.map((breed, index) => (
        <Card key={index} sx={{ display: 'flex', marginBottom: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={breed.image}
            alt={breed.name}
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="h5" variant="h5">
              {breed.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Click for more details
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}