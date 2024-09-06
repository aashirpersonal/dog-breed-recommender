// src/components/FuturisticFooter.tsx
'use client';

import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PetsIcon from '@mui/icons-material/Pets';

const FuturisticFooter: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(45deg, #3f51b5, #f50057)',
        color: 'white',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <PetsIcon sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="h6" component="span">
                Dog Breed Recommender
              </Typography>
            </Box>
            <Typography variant="body2" align="center">
              Helping you find your perfect canine companion
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center" gap={2}>
              {['About', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  component="a"
                  href="#"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center" gap={2}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, index) => (
                <IconButton
                  key={index}
                  color="inherit"
                  aria-label={`social media icon ${index + 1}`}
                  component="a"
                  href="#"
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Dog Breed Recommender. All rights reserved.
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default FuturisticFooter;