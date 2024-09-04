// src/components/QuizPage.tsx

'use client';

import React from 'react';
import { Typography, Container } from '@mui/material';

export default function QuizPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Dog Breed Quiz
      </Typography>
      <Typography variant="body1">
        Answer the following questions to find your perfect dog breed match!
      </Typography>
      {/* We'll add the actual quiz components here later */}
    </Container>
  );
}