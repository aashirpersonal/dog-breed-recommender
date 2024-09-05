// src/app/quiz/page.tsx

'use client';

// src/app/quiz/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const QuizPage = dynamic(() => import('@/components/QuizPage'), {
  loading: () => <CircularProgress />,
});

export default function QuizPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <QuizPage />
    </Suspense>
  );
}