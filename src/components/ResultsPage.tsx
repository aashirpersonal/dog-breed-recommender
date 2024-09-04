// src/components/ResultsPage.tsx

'use client';

import React from 'react';
import { Typography, Container } from '@mui/material';

export default function ResultsPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Your Dog Breed Matches
      </Typography>
      {/* We'll add the results components here later */}
    </Container>
  );
}