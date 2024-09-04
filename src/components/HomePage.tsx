// src/components/HomePage.tsx

'use client';

import { Button, Container, Typography, Box } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Find Your Perfect Dog Breed
        </Typography>
        <Typography variant="body1" paragraph>
          Take our quick quiz to discover the ideal canine companion for your lifestyle.
        </Typography>
        <Link href="/quiz" passHref>
          <Button variant="contained" size="large" component="a">
            Start Quiz
          </Button>
        </Link>
      </Box>
    </Container>
  );
}