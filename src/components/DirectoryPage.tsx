// src/components/DirectoryPage.tsx

'use client';

import React from 'react';
import { Typography, Container } from '@mui/material';

export default function DirectoryPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Dog Breed Directory
      </Typography>
      {/* We'll add the directory components here later */}
    </Container>
  );
}