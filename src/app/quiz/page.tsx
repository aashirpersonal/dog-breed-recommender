// src/app/quiz/page.tsx

'use client';

import React from 'react';
import { Box } from '@mui/material';
import QuizPage from '@/components/QuizPage';

export default function QuizPageWrapper() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0',
      }}
    >
      <QuizPage />
    </Box>
  );
}