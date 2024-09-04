// src/components/Layout.tsx

'use client';

import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Typography variant="h6" component="a" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
              Dog Breed Recommender
            </Typography>
          </Link>
          <Link href="/directory" passHref>
            <Typography component="a" sx={{ marginLeft: 2, textDecoration: 'none', color: 'inherit' }}>
              Directory
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <Box sx={{ my: 4 }}>
          {children}
        </Box>
      </Container>
    </>
  );
}