// src/app/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { Metadata } from 'next';

const HomePage = dynamic(() => import('@/components/HomePage'), {
  loading: () => <CircularProgress />,
});

export const metadata: Metadata = {
  title: 'Dog Breed Recommender - Find Your Perfect Canine Companion',
  description: 'Discover the ideal dog breed that matches your lifestyle and preferences with our personalized quiz and extensive breed database.',
}

export default function Home() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <HomePage />
    </Suspense>
  );
}
